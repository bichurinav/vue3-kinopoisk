<template>
  <div class="film" @click="passageToFilm">
    <div class="film__inner">
      <div class="film__image">
        <img :src="film['posterUrlPreview']" alt="">
      </div>
      <div class="film__content">
        <h3 class="film__name">{{ film['nameRu'] || film['nameEn'] || film['nameOriginal'] }}</h3>
        <p class="film__rating">Рейтинг: <span class="theme-color">{{ film['rating'] || film['ratingKinopoisk'] || '-' }}</span></p>
        <Tags :genres="film['genres']" />
      </div>
    </div>
    <button @click.stop="addFilmToFavorite" class="film__btn-favorite" title="Добавить в избранное">
      <img src="@/assets/favorite.png" alt="favorite-icon">
    </button>
  </div>
</template>

<style lang="scss">
  .film {
    box-shadow: 0px 2px 3px silver;
    position: relative;
    background: #fff;
    display: flex;
    width: 100%;
    max-height: 120px;
    @media all and (max-width: 760px) {
      max-height: 100%;
      &__image {
        img {
          min-width: 70px;
          max-height: 100px;
        }
      }
    }
    &__inner {
      min-height: 100%;
      min-width: 100%;
      padding: 10px;
      display: flex;
      transition: all .3s;
      &:hover {
        cursor: pointer;
        opacity: 0.7;
        transform: scale(0.99);
      }
    }
    &__btn-favorite {
      position: absolute;
      background: transparent;
      right: 10px;
      border: solid 1px #eaeaea;
      border-radius: 5px;
      top: 50%;
      width: 48px;
      transform: translateY(-50%);
      :hover {
        opacity: .6;
        cursor: pointer;
      }
    }
    &__name {
      font-size: 18px;
    }
    &__image {
      img {
        height: 100%;
      }
    }
    &__content {
      padding-left: 10px;
      padding-right: 45px;
      display: flex;
      flex-direction: column;
    }
    .tags {
      font-size: 14px;
      &__item {
        background: #6e6e6e;
      }
    }
  }
</style>

<script>
import Tags from '@/components/Tags.vue'
import { useRouter } from "vue-router";
import { inject } from "vue";

export default {
  props: {
    film: Object
  },
  components: { Tags },
  setup(props) {
    const router = useRouter();
    const store = inject('store');


    const passageToFilm = () => {
      router.push(`/film/${props.film['kinopoiskId']}`)
    }

    const addFilmToFavorite = () => {
      const status = store.value.addFilm(props.film);
      if (status === false) {
        const name = props.film['nameRu'] || props.film['nameEn'] || props.film['originalName']
        alert(`Фильм: ${name} уже добавлен в избранное!`)
      }
    }

    return {
      passageToFilm,
      addFilmToFavorite
    }
  }
}
</script>