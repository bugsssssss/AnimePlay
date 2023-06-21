from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.db.models import Q, Avg
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        queryset = User.objects.all()
        username = request.GET.get('username', None)

        if username:
            queryset = User.objects.filter(
                Q(username__contains=username) |
                Q(username__contains=username.lower()) |
                Q(username__contains=username.upper()) |
                Q(username__contains=username.capitalize())
            )

        return Response(self.serializer_class(queryset, many=True).data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['id'] = user.id
        token['is_admin'] = user.is_superuser
        token['picture'] = user.picture.url
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

    # def post(self, request):
    #     bot.send_message('New anime')

    def get(self, request, *args, **kwargs):
        category = request.GET.get('category', None)
        movie_id = request.GET.get('movie-id', None)
        query = request.GET.get('q', None)

        if query:
            self.queryset = Movie.objects.filter(Q(title_rus__contains=query) |
                                                 Q(title_original__contains=query) |
                                                 Q(title_eng__contains=query) |
                                                 Q(title_rus__contains=query.capitalize()) |
                                                 Q(title_original__contains=query.capitalize()) |
                                                 Q(title_eng__contains=query.capitalize()))

            return Response(self.serializer_class(self.queryset, many=True).data)

        if category == 'all':
            self.queryset = Movie.objects.all()
            return Response(self.serializer_class(self.queryset, many=True).data)
        if category:
            self.queryset = self.queryset.filter(
                Q(category__name=category.capitalize()) |
                Q(category__name=category.lower()) |
                Q(category__name=category) |
                Q(category__name=category.upper()))
            return Response(self.serializer_class(self.queryset, many=True).data)
        elif movie_id:
            self.queryset = self.queryset.filter(id=movie_id)
            return Response(self.serializer_class(self.queryset, many=True).data)
        else:
            return Response({'found': False})


class CollectionListView(generics.ListAPIView):
    queryset = Collections.objects.all()
    serializer_class = CollectionSerializer



class CollectionApiView(APIView):
    def get(self, request):
        user = request.GET.get('user', None)
        collection = request.GET.get('collection')
        name = request.GET.get('name')
        delete = request.GET.get('delete')
        movies = request.GET.get('movies')
        position = request.GET.get('position')

        if movies and name and position and user:
            arr = movies.split(',')
            instance = Collections(name=name, position=position, author=User.objects.get(id=user))
            instance.save()
            # try:
            movies_models = [int(x) for x in arr]
            instance.movies.set(movies_models)
            instance.save()
            return Response('Saved')
            # except: 
            #     return Response('Not found')


        if delete:
            try:
                instance = Collections.objects.get(id=delete)
                instance.delete()
                return Response('Deleted!')
            except:
                return Response('Not found!')


        if collection and name:
            instance = Collections.objects.get(id=collection)
            instance.name = name 
            instance.save()
            return Response('Success!')

        if user:
            queryset = Collections.objects.all() if user =='all' else Collections.objects.filter(author__id=user)

            return Response([{
                'id': x.id,
                'name': x.name,
                'auhtor': {'id': x.author.id,'username':x.author.username,'picture': x.author.picture.url},
                'movies': [{'id': i.id,'title': i.title_eng, 'picture': i.picture.url} for i in x.movies.all()],
                'created': f'{str(x.created)[11:19]} {str(x.created)[:10]}'
                } for x in queryset])


class NewsListView(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer



class NewsApiView(APIView):

    def get(self, request):
        author = request.GET.get('author', None)
        delete = request.GET.get('delete', None)
        edit = request.GET.get('edit', None)
        intro = request.GET.get('intro', None)
        title = request.GET.get('title', None)
        picture = request.GET.get('picture', None)

        if edit and intro and title and picture:
            try:
                instance = News.objects.get(id=edit)
                instance.intro = intro
                instance.title = title
                instance.picture = picture
                instance.save()
                return Response(True)
            except:
                return Response(False)

        if delete:
            try:
                instance = News.objects.get(id=delete)
                instance.delete()
                return Response('Deleted')
            except:
                return Response('Not found')

        if author:
            if author == 'all':
                queryset = News.objects.all()
            else:
                queryset = News.objects.filter(author_id=author)

            if queryset:
                return Response(NewsSerializer(queryset, many=True).data)
            else: 
                return Response(False)



class HistoyUpdate(APIView):

    def post(self, request):
        movie = request.data['movie']
        username = request.data['username']
        user = User.objects.filter(username=username)[0]
        user.history.add(movie)
        user.save()
        return Response({'message': 'success'})


class FeedbackListView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

    

    def get(self, request, *args, **kwargs):
        username = request.GET.get('username', None)
        delete = request.GET.get('delete', None)

        if delete:
            instance = Feedback.objects.get(id=delete)
            instance.delete()
            print('delete')
            return Response('Has been deleted')

        if username:
            queryset = Feedback.objects.filter(username=usernames)
            if queryset:
                return Response(self.serializer_class(queryset, many=True).data)
            else:
                return Response({'not found'})

        else:
            return Response(self.serializer_class(Feedback.objects.all(), many=True).data)


class MyFeedbacks(APIView):

    def get(self, request):
        username = request.GET.get('username', None)
        status = request.GET.get('status', None)
        pk = request.GET.get('id', None)
        response = request.GET.get('response', None)


        if pk and response:
            instance = Feedback.objects.get(id=pk)
            instance.response = response
            instance.status = 'answered'
            instance.save()
            return Response({'success'})

        if username == 'all' and status == 'all':
            queryset = Feedback.objects.all()
            return Response(FeedbackSerializer(queryset, many=True).data)
        elif username == 'all' and status:
            queryset = Feedback.objects.filter(status=status)
            return Response(FeedbackSerializer(queryset, many=True).data)

        if username and status:
            queryset = Feedback.objects.filter(
                Q(username=username) & Q(status=status))
            return Response(FeedbackSerializer(queryset, many=True).data)




class ReviewApiView(APIView):

    def get(self, request):
        queryset = Review.objects.all()
        movie = request.GET.get('movie', None)
        text = request.GET.get('text', None)
        author = request.GET.get('author', None)
        review = request.GET.get('review', None)
        like = request.GET.get('like', None)
        dislike = request.GET.get('dislike', None)
        delete = request.GET.get('delete', None)

        if delete:
            instance = Review.objects.get(id=delete)

            if instance:
                instance.delete()
                return Response('Deleted successfully')
            else:
                return Response(False)

        if review and like:
            instance = Review.objects.get(id=review)
            instance.likes += 1
            instance.save()
            return Response('success')
        elif review and dislike:
            instance = Review.objects.get(id=review)
            instance.dislikes += 1
            instance.save()
            return Response('success')

        if movie and text and author:
            instance = Review(author=User.objects.get(
                id=author), movie=Movie.objects.get(id=movie), text=text)
            instance.save()
            print(instance)
            return Response('succesfully created')

        if movie:
            queryset = Review.objects.filter(movie__id=movie)

        if author:
            if author == 'all':
                queryset = Review.objects.all()
            else:
                queryset = Review.objects.filter(author__id=author)
            return Response(
                [
                    {
                        'id': x.id,
                        'author': {
                            'id': x.author.id,
                            'username': x.author.username,
                            'picture': x.author.picture.url,
                            'is_admin': x.author.is_superuser},
                        'movie': {
                            'id': x.movie.id,
                            'title': x.movie.title_eng,
                            'picture': x.movie.picture.url},
                        'text': x.text,
                        'likes': x.likes,
                        'dislikes': x.dislikes,
                        'created': f'{str(x.created)[11:19]} {str(x.created)[:10]}'}
                    for x in queryset])

        return Response(
            [
                {
                    'id': x.id,
                    'author': {
                        'id': x.author.id,
                        'username': x.author.username,
                        'picture': x.author.picture.url,
                        'is_admin': x.author.is_superuser},
                    'movie': x.movie.id,
                    'text': x.text,
                    'likes': x.likes,
                    'dislikes': x.dislikes,
                    'created': f'{str(x.created)[11:19]} {str(x.created)[:10]}'}
                for x in queryset])


class RepliesApiView(APIView):

    def get(self, request):
        queryset = Replies.objects.all()
        review = request.GET.get('review', None)
        text = request.GET.get('text', None)
        author = request.GET.get('author', None)
        delete = request.GET.get('delete', None)

        if delete:
            instance = Replies.objects.get(id=delete)

            if instance:
                instance.delete()
                return Response('Deleted successfully!')
            else:
                return Response(False)

        if review and text and author:
            instance = Replies(review=Review.objects.get(
                id=review), author=User.objects.get(id=author), text=text)
            instance.save()
            return Response('Reply has been saved')

        return Response(
            [
                {
                    'id': x.id,
                    'author': {
                        'id': x.author.id,
                        'username': x.author.username,
                        'picture': x.author.picture.url,
                        'is_admin': x.author.is_superuser
                    },
                    'review': x.review.id,
                    'text': x.text,
                    'created': f'{str(x.created)[11:19]} {str(x.created)[:10]}'}
                for x in queryset])


class RatingApiView(APIView):

    def get(self, request):
        queryset = Rating.objects.all()
        user = request.GET.get('user', None)
        movie = request.GET.get('movie', None)
        stars = request.GET.get('stars', None)

        if user and movie and stars:
            instance = Rating(user=User.objects.get(
                id=user), movie=Movie.objects.get(id=movie), stars=int(stars))
            instance.save()
            return Response('Rating has been saved')
        elif movie:
            try:
                instance = Rating.objects.filter(movie__id=movie)
            except:
                return Response({'rating': 0})
            if instance:
                average_value = instance.aggregate(
                    avg_field=Avg('stars'))['avg_field']
                user_and_rating = [
                    {
                        'user': x.user.id,
                        'rating': x.stars
                    }
                    for x in instance]
                users = [x.user.id for x in instance]
                return Response(
                    {
                        'rating': str(average_value)[:4],
                        'data': user_and_rating,
                        'users': set(users)
                    })
            else:
                return Response({'rating': 0})

        return Response(
            [
                {
                    'user': x.user.id,
                    'movie': x.movie.id,
                    'stars': x.stars,
                    'created': f'{str(x.created)[11:19]} {str(x.created)[:10]}'}
                for x in queryset])
