<template>
  <section class="films-search films">
    <FilmItem v-for="item in films" :film="item" :key="item['kinopoiskId'] || item['filmId']" />
  </section>
</template>

<style lang="scss">
</style>

<script>
import FilmItem from '@/components/FilmItem.vue'
import { onMounted } from "vue";

export default {
  props: {
    films: Array
  },
  components: { FilmItem },
  setup(props) {

  }
}
</script>