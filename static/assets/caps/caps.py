import argparse
import requests
import json
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image

BASE_URL = 'https://crowncaps.info/data/catalog/caps/'

GREEN = '\033[32m'
RED = '\033[31m'
YELLOW = '\033[33m'
RESET = '\033[0m'

COUNTRY_NAME_OVERRIDES = {
    'Korea (South)': 'South Korea'
}


def fetch_cap(cap_id):
    return requests.get(f'{BASE_URL}{cap_id}', timeout=30)


def status_color(status):
    if 200 <= status < 300:
        return GREEN
    if 400 <= status < 600:
        return RED
    return YELLOW


def get_cap_ids():
    i = 0
    for filename in os.listdir('cropped'):
        if not filename.endswith('.jpg'):
            continue
        cap_id = filename.split('.')[0]
        if '_' in cap_id:
            continue

        yield cap_id


def get_search_id(cap_id):
    return cap_id.split('-')[0]


def load_fetched_caps():
    try:
        with open('caps_fetched.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def fetch_all_caps(force=False, threads=8):
    cap_ids = list(get_cap_ids())
    fetched_caps = {} if force else load_fetched_caps()
    caps = {cap_id: fetched_caps[cap_id] for cap_id in cap_ids if cap_id in fetched_caps}
    to_fetch = [cap_id for cap_id in cap_ids if cap_id not in caps]

    if caps:
        print(f'Skipping {len(caps)} already fetched caps')

    executor = ThreadPoolExecutor(max_workers=threads)
    try:
        futures = {executor.submit(fetch_cap, get_search_id(cap_id)): cap_id for cap_id in to_fetch}
        for future in as_completed(futures):
            cap_id = futures[future]
            try:
                response = future.result()
                if 200 <= response.status_code < 300:
                    caps[cap_id] = response.json()
            except Exception as e:
                print(f'{YELLOW}[ERR] {cap_id}: {e}{RESET}')
                continue
            print(f'{status_color(response.status_code)}[{response.status_code}] {cap_id}{RESET}')
    finally:
        executor.shutdown(cancel_futures=True)
        with open('caps_fetched.json', 'w', encoding='utf-8') as f:
            json.dump(caps, f, indent=2, ensure_ascii=False)


def get_name_from_info(info):
    split_brand_info = ' '.join(info.split('Brand:')[1].split(' ')[1:])
    return clean_newlines(split_brand_info)


def clean_newlines(text):
    return text.replace('\r', '\n').split('\n')[0]


def get_cap_name(cap):
    name = ''
    if 'brands' in cap and cap['brands']:
        name = cap['brands'][0]['name']
    elif 'info' in cap and 'Brand:' in cap['info']:
        name = get_name_from_info(cap['info'])
    elif 'description' in cap:
        name = clean_newlines(cap['description'])

    if 'Заjечарско' in name:
        # Replace latin 'j' with cyrillic 'ј'
        name = name.replace('Заjечарско', 'Зајечарско')

    return name.strip()


def clean_data():
    print('Cleaning data')

    with open('caps_fetched.json', 'r', encoding='utf-8') as f:
        caps_fetched = json.load(f)
    with open('manual_overrides.json', 'r', encoding='utf-8') as f:
        manual_overrides = json.load(f)
    
    caps = {}

    for cap_id, cap in caps_fetched.items():
        country_name = cap['country']['name'] if 'country' in cap else ''
        country_name = COUNTRY_NAME_OVERRIDES.get(country_name, country_name)

        caps[cap_id] = {
            "id": cap_id.split('-')[0],
            "internalId": cap_id,
            'country': country_name,
            # 'description': cap['description'].replace('\n', ' ') if 'description' in cap else '',
            # 'info': cap['info'] if 'info' in cap else '',
            'name': get_cap_name(cap),
        }

        if cap_id not in manual_overrides:
            continue
        
        for key, value in manual_overrides[cap_id].items():
            caps[cap_id][key] = value

    for cap_id, cap in manual_overrides.items():
        if 'id' not in cap:
            continue
        caps[cap_id] = cap

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
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--force', action='store_true', help='re-fetch caps that are already fetched')
    parser.add_argument('-t', '--threads', type=int, default=8, help='number of threads to fetch caps with (default: 8)')
    args = parser.parse_args()
    if args.threads < 1:
        parser.error('--threads must be at least 1')

    print('Enter the function you want to run:')
    print('1. re-fetch cap data')
    print('2. clean data')
    print('3. rescale images')

    choice = input()

    match choice:
        case '1':
            fetch_all_caps(force=args.force, threads=args.threads)
        case '2':
            clean_data()
        case '3':
            rescale_images()
        case _:
            print('Invalid choice')
            exit()
