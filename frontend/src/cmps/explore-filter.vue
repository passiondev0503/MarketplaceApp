<template>
  <section class="relative-to-filter">
    <div v-if="modalTypes" class="filter-options">
      <div
        v-for="modalType in modalTypes"
        :key="modalType"
        class="filter-options"
      >
        <filter-btn
          :key="modalType"
          :modalType="modalType"
          :status="status"
          @toggleModal="toggleModal"
          @getModalClass="getModalClass"
        >
        </filter-btn>
      </div>
    </div>

    <div v-if="modalType === 'price'" class="price-modal-filter">
      <h1>The average nightly price is {{ avg }} $</h1>
      <HistogramSlider
        class="diagram"
        :width="220"
        :bar-height="70"
        :data="prices"
        :barGap="3"
        :barWidth="6"
        :block="false"
        labelColor="#b0b0b0"
        primaryColor="#b0b0b0"
        @finish="start"
        :updateColorOnChange="true"
      />

      <div class="price-limit">
        <div class="input-container">
          <div class="filter-text">min Price</div>
          <div class="margin-left">
            <span>$</span>
            <input v-model="filterBy.fromPrice" type="number" />
          </div>
        </div>

        <div class="input-container">
          <div class="filter-text">max Price</div>
          <div class="margin-left">
            <span>$</span>
            <input v-model="filterBy.toPrice" type="number" />
          </div>
        </div>
      </div>
      <hr />
      <div class="actions-btn">
        <button @click="resetPriceFilter">Clear</button>
        <button @click.prevent="setFilter">Save</button>
      </div>
    </div>

    <div v-if="modalType === 'type'" class="type-modal-filter">
      <el-checkbox class="label" v-model="type.outdoors">Outdoors</el-checkbox>
      <el-checkbox class="label" v-model="type.villa">Villa</el-checkbox>
      <el-checkbox class="label" v-model="type.apartment"
        >Apartment</el-checkbox
      >
      <el-checkbox class="label" v-model="type.loft">Loft</el-checkbox>
      <hr />
      <div class="actions-btn">
        <button @click="resetTypeFilter">Clear</button>
        <button @click.prevent="setTypeFilter">Save</button>
      </div>
    </div>

    <div v-for="(type, index) in types" :key="index">
      <div v-if="modalType === type" :class="gettModalClass(index)">
        <div class="noff">
          <div>
            <h2>{{ type }}</h2>
          </div>
          <div>
            <button @click="setCountBeds('down', type)">
              <i class="el-icon-minus"></i>
            </button>
            <span class="guests">{{ filterBy[type] }}</span>
            <button @click="setCountBeds('up', type)">
              <i class="el-icon-plus"></i>
            </button>
          </div>
        </div>
        <div class="actions-btn">
          <button @click="filterBy.beds = 0">Clear</button>
          <button @click.prevent="setFilter">Save</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FilterBtn from "./filter-btn.vue";
import { eventBusService, updatePrices } from "../services/event-bus.service";
export default {
  props: {},
  data() {
    return {
      avg: null,
      prices: null,
      modalType: "",
      status: "",
      modalTypes: ["guests", "price", "type", "beds", "bedrooms", "bathrooms"],
      types: ["guests", "beds", "bedrooms", "bathrooms"],
      filterBy: {},
      type: {
        villa: false,
        apartment: false,
        outdoors: false,
        loft: false,
      },
      min: Infinity,
      max: -Infinity,
    };
  },
  created() {
    this.filterBy = JSON.parse(JSON.stringify(this.filterByy));
    this.modalPrices();
  },

  methods: {
    toggleModal(type) {
      if (this.modalType === type) {
        this.status = "";
        this.modalType = "";
      } else {
        this.modalType = type;
        this.status = type;
      }
    },
    modalPrices() {
      this.prices = this.allPrices;
      // const prices=[];
      // this.stays.map((stay)=>{
      // prices.push(stay.price)
      // })
      // this.prices=prices
      const avgPrice = this.getAvg(this.allPrices);
      this.avg = Math.round(avgPrice);
    },
    getAvg(prices) {
      const sum = prices.reduce(function (acc, price) {
        return (acc += price);
      }, 0);
      const avg = sum / prices.length;
      return avg;
    },
    start(ev) {
      this.filterBy.fromPrice=ev.from
      this.filterBy.toPrice=ev.to
      // this.filterBy.fromPrice = this.min - 30;
      // this.filterBy.toPrice = this.max + 30;
    },

    setFilter() {
      const filterBy = JSON.parse(JSON.stringify(this.filterBy));
      eventBusService.$emit("setFilter", filterBy);
      this.status = "";
      this.modalType = "";
    },
    setCountBeds(val, type) {
      if (val === "down") {
        if (this.filterBy[type] === 0) return;
        this.filterBy[type] -= 1;
      } else {
        this.filterBy[type] += 1;
      }
    },
    setCountBedrooms(val) {
      if (val === "down") {
        if (this.filterBy.bedrooms === 0) return;
        this.filterBy.bedrooms -= 1;
      } else {
        this.filterBy.bedrooms += 1;
      }
    },
    setCountBathrooms(val) {
      if (val === "down") {
        if (this.filterBy.bathrooms === 0) return;
        this.filterBy.bathrooms -= 1;
      } else {
        this.filterBy.bathrooms += 1;
      }
    },
    resetPriceFilter() {
      this.filterBy.fromPrice = this.min - 30;
      this.filterBy.toPrice = this.max + 30;
    },
    setTypeFilter() {
      const types = [];
      if (this.type.villa) types.push("villa");
      if (this.type.outdoors) types.push("outdoors");
      if (this.type.apartment) types.push("apartment");
      if (this.type.loft) types.push("loft");
      this.filterBy.type = types;
      const filterBy = { ...this.filterBy };
      eventBusService.$emit("setFilter", filterBy);
      this.status = "";
      this.modalType = "";
    },
    resetTypeFilter() {
      this.type = {
        villa: false,
        apartment: false,
        outdoors: false,
        loft: false,
      };
    },
    getModalClass(status) {
      this.status === status;
    },
    gettModalClass(index) {
      if (index === 0) {
        return "beds-modal-filter guests";
      }else if (index === 1) {
        return "beds-modal-filter beds";
      }else if (index === 2) {
        return "beds-modal-filter bedrooms";
      } else if (index === 3){
        return "beds-modal-filter bathrooms";
      }       
    },
  },
  computed: {
    filterByy() {
      return this.$store.getters.filterBy;
    },
    stays() {
      return this.$store.getters.tempStays;
    },
    allPrices() {
      const prices = [];
      this.stays.map((stay) => {
        prices.push(stay.price);
      });

      prices.forEach((num) => {
        this.max = num > this.max ? num : this.max;
        this.min = num < this.min ? num : this.min;
      });
      prices.push(this.max + 30, this.min - 30);
       this.filterBy.toPrice = this.max+30
      this.filterBy.fromPrice = this.min-30
      return prices;
    },
  },
  watch: {
    allPrices() {
      this.prices = this.allPrices;
      const avgPrice = this.getAvg(this.allPrices);
      this.avg = Math.round(avgPrice);
    },
  },
  components: {
    FilterBtn,
  },
};
</script>
