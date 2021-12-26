<template>
  <div>
    <transition name="component-fade" mode="out-in">
    <component @filter="$emit('filter')" :explore="explore" :details="details" :userPage="userPage" :isScroll="isScroll" :is="headerType"></component>
</transition>
  </div>
</template>

<script>
import homeHeader from '@/cmps/home-header'
import exploreHeader from '@/cmps/explore-header'
export default {
  props:{
    isScroll: Boolean,

  },
  data() {
    return{
      explore:false,
      details:false,
      user:false
    }
        },
computed: {
    headerType() {
      if(this.currPage==='explore'){
        var header="explore-header"
              this.explore=true
              this.userPage=false
              this.details=false

      }else if(this.currPage==='details'){
        var header="explore-header"
              this.explore=false
              this.details=true
              this.userPage=false

      }else if(this.currPage==='userPage'){
        var header="explore-header"
              this.explore=false
              this.details=true
              this.userPage=true
      }else if(this.currPage==='home'){
          var header = "home-header";
              this.explore=false
              this.details=false
              this.userPage=false
      }
        return header;
    },
    currPage(){
      return this.$store.getters.userPage
    }

  },
  components:{
      homeHeader,
      exploreHeader
  }
}
</script>

<style lang="scss" scoped>
.component-fade-enter-active {
  transition: all .2s ease;
}
.component-fade-leave-active {
  transition: all .2s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(80px);
  opacity: 0;
  /* animation: shrink 2s linear; */

}
/* @keyframes shrink {
  20% {
    width: 80%
  }
  40% {
    width: 60%
  }
} */

</style>
