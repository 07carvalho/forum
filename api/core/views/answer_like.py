from rest_framework import generics, status
from rest_framework.response import Response
from core.models.post import Answer, AnswerLike
from core.serializers.answer_like import AnswerLikeSerializer


class AnswerLikeCreate(generics.CreateAPIView, generics.DestroyAPIView):

    description = 'This route is used to post and delete a like instance.'
    serializer_class = AnswerLikeSerializer

    def post(self, request, post_id=None, answer_id=None, format=None):
        if Answer().is_answer_post(answer_id, post_id):
            if not AnswerLike().user_liked_answer(request.data.get('user'), answer_id):
                serializer = AnswerLikeSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save(answer_id=answer_id)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            error = {'forbidden_message': 'You already liked this post.'}
            return Response(error, status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, post_id=None, answer_id=None, format=None):
        if Answer().is_answer_post(answer_id, post_id):
            user = request.data.get('user')
            if AnswerLike().user_liked_answer(user, answer_id):
                AnswerLike.objects.get(user=user, answer_id=answer_id).delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            error = {'forbidden_message': 'You did not like this post.'}
            return Response(error, status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_404_NOT_FOUND)
