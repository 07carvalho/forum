from rest_framework import serializers
from core.models.post import Post
from core.serializers.answer import AnswerSerializer


class PostSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
