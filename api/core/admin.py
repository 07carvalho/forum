from django.contrib import admin
from core.models.post import *

@admin.register(Post, Answer)

class CoreAdmin(admin.ModelAdmin):
    pass