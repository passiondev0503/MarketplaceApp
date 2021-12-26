<template>
    <section class="location-options home">
      <button @click="toggleModal"><div class="icon-container">
                <i class="el-icon-arrow-left"></i>
              </div></button>
            <div class="countries-modal-title">
            <span>GO ANYWHERE, ANYTIME</span>
            </div>
            <div @click="search" class="explore-button-container">
              <div class="explore-button">
              <div >
                <span class="flexible-text">I'm flexible</span>
              </div>
              <div class="icon-container">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
              </div>
              <div class="top-cities-text">
                <span>TOP CITIES</span>
              </div>
            <div class="stays-options">
              <div v-for="(country,index) in countries" :key="index">
                <div @click="setLoc(country.name.toLowerCase())">
                  <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
                  <span>
                    {{country.name}} - stays
                  </span>
                </div>

            </div>      

            </div>

          </section>    
</template>

<script>
import {eventBusService, SHOW_MSG} from '@/services/event-bus.service'
export default ({
    data(){
        return {
         countries:[
        {name:'France'},
        {name:'Thailand'},
        {name:'Icleand'},
        {name:'Florida'},
        {name:'Netherlands'}
        ]
      
        }
    },
    methods:{
    async search() {
      await eventBusService.$emit("setBigFilter", { ...this.filterBy });
      await this.$emit("filter");
      await eventBusService.$emit("updatePrices");
    },
    
    setLoc(country){
        this.filterBy.country=country;
        this.search()
    },
    toggleModal(){
      this.$emit("back");
    }
        // now just emit with type:'setBigFilter' with this.filterBy
    },
    computed:{
    filterBy() {
      const filter = JSON.parse(JSON.stringify(this.$store.getters.filterBy));
      return filter;
    },
    }
})
</script>
