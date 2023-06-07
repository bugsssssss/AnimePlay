import requests
from bs4 import BeautifulSoup as bs
import json



def get_data(url):
    response = requests.get(url).text
    parsed = bs(response)
    items = parsed.find_all('a', {'class': 'poster-item'})
    result = []
    for item in items:
        # print(item)
        # print('-------')
        item_data = {
            'title_rus': item.find('div', {'class': 'poster-item__title'}).text,
            'episodes': item.find('div', {'class': 'poster-item__label'}).text.split('В')[0],
            'rating': item.find('div', {'class': 'poster-item__rating'}).text[1:],
            'year': item.find('div', {'class': 'poster-item__meta'}).text.split('-')[0][:-1],
            'category': item.find('div', {'class': 'poster-item__meta'}).text.split('-')[1][1:],
        }
        result.append(item_data)


    with open('api/animego.json', 'w', encoding='UTF-8') as file:
        data = json.dumps(result,indent=3, ensure_ascii=False)
        file.write(data)



get_data('https://animego.online/1top100/')