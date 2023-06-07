from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.db.models import Q 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

# Create your views here.



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # token['password'] = user.password
        # ...

        return token


class MyTokenObtainPairVew(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

def index(request):
    return render(request, 'index.html')


class CarouselListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Carousel.objects.all()
    serializer_class = CarouselSerializer


class CategoryListView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class MoviesListView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def get(self, request, *args, **kwargs):
        category = request.GET.get('category', None)
        movie_id = request.GET.get('movie-id', None)
        query = request.GET.get('q', None)

        if query:
            self.queryset = Movie.objects.filter(Q(title_rus__contains=query)|
                                                 Q(title_original__contains=query) | 
                                                 Q(title_eng__contains=query) |
                                                 Q(title_rus__contains=query.capitalize()) |
                                                 Q(title_original__contains=query.capitalize()) | 
                                                 Q(title_eng__contains=query.capitalize()))

            return Response(self.serializer_class(self.queryset, many=True).data)

        if category == '3d':
            self.queryset = self.queryset.filter(category__name='3D')
            return Response(self.serializer_class(self.queryset, many=True).data)
        elif category == 'all':
            self.queryset = Movie.objects.all()
            return Response(self.serializer_class(self.queryset, many=True).data)
        elif category == 'ova':
            self.queryset = self.queryset.filter(category__name=category.upper())
            return Response(self.serializer_class(self.queryset, many=True).data)
        elif category:
            self.queryset = self.queryset.filter(category__name=category.capitalize())
            return Response(self.serializer_class(self.queryset, many=True).data)
        elif movie_id:
            self.queryset = self.queryset.filter(id=movie_id)
            return Response(self.serializer_class(self.queryset, many=True).data)
        else:
            return Response({'found': False})



class CollectionListView(generics.ListAPIView):
    queryset = Collections.objects.all()
    serializer_class = CollectionSerializer

