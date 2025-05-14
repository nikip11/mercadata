<template>
  <div :class="['wrapper-title', props.class]">
    <h2><slot></slot></h2>
  </div>
</template>
<script lang="ts" setup>
// DEFINE PROPS  ======================================================================================================
const props = defineProps({
  class: {
    type: String,
    default: "",
  },
});
</script>
<style lang="scss" scoped>
.wrapper-title {
  font-weight: bold;
  h2 {
    margin: 0;
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
    line-height: normal;
  }
}
</style>
