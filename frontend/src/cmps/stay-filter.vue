<template>
  <div class="main-filter big-filter">
    <div class="filter filter-slot-lrg">
      <button class="filter-btn">
        <div class="filter-container">
          <button class="country filter-btn">
            <label>
              <p>Location</p>
              <input @click="isLocationModalOpen=true"
                class="filter-country-input"
                list="locations"
                type="search"
                placeholder="Where are you going?"
                v-model="filter.country"
              />
            </label>
          </button>
          <section v-if="isLocationModalOpen" class="location-options">
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
                <div @click="setCountry(country.name)">
                  <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" class="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
                  <span>
                    {{country.name}} - stays
                  </span>

                </div>

              </div>

            </div>

          </section>
          <!-- <datalist id="locations">
            <option>France</option>
            <option>Florida</option>
            <option>Iceland</option>
            <option>Thailand</option>
            <option>Netherlands</option>
          </datalist> -->
          <!-- <el-select v-model="value" value-key="value" placeholder="Select">
            <template slot="prefix"
              ><img class="prefix" :src="value.photo"
            /></template>
            <el-option
              v-for="item in countries"
              :key="item.value"
              :label="item.label"
              :value="item"
            >
              <img :src="item.photo" /> {{ item.label }}
            </el-option>
          </el-select> -->

          <button class="check-in filter-btn">
            <p>Check in</p>
          </button>
          <button class="check-in filter-btn">
            <p>Check out</p>
          </button>
          <el-date-picker
            @change="setDateOrder"
            v-model="value1"
            type="daterange"
            start-placeholder="Add dates"
            end-placeholder="Add dates"
          >
          </el-date-picker>
          <button @click="toggaleModal" class="check-in filter-btn">
            <p class="guest">Guests</p>
            <p class="check-in-add-guest bold" v-if="filterBy.guests">
              {{ filterBy.guests }} Guest<span v-show="filterBy.guests !== 1"
                >s</span
              >
            </p>
            <p class="check-in-add-guest" v-else>Add guests</p>
          </button>

          <div v-if="isModalOpen" class="guestt-modal">
            <div class="noff">
              <div>
                <h2>Adults</h2>
                <span>Age 13+</span>
              </div>
              <div>
                <button @click="setCountAdults('down')">-</button>
                <span class="guests">{{ currOrder.adults }}</span>
                <button @click="setCountAdults('up')">+</button>
              </div>
            </div>
            <div>
              <div>
                <h2>Kids</h2>
                <span>Ages 2–12</span>
              </div>
              <div>
                <button @click="setCountKids('down')">-</button>
                <span class="guests">{{ currOrder.kids }}</span>
                <button @click="setCountKids('up')">+</button>
              </div>
            </div>
          </div>

          <button @click="search" class="search-btn">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              class="svg-inline--fa fa-search fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { eventBusService, setFilter } from "../services/event-bus.service";
export default {
  name: "stay-filter",
  data() {
    return {
      isLocationModalOpen:false,
      isModalOpen: false,
      value1: "",
      countries:[
        {name:'France'},
        {name:'Thailand'},
        {name:'Icleand'},
        {name:'Florida'},
        {name:'Netherlands'}
        ],
        filter:{
          country:''
        }

    };
  },
  created() {
    if (this.currOrder.Dates) this.value1 = this.currOrder.Dates;
    else this.value1 = "";
        	// this.value = this.countries[0]
  },
  methods: {
    async search() {
      this.filterBy.country =this.filter.country      
      await eventBusService.$emit("setBigFilter", { ...this.filterBy });
      await eventBusService.$emit("saveOrder", this.currOrder);
      await this.$emit("filter");
      await eventBusService.$emit("updatePrices");
    },
    setCountry(country){
      this.filter.country=country;
      this.isLocationModalOpen=false

    },
    setCountAdults(val) {
      if (val === "down") {
        if (this.currOrder.adults === 0) return;
        this.currOrder.adults -= 1;
        this.currOrder.guests -= 1;
        this.filterBy.guests -= 1;
      } else {
        this.currOrder.adults += 1;
        this.currOrder.guests += 1;
        this.filterBy.guests += 1;
      }
      eventBusService.$emit("saveOrder", this.currOrder);
    },
   
    setCountKids(val) {
      if (val === "down") {
        if (this.currOrder.kids === 0) return;
        this.currOrder.kids -= 1;
        this.currOrder.guests -= 1;
        this.filterBy.guests -= 1;
      } else {
        if (this.currOrder.kids === 0 && this.currOrder.adults === 0) {
          this.currOrder.adults += 1;
          this.currOrder.guests += 1;
          this.filterBy.guests += 1;
        }
        this.currOrder.kids += 1;
        this.currOrder.guests += 1;
        this.filterBy.guests += 1;
      }
      eventBusService.$emit("saveOrder", this.currOrder);
    },
    toggaleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
    setDateOrder() {
      this.currOrder.Dates = this.value1;
    },
  },

  computed: {
    filterBy() {
      const filter = JSON.parse(JSON.stringify(this.$store.getters.filterBy));
      return filter;
    },
    currOrder() {
      const order = JSON.parse(JSON.stringify(this.$store.getters.order));
      return order;
    },
    
  },
  components: {},
};
</script>
