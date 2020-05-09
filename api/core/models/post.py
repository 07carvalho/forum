import random
from django.db import models
from django.utils.text import slugify


class Post(models.Model):
    """This model represents a post."""
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    slug = models.SlugField(unique=True)
    text = models.CharField(max_length=600, blank=False, null=False)
    title = models.CharField(max_length=60, blank=False, null=False)
    user = models.CharField(max_length=60, blank=False, null=False)

    class Meta:
        app_label = 'core'

    def __str__(self):
        return '{0}, posted at {1}'.format(self.title, self.created_at)

    def save(self, *args, **kwargs):
        self.slug = self.slug_generator(self.title)
        super(Post, self).save(*args, **kwargs)

    def slug_generator(self, title: str) -> str:
        """Generate a slug based in the post title and a random number.
        If slug already exists, generate another.
        Can generate 1,000,000 unique slugs based in the same title
        """
        slug_title = slugify(title)
        random_num = random.randrange(1, 1000001)
        slug = "{0}-{1}".format(slug_title, random_num)

        if Post.objects.filter(slug=slug).exists():
            return slug_generator(title)
        return slug


class Answer(models.Model):
    """This model represents an answer of a post."""
    post = models.ForeignKey(Post, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=600, blank=False, null=False)
    user = models.CharField(max_length=60, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        app_label = 'core'

    def __str__(self):
        return '{0}, posted at {1}'.format(self.text, self.created_at)

    def is_answer_post(self, answer_id, post_id):
        return Answer.objects.filter(id=answer_id, post_id=post_id)


class PostLike(models.Model):
    """This model represents an user like in a post"""
    post = models.ForeignKey(Post, related_name='likes', on_delete=models.CASCADE)
    user = models.CharField(max_length=60, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        app_label = 'core'
        unique_together = ['post', 'user']

    def __str__(self):
        return '@{0} liked post "{1}"'.format(self.user, self.post.title)

    def user_liked_post(self, user, post_id):
        return PostLike.objects.filter(user=user, post_id=post_id).exists()


class AnswerLike(models.Model):
    """This model represents an user like in an answer"""
    answer = models.ForeignKey(Answer, related_name='likes', on_delete=models.CASCADE)
    user = models.CharField(max_length=60, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        app_label = 'core'
        unique_together = ['answer', 'user']

    def __str__(self):
        return '@{0} liked answer "{1}"'.format(self.user, self.answer.text)

    def user_liked_answer(self, user, answer_id):
        return AnswerLike.objects.filter(user=user, answer_id=answer_id).exists()
