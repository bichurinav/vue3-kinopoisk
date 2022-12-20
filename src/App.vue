<template>
  <div class="app">
    <Header
      @isFilmsFinded="setStatusFilmsFinded"
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
  export default {
    components: { Header, RouterView },
    setup() {
      const films = ref([]);
      const loadingSearchFilms = ref(false);
      const isFilmsFinded = ref('off-flag');

      const getFilms = (arrayFilms) => {
        if (arrayFilms.length === 0) {
          films.value = [];
          return
        }
        films.value = arrayFilms;
      }

      const setStatusFilmsFinded = (status) => {
        isFilmsFinded.value = status;
      }

      const getLoading = (loading) => {
        loadingSearchFilms.value = loading;
      }

      provide('films', films);
      provide('loadingSearchFilms', loadingSearchFilms);
      provide('isFilmsFinded', isFilmsFinded);

      return {
        getFilms,
        getLoading,
        setStatusFilmsFinded
      }
    }
  }
</script>