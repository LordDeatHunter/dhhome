<script lang="ts">
  import '../style.css';
  import NavBar from './NavBar.svelte';

  export const openLink = (url: string, openInNewTab: boolean = true) => {
    window.open(url, openInNewTab ? '_blank' : '_self');
  };
</script>

<main id="home" class="bg-home flex flex-col items-center justify-center gap-0">
  <div class="grow-in flex flex-col items-center justify-center gap-4">
    <p class="fade-in text-5xl font-[960]">DeatHunter</p>
    <p class="slower-fade-in text-[2rem] text-center">[Software Engineer]</p>
    <img src="dh.png" class="mb-6 mt-8 h-auto w-40" alt="DeatHunter Avatar" />
    <div class="flex flex-col items-center justify-center gap-3">
      <p class="fade-in m-0 max-w-md text-center text-xl font-normal">
        I like learning and creating new things. I've participated in a couple of game jams, and
        created some popular Minecraft mods.
      </p>
    </div>
    <div class="divider-h slower-fade-in" />
    <div class="slower-fade-in gap-12">
      <NavBar />
    </div>
  </div>
</main>
