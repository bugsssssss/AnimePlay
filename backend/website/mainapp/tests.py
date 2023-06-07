from django.test import TestCase
import requests
# Create your tests here.

url = 'https://allplay.uz/anime'

def get_data(url):
    response = requests.get(url)
    print(response)


get_data(url)
