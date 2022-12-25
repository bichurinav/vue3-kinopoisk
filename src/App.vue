<template>
  <div class="app">
    <Header
      @isFilmsFound="setStatusFilmsFound"
      @getFilmsByKeywords="getFilms"
      @loadingSearchFilms="getLoading"
      @getTotalPages="getTotalPages"
    />
    <div class="container">
      <div class="container__inner">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  &__inner {
    padding: 15px 0;
    @media all and (max-width: 1022px) {
      padding: 15px;
    }
  }
}
</style>

<script>
import Header from '@/components/Header.vue';
import { ref, provide } from 'vue';
import { RouterView } from 'vue-router';
import storeFavorite from '@/storeFavorite.js';
import storeSearchFilms from '@/storeSearchFilms.js';
import mitt from 'mitt';

const storeF = storeFavorite();
const storeS = storeSearchFilms();
const emitter = mitt();

export default {
  components: { Header, RouterView },
  setup() {
    const films = ref([]);
    const loadingSearchFilms = ref(false);
    const favoriteCounterFilms = ref(storeF.getFilms().length);
    const isFilmsFound = ref('off-flag');
    const page = ref(1);
    const totalPages = ref(1);
    const storeFavorite = ref(storeF);
    const storeSearchFilms = ref(storeS);

    emitter.on('updateCounter', (val) => {
      favoriteCounterFilms.value = val;
    });

    const getTotalPages = (val) => {
      totalPages.value = val;
    };

    const getFilms = (arrayFilms) => {
      if (arrayFilms.length === 0) {
        films.value = [];
        return;
      }
      films.value = arrayFilms;
    };

    const setStatusFilmsFound = (status) => {
      isFilmsFound.value = status;
    };

    const getLoading = (loading) => {
      loadingSearchFilms.value = loading;
    };

    provide('totalPages', totalPages);
    provide('page', page);
    provide('films', films);
    provide('emitter', emitter);
    provide('storeFavorite', storeFavorite);
    provide('storeSearchFilms', storeSearchFilms);
    provide('loadingSearchFilms', loadingSearchFilms);
    provide('isFilmsFound', isFilmsFound);
    provide('counter', favoriteCounterFilms);

    return {
      getFilms,
      getLoading,
      setStatusFilmsFound,
      getTotalPages,
    };
  },
};
</script>
