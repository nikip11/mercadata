<template>
  <nav>
    <RouterLink
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.url"
      active-class="active"
    >
      <component :is="item.icon" />
      {{ item.title }}
    </RouterLink>
  </nav>
</template>
<script lang="ts" setup>
import Chart from "@/assets/icons/chart.svg";
import Laptop from "@/assets/icons/laptop.svg";
import ArrowRightBracket from "@/assets/icons/arrow-right-bracket.svg";

const menuItems = [
  {
    title: "Dashboard",
    icon: Chart,
    url: "/",
  },
  {
    title: "Tickets",
    icon: Laptop,
    url: "/tickets",
  },
  {
    title: "Logout",
    icon: ArrowRightBracket,
    url: "/logout",
  },
];
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: column;
  width: 275px;
  max-width: 100%;
  a {
    text-decoration: none;
    color: #333;
    padding: 10px 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &:hover {
      background-color: #f0f0f0;
      color: #000;
    }
    &.active {
      background-color: #cacaca;
      color: #fff;
    }
    svg {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
}
</style>
