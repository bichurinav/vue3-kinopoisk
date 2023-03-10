<template>
  <Loader v-if="loading" />
  <NotFound v-else-if="isNotFound && !loading" />
  <div v-else class="card card-film">
    <div class="card-image card-film__image card-film__item">
      <figure class="image">
        <img
          :src="film['posterUrlPreview']"
          :alt="'poster-' + film['nameRu']"
        />
      </figure>
      <button
        @click="addFilmToFavorite(film)"
        class="card-film__btn-favorite"
        title="Добавить в избранное"
      >
        <img src="@/assets/favorite.png" alt="favorite-icon" />
      </button>
    </div>
    <div class="card-content card-film__content card-film__item">
      <p class="title">
        {{ film['nameRu'] || film['nameEn'] || film['nameOriginal'] }}
      </p>
      <div class="subtitle">
        <p>
          Рейтинг кинопоиска:
          <b class="card-film__rating">{{ film['ratingKinopoisk'] || '-' }}</b>
        </p>
        <p>Дата выхода: {{ film['year'] || '-' }}</p>
      </div>
      <Tags :genres="film['genres']" />
      <div class="content">
        {{ film['description'] }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card-film {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__btn-favorite {
    position: absolute;
    z-index: 999;
    background: transparent;
    border: none;
    width: 64px;
    right: -25px;
    top: -10px;
    transition: all 0.3s;
    &:hover {
      cursor: pointer;
      transform: rotate(-5deg) scale(0.8);
    }
  }
  &__image {
    flex-basis: 29%;
    position: relative;
  }
  &__content {
    flex-basis: 69%;
  }
  &__rating {
    color: tomato;
  }
  @media all and (max-width: 800px) {
    &__content {
      min-width: 100%;
    }
    &__btn-favorite {
      width: 52px;
    }
  }
}
</style>

<script>
import Tags from '@/components/Tags.vue';
import Loader from '@/components/Loader.vue';
import NotFound from '@/components/pages/NotFound.vue';
import { useRoute } from 'vue-router';
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import { useAddFilmToFavorite } from '@/components/hooks';
import { isNumeric } from '@/utils.js';

export default {
  components: { Tags, Loader, NotFound },
  props: {
    films: Array,
  },
  setup() {
    const film = ref({});
    const loading = ref(true);
    const isNotFound = ref(false);

    const fetchFilm = async () => {
      const route = useRoute();
      const { id } = route.params;

      if (!isNumeric(id)) {
        isNotFound.value = true;
        loading.value = false;
        return;
      }

      try {
        const { data } = await axios.get(
          `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
          {
            headers: {
              'X-API-KEY': process.env.API_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        film.value = data;
        loading.value = false;
      } catch (e) {
        isNotFound.value = true;
        loading.value = false;
      }
    };

    const storeF = inject('storeFavorite');
    const emitter = inject('emitter');
    const addFilmToFavorite = useAddFilmToFavorite(storeF, emitter);

    onMounted(() => {
      fetchFilm();
    });

    return {
      film,
      loading,
      isNotFound,
      addFilmToFavorite,
    };
  },
};
</script>
