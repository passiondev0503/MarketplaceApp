<template>
<div  class="header-container">

<dynamic-header :explore="explore" :details="details" :isScroll="isScroll"/>
</div>

</template>

<script>

import dynamicHeader from '@/cmps/dynamic-header'
import {orderService} from '@/services/order.service'
import {eventBusService, SHOW_MSG} from '@/services/event-bus.service'
export default {
  props:{
    explore:Boolean,
    details:Boolean
  },

  data() {
    return {
      loggedInUser: null,
      scroll:null,
  }
  },
  async created() {
    window.addEventListener('scroll', this.handleScroll);
     this.$store.commit({type:'setUserPage',page:'home'})
     eventBusService.$on('setFilter',filterBy=>{
       this.$store.dispatch({type:'setFilter', filterBy})
       if (this.currPage) this.$router.push('/stay')
     })
      eventBusService.$on('setBigFilter',filterBy=>{
       this.$store.dispatch({type:'setBigFilter', filterBy})

       if (this.$store.getters.userPage==='home' ||this.$store.getters.userPage==='details')this.$router.push('/stay')
     })
     eventBusService.$on('saveOrder',newOrder=>{
       const order=newOrder
       this.$store.commit({type:'setOrder', order})

      })
      eventBusService.$on('resetFilter',filterBy=>{
      this.$store.dispatch({type:'resetFilter', filterBy}) 
      })
      eventBusService.$on('updatePrices',value =>{
      })
      
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
 
    handleScroll(e) {
      this.scroll = window.scrollY || window.scrollTop
    },
    goTo(here) {
      this.$router.push(here);
    },
    setFilter(filterBy){
    this.filterBy = filterBy
    this.$store.dispatch({type:'setFilter', filterBy})
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isScroll(){
      if(this.scroll){
        return true
      }else{
        return false
      }
    },       
    currPage(){
      if (this.$store.getters.userPage!=='explore') return true
    },
  
  },
  components:{
    dynamicHeader,  
    },

};
</script>
