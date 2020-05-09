from django.urls import path
from core.views import answer, post

urlpatterns = [
    path('posts/', post.PostList.as_view(), name='post_list'),
    path('posts/<int:post_id>/', post.PostDetail.as_view(), name='post_detail'),
    path('posts/<int:post_id>/answers/', answer.AnswerCreate.as_view(), name='answer_create'),
]