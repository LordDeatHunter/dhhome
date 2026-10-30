import mapData from '$lib/europe.geo.json';

export async function load() {
  return mapData as GeoJSON.GeoJSON;
}
