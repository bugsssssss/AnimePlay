from django.db import models
import random
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser, Group, Permission


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


usernames = [
    'Ichigo Kurosaki',
    'Naruto Uzumaki',
    'Lelouch Lamperouge',
    'Goku Son',
    'Light Yagami',
    'Levi Ackerman',
    'Edward Elric',
    'Monkey D. Luffy', 
    'Mikasa Ackerman',
    'Sakura Haruno',
    'Killua Zoldyck',
    'Eren Yeager',
    'Hinata Hyuga',
    'Erza Scarlet',
    'Saitama',
    'Rukia Kuchiki',
    'Natsu Dragneel',
    'Rei Ayanami',
    'Shoto Todoroki',
    'Kaneki Ken',
    'Gon Freecss',
    'Asuna Yuuki',
    'Yuno Gasai',
    'Itachi Uchiha',
    'Shinya Kogami',
    'Kagome Higurashi',
    'Vegeta',
    'Mikasa Ackerman',
    'Riza Hawkeye',
    'Koro-sensei',
    'Roronoa Zoro',
    'Kanade Tachibana',
    'Roy Mustang',
    'Jotaro Kujo',
    'Rias Gremory',
    'Saber',
    'Gray Fullbuster',
    'Inuyasha',
    'Maka Albarn',
    'Holo',
]


class User(AbstractUser):
    name = models.CharField(("name"), max_length=254, default=usernames[random.randint(1, 39)]) 
    username = models.CharField(("username"), max_length=255, unique=True)
    email = models.EmailField(("email"), max_length=254, unique=True)
    picture = models.ImageField(("profile picture"), upload_to=f'user', height_field=None, width_field=None, max_length=None, default=f'profile_picture/{random.randint(1, 12)}.jpg')
    phone_number = models.CharField(("phone"), max_length=15, null=True, blank=True, default='undefined')
    date_of_birth = models.DateField(("date of birth"), auto_now=False, auto_now_add=True)
    balance = models.IntegerField(("balance"),blank=True, null=True)
    carma = models.IntegerField(("carma"),blank=True, null=True)
    about = models.TextField(("about"),blank=True, null=True)
    history = models.ManyToManyField("mainapp.Movie", verbose_name=("history"),blank=True, null=True)
    following = models.ManyToManyField("self", verbose_name=("following"), blank=True, null=True, related_name="following")
    followers = models.ManyToManyField("self", verbose_name=("followers"), blank=True, null=True, related_name="followers")
    logged = models.DateTimeField(("last seen"), auto_now=True, auto_now_add=False)
    favourites = models.ManyToManyField("self", verbose_name=("favourites"), blank=True, null=True, related_name="favourites")
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateTimeField(("updated"), auto_now=True, auto_now_add=False)
    groups = models.ManyToManyField(Group, verbose_name=("groups"), blank=True, related_name="User")

    # Add related_name to user_permissions field
    user_permissions = models.ManyToManyField(Permission, verbose_name=("user permissions"), blank=True, related_name="User")


    def __str__(self) -> str:
        return self.name
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created']

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

class Replies(models.Model):
    review = models.ForeignKey("mainapp.Review", verbose_name=("review"), on_delete=models.CASCADE)
    author = models.ForeignKey("mainapp.User", verbose_name=("author"), on_delete=models.CASCADE)
    text = models.TextField(("text"))
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    likes = models.IntegerField(("likes"), default=0)
    dislikes = models.IntegerField(("dislikes"), default=0)
    class Meta:
        verbose_name = 'Reply'
        verbose_name_plural = 'Replies'

class Review(models.Model):
    author = models.ForeignKey("mainapp.User", verbose_name=("author"), on_delete=models.CASCADE)
    movie = models.ForeignKey("mainapp.Movie", verbose_name=("movie"), on_delete=models.CASCADE)
    text = models.TextField(("text"))
    likes = models.IntegerField(("likes"), default=0)
    dislikes = models.IntegerField(("dislikes"), default=0)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)


    class Meta:
        verbose_name = ("Review")
        verbose_name_plural = ("Reviews")
        ordering = ['-created']

    def __str__(self):
        return self.text
    


class Rating(models.Model):
    user = models.ForeignKey("mainapp.User", verbose_name=("user"), on_delete=models.CASCADE)
    movie = models.ForeignKey("mainapp.Movie", verbose_name=("movie"), on_delete=models.CASCADE)
    stars = models.IntegerField(("stars"))
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = ("Rating")
        verbose_name_plural = ("Ratings")
        ordering = ['-created']

    def __str__(self):
        return self.user.username
    

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
    ratingAP = models.FloatField(("rating AnimePlay"), blank=True)
    status = models.CharField(("status"), max_length=50, choices=status_choises, default='Not released')
    manga = models.URLField(("manga url"), max_length=200, blank=True, null=True)
    file = models.FileField(("file"), upload_to=f'movies/videos', max_length=100,validators=[FileExtensionValidator(allowed_extensions=['MOV','avi','mp4','webm','mkv'])], blank=True, null=True)



    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    updated = models.DateField('updated', auto_now=True)

    def __str__(self) -> str:
        return self.title_eng
    
    class Meta:
            verbose_name = 'Movie'
            verbose_name_plural = 'Movies'



class Collections(models.Model):
    name = models.CharField(("name"), max_length=255)
    author = models.ForeignKey("mainapp.User", verbose_name=("author"), on_delete=models.CASCADE)
    movies = models.ManyToManyField("mainapp.Movie", verbose_name=("movies"),blank=True, null=True)
    info = models.TextField(("info"), blank=True, null=True)
    position = models.IntegerField(("position"), default=10)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)


    class Meta:
        verbose_name = 'Collection'
        verbose_name_plural = 'Collections'
        ordering = ['position']


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


class Feedback(models.Model):
    status_choices = {
        ('opened', 'Opened'),
        ('answered', 'Answered')
    }
    user = models.ForeignKey("mainapp.User", verbose_name=("user"), on_delete=models.CASCADE)
    username = models.CharField(("username"), max_length=200)
    subject = models.CharField(("subject"), max_length=200)
    text = models.TextField(("text"))
    response = models.TextField(("response"), default='')
    status = models.CharField(("status"), max_length=200, choices=status_choices, default='opened')
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)

    class Meta:
        ordering = ['-created']


class News(models.Model): 
    intro = models.TextField(("title"), default='undefined')
    title = models.TextField(("title"), default='undefined')
    picture = models.CharField(("picture"), max_length=100, blank=True)
    author = models.ForeignKey("mainapp.User", verbose_name=("author"), on_delete=models.CASCADE)
    time = models.CharField(("time"), max_length=100)


    class Meta:
        verbose_name = 'News'
        verbose_name_plural = 'News'
        ordering = ['-id']
    
    def __str__(self):
        return self.intro
    



from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(username=username)
            # print(user.password)
        except User.DoesNotExist:
            return None
        if password == user.password:
            return user
        # if user.check_password(password):
        #     return user
        
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None


class NewsComment(models.Model):

    news = models.ForeignKey("mainapp.News", verbose_name=("news"), on_delete=models.CASCADE)
    author = models.ForeignKey("mainapp.User", verbose_name=("author"), on_delete=models.CASCADE)
    text = models.TextField(("text"))
    likes = models.IntegerField(("likes"), default=0)
    dislikes = models.IntegerField(("dislikes"), default=0)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    

    class Meta:
        verbose_name = ("NewsComment")
        verbose_name_plural = ("NewsComments")

    def __str__(self):
        return self.text



class Message(models.Model): 
    from_who = models.ManyToManyField("mainapp.User", verbose_name=("from_who"), blank=True, null=True, related_name="from_who")
    to_whom = models.ManyToManyField("mainapp.User", verbose_name=("to_whom"), blank=True, null=True, related_name="to_whom")
    text = models.TextField(("text"))
    has_seen = models.BooleanField(("has seen"), default=False)
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'
        ordering = ['-created']


class Forum(models.Model):
    title = models.CharField(("title"), max_length=200)
    picture = models.ImageField(("picture"), upload_to=None, height_field=None, width_field=None, max_length=None, null=True)
    participants = models.ManyToManyField("mainapp.User", verbose_name=("participants"))
    messages = models.ManyToManyField("mainapp.Message", verbose_name=("messages"))
    created = models.DateTimeField(("created"), auto_now=False, auto_now_add=True)
    last_message = models.DateTimeField(("last message"), auto_now=True, auto_now_add=False)


    class Meta:
        verbose_name = 'Forum'
        verbose_name_plural = 'Forums'


    def __str__(self):
        return self.title

