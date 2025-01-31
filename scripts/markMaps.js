// geojson files obtained from https://geojson-maps.kyd.au/
import fs from 'fs';
import path from 'path';

const BASE_PATH = path.resolve('static/data/hobbies');
const CAPS_PATH = path.resolve('static/assets/caps/caps.json');
const OUTPUT_PATH = path.resolve('src/lib');

const VISITED_COUNTRIES = new Set([
  'Bosnia and Herzegovina',
  'Bulgaria',
  'Croatia',
  'Kosovo',
  'North Macedonia',
  'Montenegro',
  'Romania',
  'Serbia',
  'Slovenia',
  'Italy',
  'Germany',
  'Sweden',
  'Denmark',
  'Czech Republic',
  'Slovakia',
  'Hungary',
  'Switzerland',
  'Austria'
]);

function markMap(map, markedCountries) {
  const { features } = map;

  features.forEach((feature, index) => {
    const { properties } = feature;

    feature.id = index;

    const { name_long: countryName } = properties;

    if (markedCountries.has(countryName)) {
      properties.color = '#00AE00';
    } else {
      properties.color = '#AE0000';
    }
  });

  return map;
}

const caps = JSON.parse(fs.readFileSync(CAPS_PATH, 'utf-8'));
const capCountries = new Set(Object.values(caps).map((cap) => cap.country));

const worldMap = JSON.parse(fs.readFileSync(path.join(BASE_PATH, 'world.geo.json'), 'utf-8'));
const europeMap = JSON.parse(fs.readFileSync(path.join(BASE_PATH, 'europe.geo.json'), 'utf-8'));

const markedWorldMap = markMap(worldMap, capCountries);
const markedEuropeMap = markMap(europeMap, VISITED_COUNTRIES);

fs.writeFileSync(path.resolve(OUTPUT_PATH, 'world.geo.json'), JSON.stringify(markedWorldMap));
fs.writeFileSync(path.resolve(OUTPUT_PATH, 'europe.geo.json'), JSON.stringify(markedEuropeMap));
