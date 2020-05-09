from django.urls import path
from core.views import answer, answer_like, post, post_like

urlpatterns = [
    path('posts/', post.PostList.as_view(), name='post_list'),
    path('posts/<int:post_id>/', post.PostDetail.as_view(), name='post_detail'),
    path('posts/<int:post_id>/likes/', post_like.PostLikeCreate.as_view(), name='post_like_create'),
    path('posts/<int:post_id>/answers/', answer.AnswerCreate.as_view(), name='answer_create'),
    path('posts/<int:post_id>/answers/<int:answer_id>/likes/', answer_like.AnswerLikeCreate.as_view(), name='answer_like_create'),
]