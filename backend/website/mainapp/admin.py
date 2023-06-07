from django.contrib import admin
from .models import *
# Register your models here.
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


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'username',
        'phone_number',
        'id',
        'created'
    ]



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
