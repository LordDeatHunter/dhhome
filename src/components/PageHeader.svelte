<script lang="ts">
  import NavBar from '$components/NavBar.svelte';

  interface Props {
    title: string;
    subtitle: string;
  }

  let { title, subtitle }: Props = $props();
</script>

<div class="page-content">
  <h1 class="header-title text-center text-4xl font-[960] sm:text-5xl md:text-6xl lg:text-7xl">
    {title}
  </h1>
  <p class="header-subtitle text-center text-lg opacity-80 sm:text-xl">{subtitle}</p>
  <NavBar />
</div>
