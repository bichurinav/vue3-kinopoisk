<template>
  <li>
    <div>{{ item.nameRu }}</div>
    <div>{{ item.year }}</div>
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
};
</script>
