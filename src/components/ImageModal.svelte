<script lang="ts">
  import { selectedImage, selectedProject } from '$lib/stores';
  import Icon from '@iconify/svelte';

  let dialog = $state<HTMLDialogElement>();
  let isLoading = $state(true);

  $effect(() => {
    if (dialog && $selectedImage) {
      dialog.showModal();
    } else {
      dialog?.close();
      isLoading = true;
    }
  });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  onclose={() => selectedImage.set(null)}
  onclick={() => selectedImage.set(null)}
  class="image-dialog"
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="image-dialog-content" onclick={(e) => e.stopPropagation()}>
    {#if isLoading}
      <div class="img-loading-box">
        <Icon icon="pixelarticons:hourglass" class="h-16 w-16 animate-spin text-red-500" />
      </div>
    {/if}

    <img
      src={$selectedImage}
      alt=""
      onload={() => (isLoading = false)}
      class="h-full w-full transition-opacity duration-300 ease-in-out"
      style="display: {isLoading ? 'none' : 'block'}"
    />
  </div>
</dialog>
<div
  class="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out"
  style="display: {$selectedImage ? 'block' : 'none'}"
></div>
