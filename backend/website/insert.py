import django
import os 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'website.settings')
django.setup()
from mainapp.models import Movie, Category, User
import json
import datetime

with open('../api/animego.json', 'r') as file:
    data = json.load(file)
    print(data)

for i in data:
    sample = {
        'title_original': i['title_rus'],
        'title_rus':  i['title_rus'],
        'title_eng': i['title_rus'],
        'released': '',
        'country': 'Japan',
        'category': '',
        # 'genres': 'Anime',
        'author': 'User',
        'ratingIMDB': i['rating'],
        'status': 'published',
    }

    try: 
        sample['released'] = i['year']
    except:
        sample['released'] = ''

    if i['category'] == 'TV Сериал':
        sample['category'] = 'Series'
    elif i['category'] == 'Фильм':
        sample['category'] = 'OVA'
    elif i['category'] == 'ONA':
        sample['category'] == 'Series'


    try:
        category_instance = Category.objects.get(name=sample['category'])
    except:
        # Handle the case when the category does not exist
        category_instance = None

    try:
        user_instance = User.objects.get(username=sample['author'])
    except User.DoesNotExist:
        # Handle the case when the user does not exist
        user_instance = None

    # Assign the user instance to the sample dictionary
    sample['author'] = user_instance

    sample['category'] = category_instance
    new = Movie(**sample).save()


print(data)