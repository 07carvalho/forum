from django.utils.translation import ugettext_lazy as _
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.models.post import Post
from core.serializers.post import PostSerializer


class PostList(generics.ListCreateAPIView):

    description = 'This route is used to list or create a new post.'
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request):
        queryset = self.get_queryset()

        order = request.query_params.get('order', None)
        ordered_queryset = Post().order_queryset(queryset, order)

        serializer = PostSerializer(ordered_queryset, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(APIView):
    """Get a post. Update and delete methods have not been implemented
    because there is no authentication and permission policy.
    """
    description = 'This route is used to get a single post.'

    def get_object(self, post_id):
        try:
            return Post.objects.get(pk=post_id)
        except Post.DoesNotExist:
            raise serializers.ValidationError({'not_found': _('This post does not exist.')})

    def get(self, request, post_id, format=None):
        post = self.get_object(post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

