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
    path('/users/', UserListView.as_view(), name='users'),
    path('/news/', NewsListView.as_view(), name='news'),
    path('/history/', HistoyUpdate.as_view(), name='history'),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)