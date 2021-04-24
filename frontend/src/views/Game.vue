<template>
    <Map/>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Map from "../components/game/Map.vue";
import { generateMap } from '../engine/map'

@Options({
  components: {
    Map,
  },
})
export default class Home extends Vue {
  mounted(){


    generateMap(0)
  }
}
</script>

<style lang="scss">
</style>
