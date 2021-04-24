<template>
  <div class="home">
    <img alt="Game Logo" src="../assets/logo.svg" />
    <Menu />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Menu from "@/components/game/Map.vue"; // @ is an alias to /src

@Options({
  components: {
    Menu,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
body{
  background-color: #986393;
}
</style>
