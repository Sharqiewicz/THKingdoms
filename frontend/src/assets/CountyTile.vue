<template>

<svg class="svg_tile" width="100" height="95" viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 22.9765L47.7811 3.78801L96.5 23.0581V72.4007L50.3652 91.0415L3.5 72.3875V22.9765Z" :fill="main" :stroke="second" stroke-width="7"/>
</svg>

</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {Field} from "../engine/types";


@Options({
  props: {
    main:String,
    second:String,
    selected: Array
  },
})

export default class CountyTile extends Vue {
    main!: string;
    second!: string;
    selected!: Field[];
}
</script>

<style scoped>
</style>