<template>
  <div class="search navbar-item">
    <div class="panel-block">
      <p class="control has-icons-left">
        <input :value="modelValue" @input="updateInput" class="input" type="text" :placeholder="placeholder">
        <span class="icon is-left">
          <i class="fa fa-search fa-fw search__icon" aria-hidden="true"></i>
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
  .search {
    &__icon {
      position: relative;
      top: 8px;
      left: 8px;
    }
  }
</style>

<script>
import { debounce } from "@/utils.js";

export default {
  props: {
    placeholder: String,
    modelValue: String
  },
  setup(props, { emit }) {
    const updateInput = debounce((event) => {
      const value = event.target.value;
      emit("update:modelValue", value)
    }, 800);
    return {
      updateInput
    }
  }
}
</script>