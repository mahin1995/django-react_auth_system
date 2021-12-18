from django.db.models import fields
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User=get_user_model()

class UserCreateSerialize(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model=User
        fields=('id','email','first_name','last_name','password')