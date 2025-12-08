<script lang="ts">
  import { selectedImage } from '$lib/stores';
  import type { Bottlecap } from '$lib/types';

  interface Props {
    bottlecap: Bottlecap;
  }

  let { bottlecap }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div
  class="bottlecap flex flex-col items-center justify-between gap-4"
  onclick={() => selectedImage.set(`/assets/caps/cropped/${bottlecap.internalId}.jpg`)}
>
  <div class="flex w-full flex-col items-center justify-center gap-3">
    <div class="flex h-40 w-40 items-center justify-center">
      <img
        src={`/assets/caps/small/${bottlecap.internalId}.jpg`}
        alt={bottlecap.name}
        class="bottlecap-img-preview"
      />
    </div>
    <div class="flex w-full flex-col items-center gap-1 px-2">
      <h2 class="title">{bottlecap.name}</h2>
      <h3 class="country">{bottlecap.country}</h3>
    </div>
  </div>
</div>
