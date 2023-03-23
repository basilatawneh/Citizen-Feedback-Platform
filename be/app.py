from modules.feedbacks import Feedback
from modules.messages import Messages
from modules.users import User
from bson.objectid import ObjectId
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Citizen_Feedback_Platform"
mongodb_client = PyMongo(app)
CORS(app)
db = mongodb_client.db


@app.route("/user", methods=["POST"])
def add_one():
    body = request.json
    user = User(
        username=body["username"],
        password=body["password"],
        full_name=body["full_name"],
        role=body["role"]
    )
    user.save()
    return jsonify(message="success")


@app.route("/user/login", methods=["POST"])
def login():
    body = request.json
    user = User.objects(username=body["username"]).first()
    print(user)
    res = {}
    status = 403
    if (user != None):
        user = json.loads(user.to_json())
        isMatch = User.comapre_passeord(user["password"], body["password"])
        if (isMatch):
            res = {**user}
            status = 200
        else:
            res = {"message": "Unauthorized user"}
            status = 403
    else:
        res = {"message": "Unauthorized user"}
        status = 403
    return jsonify(res), status


@app.route("/message", methods=["POST"])
def create_message():
    body = request.json
    message = Messages(
        message=body["message"], sender=body["sender"], reciver=body["reciver"])
    message.save()
    print(message.to_json())
    return jsonify(message="ss"), 200


@app.route("/message", methods=["GET"])
def get_message():
    body = request.json
    messages = Messages.objects(reciver=body["reciver"])  # .select_related()
    result = []
    for book in messages:
        print(book.id)
        result.append({
            "id": str(book.id),
            'message': book.message,
            'sender': book.sender.to_json(),
            'reciver': book.reciver.to_json()
        })

    return jsonify(result), 200


@app.route("/feedback", methods=["POST"])
def creat_feedback():
    body = request.json
    feedback = Feedback(owner=body["owner"], data=body["data"],
                        community_name=body["community_name"], community_size=body["community_size"])
    feedback.save()
    # result = []
    # for book in messages:
    #     print(book.id)
    #     result.append({
    #         "id": str(book.id),
    #         'message': book.message,
    #         'sender': book.sender.to_json(),
    #         'reciver': book.reciver.to_json()
    #     })
    return jsonify(success="Sds"), 200


@app.route("/feedback", methods=["GET"])
def Get_feedback():
    body = request.json
    pipeline = [
        {
            '$lookup': {
                'from': 'user',  # Name of the joined collection
                # Field in the local collection (Order) to join on
                'localField': 'owner',
                # Field in the joined collection (Customer) to join on
                'foreignField': '_id',
                'as': 'user'  # Alias for the joined collection in the result
            }
        },
        {
            '$match': {
                # Filter users with a specific zip code
                'owner': ObjectId(body["owner"])
            }
        },
        {
            '$group': {
                '_id': '$owner',
                'family_total': {'$sum': '$meta_data.family'},
                'health_total': {'$sum': '$meta_data.health'},
                'unknown_total': {'$sum': '$meta_data.unknown'},
                # Get the first customer document for each group
                'owner': {'$first': '$user'}
            }
        }
    ]
    data = Feedback.objects.aggregate(*pipeline)
    result = [{**x, '_id': str(x['_id']), 'owner': [{**y, '_id': str(y['_id'])} for y in x['owner']]} for x in data]
    return jsonify(result), 200


@app.route("/")
def index():
    return ("Hello")
