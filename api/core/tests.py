from django.test import TestCase, Client
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
        """List the posts"""
        response = Client(HTTP_USER='user1').get(self.url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(3, len(response.data))


    def test_post_creation(self):
        """Create a new post with 0 likes and 0 answers"""
        data = {
            'title': 'What is the meaning of life?',
            'text': 'Happiness is the meaning and the purpose of life, the whole aim and end of human existence. Am I right, guys?',
        }
        response = Client(HTTP_USER='aristotle_the_philosopher').post(self.url, data)
        self.assertEqual(201, response.status_code)
        self.assertEqual(0, response.data.get('likes'))
        self.assertEqual(0, len(response.data.get('answers')))


class PostDetailAPIViewTestCase(APITestCase):

    created_post_id = None

    def setUp(self):
        data = {'title': 'Title 1', 'text': 'Text 1', 'user': 'user1'}
        obj = Post.objects.create(**data)
        self.created_post_id = obj.id

    def test_get_post(self):
        """Make a request to get a post instance"""
        url = reverse('post_detail', kwargs={'post_id': self.created_post_id})
        respose = Client(HTTP_USER='user1').get(url)
        self.assertEqual(200, respose.status_code)


class AnswerCreateAPIViewTestCase(APITestCase):

    created_post_id = None
    created_answer_id = None

    def setUp(self):
        data = {'title': 'Title 1', 'text': 'Text 1', 'user': 'user1'}
        obj = Post.objects.create(**data)
        self.created_post_id = obj.id

    def test_one_answer_creation(self):
        """Create a new answer to a post"""
        data = {
            'text': 'The answer to the Ultimate Question of Life, the Universe, and Everything is 42',
        }
        answer_url = reverse('answer_create', kwargs={'post_id': self.created_post_id})
        response = Client(HTTP_USER='douglas_adams').post(answer_url, data)
        self.assertEqual(201, response.status_code)
        self.assertEqual(0, response.data.get('likes'))

    def test_answer_creation_and_post_request(self):
        """Create 5 answers to a post and check post"""
        data = [
            {'text': 'Answer 1'},
            {'text': 'Answer 2'},
            {'text': 'Answer 3'},
            {'text': 'Answer 4'},
            {'text': 'Answer 5'},
        ]

        answer_url = reverse('answer_create', kwargs={'post_id': self.created_post_id})
        for answer in data:
            response = Client(HTTP_USER='user').post(answer_url, answer)
            self.assertEqual(201, response.status_code)

        post_url = reverse('post_detail', kwargs={'post_id': self.created_post_id})
        post_respose = self.client.get(post_url)
        self.assertEqual(5, len(post_respose.data.get('answers')))
