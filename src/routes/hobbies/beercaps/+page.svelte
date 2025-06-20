<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import type { Bottlecaps } from '$lib/types';
  import Bottlecap from '$components/Bottlecap.svelte';
  import type { Bottlecap as BottlecapType } from '$lib/types';
  import ImageModal from '$components/ImageModal.svelte';
  import { FeatureState, FillLayer, GeoJSONSource, LineLayer, MapLibre } from 'svelte-maplibre-gl';
  import { transliterate } from 'transliteration';
  import Fuse from 'fuse.js';

  interface Props {
    data: {
      caps: Bottlecaps;
      map: GeoJSON.GeoJSON;
    };
  }

  let { data }: Props = $props();

  const bottlecapList = Object.values(data.caps);
  const strip = (str: string) =>
    str
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

  const enrichedList = bottlecapList.map((cap) => ({
    orig: cap,
    tname: strip(transliterate(cap.name.toLowerCase())),
    tcountry: strip(transliterate(cap.country.toLowerCase()))
  }));

  const fuse = $derived(
    new Fuse(enrichedList, {
      keys: ['tname', 'tcountry'],
      threshold: 0.3,
      ignoreLocation: true
    })
  );

  let sortBy = $state('name');
  let search = $state('');

  const sortedBottlecaps = $derived.by<Array<BottlecapType>>(() => {
    const term = strip(transliterate(search.toLowerCase()));
    const filteredBottlecaps = term ? fuse.search(term).map((r) => r.item.orig) : bottlecapList;

    return [...filteredBottlecaps].sort((a, b) =>
      sortBy === 'name'
        ? a.name.localeCompare(b.name) || a.country.localeCompare(b.country)
        : a.country.localeCompare(b.country) || a.name.localeCompare(b.name)
    );
  });

  let hoveredId: string | number | undefined = $state();
</script>

<main id="hobbies" class="bg-hobbies flex flex-col items-center gap-0">
  <div class="page-content">
    <h1 class="fade-in text-center text-7xl font-[960]">Hobbies - Beer Bottlecap Collection</h1>
    <NavBar />
    <div class="divider-h slower-fade-in"></div>
    <MapLibre
      class="maplibre-visited"
      style="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      zoom={3.5}
      center={{ lng: 16, lat: 45 }}
      attributionControl={false}
    >
      <GeoJSONSource data={data.map}>
        <FillLayer
          paint={{
            'fill-color': ['get', 'color'],
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.4, 0.1]
          }}
          onmousemove={(ev) => (hoveredId = ev.features?.[0]?.id)}
          onmouseleave={() => (hoveredId = undefined)}
        />
        <LineLayer
          paint={{
            'line-color': ['get', 'color'],
            'line-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.3],
            'line-width': 1
          }}
        />
        {#if hoveredId}
          <FeatureState id={hoveredId} state={{ hover: true }} />
        {/if}
      </GeoJSONSource>
    </MapLibre>
    <input
      type="text"
      placeholder="Search bottlecaps..."
      class="search-input slower-fade-in mt-8"
      bind:value={search}
    />
    <div class="mb-8 flex justify-center gap-4">
      <button
        class={`sort-button ${sortBy === 'name' ? 'active' : ''}`}
        onclick={() => (sortBy = 'name')}
      >
        {sortBy === 'name' ? 'Sorted by Name' : 'Sort by Name'}
      </button>
      <button
        class={`sort-button ${sortBy === 'country' ? 'active' : ''}`}
        onclick={() => (sortBy = 'country')}
      >
        {sortBy === 'country' ? 'Sorted by Country' : 'Sort by Country'}
      </button>
    </div>
    <h3 class="slower-fade-in text-center text-3xl font-[960]">
      Showing {sortedBottlecaps.length} / {Object.keys(data.caps).length} bottlecaps.
    </h3>
    <div class="slower-fade-in flex max-w-[1440px] flex-col justify-center gap-8 px-8">
      <div class="bottlecaps">
        {#each sortedBottlecaps as bottlecap}
          <Bottlecap {bottlecap} />
        {/each}
      </div>
    </div>
  </div>
  <ImageModal />
</main>
