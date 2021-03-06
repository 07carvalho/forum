from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from core.auth import CsrfExemptSessionAuthentication
from core.models.post import Answer, AnswerLike
from core.serializers.answer_like import AnswerLikeSerializer


class AnswerLikeCreate(generics.CreateAPIView, generics.DestroyAPIView):

    description = 'This route is used to post and delete a like instance.'
    serializer_class = AnswerLikeSerializer
    permission_classes = [AllowAny]
    authentication_classes = [CsrfExemptSessionAuthentication,]

    def post(self, request, post_id=None, answer_id=None, format=None):
        # user is passed in header to simulate a authenticated user
        user = request.META.get('HTTP_USER', None)
        if Answer().is_answer_post(answer_id, post_id):
            if not AnswerLike().user_liked_answer(user, answer_id):
                data = request.data.copy()
                data['user'] = user
                serializer = AnswerLikeSerializer(data=data)
                if serializer.is_valid():
                    serializer.save(answer_id=answer_id)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            error = {'forbidden_message': 'You already liked this post.'}
            return Response(error, status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, post_id=None, answer_id=None, format=None):
        if Answer().is_answer_post(answer_id, post_id):
            # user is passed in header to simulate a authenticated user
            user = request.META.get('HTTP_USER', None)
            if AnswerLike().user_liked_answer(user, answer_id):
                AnswerLike.objects.get(user=user, answer_id=answer_id).delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            error = {'forbidden_message': 'You did not like this post.'}
            return Response(error, status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_404_NOT_FOUND)
