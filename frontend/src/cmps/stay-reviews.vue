<template>
  <section id="anchor-reviews" class="reviews">
    <h1>
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
      <span>• {{ stay.reviews.length }} {{ setReviews }}</span>
    </h1>

    <div class="review-container">
      <div v-for="review in reviewsToShow" :key="review.id">
        <div class="review-details">
          <div>
            <img :src="`${review.by.imgUrl}`" />
            <div class="user-details">
              <span>{{ review.by.fullname }}</span>
              <div>
                {{ review.date }}
              </div>
            </div>
          </div>

          <p>{{review.txt }}</p>
        </div>
      </div>
    </div>

    <button @click="openReviews"  class="show-more" v-if="stay.reviews.length>6" >Show all {{stay.reviews.length}} reviews</button>

    <div :class="{'open-modal':showAllReviews}" class="reviews-modal" v-if="showAllReviews">
      <button @click="closeReviews"> X </button>
       <h1>
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
      <span>• {{ stay.reviews.length }} {{ setReviews }}</span>
    </h1>
       <div class="all-reviews">
      <div v-for="review in stay.reviews" :key="review.id">
        <div class="review-details">
          <div>
            <img :src="`${review.by.imgUrl}`" />
            <div class="user-details">
              <span>{{ review.by.fullname }}</span>
              <div>
                {{ review.date }}
              </div>
            </div>
          </div>

          <p>{{ review.txt }}</p>
        </div>
      </div>
    </div>
    </div>



    <div class="add-review">
      <h1>Add review</h1>
      <div class="review-details">
        <div>
          <img :src="`${user.imgUrl}`" />
          <div class="user-details">
            <span>{{ user.fullname }}</span>
            <div>
              {{ review.date }}
            </div>
          </div>
        </div>
      </div>

      <el-rate
        class="user-rate"
        v-model="review.rate"
        :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
        show-text
      >
      </el-rate>
      <div class="add-review-txt">
        <textarea
          v-model="review.txt"
          type="text"
          name="txt"
          autocomplete="off"
          placeholder="Write your opinion about this stay..."
        ></textarea>
        <button @click.prevent="addReview">send</button>
      </div>
    </div>
  </section>
</template>
   



<script>
export default {
  name: "stay-reviews",
  props: {
    stay: Object,
    review: Object,
    user: Object,
  },

  data() {
    return {
      showAllReviews:false,
    };
  },
  created() {},
  methods: {
    addReview() {
      this.$emit("addReview", this.review);
    },
    openReviews(){
      this.showAllReviews = true

    },
    closeReviews(){
            this.showAllReviews = false

    }
  
  },
  computed: {
     
    setReviews() {
      if (this.stay.reviews.length > 1) return "reviews";
      else return "review";
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
    reviewsToShow(){
      var reviews = this.stay.reviews.slice(0, 6);
     return reviews
    }

  },
  components: {},
};
</script>



