<template>
  <section v-if="stay" class="stay-details details-layout">
    <!-- <p v-if="isLoading">Loading...</p> -->
    <div v-if="isLoading" class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <section v-else>
      <h1>{{ stay.name }}</h1>

      <div class="detsils-header">
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
          {{ setTotalRate }}
          (<a href="#anchor-reviews"
            >{{ stay.reviews.length }} {{ setReviews }}</a
          >)</span
        >
        <span>
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="medal"
            class="svg-inline--fa fa-medal fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z"
            ></path>
          </svg>
          Superhost</span
        >
        <a href="#anchor-map">{{ stay.loc.address }}</a>
      </div>
      <el-carousel
        class="img-carousel imgs-details"
        arrow="always"
        indicator-position="none"
        :autoplay="false"
        :trigger="'click'"
        :loop="false"
      >
        <el-carousel-item v-for="(imgUrl, index) in stay.imgUrls" :key="index">
          <img class="card-img" :src="`${imgUrl}`" />
        </el-carousel-item>
        </el-carousel>

      <div class="img-container">
        <img v-for="(img, index) in imgs" :key="index" :src="img" alt="" />
      </div>

      <section class="info-container">
        <div class="stay-info">
          <div class="info-header">
            <div>
              <h2>
                <span class="stay-name">{{ stay.type }}</span>
                <span v-if="stay.type.toLowerCase() === 'outdoors'">
                  accommodation</span
                >
                hosted by
                {{ stay.host.fullname }}
              </h2>
              <span
                >{{ stay.capacity }} Guests • {{ stay.bedroom }}
                {{ setBedrooms }} • {{ stay.beds }} {{ setBeds }} •
                {{ stay.bathrooms }} {{ setBaths }}
              </span>
            </div>
            <img :src="`${stay.host.imgUrl}`" />
          </div>

          <div class="main-info">
            <stay-info :stay="stay"></stay-info>

            <div class="description">
              <h2>Description</h2>
              <p>{{ stay.summary }}</p>
            </div>

            <stay-amenities></stay-amenities>
          </div>
        </div>

        <order-form @check="check" :stay="stay" :order="order"></order-form>
      </section>
      <stay-reviews
        @addReview="addReview"
        :stay="stay"
        :review="review"
        :user="user"
      ></stay-reviews>

      <section id="anchor-map" class="map-details">
        <h1>Where you’ll be</h1>
        <GmapMap
          class="map"
          :stay="stay"
          :options="{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: false,
            fullscreenControl: true,
            disableDefaultUi: false,
          }"
        />
        <h3>{{ stay.loc.address }}</h3>
        <p>{{ stay.around }}</p>
      </section>
    </section>
  </section>
</template>


<script>
import stayAmenities from "../cmps/stay-amenities.vue";
import stayInfo from "../cmps/stay-info.vue";
import stayReviews from "../cmps/stay-reviews.vue";
import GmapMap from "../cmps/map-details.vue";
import orderForm from "../cmps/order-form.vue";
import { stayService } from "../services/stay.service";
import { socketService } from "../services/socket.service";

export default {
  name: "stay-details",
  data() {
    return {
      stay: null,
      imgs: [],
      amenities: null,
      order: {},
      value: 3,
      user: null,
      review: {},
    };
  },
  created() {
    const { stayId } = this.$route.params;
    this.loadStay(stayId);
    this.loadOrder();
    this.$store.commit({ type: "setUserPage", page: "details" });
    this.user = this.loadUser();
    this.review = stayService.getEmptyReview();
    this.review.by = this.user;
  },
  methods: {
    async loadStay(stayId) {
      this.stay = await this.$store.dispatch({ type: "getStay", stayId });
      if (this.stay) {
        this.imgForDisplay();
      }
    },
    imgForDisplay() {
      var imgs = this.stay.imgUrls.slice(0, 5);
      this.imgs = imgs;
    },
    loadUser() {
      var user = this.$store.getters.user;
      if (!user)
        user = {
          _id: "u111",
          fullname: "guest",
          imgUrl: "https://source.unsplash.com/random/100x100/?face",
        };
      return user;
    },
    loadOrder() {
      this.order = JSON.parse(JSON.stringify(this.$store.getters.order));
    },
    async check() {
      const { _id, name, price } = this.stay;
      this.order.stay = { _id, name, price };
      this.order.buyer._id = this.user._id;
      this.order.buyer.fullname = this.user.fullname;
      this.order.hostId = this.stay.host._id;
      this.order.totalPrice =
        this.order.cleaning +
        this.order.service +
        this.order.totalDays * this.stay.price;
      this.order.createdAt = new Date().toLocaleDateString("en-US");
      const order = await this.$store.dispatch({
        type: "addOrder",
        order: JSON.parse(JSON.stringify(this.order)),
      });
      socketService.emit("addOrder", order);
    },
    async addReview() {
      this.review.date = new Date().toString().slice(3, 15);
      const details = {
        stayId: this.stay._id,
        review: JSON.parse(JSON.stringify(this.review)),
      };
      this.stay = await this.$store.dispatch({ type: "addReview", details });
      this.review = stayService.getEmptyReview();
      this.review.by = this.user;
    },
  },
  computed: {
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
    setBedrooms() {
      if (this.stay.bedroom > 1) return "bedrooms";
      else return "bedroom";
    },
    setBeds() {
      if (this.stay.beds > 1) return "beds";
      else return "bed";
    },
    setBaths() {
      if (this.stay.bathrooms > 1) return "baths";
      else return "bath";
    },
    setTotalRate() {
      if (!this.stay.reviews.length) {
        var total = 0;
      } else {
        var sum = this.stay.reviews.reduce((acc, review) => {
          return acc + review.rate;
        }, 0);
        var total = sum / this.stay.reviews.length;
      }

      return total.toFixed(2);
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  components: {
    GmapMap,
    orderForm,
    stayAmenities,
    stayInfo,
    stayReviews,
  },
};
</script>
