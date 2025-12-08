<script lang="ts">
  import '$style/style.css';
  import PageHeader from '$components/PageHeader.svelte';
  import type { Bottlecap as BottlecapType, Bottlecaps } from '$lib/types';
  import Bottlecap from '$components/Bottlecap.svelte';
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

<main id="hobbies" class="bg-hobbies flex flex-col items-center gap-0 overflow-x-hidden">
  <PageHeader
    title="Beer Bottlecap Collection"
    subtitle="My collection of beer bottlecaps from around the world"
  />

  <div class="hobby-subpage-container">
    <div class="slide-up map-container" style="animation-delay: 0.1s;">
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
    </div>

    <div class="slide-up controls-container" style="animation-delay: 0.2s;">
      <input
        type="text"
        placeholder="Search bottlecaps..."
        class="search-input"
        bind:value={search}
      />
      <div class="flex justify-center gap-4">
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
    </div>

    <div class="slide-up info-container" style="animation-delay: 0.3s;">
      <h4 class="text-center text-base sm:text-lg">
        All the cap images are taken by myself from my collection.<br />
        The cap data is fetched from
        <a href="https://crowncaps.info/" target="_blank" class="info-link">CrownCaps</a> and might not
        be fully accurate.
      </h4>
      <h3 class="text-center text-xl font-[960] sm:text-2xl">Last updated: 30th of June, 2025</h3>
      <h3 class="text-center text-xl font-[960] sm:text-2xl">
        Showing {sortedBottlecaps.length} / {Object.keys(data.caps).length} bottlecaps.
      </h3>
    </div>

    <div class="slide-up bottlecaps-container" style="animation-delay: 0.4s;">
      <div class="bottlecaps">
        {#each sortedBottlecaps as bottlecap}
          <Bottlecap {bottlecap} />
        {/each}
      </div>
    </div>
  </div>
  <ImageModal />
</main>
