<template>
    <img class="game__background" alt="Game Field" src="../../assets/mainfield.svg" />
</template>

<script lang="ts">
import {Vue} from "vue-class-component";


export default class Map extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game__background{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}
</style>
