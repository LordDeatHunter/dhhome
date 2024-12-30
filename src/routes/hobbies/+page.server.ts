import caps from '$lib/caps.json';
import type { Bottlecaps } from '$lib/types';

export async function load() {
  return caps as Bottlecaps;
}
