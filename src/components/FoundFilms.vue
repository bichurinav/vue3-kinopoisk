<template>
  <section class="films-search films">
    <FilmItem v-for="item in films" :film="item" :key="getFilmId(item)" />
  </section>
</template>

<style lang="scss">
</style>

<script>
import FilmItem from '@/components/FilmItem.vue'
import { useGetFilmId } from "@/components/hooks";

export default {
  props: {
    films: Array
  },
  components: { FilmItem },
  setup() {
    const getFilmId = useGetFilmId();
    return { getFilmId }
  }
}
</script>