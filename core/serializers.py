from rest_framework import serializers

from .models import MyUser, Link, Settings

class LinkSerializer(serializers.Serializer):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    title = serializers.CharField(max_length=200)
    url = serializers.URLField()
    description = serializers.CharField(max_length=200)
    archived = serializers.BooleanField()

    created = serializers.DateField()
    last_updated = serializers.DateField()

    def create(self, validated_data):
        return Comment(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.url = validated_data.get('url', instance.url)
        instance.archived = validated_data.get('archived', instance.archived)
        instance.description = validated_data.get('description', instance.description)
        return instance
