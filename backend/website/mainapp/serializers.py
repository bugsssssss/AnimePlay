from rest_framework import serializers
from .models import *


class CarouselSerializer(serializers.ModelSerializer):

    movie = serializers.SerializerMethodField()

    def get_movie(self, obj):
        return {
            'id': obj.movie.id,
            'title_original': obj.movie.title_original,
        }

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


    def get_category(self, obj):
        try:
            return obj.category.name
        except:
            return None

    def get_genres(self, obj):
        return obj.genres.all().values_list('name', flat=True)
    
    def get_directors(self, obj):
        return obj.directors.all().values_list('full_name', flat=True)
    

    def get_file(self, obj): 
        if obj.file:
            return f'http://127.0.0.1:8000/media/{obj.file}'
        else: 
            return ''
    

    class Meta:
        model = Movie
        fields = '__all__'

    



class CollectionSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True, read_only=True)

    class Meta:
        model = Collections
        fields = '__all__'