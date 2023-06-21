from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()
    logged = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()
    date_joined = serializers.SerializerMethodField()

    def get_created(self, obj):
        return f' {str(obj.created)[:10]}'
    
    def get_logged(self, obj): 
        return f'{str(obj.logged)[:10]}'
    
    def get_updated(self, obj): 
        return f'{str(obj.updated)[:10]}'
    
    def get_date_joined(self, obj): 
        return f'{str(obj.date_joined)[:10]}'
    
    


    class Meta: 
        model = User
        fields = '__all__'

class CarouselSerializer(serializers.ModelSerializer):

    # movie = serializers.SerializerMethodField()

    # def get_movie(self, obj):
    #     return {
    #         'id': obj.movie.id,
    #         'title_original': obj.movie.title_original,
    #     }

    class Meta:
        model = Carousel
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id' ,
            'name',
            'picture',
            'info',
        ]


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class DirectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Director
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):

    category = serializers.SerializerMethodField()
    genres = serializers.SerializerMethodField()
    created = serializers.DateTimeField(format="%Y")
    directors = serializers.SerializerMethodField()
    file = serializers.SerializerMethodField()
    actors = serializers.SerializerMethodField()


    def get_category(self, obj):
        try:
            return obj.category.name
        except:
            return None

    def get_genres(self, obj):
        arr = [f'{i.name}' for i in obj.genres.all()]
        return arr
    
    def get_directors(self, obj):
        arr = [
            {
                'name': x.full_name,
                'movies': [
                    {   'id': i.id,
                        'title_original': i.title_original,
                        'title_rus': i.title_rus,
                        'title_eng': i.title_eng,
                        'picture': i.picture.url
                    } for i in x.movies.all()
                    ],
                'picture': 'http://127.0.0.1:8000' + x.picture.url if x.picture else 'http://127.0.0.1:8000/media/images/not-found.webp',
                'info': x.info
             } for x in obj.directors.all()
        ]   

        return arr

    

    def get_file(self, obj): 
        if obj.file:
            return f'http://127.0.0.1:8000/media/{obj.file}'
        else: 
            return ''
    
    def get_actors(self, obj): 
        arr = [{
            'name':x.full_name,
            'movies': [
                    {   'id': i.id,
                        'title_original': i.title_original,
                        'title_rus': i.title_rus,
                        'title_eng': i.title_eng,
                        'picture': i.picture.url
                    } for i in x.movies.all()
                    ],
            'picture': 'http://127.0.0.1:8000' + x.picture.url if x.picture else 'http://127.0.0.1:8000/media/images/not-found.webp',
            'info': x.info
                } for x in obj.actors.all()]
        return arr


    class Meta:
        model = Movie
        fields = '__all__'

    



class CollectionSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Collections
        fields = '__all__'



class NewsSerializer(serializers.ModelSerializer): 

    author = serializers.SerializerMethodField()

    def get_author(self, obj):
        return {'id': obj.author.id, 'username': obj.author.username}

    class Meta:
        model = News
        fields = '__all__'



class FeedbackSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    def get_created(self, obj):
        date = str(obj.created)[:10]
        time = str(obj.created)[11:19]
        newtime = int(time[:2])
        time = f'{newtime + 5}{time[2:9]}'
        return {
            'date': date,
            'time': time
        }
    
    
    def get_status(self, obj):
        instance = Feedback.objects.get(id=obj.id)
        if obj.response:
            instance.status = 'answered'
            instance.save()
            return obj.status
        
        else: 
            return obj.status

    class Meta:
        model = Feedback
        fields = '__all__'

    

class ReviewSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()

    def get_created(self, obj):
        date = str(obj.created)[:10]
        time = str(obj.created)[11:19]
        newtime = int(time[:2])
        time = f'{newtime + 5}{time[2:9]}'
        print(time)
        return {
            'date': date,
            'time': time
        }

    class Meta: 
        model = Review
        fields = '__all__'