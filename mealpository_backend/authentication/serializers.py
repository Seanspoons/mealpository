from rest_framework import serializers
from authentication.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = CustomUser
        fields = ['id', 'email', 'password']