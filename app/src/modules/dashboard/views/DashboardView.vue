<template>
  <MainLayout>
    <h2>Dashboard</h2>
    <div class="container">
      <Container class="center-area">
        <Title class="title">Así vamos</Title>
        <Graphics />
      </Container>

      <Container class="right-area">
        <Title class="title">Los más comprados</Title>
        <TopProducts />
      </Container>

      <Container class="top-area">
        <Title class="title">Últimas compras</Title>
        <LastTickets />
      </Container>
    </div>
  </MainLayout>
</template>
<script lang="ts" setup>
import MainLayout from "@/shared/layouts/MainLayout.vue";
import Graphics from "../components/Graphics.vue";
import Container from "@/shared/components/Container.vue";
import Title from "@/shared/components/Title.vue";
import TopProducts from "../components/TopProducts.vue";
import LastTickets from "../components/LastTickets.vue";
</script>
<style lang="scss" scoped>
h2 {
  margin: 0 0 20px 0;
}
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 0.3fr 0.3fr 0.3fr 0.3fr;
  gap: 30px 30px;
  grid-auto-flow: row;
  grid-template-areas:
    "top-area top-area right-area"
    "center-area center-area right-area"
    "center-area center-area right-area"
    "center-area center-area right-area";
}

.center-area {
  grid-area: center-area;
}

.top-area {
  grid-area: top-area;
}

.right-area {
  grid-area: right-area;
}
</style>
