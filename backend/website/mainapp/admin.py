from django.contrib import admin
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.admin.models import LogEntry, ADDITION, CHANGE, DELETION
# Register your models here.



@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        'username',
        'phone_number',
        'id',
        'created'
    ]


@admin.register(Carousel)
class CarouselAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'movie',
        'created',
        'updated'
        )


@admin.register(Permissions)
class PermissionsAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ['user_type']



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'id',
        'created',
        'updated'
    ]


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'created',
        'updated'
    ]


@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = [
        'full_name',
        'created',
        'updated'
    ]


@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    list_display = [
        'full_name',
        'created',
        'updated'
    ]


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = [
        'title_rus',
        'id',
        'age',
        'author',
        'age',
        'quality',
        'created',
        'updated'
    ]


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = [
        'user',
        'movie',
        'problem_type'
    ]


@admin.register(Collections)
class CollectionsAdmin(admin.ModelAdmin):
    list_display = [
        'name',
    ]


@admin.register(Forum)
class ForumAdmin(admin.ModelAdmin):
    list_display = ['title']


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['username', 'user', 'subject', 'status','created']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['author', 'movie','created']


@admin.register(Replies)
class RepliesAdmin(admin.ModelAdmin):
    list_display = ['text', 'review', 'created']


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ['user', 'movie', 'created']



@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['id','intro','time' ]


@admin.register(NewsComment)
class NewsCommentAdmin(admin.ModelAdmin):
    list_display = ['news', 'author', 'created']


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'sender','text']
