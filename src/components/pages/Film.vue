<template>
  <Loader v-if="loading" />
  <div v-else class="card card-film">
    <div class="card-image card-film__image card-film__item">
      <figure class="image">
        <img :src="film['posterUrlPreview']" :alt="'poster-' + film['nameRu']">
      </figure>
      <button class="card-film__btn-favorite" title="Добавить в избранное">
        <img src="@/assets/favorite.png" alt="favorite-icon">
      </button>
    </div>
    <div class="card-content card-film__content card-film__item">
      <p class="title">{{ film['nameRu'] || film['nameEn'] || film['nameOriginal'] }}</p>
      <div class="subtitle">
        <p>Рейтинг кинопоиска: <b class="card-film__rating">{{ film['ratingKinopoisk'] || '-' }}</b></p>
        <p>Дата выхода: {{ film['year'] || '-' }}</p>
      </div>
      <Tags :genres="film['genres']"/>
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
    transition: all .3s;
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
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  components: { Tags, Loader },
  props: {
    films: Array
  },
  setup(props) {
    const film = ref({});
    const loading = ref(true);
    const fetchFilm = async () => {
      const route = useRoute();
      const { id } = route.params;
      try {
        // Искусственная задержка
        setTimeout(async () => {
          const {data} = await axios.get(
              `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
              {
                headers: {
                  'X-API-KEY': 'e65c87e8-7774-44e1-b959-03939022b580',
                  'Content-Type': 'application/json',
                },
              }
          );
          film.value = data;
          loading.value = false;
          console.log(data)
        }, 1000)
      } catch (e) {
        console.error(e)
      }
    }

    onMounted(() => {
      fetchFilm()
    })

    return {
      film,
      loading
    }
  }
}
</script>