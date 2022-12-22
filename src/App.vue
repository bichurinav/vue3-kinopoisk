<template>
  <div class="app">
    <Header
      @isFilmsFound="setStatusFilmsFound"
      @getFilmsByKeywords="getFilms"
      @loadingSearchFilms="getLoading"
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
  import mitt from 'mitt';

  const store = storeFavorite();
  const emitter = mitt();

  export default {
    components: { Header, RouterView },
    setup() {
      const films = ref([]);
      const loadingSearchFilms = ref(false);
      const favoriteCounterFilms = ref(store.getFilms().length);
      const isFilmsFound = ref('off-flag');
      const storeFavorite = ref(store);

      emitter.on('updateCounter', (val) => {
        favoriteCounterFilms.value = val;
      });

      const getFilms = (arrayFilms) => {
        if (arrayFilms.length === 0) {
          films.value = [];
          return
        }
        films.value = arrayFilms;
      }

      const setStatusFilmsFound = (status) => {
        isFilmsFound.value = status;
      }

      const getLoading = (loading) => {
        loadingSearchFilms.value = loading;
      }

      provide('films', films);
      provide('emitter', emitter);
      provide('store', storeFavorite);
      provide('loadingSearchFilms', loadingSearchFilms);
      provide('isFilmsFound', isFilmsFound);
      provide('counter', favoriteCounterFilms);

      return {
        getFilms,
        getLoading,
        setStatusFilmsFound
      }
    }
  }
</script>