<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import type { Bottlecaps } from '$lib/types';
  import Bottlecap from '$components/Bottlecap.svelte';

  export let data: Bottlecaps;
</script>

<main id="contact" class="bg-contact flex flex-col items-center gap-0">
  <div class="grow-in flex flex-col items-center justify-center gap-4 pt-12">
    <h1 class="fade-in text-7xl font-[960]">Hobbies</h1>
    <NavBar />
    <div class="divider-h slower-fade-in" />
    <h2 class="fade-in pb-6 text-5xl font-[960]">Beer Bottlecap Collection</h2>
    <div class="slower-fade-in flex max-w-[1240px] flex-col gap-8">
      <div class="bottlecaps">
        {#each Object.values(data).sort((a, b) => a.name.localeCompare(b.name)) as bottlecap}
          <Bottlecap {bottlecap} />
        {/each}
      </div>
    </div>
  </div>
</main>
