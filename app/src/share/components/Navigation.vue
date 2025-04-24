<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/tickets">Tickets</RouterLink>
    <RouterLink to="/logout">logout</RouterLink>
  </nav>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;

  li {
    display: inline-block;
    margin-right: 1rem;
  }
}
</style>
