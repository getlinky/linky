from rest_framework import serializers

from .models import MyUser, Link

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MyUser
        fields = ('email', 'password')


class LinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Link
        fields = ('title', 'url', 'description', 'archived', 'created',
                  'last_updated', 'id')
        read_only = ('id', 'last_updated', 'created')
