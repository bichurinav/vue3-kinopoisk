<template>
  <section class="films-search films">
    <FilmItem v-for="item in films" :film="item" :key="getFilmId(item)" />
    <button
        v-if="totalPages > 2 && page !== totalPages"
        @click="loadFoundFilmMore"
        class="button is-primary"
        :class="loadingFilmsMore ? 'is-loading' : ''"
    >
      Загрузить еще
    </button>
  </section>
</template>

<style lang="scss">
</style>

<script>
import FilmItem from '@/components/FilmItem.vue'
import { useGetFilmId } from "@/components/hooks";
import {inject, ref} from "vue";

export default {
  props: {
    films: Array
  },
  components: { FilmItem },
  setup() {
    const loadingFilmsMore = ref(false);
    const getFilmId = useGetFilmId();
    const emitter = inject('emitter');
    const totalPages = inject('totalPages');
    const page = inject('page');

    const loadFoundFilmMore = () => {
      emitter.emit('loadFoundFilmMore');
    }

    emitter.on('loadingFilmsMore', (val) => {
      loadingFilmsMore.value = val;
    })

    return { getFilmId, loadFoundFilmMore, loadingFilmsMore, totalPages, page }
  }
}
</script>