<template>
  <div class="hello">

    <router-link to="/game">
      <img class="gamebutton" alt="Start Singleplayer Game Button" src="../assets/SINGLEPLAYER.svg" />
    </router-link>
    <router-link to="/rules">
      <img class="gamebutton" alt="Rules Game Button" src="../assets/RULES.svg" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    msg: String,
  },
})

export default class Menu extends Vue {
  msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.gamebutton{
  transition: 0.5s;
  margin: 30px;
  max-width: 400px;
}
.gamebutton:hover{
  cursor: pointer;
  transform:scale(1.2);
}
</style>
