<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import HeroBackground from '$components/HeroBackground.svelte';
  import KineticTitle from '$components/KineticTitle.svelte';

  export const openLink = (url: string, openInNewTab: boolean = true) => {
    window.open(url, openInNewTab ? '_blank' : '_self');
  };
</script>

<main
  id="home"
  class="bg-home relative flex flex-col items-center justify-center gap-0 overflow-hidden"
  style="animation: none"
>
  <HeroBackground />
  <div class="grow-in relative z-10 flex flex-col items-center justify-center gap-4">
    <KineticTitle text="DeatHunter" />
    <p class="slower-fade-in text-center text-[2rem]">[Software Engineer]</p>
    <img src="dh.png" class="mb-6 mt-8 h-auto w-40" alt="DeatHunter Avatar" />
    <div class="flex flex-col items-center justify-center gap-3">
      <p class="fade-in m-0 max-w-md px-4 text-center text-base font-normal sm:text-lg md:text-xl">
        Professional Full-stack Engineer, ex-competitive programmer and passionate indie Game
        Developer, known for making some notable Minecraft Mods.
      </p>
    </div>
    <div class="divider-h slower-fade-in"></div>
    <div class="slower-fade-in gap-12">
      <NavBar />
    </div>
  </div>
</main>
