<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import { FillLayer, LineLayer, MapLibre, GeoJSONSource, FeatureState } from 'svelte-maplibre-gl';

  interface Props {
    data: GeoJSON.GeoJSON;
  }

  let { data }: Props = $props();

  let hoveredId: string | number | undefined = $state();
</script>

<main id="hobbies" class="bg-hobbies flex flex-col items-center gap-0 overflow-x-hidden">
  <div class="page-content">
    <h1 class="fade-in text-center text-2xl font-[960] sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">Hobbies - Travel Map</h1>
    <NavBar />
    <div class="divider-h slower-fade-in"></div>
    <MapLibre
      class="maplibre-visited"
      style="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      zoom={3.5}
      center={{ lng: 16, lat: 45 }}
      attributionControl={false}
    >
      <GeoJSONSource {data}>
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
</main>
