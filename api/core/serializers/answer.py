from rest_framework import serializers
from core.models.post import Answer, AnswerLike


class AnswerSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    likes = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        exclude = ('post',)

    def get_likes(self, obj):
        return AnswerLike.objects.filter(answer=obj).count()
