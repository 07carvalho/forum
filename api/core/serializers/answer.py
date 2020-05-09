from rest_framework import serializers
from core.models.post import Answer


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        exclude = ('post',)
