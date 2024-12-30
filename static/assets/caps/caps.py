import requests
import json
import os
from PIL import Image

BASE_URL = 'https://crowncaps.info/data/catalog/caps/'


def fetch_cap(cap_id):
    response = requests.get(f'{BASE_URL}{cap_id}')
    response.raise_for_status()
    return response.json()


def get_cap_ids():
    i = 0
    for filename in os.listdir('cropped'):
        if not filename.endswith('.jpg'):
            continue
        cap_id = filename.split('.')[0]
        if '_' in cap_id:
            continue

        yield cap_id


def fetch_all_caps():
    with open('caps_fetched.json', 'w', encoding='utf-8') as f:
        caps = {}
        for cap_id in get_cap_ids():
            print(f'Fetching cap {cap_id}')
            try:
                search_id = cap_id
                if '-' in search_id:
                    search_id = cap_id.split('-')[0]
                cap = fetch_cap(search_id)
                caps[cap_id] = cap
            except Exception as e:
                print(f'Failed to fetch cap {cap_id}: {e}')
        json.dump(caps, f, indent=2, ensure_ascii=False)


def get_cap_name(cap):
    name = ''
    if 'brands' in cap and cap['brands']:
        name = cap['brands'][0]['name']
    elif 'info' in cap and 'Brand:' in cap['info']:
        name = cap['info'].split('Brand:')[1].split(' ')[1]
    elif 'description' in cap:
        name = cap['description']
    return name


def clean_data():
    print('Cleaning data')

    with open('caps_fetched.json', 'r', encoding='utf-8') as f:
        caps = json.load(f)
    with open('manual_overrides.json', 'r', encoding='utf-8') as f:
        manual_overrides = json.load(f)

    for cap_id, cap in caps.items():
        caps[cap_id] = {
            "id": cap_id.split('-')[0],
            'country': cap['country']['name'] if 'country' in cap else '',
            # 'description': cap['description'].replace('\n', ' ') if 'description' in cap else '',
            # 'info': cap['info'] if 'info' in cap else '',
            'name': get_cap_name(cap),
        }
        if cap_id not in manual_overrides:
            continue

        for key, value in manual_overrides[cap_id].items():
            caps[cap_id][key] = value

    caps = dict(sorted(caps.items(), key=lambda x: x[1]['name']))

    print('Data cleaned. Saving to caps.json')

    with open('caps.json', 'w', encoding='utf-8') as f:
        json.dump(caps, f, indent=2, ensure_ascii=False)

    print('Data saved')


def rescale_images():
    print('Rescaling images')
    for filename in os.listdir('cropped'):
        if not filename.endswith('.jpg'):
            continue
        cap_id = filename.split('.')[0]
        if '_' in cap_id:
            continue

        img = Image.open(f'cropped/{filename}')
        img = img.resize((256, 256))
        img.save(f"small/{filename}")


if __name__ == '__main__':
    print('Enter the function you want to run:')
    print('1. re-fetch cap data')
    print('2. clean data')
    print('3. rescale images')

    choice = input()

    match choice:
        case '1':
            fetch_all_caps()
        case '2':
            clean_data()
        case '3':
            rescale_images()
        case _:
            print('Invalid choice')
            exit()
