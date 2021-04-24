<template>
  <div class="home">
    <img alt="Game Logo" ref="logo" src="../assets/logo.svg" />
    <div ref="menu">
      <Menu />
    </div>
  </div>
</template>

<script lang="ts">
import {gsap} from "gsap";
import { Options, Vue } from "vue-class-component";
import Menu from "@/components/Menu.vue"; // @ is an alias to /src




@Options({
  components: {
    Menu,
  },
})
export default class Home extends Vue {


  mounted(){
    type RefsObject = {
      logo?: gsap.TweenTarget,
      menu?: gsap.TweenTarget
    }

    const refs: RefsObject = this.$refs;

    if(refs.logo && refs.menu){
        const all = [refs.logo, refs.menu]
        gsap.set(all, { autoAlpha: 0});
        const tl = gsap.timeline({defaults: { ease: 'power3.inOut'}});

        tl.fromTo(refs.logo, {y: '+=300'}, {y: "-=300", autoAlpha: 1, duration: 2})
        .fromTo(refs.logo, {y: '0'}, { y: '+=20', repeat: -1, yoyo: true, duration: 3})
        .to(refs.menu, {autoAlpha: 1, duration: 1.5}, "-=2")
    }
  }
}
</script>

<style lang="scss">
body{
  background-color: #986393;
}
</style>
