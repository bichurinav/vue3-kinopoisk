<template>
  <Loader v-if="loadingSearchFilms && isFilmsFinded !== false"/>
  <div class="main" v-if="isFilmsFinded === false">
    <section class="hero is-dark">
      <div class="hero-body">
        <p class="subtitle">
          По вашему результату ничего не найдено ;(
        </p>
      </div>
    </section>
  </div>
  <div v-else-if="films.length === 0 && loadingSearchFilms === false && isFilmsFinded !== false" class="main">
    <Banner @passageToFilm="passageToFilm" :loading="loadingTopFilm" :film="topFilm" />
    <section class="info">
      <div class="info__inner">
        <p class="subtitle">О сайте</p>
        <p class="info__text">
          Ищи фильмы с помощью поиска!
          Смотри подробную информацию о фильме и добавляй его в избранное.
        </p>
      </div>
    </section>
  </div>
  <div v-else-if="loadingSearchFilms === false && films.length > 0" class="main">
    <section class="films-search">
      <div v-for="item in films">
        <h3>{{item['nameRu']}}</h3>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.info {
  &__inner {
    margin-top: 15px;
  }
  &__text {
    width: 300px;
  }
}
</style>

<script>
import Banner from '@/components/Banner.vue';
import Loader from '@/components/Loader.vue';
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { getRandomInt } from "@/utils.js";

export default {
  components: { Banner, Loader },
  setup(props, {emit}) {
    const topFilm = ref({});
    const loadingTopFilm = ref(true);
    const films = inject('films', []);
    const loadingSearchFilms = inject('loadingSearchFilms', false);
    const isFilmsFinded = inject('isFilmsFinded', 'off-flag');
    const router = useRouter();

    const fetchTopFilms = async () => {
      try {
        // Искусственная задержка
        setTimeout(async () => {
          const {data} = await axios.get(
              'https://kinopoiskapiunofficial.tech/api/v2.2/films/top',
              {
                headers: {
                  'X-API-KEY': 'e65c87e8-7774-44e1-b959-03939022b580',
                  'Content-Type': 'application/json',
                },
              }
          );
          const randomTopFilm = data?.films[getRandomInt(0, data.films.length)];
          topFilm.value = randomTopFilm;
          loadingTopFilm.value = false;
          console.log(topFilm)
        }, 1000)
      } catch (e) {
        console.error(e);
      }
    }

    const actionBanner = () => {

    }

    const passageToFilm = (id) => {
      router.push(`/film/${id}`)
    }

    onMounted(() => {
      fetchTopFilms()
    })

    return {
      topFilm,
      loadingTopFilm,
      loadingSearchFilms,
      passageToFilm,
      isFilmsFinded,
      films
    }
  },
};
</script>
