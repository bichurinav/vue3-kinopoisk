<template>
  <Loader v-if="loadingSearchFilms && isFilmsFound !== false" />
  <div class="main" v-if="isFilmsFound === false">
    <Plug text="По вашему результату ничего не найдено ;(" />
  </div>
  <div
    v-else-if="
      films.length === 0 &&
      loadingSearchFilms === false &&
      isFilmsFound !== false
    "
    class="main"
  >
    <Banner
      @passageToFilm="passageToFilm"
      :loading="loadingTopFilm"
      :film="topFilm"
    />
    <section class="info">
      <div class="info__inner">
        <p class="subtitle">О сайте</p>
        <p class="info__text">
          Ищи фильмы с помощью поиска! Смотри подробную информацию о фильме и
          добавляй его в избранное.
        </p>
      </div>
    </section>
  </div>
  <div
    v-else-if="loadingSearchFilms === false && films.length > 0"
    class="main"
  >
    <FoundFilms :films="films" />
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
import Plug from '@/components/Plug.vue';
import FoundFilms from '@/components/FoundFilms.vue';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { getRandomInt } from '@/utils.js';

export default {
  components: { Banner, Loader, Plug, FoundFilms },
  setup(props, { emit }) {
    const topFilm = ref({});
    const loadingTopFilm = ref(true);
    const films = inject('films', []);
    const loadingSearchFilms = inject('loadingSearchFilms', false);
    const isFilmsFound = inject('isFilmsFound', 'off-flag');
    const router = useRouter();

    const fetchTopFilms = async () => {
      try {
        // Искусственная задержка
        setTimeout(async () => {
          const { data } = await axios.get(
            'https://kinopoiskapiunofficial.tech/api/v2.2/films/top',
            {
              headers: {
                'X-API-KEY': process.env.API_KEY,
                'Content-Type': 'application/json',
              },
            }
          );
          if (data.films) {
            topFilm.value = data.films[getRandomInt(0, data.films.length)];
            loadingTopFilm.value = false;
          }
        }, 1000);
      } catch (e) {
        console.error(e);
      }
    };

    const passageToFilm = (id) => {
      router.push(`/film/${id}`);
    };

    onMounted(() => {
      fetchTopFilms();
    });

    return {
      topFilm,
      loadingTopFilm,
      loadingSearchFilms,
      passageToFilm,
      isFilmsFound,
      films,
    };
  },
};
</script>
