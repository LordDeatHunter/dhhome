<script lang="ts">
  import '$style/style.css';
  import NavBar from '$components/NavBar.svelte';
  import HobbyLink from '$components/HobbyLink.svelte';
</script>

<main id="contact" class="bg-hobbies flex flex-col items-center gap-0 overflow-x-hidden">
  <div class="page-content">
    <h1 class="fade-in text-4xl font-[960] sm:text-5xl md:text-6xl lg:text-7xl">Hobbies</h1>
    <NavBar />
    <div class="divider-h slower-fade-in"></div>

    <div class="hobby-links">
      <HobbyLink
        href="hobbies/beercaps"
        imgSrc="/assets/hobbies/bottlecap.jpg"
        title="Beer Bottlecap Collection"
        summary="My collection of beer bottlecaps."
      />
      <HobbyLink
        href="hobbies/travelmap"
        imgSrc="/assets/hobbies/europe-blue.svg"
        title="Travel Map"
        summary="A map of the countries I've visited."
      />
    </div>
  </div>
</main>
