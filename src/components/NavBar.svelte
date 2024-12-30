<script>
  import Icon from '@iconify/svelte';
</script>

<nav class="mx-2 flex flex-wrap justify-center gap-6">
  <a href="/" class="flex items-center gap-1">
    <Icon icon="pixelarticons:home" class="h-6 w-6" />
    home
  </a>
  <a href="/projects" class="flex items-center gap-1">
    <Icon icon="pixelarticons:code" class="h-6 w-6" />
    projects
  </a>
  <a href="/hobbies" class="flex items-center gap-1">
    <Icon icon="pixelarticons:gamepad" class="h-6 w-6" />
    hobbies
  </a>
  <a href="/contact" class="flex items-center gap-1">
    <Icon icon="pixelarticons:user" class="h-6 w-6" />
    contact
  </a>
</nav>
