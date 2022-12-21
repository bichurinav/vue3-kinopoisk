<template>
  <div class="favorite">
    <p class="subtitle">Избранное</p>
    <div class="favorite__films films">
      <FilmItem v-for="item in films" :film="item" :key="item['kinopoiskId'] || item['filmId']" />
    </div>
  </div>
</template>

<script>
import FilmItem from "@/components/FilmItem.vue";
import { onMounted, ref, inject } from "vue";

export default {
  components: { FilmItem },
  setup() {
    let films = ref([]);
    const store = inject('store');
    onMounted(() => {
      films.value = store.value.getFilms();
    })
    return {
      films
    }
  },
}
</script>