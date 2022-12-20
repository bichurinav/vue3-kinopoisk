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
              <span>Избранное</span>
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
    background: #fafafa;
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
import { ref, watch } from 'vue';
import axios from 'axios';

export default {
  components: { Logo, Search },
  setup(props, {emit}) {
    const search = ref('');
    let loadingSearchFilms = false;

    watch(search, (value, prevValue) => {
      (async () => {
        try {

          if (!value || value.length < 2) {
            emit('getFilmsByKeywords', [])
            emit('isFilmsFinded', 'off-flag');
            return
          }

          loadingSearchFilms = true;
          emit('loadingSearchFilms', loadingSearchFilms);
          emit('isFilmsFinded', 'off-flag');

          // Искусственная задержка
          setTimeout(async () => {
            const {data} = await axios.get(
                `https://kinopoiskapiunofficial.tech/api/v2.2/films/?keyword=${value}`,
                {
                  headers: {
                    'X-API-KEY': 'e65c87e8-7774-44e1-b959-03939022b580',
                    'Content-Type': 'application/json',
                  },
                }
            );

            loadingSearchFilms = false;
            emit('loadingSearchFilms', loadingSearchFilms);

            if (data.items.length === 0) {
              emit('isFilmsFinded', false)
              emit('getFilmsByKeywords', [])
              return
            }

            emit('getFilmsByKeywords', data.items)
            emit('isFilmsFinded', 'off-flag')
          }, 1000)
        } catch (e) {
          console.error(e)
        }
      })()
    })

    return { search }
  },
}
</script>