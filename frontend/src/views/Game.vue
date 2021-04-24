<template>
    <div class="gamemap">
      <Map/>
    <div>
    <div class="map__container" v-for="row in map" :key="row">
            <span  v-for="tile in row" :key="tile">
                <span v-if="tile.isCounty">
                  <img class="tile_img" src="../assets/countyfield.svg"/>
                </span>
                <span v-else>
                  <img src="../assets/blanktile.svg"/>
                </span>
            </span>
        </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Map from "../components/game/Map.vue";
import { generateMap } from '../engine/map'
import {Field} from '../engine/types';

@Options({
  components: {
    Map,
  }
})
export default class Home extends Vue {
  data(){
    return {
      map: generateMap(2)
    }
  }
  mounted(){
    console.log(this.$data)
  }
}
</script>

<style lang="scss">
.gamemap{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.map__container{

  margin: -25px 0;
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
