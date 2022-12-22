<template>
  <header class="header">
    <div class="container">
      <nav class="navbar header__navbar">
        <div class="navbar-brand">
          <Logo />
        </div>
        <Search v-model="search" placeholder="Поиск фильма..."/>
        <div class="navbar-end">
          <div class="navbar-item">
            <RouterLink active-class="is-primary" class="navbar__favorite-button button is-light" to="/favorite">
              <span>Избранное <span class="counter theme-color">{{ counter }}</span></span>
              <img src="@/assets/favorite.png" alt="favorite-icon">
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
  setup(props, {emit}) {
    const search = ref('');
    const counter = inject('counter');
    let loadingSearchFilms = false;

    watch(search, (value, prevValue) => {
      (async () => {
        try {

          if (!value || value.length < 2) {
            emit('getFilmsByKeywords', [])
            emit('isFilmsFound', 'off-flag');
            return
          }

          loadingSearchFilms = true;
          emit('loadingSearchFilms', loadingSearchFilms);
          emit('isFilmsFound', 'off-flag');

          // Искусственная задержка
          setTimeout(async () => {
            const {data} = await axios.get(
                `https://kinopoiskapiunofficial.tech/api/v2.2/films/?keyword=${value}`,
                {
                  headers: {
                    'X-API-KEY': process.env.API_KEY,
                    'Content-Type': 'application/json',
                  },
                }
            );

            loadingSearchFilms = false;
            emit('loadingSearchFilms', loadingSearchFilms);

            if (data.items.length === 0) {
              emit('isFilmsFound', false)
              emit('getFilmsByKeywords', [])
              return
            }

            emit('getFilmsByKeywords', data.items)
            emit('isFilmsFound', 'off-flag')
          }, 1000)
        } catch (e) {
          console.error(e)
        }
      })()
    })

    return { search, counter }
  },
}
</script>