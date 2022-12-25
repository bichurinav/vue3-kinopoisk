<template>
  <header class="header">
    <div class="container">
      <nav class="navbar header__navbar">
        <div class="navbar-brand">
          <Logo />
        </div>
        <Search v-model="search" placeholder="Поиск фильма..." />
        <div class="navbar-end">
          <div class="navbar-item">
            <RouterLink
              active-class="is-primary"
              class="navbar__favorite-button button is-light"
              to="/favorite"
            >
              Избранное
              <span class="counter theme-color">{{ counter }}</span>
              <img src="@/assets/favorite.png" alt="favorite-icon" />
            </RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  background: #fff;
  box-shadow: 0 1px 5px silver;

  &__navbar {
    background: inherit;
  }

  .navbar {
    &__favorite-button img {
      width: 20px;
      height: auto;
      margin-left: 5px;
    }
    .counter {
      padding-left: 5px;
    }
  }
}
</style>

<script>
import Logo from '@/components/Logo.vue';
import Search from '@/components/Search.vue';
import { ref, watch, inject } from 'vue';
import axios from 'axios';

export default {
  components: { Logo, Search },
  setup(props, { emit }) {
    const search = ref('');
    const counter = inject('counter');
    let loadingSearchFilms = false;
    const emitter = inject('emitter');
    const page = inject('page');
    const totalPages = inject('totalPages');
    const storeS = inject('storeSearchFilms');

    const getFetchSearchFilms = async (searchValue, type = '', page = 1) => {
      try {
        if (!searchValue || searchValue.length < 2) {
          emit('getFilmsByKeywords', []);
          emit('isFilmsFound', 'off-flag');
          return;
        }

        if (type !== 'loadMore') {
          loadingSearchFilms = true;
          emit('loadingSearchFilms', loadingSearchFilms);
          emit('isFilmsFound', 'off-flag');
        }

        if (type === 'loadMore') {
          emitter.emit('loadingFilmsMore', true);
        }

        // Искусственная задержка
        setTimeout(async () => {
          const { data } = await axios.get(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/?keyword=${searchValue}&page=${page}`,
            {
              headers: {
                'X-API-KEY': process.env.API_KEY,
                'Content-Type': 'application/json',
              },
            }
          );

          emitter.emit('kek', 123123);

          if (type !== 'loadMore') {
            loadingSearchFilms = false;
            emit('loadingSearchFilms', loadingSearchFilms);
          }

          if (data.items.length === 0) {
            emit('isFilmsFound', false);
            emit('getFilmsByKeywords', []);
            return;
          }

          if (type === 'loadMore') {
            emitter.emit('loadingFilmsMore', false);
          }

          storeS.value.addSearchFilms(data.items);

          if (type !== 'loadMore') {
            emit('getTotalPages', data.totalPages);
            emit('isFilmsFound', 'off-flag');
          }

          emit('getFilmsByKeywords', storeS.value.getSearchFilms());
        }, 1000);
      } catch (e) {
        console.error(e);
      }
    };

    emitter.on('loadFoundFilmMore', () => {
      if (page.value === totalPages.value) {
        return;
      }
      if (page.value < totalPages.value) {
        page.value += 1;
      }
      getFetchSearchFilms(search.value, 'loadMore', page.value);
    });

    watch(search, (value, prevValue) => {
      page.value = 1;
      totalPages.value = 1;
      storeS.value.delSearchFilms();
      getFetchSearchFilms(value);
    });

    return { search, counter };
  },
};
</script>
