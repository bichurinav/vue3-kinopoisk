<template>
  <ol class="list">
    <ListItem
      v-for="item in items"
      :key="item.filmId + Date.now()"
      :item="item"
    />
  </ol>
</template>

<script>
import axios from 'axios';
import ListItem from '@/components/ListItem.vue';
import { ref, onMounted } from 'vue';

export default {
  components: { ListItem },
  props: {
    count: {
      type: Number,
    },
  },
  setup(props, ctx) {
    const items = ref([]);

    const fetchFilms = async () => {
      try {
        const { data } = await axios.get(
          'https://kinopoiskapiunofficial.tech/api/v2.2/films/top',
          {
            headers: {
              'X-API-KEY': '50162aca-d235-47f3-a205-6fd273411341',
              'Content-Type': 'application/json',
            },
          }
        );
        items.value = data.films;
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(() => {
      fetchFilms();
    });

    return {
      items,
    };
  },
};
</script>
