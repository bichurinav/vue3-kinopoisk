<template>
  <div class="film" @click="passageToFilm">
    <div class="film__inner">
      <div class="film__image">
        <img :src="film['posterUrlPreview']" alt="">
      </div>
      <div class="film__content">
        <h3 class="film__name">{{ film['nameRu'] || film['nameEn'] || film['nameOriginal'] }}</h3>
        <p class="film__rating">
          Рейтинг: <span class="theme-color">{{ film['rating'] || film['ratingKinopoisk'] || '-' }}</span>
        </p>
        <Tags :genres="film['genres']" />
      </div>
    </div>
    <button
        v-if="!film['isFavorite']"
        @click.stop="addFilmToFavorite(film)"
        class="film__btn-favorite"
        title="Добавить в избранное"
    >
      <img src="@/assets/favorite.png" alt="favorite-icon">
    </button>
    <div v-else class="film-buttons">
      <button
          @click.stop="markFilmWatched"
          class="film__btn-watched"
          :class="film['isWatched'] ? 'watched' : ''"
          :title="film['isWatched'] ? 'Фильм просмотрен' : 'Отметить фильм просмотренным'"
      >
        <i class="fa fa-binoculars" aria-hidden="true"></i>
      </button>
      <button @click.stop="delFilmFromFavorite" class="film__btn-del" title="Удалить из избранного">
        <i class="fa fa-trash theme-color" aria-hidden="true"></i>
      </button>
    </div>

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
    &-buttons {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      button {
        cursor: pointer;
        border: none;
        margin-bottom: 5px;
        border-radius: 5px;
        font-size: 18px;
        &:hover {
          transform: scale(1.1);
        }
      }
      .watched {
        color: #7dcb31;
      }
    }
    &__btn-watched {
      color: silver;
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
      cursor: pointer;
      background: transparent;
      right: 10px;
      border: solid 1px #eaeaea;
      border-radius: 5px;
      top: 50%;
      width: 48px;
      transform: translateY(-50%);
      :hover {
        opacity: .6;
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
import { useAddFilmToFavorite, useGetFilmId } from "@/components/hooks";

export default {
  props: {
    film: Object
  },
  components: { Tags },
  setup(props) {
    const router = useRouter();
    const store = inject('store');
    const emitter = inject('emitter');
    const addFilmToFavorite = useAddFilmToFavorite(store, emitter);
    const getFilmId = useGetFilmId();

    const passageToFilm = () => {
      router.push(`/film/${getFilmId(props.film)}`)
    }

    const delFilmFromFavorite = () => {
      const id = getFilmId(props.film)
      store.value.delFilm(id);
      router.go(0);
    }

    const markFilmWatched = () => {
      const id = getFilmId(props.film)
      store.value.markFilm(id);
      router.go(0);
    }

    return {
      passageToFilm,
      addFilmToFavorite,
      delFilmFromFavorite,
      markFilmWatched
    }
  }
}
</script>