<template>
  <div class="wrapper-logo" @click="$router.push('/')">
    <Logo />
    Mercadata
  </div>
</template>
<script lang="ts" setup>
import Logo from "@/assets/icons/logo.svg";
</script>
<style lang="scss" scoped>
.wrapper-logo {
  cursor: pointer;
  color: #333;
  font-weight: bold;
  text-align: center;
  margin: 10px auto 30px auto;
  width: 175px;
  display: flex;
  max-height: 30px;
  align-items: center;
  justify-content: center;
  svg {
    width: 30px;
    height: auto;
    margin-right: 5px;
  }
  &:hover {
    color: #000;
  }
}
</style>
