from rest_framework import serializers
from core.models.post import Post, PostLike
from core.serializers.answer import AnswerSerializer


class PostSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True) # serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_likes(self, obj):
        return PostLike.objects.filter(post=obj).count()
