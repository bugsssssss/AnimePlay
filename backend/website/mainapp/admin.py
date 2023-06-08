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
