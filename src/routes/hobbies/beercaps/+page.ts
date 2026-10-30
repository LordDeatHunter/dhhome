import caps from '$lib/caps.json';
import map from '$lib/world.geo.json';
import type { Bottlecaps } from '$lib/types';

export async function load() {
  return { caps: caps as Bottlecaps, map: map as GeoJSON.GeoJSON };
}
