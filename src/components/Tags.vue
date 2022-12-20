<template>
  <div class="tags">
    <div class="tags__inner">
         <span class="tags__item" v-for="item in genres">
          {{item['genre']}}
        </span>
    </div>
  </div>
</template>

<style lang="scss">
.tags {
  width: 100%;
  &__inner {
    display: flex;
    flex-wrap: wrap;
    width: inherit;
    margin: 5px 0 20px 0;
  }
  &__item {
    background: tomato;
    color: #fff;
    margin: 5px;
    padding: 5px;
  }
}
</style>

<script>
export default {
  props: {
    genres: Array
  }
}
</script>