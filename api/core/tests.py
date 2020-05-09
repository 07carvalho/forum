import json
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from core.models.post import *


class PostListAPIViewTestCase(APITestCase):

    url = reverse('post_list')

    def setUp(self):
        data = [
            {'title': 'Title 1', 'text': 'Text 1', 'user': 'user1'},
            {'title': 'Title 2', 'text': 'Text 2', 'user': 'user2'},
            {'title': 'Title 3', 'text': 'Text 3', 'user': 'user3'},
        ]

        for post in data:
            obj = Post.objects.create(**post)


    def test_list_posts(self):
        '''
        List the posts
        '''
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(3, len(response.data))


    def test_post_creation(self):
        '''
        Create a new post with 0 likes and 0 answers
        '''
        data = {
            'title': 'What is the meaning of life?',
            'text': 'Happiness is the meaning and the purpose of life, the whole aim and end of human existence. Am I right, guys?',
            'user': 'aristotle_the_philosopher',
        }
        response = self.client.post(self.url, data)
        self.assertEqual(201, response.status_code)
        self.assertEqual(0, response.data.get('like'))
        self.assertEqual(0, len(response.data.get('answers')))
