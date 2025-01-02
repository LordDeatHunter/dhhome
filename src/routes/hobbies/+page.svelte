<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import type { Bottlecaps } from '$lib/types';
  import Bottlecap from '$components/Bottlecap.svelte';
  import type { Bottlecap as BottlecapType } from '$lib/types';
  import ImageModal from '$components/ImageModal.svelte';

  export let data: Bottlecaps;

  let sortBy = 'name';
  let sortedBottlecaps = [] as Array<BottlecapType>;

  $: {
    sortedBottlecaps = Object.values(data).sort((a, b) =>
      sortBy === 'name'
        ? a.name.localeCompare(b.name) || a.country.localeCompare(b.country)
        : a.country.localeCompare(b.country) || a.name.localeCompare(b.name)
    );
  }
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
        Sort by Name
      </button>
      <button
        class={`sort-button ${sortBy === 'country' ? 'active' : ''}`}
        on:click={() => (sortBy = 'country')}
      >
        Sort by Country
      </button>
    </div>
    <div class="flex justify-center gap-4">
      <div class="slower-fade-in flex max-w-[1440px] flex-col gap-8">
        <div class="bottlecaps">
          {#each sortedBottlecaps as bottlecap}
            <Bottlecap {bottlecap} />
          {/each}
        </div>
      </div>
    </div>
    <ImageModal />
  </div>
</main>
