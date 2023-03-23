from mongoengine import *
from .users import User
import datetime

connect("Citizen_Feedback_Platform")
class Messages(Document):
   message = StringField(required=True)
   sender = ReferenceField(User)
   reciver =  ReferenceField(User)
   created_at = DateTimeField(default=datetime.datetime.now())