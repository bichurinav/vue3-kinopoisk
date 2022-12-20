<template>
    <section @click="passageToFilm" class="banner" :class="loading ? '' : 'pointer'">
      <div class="banner__poster">
        <img v-if="loading === false" :src="film['posterUrlPreview']" :alt="'poster-' + film['nameRu']">
        <div v-else class="temp temp-image"></div>
      </div>
      <div class="banner__info">
        <p v-if="loading === false" class="title">{{ film['nameRu'] }}</p>
        <p v-else class="temp temp-title">temp-text</p>
        <div v-if="loading === false" class="subtitle">
          <p>Рейтинг: <b>{{ film['rating'] }}</b></p>
          <p>Год: <b>{{ film['year'] }}</b></p>
        </div>
        <div v-else class="subtitle">
          <p>Рейтинг: <b class="temp-text">temp-text</b></p>
          <p>Год: <b class="temp-text">temp-text</b></p>
        </div>
        <button @click.stop="addFavorite" v-if="film['nameRu']" class="button is-primary">Добавить в избранное</button>
      </div>
    </section>
</template>

<style lang="scss" scoped>
  .temp {
    background: silver;
    color: silver;
  }

  .temp-image {
    height: 300px;
  }

  .temp-title {
    background: silver;
    color: transparent;
    width: 200px;
  }

  .temp-text {
    background: silver;
    color: transparent;
    width: 50px;
  }

  .subtitle > p {
    margin: 5px 0;
  }

  .banner {
    display: flex;
    padding: 10px;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    background: #232323;
    @media all and (max-width: 700px) {
      flex-wrap: wrap;
    }
    &.pointer {
      cursor: pointer;
    }
    &__poster {
      img {
        height: 300px;
      }
    }
    &__info {
      align-items: center;
      padding-left: 15px;
      flex-basis: 78%;
      @media all and (max-width: 600px) {
        width: 100%;
      }
      .title, .subtitle {
        color: #fff;
      }
    }
  }
</style>

<script>
import { ref, toRefs, watch } from 'vue';
  export default {
    props: {
      film: Object,
      loading: Boolean
    },
    setup(props, {emit}) {
      const filmId = ref('');
      const { loading, film } = toRefs(props);

      const addFavorite = (event) => {
        console.log(event.target)
      }

      const passageToFilm = () => {
        emit('passageToFilm', film.value['filmId'])
      }

      watch(loading, (current, prev) => {
        filmId.value = film.value['filmId'];
      })

      return {
        addFavorite,
        passageToFilm,
        filmId
      }
    }
  }
</script>