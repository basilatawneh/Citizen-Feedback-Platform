from mongoengine import *
from mongoengine import signals
# from flask.ext.bcrypt import Bcrypt
from werkzeug.security import generate_password_hash, check_password_hash

connect("Citizen_Feedback_Platform")

class User(Document):
   username = StringField(required=True, unique=True)
   password = StringField(required=True)
   full_name = StringField(max_length=50)
   role = IntField(required=True)
   
   @classmethod
   def pre_save(cls, sender, document, **kwargs):
      document.password = generate_password_hash(document.password)

   def comapre_passeord(hashed_password, password):
      return check_password_hash(pwhash=hashed_password, password=password)

   def to_json(self):
      return {
         'username': self.username,
         'password': self.password,
         'full_name': self.full_name,
         'role': self.role,
      }

signals.pre_save.connect(User.pre_save, sender=User)