<template>
  <section class="preview-container" @click="stayDetails(stay._id)">
    <el-carousel
      class="img-carousel"
      arrow="always"
      indicator-position="none"
      :autoplay="false"
      :trigger="'click'"
      :loop="false"
    >
      <el-carousel-item v-for="(imgUrl, index) in stay.imgUrls" :key="index">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="heart"
          class="svg-inline--fa fa-heart-outline fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            style="color: rgb(247, 247, 247)"
            fill="currentColor"
            d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
          ></path>
        </svg>
        <svg
          @click.stop.prevent="setLiked"
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="heart"
          class="svg-inline--fa fa-heart fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            :class="{ liked: isLiked }"
            fill="currentColor"
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
          ></path>
        </svg>
        <img class="card-img" :src="`${imgUrl}`" />
      </el-carousel-item>
    </el-carousel>
    <div class="name-price-container">
      <div>
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
          <span class="reviews-rating">{{ setTotalRate }}</span>
          (<a>{{ stay.reviews.length }} {{ setReviews }}</a
          >)</span
        >
      </div>
      <div class="card-type-loc">
        <span class="type">{{ stay.type }}</span> <span v-if="stay.type.toLowerCase()==='outdoors'"> accommodation</span> in
        <span class="location"> {{ stay.loc.address }} </span>
      </div>
      <span class="stay-name">{{ stay.name }}</span>
    </div>
    <div>
      <span class="card-stay-price">{{
        stay.price.toLocaleString("en-US", {
          currency: "USD",
          style: "currency",
          maximumFractionDigits: 0,
        })
      }}</span
      >/night
    </div>
    <!-- <div class="preview-footer">
      <p>{{distance.toLocaleString('en-US',{ maximumFractionDigits: 0})}} kilometers away</p>
      <p>Mar 25 - Apr 2</p>
    </div> -->
  </section>
</template>

<script>
export default {
  name: "stay-pre",
  props: ["stay"],

  data() {
    return {
      isLiked: false,
      distance: null,
    };
  },
  created() {
    // this.getDistanceFromLatLonInKm(32.0853,34.7818,this.stay.loc.lat,this.stay.loc.lng)
  },
  methods: {
    stayDetails(stayId) {
      this.$router.push("/stay/" + stayId);
    },
    setLiked() {
      this.isLiked = !this.isLiked;
      this.$emit("setLiked", this.stay);
    },
    //     getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) {
    // var R = 6371;
    // var dLat = (lat2-lat1) * (Math.PI/180);
    // var dLon = (lng2-lng1) * (Math.PI/180);
    // var a =
    //   Math.sin(dLat/2) * Math.sin(dLat/2) +
    //   Math.cos((lat1)* (Math.PI/180)) * Math.cos((lat2)* (Math.PI/180)) *
    //   Math.sin(dLon/2) * Math.sin(dLon/2)
    //   ;
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    // this.distance = R * c;

    // },
  },
  computed: {
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
    setReviews() {
      if (this.stay.reviews.length !== 1) return "reviews";
      else return "review";
    },
  },
  components: {},
};
</script>
