<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import type { Bottlecaps } from '$lib/types';
  import Bottlecap from '$components/Bottlecap.svelte';
  import type { Bottlecap as BottlecapType } from '$lib/types';
  import ImageModal from '$components/ImageModal.svelte';

  export let data: Bottlecaps;

  let sortBy = 'name';
  let filteredBottlecaps = [] as Array<BottlecapType>;
  let sortedBottlecaps = [] as Array<BottlecapType>;
  let search = '';

  $: searchWords = search.trim().toLowerCase().split(' ');

  $: filteredBottlecaps = Object.values(data).filter((bottlecap) => {
    const bottlecapWords = `${bottlecap.name} ${bottlecap.country}`.toLowerCase();
    return searchWords.every((word) => bottlecapWords.includes(word));
  });

  $: sortedBottlecaps = filteredBottlecaps.sort((a, b) =>
    sortBy === 'name'
      ? a.name.localeCompare(b.name) || a.country.localeCompare(b.country)
      : a.country.localeCompare(b.country) || a.name.localeCompare(b.name)
  );
</script>

<main id="contact" class="bg-contact flex flex-col items-center gap-0">
  <div class="page-content">
    <h1 class="fade-in text-7xl font-[960]">Hobbies</h1>
    <NavBar />
    <div class="divider-h slower-fade-in" />
    <h2 class="fade-in text-5xl font-[960]">Beer Bottlecap Collection</h2>
    <div class="mb-8 flex justify-center gap-4">
      <button
        class={`sort-button ${sortBy === 'name' ? 'active' : ''}`}
        on:click={() => (sortBy = 'name')}
      >
        {sortBy === 'name' ? 'Sorted by Name' : 'Sort by Name'}
      </button>
      <button
        class={`sort-button ${sortBy === 'country' ? 'active' : ''}`}
        on:click={() => (sortBy = 'country')}
      >
        {sortBy === 'country' ? 'Sorted by Country' : 'Sort by Country'}
      </button>
    </div>
    <input
      type="text"
      placeholder="Search bottlecaps..."
      class="search-input slower-fade-in"
      bind:value={search}
    />
    <h3 class="slower-fade-in text-3xl font-[960]">
      Showing {sortedBottlecaps.length} / {Object.keys(data).length} bottlecaps.
    </h3>
    <div class="flex justify-center gap-4">
      <div class="slower-fade-in flex max-w-[1440px] flex-col gap-8">
        <div class="bottlecaps">
          {#each sortedBottlecaps as bottlecap}
            <Bottlecap {bottlecap} />
          {/each}
        </div>
      </div>
    </div>
  </div>
  <ImageModal />
</main>
