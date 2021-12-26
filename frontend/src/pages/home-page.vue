<template>
<div>

  <section class="home-page main-layout">

    <div class="opening-screen full">
   
    <div>
    <div class="home-img-container main-layout" :class="{scrolled : scroll}">
    <img src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-49706308/original/8e59d82a-6c8e-4e9c-89bc-adbc9d797f32.jpeg?im_w=1200" />
    </div>
    <div class="explore-btn">
    <p class="opening-sentence">Not sure where to go? Perfect.</p>
    <button @click="setFilter(filterBy)"><span>I'm flexible</span></button>
    </div>
    </div>
    </div>

    <h2 class="inspirations">Inspiration for your next trip</h2>

    <div  class="top-cities" >
     <div @click="setLocFilter(city.name)" v-for="city in topCities" :key="city.name" class="city">
       <img :src=city.url >
        <div class="city-txt">
        <p>{{city.name}}</p>
        </div>
      </div>

        
    </div>

    
    <div class="host-img-container">
      <img src="https://res.cloudinary.com/di0utpbop/image/upload/v1638551091/airdnd/1_s3ZJrdHJn5A9jeaoS60M_Q_taacdw.jpg" alt="">
      <div class="on-host-img">
        <div>
      <h1>Questions</h1> <h1>about</h1>  <h1>hosting?</h1>
        </div>
      <button>Ask a Superhost</button>
      </div>
    </div>

  </section>

</div>
</template>


<script>
import appHeader from "../cmps/app-header";
import {orderService} from '../services/order.service'
import {eventBusService, SHOW_MSG} from '@/services/event-bus.service'

export default {
  name: "home-page",
  data() {
    return {
      scroll:null,
      order:null,
      filterBy:null,
      filterBy:{
        country:'',
        type:'',
        ailments:'',
        guests:null,
        Dates:"",
        type:[],
        fromPrice: 45,
        toPrice: 250,
        beds: 0,
        bedrooms: 0,
        bathrooms: 0,
      },
      topCities:[{
        name:'Netherlands',
        url:"https://res.cloudinary.com/di0utpbop/image/upload/v1638532176/airdnd/Amsterdam-The-lights-on-the-bridges_rwg49e.jpg"
      },
      {
        name:'Florida',
        url:"https://res.cloudinary.com/di0utpbop/image/upload/v1638532647/airdnd/Star_Island_overview_ybytse.jpg"
      },
    {
      name:'Iceland',
      url:"https://res.cloudinary.com/di0utpbop/image/upload/v1638532920/airdnd/iceland18_yexgqv.jpg"
    },
     {
      name:'France',
      url:"https://res.cloudinary.com/di0utpbop/image/upload/v1638533352/airdnd/55da01cd23e91286e4548a0c98ed8b7a_qe30hn.jpg"
    }]
    
    };
  },
  created() { 
    window.addEventListener('scroll', this.handleScroll);
     this.$store.commit({type:'setUserPage',page:'home'})
    this.$store.commit({type:'clearOrder'})
    const filterBy = this.filterBy
    // this.$store.dispatch({type:'resetFilter',filterBy})
     
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);

  },
  methods: {
    goTo(here){
  this.$router.push(here)
},
  handleScroll(e) {
      this.scroll = window.scrollY || window.scrollTop
    },
    setFilter(filterBy){
    this.filterBy = filterBy
    this.$store.dispatch({type:'setBigFilter', filterBy})
    this.$router.push('/stay')
    },
    
    // },
    // saveOrder(newOrder){
    // },
    setLocFilter(location){
      this.filterBy.country=location
      this.setFilter({...this.filterBy})
    }
    
   
  },
  computed: {
    
  },
  components: {
    appHeader,

  },
};
</script>
<style lang="scss" scoped>
.component-fade-enter-active {
  transition: all .3s ease;

}
.component-fade-leave-active {
  transition: all .1s 
  
}
.component-fade-enter, .component-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-80px) scale(0.1, 0.7);
  opacity: 0;
}
</style>
