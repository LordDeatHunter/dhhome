<script lang="ts">
  import '$style/style.css';
  import PageHeader from '$components/PageHeader.svelte';
  import HobbyLink from '$components/HobbyLink.svelte';
</script>

<main id="hobbies" class="bg-hobbies flex flex-col items-center gap-0 overflow-x-hidden">
  <PageHeader title="Hobbies" subtitle="My non-programming related hobbies." />
  <div class="hobby-links-container">
    <div class="hobby-links">
      <HobbyLink
        animationDelay="0.2s"
        href="hobbies/beercaps"
        imgSrc="/assets/hobbies/bottlecap.jpg"
        title="Beer Bottlecap Collection"
        summary="My collection of beer bottlecaps."
      />
      <HobbyLink
        animationDelay="0.4s"
        href="hobbies/travelmap"
        imgSrc="/assets/hobbies/europe-blue.svg"
        title="Travel Map"
        summary="A map of the countries I've visited."
      />
    </div>
  </div>
</main>
