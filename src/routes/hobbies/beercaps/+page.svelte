<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import type { Bottlecaps } from '$lib/types';
  import Bottlecap from '$components/Bottlecap.svelte';
  import type { Bottlecap as BottlecapType } from '$lib/types';
  import ImageModal from '$components/ImageModal.svelte';

  interface Props {
    data: Bottlecaps;
  }

  let { data }: Props = $props();

  let sortBy = $state('name');
  let search = $state('');

  let searchWords = $derived(search.trim().toLowerCase().split(' '));

  const sortedBottlecaps = $derived.by<Array<BottlecapType>>(() => {
    const filteredBottlecaps = Object.values(data).filter((bottlecap) => {
      const bottlecapWords = `${bottlecap.name} ${bottlecap.country}`.toLowerCase();
      return searchWords.every((word) => bottlecapWords.includes(word));
    });

    return filteredBottlecaps.sort((a, b) =>
      sortBy === 'name'
        ? a.name.localeCompare(b.name) || a.country.localeCompare(b.country)
        : a.country.localeCompare(b.country) || a.name.localeCompare(b.name)
    );
  });
</script>

<main id="hobbies" class="bg-hobbies flex flex-col items-center gap-0">
  <div class="page-content">
    <h1 class="fade-in text-7xl font-[960] text-center">Hobbies - Beer Bottlecap Collection</h1>
    <NavBar />
    <div class="divider-h slower-fade-in"></div>
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
