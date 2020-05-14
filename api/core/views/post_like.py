from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from core.auth import CsrfExemptSessionAuthentication
from core.models.post import PostLike
from core.serializers.post_like import PostLikeSerializer


class PostLikeCreate(generics.CreateAPIView, generics.DestroyAPIView):

    description = 'This route is used to post and delete a like instance.'
    serializer_class = PostLikeSerializer
    permission_classes = [AllowAny]
    authentication_classes = [CsrfExemptSessionAuthentication,]

    def post(self, request, post_id=None, format=None):
        # user is passed in header to simulate a authenticated user
        user = request.META.get('HTTP_USER', None)
        if not PostLike().user_liked_post(user, post_id):
            request.data['user'] = user
            serializer = PostLikeSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(post_id=post_id)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        error = {'forbidden_message': 'You already liked this post.'}
        return Response(error, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request, post_id=None, format=None):
        # user is passed in header to simulate a authenticated user
        user = request.META.get('HTTP_USER', None)
        if PostLike().user_liked_post(user, post_id):
            PostLike.objects.get(user=user, post_id=post_id).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        error = {'forbidden_message': 'You did not like this post.'}
        return Response(error, status=status.HTTP_403_FORBIDDEN)
