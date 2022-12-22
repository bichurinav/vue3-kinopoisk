<template>
  <div class="favorite" v-if="films.length > 0">
    <!--    <p class="subtitle">Избранное</p>-->
    <div class="favorite__filter">
      <div class="select">
        <select v-model="select">
          <option selected disabled>Выберите фильтр</option>
          <option value="Все фильмы">Все фильмы</option>
          <option value="Просмотренные">Просмотренные</option>
          <option value="Непросмотренные">Непросмотренные</option>
          <option v-for="(genre, idx) in genres" :value="genre" :key="idx + Date.now()">{{ genre }}</option>
        </select>
      </div>
    </div>
    <div class="favorite__films films">
      <FilmItem v-for="item in filteredFilms" :film="item" :key="item['kinopoiskId'] || item['filmId']" />
    </div>
  </div>
  <div v-else class="favorite">
    <Plug text="Ваш список пуст ;(" />
  </div>
</template>

<style lang="scss">
.favorite {
  &__filter {
    margin-bottom: 10px;
  }
}
</style>

<script>
import FilmItem from "@/components/FilmItem.vue";
import Plug from '@/components/Plug.vue'
import { onMounted, ref, inject, watch, computed } from "vue";

export default {
  components: { FilmItem, Plug },
  setup() {
    const storeF = inject('storeFavorite');
    const films = ref([]);
    const select = ref(storeF.value.getState().filter);
    const genres = [
      'Триллер',
      'Драма',
      'Комедия',
      'Криминал',
      'Комедия',
      'Спорт',
      'Фантастика',
      'Ужасы'
    ];

    onMounted(() => {
      films.value = storeF.value.getFilms();
    })

    watch(select, (val, prevVal) => {
      storeF.value.saveFilter(val);
    })

    const filteredFilms = computed(() => {
      return films.value.filter((film) => {
        if (select.value === 'Просмотренные') {
          return film['isWatched'] === true;
        }
        if (select.value === 'Непросмотренные') {
          return film['isWatched'] === false;
        }
        if (select.value === 'Все фильмы') {
          return film;
        }
        return film['genres'].find((el) => el.genre === select.value.toLowerCase());
      })
    })

    return {
      films,
      genres,
      select,
      filteredFilms
    }
  },
}
</script>