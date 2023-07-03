from django.urls import path, re_path
from .views import *
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairVew


urlpatterns = [
    path('', index, name='index'),
    path('/token/', MyTokenObtainPairVew.as_view(), name='token_obtain_pair'),
    path('/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('/carousel/', CarouselListView.as_view(), name='carousel'),
    path('/category/', CategoryListView.as_view(), name='category'),
    path('/movies/', MoviesListView.as_view(), name='movies'),
    path('/collections/', CollectionListView.as_view(), name='collections'),
    path('/collections-detail/', CollectionApiView.as_view(), name='collections-detail'),
    path('/users/', UserListView.as_view(), name='users'),
    path('/users-detail/', UserDetailApiView.as_view(), name='users-detail'),
    path('/news/', NewsListView.as_view(), name='news'),
    path('/history/', HistoyUpdate.as_view(), name='history'),
    path('/feedbacks/', FeedbackListView.as_view(), name='feedbacks'),
    path('/myfeedbacks/', MyFeedbacks.as_view(), name='my_feedbacks'),
    path('/reviews/', ReviewApiView.as_view(), name='reviews'),
    path('/replies/', RepliesApiView.as_view(), name='replies'),
    path('/rating/', RatingApiView.as_view(), name='rating'),
    path('/news-detail/', NewsApiView.as_view(), name='news-detail'),
    path('/news-comments/', NewsCommentApiView.as_view(), name='news-comments'),
    path('/user-update/<int:pk>/', UserUpdateView.as_view(), name='user-update'),
    path('/messages/', MessageCreateApiView.as_view(), name='messages'),
    path('/chat/', ChatApiView.as_view(), name='chat'),
    path('/movie-add/', MovieCreateView.as_view(), name='add'),
    path('/favourites-add/', Favourite.as_view(), name='favorite'),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
