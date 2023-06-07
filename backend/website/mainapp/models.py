from django.db import models
import random
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import AbstractUser


class Permissions(models.Model):
    name = models.CharField(("name"), max_length=100)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)    


class Role(models.Model):
    user_type = models.CharField(("Type"), max_length=100)
    permissions = models.ManyToManyField("mainapp.Permissions", verbose_name=("Permissions"),blank=True, null=True)
    info = models.TextField(("Info"),blank=True, null=True)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)

    
    def __str__(self) -> str:
        return self.user_type
    

    class Meta:
        verbose_name = 'Role'
        verbose_name_plural = 'Roles'


class User(models.Model):
    name = models.CharField(("name"), max_length=254)
    username = models.CharField(("username"), max_length=255, unique=True)
    email = models.EmailField(("email"), max_length=254, unique=True)
    picture = models.ImageField(("profile picture"), upload_to=f'user/{name}', height_field=None, width_field=None, max_length=None, default=f'../static/profile_pictures/{random.randint(1, 12)}.png')
    phone_number = models.CharField(("phone"), max_length=15)
    date_of_birth = models.DateField(("date of birth"), auto_now=False, auto_now_add=False)
    balance = models.IntegerField(("balance"),blank=True, null=True)
    carma = models.IntegerField(("carma"),blank=True, null=True)
    about = models.TextField(("about"),blank=True, null=True)
    history = models.ManyToManyField("mainapp.Movie", verbose_name=("history"),blank=True, null=True)
    # following = models.ManyToManyField("mainapp.User", verbose_name=("following"),blank=True, null=True)
    # followers = models.ManyToManyField("mainapp.User", verbose_name=("followers"),blank=True, null=True)
    logged = models.DateTimeField(("last seen"), auto_now=True, auto_now_add=False)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateTimeField(("updated"), auto_now=True, auto_now_add=False)
    
    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class Category(models.Model):
    name = models.CharField(("name"), max_length=100)
    picture = models.ImageField(("category picture"), upload_to='categories', height_field=None, width_field=None, max_length=None, null=True, blank=True)
    info = models.TextField(("category info"), blank=True, null=True)
    position = models.IntegerField(("position"), default=20)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['position']


class Genre(models.Model):
    name = models.CharField(("genre"), max_length=200)
    info = models.TextField(("info"), blank=True, null=True)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)


    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = 'Genre'
        verbose_name_plural = 'Genres'

class Actor(models.Model):
    full_name = models.CharField(("full name"), max_length=255)
    movies = models.ManyToManyField("mainapp.Movie", verbose_name=("movies"), blank=True, null=True)
    picture = models.ImageField(("actor picture"), upload_to='actors', height_field=None, width_field=None, max_length=None, null=True, blank=True)
    info = models.TextField(("actor info"), null=True, blank=True)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)

    def __str__(self) -> str:
        return self.full_name
    
    class Meta:
        verbose_name = 'Actor'
        verbose_name_plural = 'Actors'

class Director(models.Model):
    full_name = models.CharField(("full name"), max_length=255)
    movies = models.ManyToManyField("mainapp.Movie", verbose_name=("movies"),blank=True, null=True)
    picture = models.ImageField(("actor picture"), upload_to='directors', height_field=None, width_field=None, max_length=None, null=True, blank=True)
    info = models.TextField(("actor info"), null=True, blank=True)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)

    def __str__(self) -> str:
        return self.full_name
    
    class Meta:
        verbose_name = 'Director'
        verbose_name_plural = 'Directors'

class Movie(models.Model):

    status_choises = {
        ('Published', 'published'),
        ('Not released', 'not released'),
        ('Canceled', 'canceled')
    }

    quality_choices = {
        ('FullHD', 'fullhd'),
        ('HD', 'hd'),
        ('SD', 'sd')
    }
    title_original = models.CharField(("original title"), max_length=255)
    title_rus = models.CharField(("russian title"), max_length=255,blank=True, null=True)
    title_eng = models.CharField(("english title"), max_length=255, blank=True, null=True)
    released = models.CharField('released year', max_length=4)
    picture = models.ImageField(("picture"), upload_to=f'movies/pictures', default='movies/pictures/poster.jpg')
    country = models.CharField(("country"), max_length=255, blank=True, null=True)
    category = models.ForeignKey('mainapp.Category', related_name='category', on_delete=models.CASCADE, blank=True, null=True)
    genres = models.ManyToManyField("mainapp.Genre", verbose_name=("genres"),blank=True, null=True)
    directors = models.ManyToManyField("mainapp.Director", verbose_name=("director"), blank=True, null=True)
    actors = models.ManyToManyField("mainapp.Actor", verbose_name=("actors"),blank=True, null=True)
    age = models.IntegerField(("age"), default=16)
    description = models.TextField(("description"),blank=True, null=True)
    author = models.ForeignKey("mainapp.User", verbose_name=("author"), on_delete=models.CASCADE)
    quality = models.CharField(("quality"), max_length=50, choices=quality_choices, default='SD')
    budget = models.IntegerField(("budget"),blank=True, null=True)
    ratingIMDB = models.FloatField(("rating IMDB"),blank=True, null=True)
    ratingKP = models.FloatField(("rating KP"),blank=True, null=True)
    status = models.CharField(("status"), max_length=50, choices=status_choises, default='Not released')
    manga = models.URLField(("manga url"), max_length=200, blank=True, null=True)
    file = models.FileField(("file"), upload_to=f'movies/videos', max_length=100,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])], blank=True, null=True)

    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)

    def __str__(self) -> str:
        return self.title_original
    
    class Meta:
            verbose_name = 'Movie'
            verbose_name_plural = 'Movies'



class Collections(models.Model):
    name = models.CharField(("name"), max_length=255)
    movies = models.ManyToManyField("mainapp.Movie", verbose_name=("movies"),blank=True, null=True)
    info = models.TextField(("info"), blank=True, null=True)


    class Meta:
        verbose_name = 'Collection'
        verbose_name_plural = 'Collections'


    def __str__(self):
        return self.name


class Carousel(models.Model):
    image = models.ImageField(upload_to='carousel')
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField('description',blank=True, null=True)
    position = models.IntegerField('position', default=10, blank=True, null=True)
    movie = models.ForeignKey("mainapp.Movie", verbose_name=("movie"), on_delete=models.CASCADE, blank=True, null=True)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)

    class Meta:
        verbose_name = 'Carousel'
        verbose_name_plural = 'Carousels'
        ordering = ['position']
    
    def __str__(self):
        if self.title:
            return self.title
        else:
            return f'{self.id}'
    


class Ticket(models.Model):

    problem_choices = {
        ('quality', 'quality'),
        ('loading', 'loading'),
        ('error', 'error'),
        ('disinformation', 'disinformation'),
        ('unacceptable content', 'unacceptable content'),
        ('other', 'other')
    }

    movie = models.ForeignKey("mainapp.Movie", verbose_name=("movie"), on_delete=models.CASCADE)
    user = models.ForeignKey("mainapp.User", verbose_name=("user"), on_delete=models.CASCADE)
    problem_type = models.CharField(("problem type"), max_length=200, choices=problem_choices)
    problem_text = models.TextField(("problem text"))