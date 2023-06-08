import requests
from bs4 import BeautifulSoup as bs



def get_data(url):
    response = requests.get(url).text
    parsed = bs(response, 'html.parser')
    items = parsed.find_all('div', {'class': 'herald box news t-news'})
    arr = []
    for i in items:
        # print(i)
        # print('----------------')
        item_data = {
            'intro': i.find('span', {'class': 'intro'}).text,
            'title': i.find('span', {'class': 'full'}).text if i.find('span', {'class': 'full'}) else '',
            'picture': 'https://cdn.animenewsnetwork.com' + str(i.find('div', {'class': 'thumbnail'}).get('data-src')),
            'time': i.find('time').text,
        }
        arr.append(item_data)

    return arr

news = get_data('https://www.animenewsnetwork.com/news/')


def inserting(arr):
    for i in arr:
        data = i
        response = requests.post('http://127.0.0.1:8000/api/news/', data=data)
        print(response)

inserting(news)