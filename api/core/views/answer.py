from django.db import transaction
from django.utils.translation import ugettext_lazy as _
from rest_framework import generics, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from core.models.post import Answer
from core.serializers.answer import AnswerSerializer


class AnswerCreate(generics.CreateAPIView):

    description = 'This route is used to create a new answer.'

    serializer_class = AnswerSerializer

    def post(self, request, post_id=None, format=None):
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(post_id=post_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
