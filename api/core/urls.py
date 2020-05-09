from django.urls import path
from core.views import post

urlpatterns = [
    path('posts/', post.PostList.as_view(), name='post_list'),
    path('posts/<int:post_id>/', post.PostDetail.as_view(), name='post_detail'),
]