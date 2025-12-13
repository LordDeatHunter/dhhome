<script lang="ts">
  import '$style/style.css';
  import PageHeader from '$components/PageHeader.svelte';
  import ExternalLink from '$components/ExternalLink.svelte';
  import Technologies from '$components/Technologies.svelte';
  import ScrollToTop from '$components/ScrollToTop.svelte';
  import Icon from '@iconify/svelte';
  import { mount, unmount } from 'svelte';
  import type { Project } from '$lib/types';

  interface Props {
    data: {
      project: Project;
    };
  }

  let { data }: Props = $props();
  let overviewContainer = $state<HTMLDivElement>();
  let mountedComponents: Array<{ target: HTMLElement; component: any }> = [];

  $effect(() => {
    if (!overviewContainer || !data.project?.description) {
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

  const handleBack = () => {
    if (
      window.history.length > 1 &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin
    ) {
      window.history.back();
    } else {
      window.location.href = '/projects';
    }
  };
</script>

<main id="projects" class="bg-projects flex flex-col items-center gap-0 overflow-x-hidden">
  <PageHeader title={data.project.title} subtitle={data.project.summary} />

  <div class="project-page-container">
    <button
      class="button back-button cursor-pointer"
      onclick={handleBack}
      aria-label="Back to projects"
    >
      <Icon icon="pixelarticons:arrow-left" class="h-6 w-6" />
      Back to Projects
    </button>

    <div class="project-page-content">
      <div
        class="flex h-40 w-40 items-center justify-center"
        style="position: relative; z-index: 2;"
      >
        <img src={`/${data.project.img}`} alt={data.project.title} class="project-img-preview" />
      </div>

      <div style="position: relative; z-index: 2;">
        <Technologies technologies={data.project.technologies} />
      </div>

      <div class="project-overview" bind:this={overviewContainer}>
        {@html data.project.description}
      </div>

      {#if data.project.link || data.project.source}
        <div class="flex gap-8" style="position: relative; z-index: 2;">
          {#if data.project.link}
            <ExternalLink url={data.project.link}>View Project</ExternalLink>
          {/if}
          {#if data.project.source}
            <ExternalLink icon="pixelarticons:code" url={data.project.source}>
              View Source
            </ExternalLink>
          {/if}
        </div>
      {/if}
    </div>
  </div>
  <ScrollToTop />
</main>
