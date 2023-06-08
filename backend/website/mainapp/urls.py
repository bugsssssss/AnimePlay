from django.urls import path, re_path
from .views import * 
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import MyTokenObtainPairVew


urlpatterns = [
    path('', index, name='index'),
    path('api/token/', MyTokenObtainPairVew.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/carousel/', CarouselListView.as_view(), name='carousel'),
    path('api/category/', CategoryListView.as_view(), name='category'),
    path('api/movies/', MoviesListView.as_view(), name='movies'),
    path('api/collections/', CollectionListView.as_view(), name='collections'),
    path('api/users/', UserListView.as_view(), name='users'),
    path('api/news/', NewsListView.as_view(), name='news'),
    path('api/history/', HistoyUpdate.as_view(), name='history'),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)