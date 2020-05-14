from rest_framework import serializers
from core.models.post import Post, PostLike
from core.serializers.answer import AnswerSerializer


class PostSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S", read_only=True)
    likes = serializers.SerializerMethodField()
    slug = serializers.SlugField(read_only=True)
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_likes(self, obj):
        return PostLike.objects.filter(post=obj).count()

    def get_user_liked(self, obj):
        # user is passed in header to simulate a authenticated user
        user = self.context.get('user', None)
        return False if user is None else PostLike.objects.filter(post=obj, user=user).exists()
