<script lang="ts">
  import { selectedImage } from '$lib/stores';
  import type { Bottlecap } from '$lib/types';

  export let bottlecap: Bottlecap;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="bottlecap flex flex-col items-center justify-between gap-8"
  on:click={() => selectedImage.set(`assets/caps/cropped/${bottlecap.internalId}.jpg`)}
>
  <div class="flex flex-col justify-between gap-2">
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="flex h-40 w-40 items-center justify-center">
        <img
          src={`assets/caps/small/${bottlecap.internalId}.jpg`}
          alt={bottlecap.name}
          class="bottlecap-img-preview"
        />
      </div>
      <div class="divider-h" />
      <h2 class="title">{bottlecap.name}</h2>
      <h3 class="country">{bottlecap.country}</h3>
    </div>
  </div>
</div>
