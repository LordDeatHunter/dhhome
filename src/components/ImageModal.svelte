<script lang="ts">
  import { selectedImage } from '$lib/stores';
  import Icon from '@iconify/svelte';

  let dialog: HTMLDialogElement;
  let isLoading = true;

  $: if (dialog && $selectedImage) {
    dialog.showModal();
  } else {
    dialog?.close();
    isLoading = true;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => selectedImage.set(null)}
  on:click|self={() => selectedImage.set(null)}
  class="image-dialog"
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="image-dialog-content" on:click|stopPropagation>
    {#if isLoading}
      <div class="img-loading-box">
        <Icon icon="pixelarticons:hourglass" class="h-16 w-16 animate-spin text-red-500" />
      </div>
    {/if}

    <img
      src={$selectedImage}
      alt=""
      on:load={() => (isLoading = false)}
      class="h-full w-full transition-opacity duration-300 ease-in-out"
      style="display: {isLoading ? 'none' : 'block'}"
    />
  </div>
</dialog>
<div
  class="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out"
  style="display: {$selectedImage ? 'block' : 'none'}"
/>
