from rest_framework import serializers
from core.models.post import PostLike


class PostLikeSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    likes = serializers.SerializerMethodField()

    class Meta:
        model = PostLike
        exclude = ('post',)

    def get_likes(self, obj):
        return PostLike.objects.filter(post=obj.post).count()
