from rest_framework import serializers
from core.models.post import AnswerLike


class AnswerLikeSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    likes = serializers.SerializerMethodField()

    class Meta:
        model = AnswerLike
        exclude = ('answer',)

    def get_likes(self, obj):
        return AnswerLike.objects.filter(answer=obj.answer).count()
