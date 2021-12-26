<template>
  <section class="order">
    <div class="order-form">
      <div class="order-price">
        <p>
          <span>{{ stayPrice }}</span
          > / night
        </p>

        <span>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="star"
            class="svg-inline--fa fa-star fa-w-18"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
            ></path>
          </svg>
          {{setTotalRate}} (<a href="#anchor-reviews">{{ stay.reviews.length }} {{ setReviews }}</a>)</span
        >
      </div>

      <div class="order-picker">
        <div class="block">
          <div class="check">
            <div>
              <h1>CHECK-IN</h1> 
              </div>
            <div>
             <h1>CHECK-OUT</h1> 
              </div>
          </div>
          <el-date-picker v-model="order.Dates" type="daterange">
          </el-date-picker>
        </div>
        <div class="guests" @click="toggleModal">
          <h2>GUESTS</h2>
          <span> {{ order.guests }} {{ setGuests }} </span>
        </div>
      </div>

      <div v-if="openModal" class="guest-modal">
        <div class="modal">
          <div>
            <h2>Adults</h2>
            <span>Age 13+</span>
          </div>
          <div>
            <button @click="setCountAdults('down')">-</button>
            <span class="guests">{{ order.adults }}</span>
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
            <span class="guests">{{ order.kids }}</span>
            <button @click="setCountKids('up')">+</button>
          </div>
        </div>
      </div>
      <el-button class="reserve" @click="check" :plain="true">{{ checkBtn }}</el-button>
      <div v-if="checked" class="total-order">
        <p>You won't be charged yet</p>

        <div>
          <span>{{ stayPrice }} x {{ setTotalDays }} nights</span>
          <span>{{ nightPrice }}</span>
        </div>
        <div>
          <span>Cleaning fee</span>
          <span> ${{ order.cleaning }}</span>
        </div>
        <div>
          <span>Service fee</span>
          <span>${{ order.service }}</span>
        </div>
        <div>
          <span>Total</span>
          <span>{{ setTotalPrice }}</span>
        </div>
      </div>
    </div>
    <!-- <div>Report this listing</div> -->
  </section>
</template>
   



<script>
export default {
  name: "order-form",
  props: ["stay", "order"],
  data() {
    return {
      checked: false,
      openModal: false,
    };
  },
  created() {},
  methods: {
    toggleModal() {
      this.openModal = !this.openModal;
    },
    setCountAdults(val) {
      if (val === "down") {
        if (this.order.adults === 0) return;
        this.order.adults -= 1;
        this.order.guests -= 1;
      } else {
        if (this.order.guests === this.stay.capacity) return;
        this.order.adults += 1;
        this.order.guests += 1;
      }
    },
    setCountKids(val) {
      if (val === "down") {
        if (this.order.kids === 0) return;
        this.order.kids -= 1;
        this.order.guests -= 1;
      } else {
        if (this.order.guests === this.stay.capacity) return;
        this.order.kids += 1;
        this.order.guests += 1;
      }
    },
    check() {
      if (this.checked) {
        this.$emit("check", this.order);
          this.$message({
          showClose: true,
          message: 'your order has been received.',
          type: 'success'
        });
        this.$router.push('/stay')
      }
      this.checked = true;
    },
  },
  computed: {
    setGuests(){
      if (this.order.guests > 1 || this.order.guests===0) return "guests";
      else return "guest";
    },
    stayPrice() {
      return this.stay.price.toLocaleString("en-US", {
        currency: "USD",
        style: "currency",
        maximumFractionDigits: 0,
      });
    },
    setReviews() {
      if (this.stay.reviews.length > 1) return "reviews";
      else return "review";
    },
    setTotalPrice() {
      var total =
        this.order.cleaning +
        this.order.service +
        this.order.totalDays * this.stay.price;
      return total.toLocaleString("en-US", {
        currency: "USD",
        style: "currency",
        maximumFractionDigits: 0,
      });
    },
    setTotalDays() {
      const date1 = Date.parse(this.order.Dates[0]);
      const date2 = Date.parse(this.order.Dates[1]);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.order.totalDays = diffDays;
      return diffDays;
    },
    nightPrice() {
      var total = this.order.totalDays * this.stay.price;
      return total.toLocaleString("en-US", {
        currency: "USD",
        style: "currency",
        maximumFractionDigits: 0,
      });
    },
    checkBtn() {
      if (this.checked) return "Reserve";
      else return "Check availability";
    },
    setTotalRate() {
      if(!this.stay.reviews.length){
        var total = 0
      } else{
        var sum =  this.stay.reviews.reduce((acc, review) => {
          return acc + review.rate;
        },0);
        var total = sum/this.stay.reviews.length
      }
    
      return total.toFixed(2)
    }
  },
  components: {},
};
</script>

