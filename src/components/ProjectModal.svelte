<script lang="ts">
  import { selectedProject } from '$lib/stores';
  import Icon from '@iconify/svelte';
  import ExternalLink from '$components/ExternalLink.svelte';
  import { mount, unmount } from 'svelte';

  let dialog = $state<HTMLDialogElement>();
  let overviewContainer = $state<HTMLDivElement>();
  let mountedComponents: Array<{ target: HTMLElement; component: any }> = [];

  $effect(() => {
    if (dialog && $selectedProject) {
      dialog.showModal();
    } else {
      dialog?.close();
      mountedComponents.forEach(({ component }) => unmount(component));
      mountedComponents = [];
    }
  });

  $effect(() => {
    if (!overviewContainer || !$selectedProject?.description) {
      return;
    }

    mountedComponents.forEach(({ component }) => unmount(component));
    mountedComponents = [];
    const images = overviewContainer.querySelectorAll('img');
    images.forEach((img) => {
      if (img.complete) {
        return;
      }

      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'image-loading-box';

      img.style.display = 'none';
      img.parentElement?.insertBefore(loadingDiv, img);

      const iconComponent = mount(Icon, {
        target: loadingDiv,
        props: { icon: 'pixelarticons:hourglass', class: 'h-16 w-16 animate-spin' }
      });

      const text = document.createElement('p');
      text.className = 'mt-4 text-lg';
      text.textContent = 'Loading image...';
      loadingDiv.appendChild(text);

      mountedComponents.push({ target: loadingDiv, component: iconComponent });

      img.addEventListener(
        'load',
        () => {
          unmount(iconComponent);
          mountedComponents = mountedComponents.filter(
            ({ component }) => component !== iconComponent
          );
          loadingDiv.remove();
          img.style.display = 'block';
        },
        { once: true }
      );
    });
  });

  const handleClose = () => {
    selectedProject.set(null);
  };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} onclose={handleClose} onclick={handleClose} class="project-dialog">
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="project-dialog-content" onclick={(e) => e.stopPropagation()}>
    <button class="project-dialog-close" onclick={handleClose} aria-label="Close modal">
      <Icon icon="pixelarticons:close" class="h-8 w-8" />
    </button>
    <div class="flex h-40 w-40 items-center justify-center">
      <img src={$selectedProject?.img} alt={$selectedProject?.title} class="project-img-preview" />
    </div>
    <h2>{$selectedProject?.title}</h2>
    <div class="project-overview" bind:this={overviewContainer}>
      {@html $selectedProject?.description}
    </div>
    {#if $selectedProject?.link || $selectedProject?.source}
      <div class="flex gap-8">
        {#if $selectedProject?.link}
          <ExternalLink url={$selectedProject?.link}>View Project</ExternalLink>
        {/if}
        {#if $selectedProject?.source}
          <ExternalLink icon="pixelarticons:code" url={$selectedProject?.source}>
            View Source
          </ExternalLink>
        {/if}
      </div>
    {/if}
  </div>
</dialog>
