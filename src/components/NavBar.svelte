<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/state';

  let currentPath = $derived(page.url.pathname);
</script>

<nav class="mx-2 flex flex-wrap justify-center gap-3 sm:gap-6">
  <a
    href="/"
    class="flex items-center gap-1"
    aria-current={currentPath === '/' ? 'page' : undefined}
  >
    <Icon icon="pixelarticons:home" class="h-6 w-6" />
    home
  </a>
  <a
    href="/projects"
    class="flex items-center gap-1"
    aria-current={currentPath.startsWith('/projects') ? 'page' : undefined}
  >
    <Icon icon="pixelarticons:code" class="h-6 w-6" />
    projects
  </a>
  <a
    href="/hobbies"
    class="flex items-center gap-1"
    aria-current={currentPath.startsWith('/hobbies') ? 'page' : undefined}
  >
    <Icon icon="pixelarticons:gamepad" class="h-6 w-6" />
    hobbies
  </a>
  <a
    href="/contact"
    class="flex items-center gap-1"
    aria-current={currentPath.startsWith('/contact') ? 'page' : undefined}
  >
    <Icon icon="pixelarticons:user" class="h-6 w-6" />
    contact
  </a>
</nav>
