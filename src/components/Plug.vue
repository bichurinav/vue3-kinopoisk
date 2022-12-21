<template>
  <section class="hero is-dark">
    <div class="hero-body">
      <p class="subtitle">
        {{ text }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>