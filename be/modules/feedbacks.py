from mongoengine import *
from mongoengine import signals

from .users import User

connect("Citizen_Feedback_Platform")

class Data(EmbeddedDocument):
   what_bothers_you = StringField(required=True)
   age = IntField(required=True)

class Meta_data(EmbeddedDocument):
   family = IntField(required=True)
   health = IntField(required=True)
   unknown = IntField(required=True)

class Feedback(Document):
   owner = ReferenceField(User)
   data = ListField(EmbeddedDocumentField(Data))
   community_name = StringField(max_length=50, required=True)
   community_size = IntField(max_length=50, required=True)
   meta_data = EmbeddedDocumentField(Meta_data)
   
   def contains_word(s, w):
    return (' ' + w.lower() + ' ') in (' ' + s.lower() + ' ')
 
   @classmethod
   def pre_save(cls, sender, document, **kwargs):
      metadata = { 'family': 0, 'health': 0, 'unknown': 0}
      print("FDSFDSFSDS")
      for item in document.data:
         if(item.age < 25 and cls.contains_word(item.what_bothers_you, 'family')):
            metadata["family"] += 1
         elif(item.age >18 and cls.contains_word(item.what_bothers_you, 'health')):
            metadata["health"] += 1
         else:
            metadata["unknown"] += 1
      document.meta_data = Meta_data(family=metadata["family"], health=metadata["health"], unknown=metadata["unknown"])

signals.pre_save.connect(Feedback.pre_save, sender=Feedback)