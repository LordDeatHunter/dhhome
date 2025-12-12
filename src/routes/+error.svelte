<script lang="ts">
  import '$style/style.css';
  import { page } from '$app/state';
</script>

<main id="error" class="bg-home flex min-h-screen flex-col items-center justify-center gap-6">
  <div class="grow-in flex flex-col items-center justify-center gap-4">
    <h1 class="fade-in text-center text-7xl font-[960] md:text-8xl lg:text-9xl">
      {page.status}
    </h1>
    <p class="slower-fade-in text-center text-2xl opacity-80 md:text-3xl">
      {page.status === 404 ? 'Page Not Found' : 'Something went wrong'}
    </p>
    <nav class="slower-fade-in mt-16">
      <a href="/">Back to Home</a>
    </nav>
  </div>
</main>
