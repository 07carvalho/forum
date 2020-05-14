from rest_framework import serializers
from core.models.post import Answer, AnswerLike


class AnswerSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)
    likes = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        exclude = ('post',)

    def get_likes(self, obj):
        return AnswerLike.objects.filter(answer=obj).count()

    def get_user_liked(self, obj):
        # user is passed in header to simulate a authenticated user
        user = self.context.get('user', None)
        return False if user is None else AnswerLike.objects.filter(answer=obj, user=user).exists()
