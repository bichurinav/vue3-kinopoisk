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
import storeFavorite from "@/storeFavorite";
import { onMounted, ref } from "vue";

const store = storeFavorite();

export default {
  components: { FilmItem },
  setup() {
    let films = ref([]);
    onMounted(() => {
      films.value = store().getFilms();
    })
    return {
      films
    }
  },
}
</script>