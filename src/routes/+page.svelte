<script lang="ts">
  import '../style.css';
  import NavBar from '$components/NavBar.svelte';

  export const openLink = (url: string, openInNewTab: boolean = true) => {
    window.open(url, openInNewTab ? '_blank' : '_self');
  };
</script>

<main id="home" class="bg-home flex flex-col items-center justify-center gap-0">
  <div class="grow-in flex flex-col items-center justify-center gap-4">
    <p class="fade-in text-5xl font-[960]">DeatHunter</p>
    <p class="slower-fade-in text-center text-[2rem]">[Software Engineer]</p>
    <img src="dh.png" class="mb-6 mt-8 h-auto w-40" alt="DeatHunter Avatar" />
    <div class="flex flex-col items-center justify-center gap-3">
      <p class="fade-in m-0 max-w-md text-center text-xl font-normal">
        Professional Full-stack Engineer, ex-competitive programmer and passionate indie Game
        Developer, known for making some notable Minecraft Mods.
      </p>
    </div>
    <div class="divider-h slower-fade-in" />
    <div class="slower-fade-in gap-12">
      <NavBar />
    </div>
  </div>
</main>
