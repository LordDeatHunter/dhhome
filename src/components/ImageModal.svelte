<script lang="ts">
  import { selectedImage } from '$lib/stores';
  import Icon from '@iconify/svelte';

  let dialog = $state<HTMLDialogElement>();
  let isLoading = $state(true);

  $effect(() => {
    if (dialog && $selectedImage) {
      dialog.showModal();
      isLoading = true;
    } else {
      dialog?.close();
      isLoading = true;
    }
  });

  const handleClose = () => {
    selectedImage.set(null);
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} onclose={handleClose} onclick={handleClose} class="image-modal-dialog">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="image-modal-content" onclick={(e) => e.stopPropagation()}>
    <button class="image-modal-close" onclick={handleClose} aria-label="Close modal">
      <Icon icon="pixelarticons:close" class="h-8 w-8" />
    </button>

    {#if isLoading}
      <div class="image-loading-box">
        <Icon icon="pixelarticons:hourglass" class="h-16 w-16 animate-spin" />
        <p class="mt-4 text-lg">Loading image...</p>
      </div>
    {/if}

    <img
      src={$selectedImage}
      alt="Full size preview"
      onload={() => (isLoading = false)}
      class="image-modal-img transition-opacity duration-300 ease-in-out"
      style="opacity: {isLoading ? '0' : '1'}; display: {isLoading ? 'none' : 'block'}"
    />
  </div>
</dialog>
