from django.db import models


class Post(models.Model):
    '''
    This model represents a post
    '''
    class Meta:
        app_label = 'core'


    title = models.CharField(max_length=60, blank=False, null=False)
    text = models.CharField(max_length=600, blank=False, null=False)
    user = models.CharField(max_length=60, blank=False, null=False)
    like = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return '{0}, posted at {1}'.format(self.title, self.created_at)


class Answer(models.Model):
    '''
    This model represents an answer of a post
    '''

    class Meta:
        app_label = 'core'

    post = models.ForeignKey(Post, related_name='answers', on_delete=models.CASCADE)
    text = models.CharField(max_length=600, blank=False, null=False)
    user = models.CharField(max_length=60, blank=False, null=False)
    like = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return '{0}, posted at {1}'.format(self.text, self.created_at)
