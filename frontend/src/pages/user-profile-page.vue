<template>
  <div class="details-layout">
    <div class="profile-container">
      <!-- <div class="side-bar-options">
        <button @click="setInfo('orders')">My orders</button>
        <button @click="setInfo('stays')">My stays</button>
      </div> -->

      <div class="main-bar">
        <div class="profile-options-container">
            <div
            @click="setInfo('orders')"
            class="main-bar-orders options"
            :class="{ focused: orders }"
          >
            <h3>Orders Inbox</h3>
            <div v-if="incommingOrders" class="orders-btns">
              <p>{{ incommingOrders.length }}</p>
            </div>
          </div>

 <div
            @click="setInfo('revenues')"
            class="main-bar-revenue options"
            :class="{ focused: revenues }"
          >
            <h3> Annual revenue</h3>
            <p>
              {{
                userRevenue.toLocaleString("en-US", {
                  currency: "USD",
                  style: "currency",
                  maximumFractionDigits: 0,
                })
              }}
            </p>
          </div>


          <div
            @click="setInfo('reviews')"
            class="main-bar-rating options"
            :class="{ focused: reviews }"
          >
            <h3>Avarage rating</h3>
            <p v-if="userStays">
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
              {{
                totalRating.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })
              }}
            </p>
          </div>
        

         

          <div
            @click="setInfo('stays')"
            class="main-bar-stays options"
            :class="{ focused: stays }"
          >
            <h3>Active Stays</h3>
            <p v-if="userStays">{{ userStays.length }}</p>
          </div>
        </div>

        <div class="user-info-container">
          <div v-if="revenues && revenuePerStay" class="revenue-container">
            <my-percentage-chart :chartData="revenuePerStay" />
          </div>

          <div class="stay-table">

             <el-table v-if="stays && userStays" :data="staysToShow" stripe style="width: 100%">
              <el-table-column prop="name" label="Name">
              </el-table-column>
              <el-table-column prop="loc.address" label="Address" >
              </el-table-column>
              <el-table-column prop="price" label="$/night" width="100px">
              </el-table-column>
              <el-table-column prop="likedByUsers.length" label="Likes" width="100px">
              </el-table-column>
            </el-table>
          </div>

          <div>           
            <div class="my-orders-table">

            <el-table v-if="orders && incommingOrders && inbox" :data="ordersToShow" stripe style="width: 100%">
              <el-table-column prop="buyer.fullname" label="Guest name">
              </el-table-column>
              <el-table-column prop="Dates" label="Stay Dates" >
              </el-table-column>
              <el-table-column prop="guests" label="Guests" width="100px">
              </el-table-column>
              <el-table-column prop="status" label="Status">
              </el-table-column>
              <el-table-column prop="totalPrice" label="Price">
              </el-table-column>
              <el-table-column prop="createdAt" label="Ordered at" >
              </el-table-column>
            </el-table>
            </div>



             <div class="orders-table">

            <el-table v-if="orders && userOrders && sent" :data="myOrdersToShow" stripe style="width: 100%">
              <el-table-column prop="Dates" label="Stay Dates">
              </el-table-column>
              <el-table-column prop="guests" label="Guests">
              </el-table-column>
              <el-table-column prop="status" label="Status">
              </el-table-column>
              <el-table-column prop="totalPrice" label="Price">
              </el-table-column>
              <el-table-column prop="createdAt" label="Ordered at" >
              </el-table-column>
            </el-table>
            </div>
          </div>

          <div class="reviews-table">

            <el-table v-if="reviews && userStays" :data="reviewsToShow" stripe style="width: 100%">
              <el-table-column prop="name" label="Stay name">
              </el-table-column>
              <el-table-column prop="review.by.fullname" label="User" width="120px">
              </el-table-column>
              <el-table-column prop="review.rate" label="Rating" width="100px">
              </el-table-column>
              <el-table-column prop="review.txt" label="Review">
              </el-table-column>
              <el-table-column prop="review.date" label="Review date" width="100px" >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myPercentageChart from "@/cmps/my-percentage-chart";
export default {
  data() {
    return {
      revenues: false,
      orders: true,
      stays: false,
      reviews: false,
      userStays: null,
      userOrders: null,
      allOrders: null,
      userRevenue: 0,
      incommingOrders: null,
      revenuePerStay: {},
      sent: false,
      inbox: true,
    };
  },
  created() {
    this.$store.commit({ type: "setUserPage", page: "userPage" });
    this.getStays();
    this.getUserOrders();
  },
  methods: {
    setInfo(showInfo) {
      this.closeAll();
      if (showInfo === "orders") {
        this.inbox=true
        this.setPendingOff()
        this.orders = true;
      } else if (showInfo === "stays") {
        this.stays = true;
      } else if (showInfo === "revenues") {
        this.revenues = true;
      } else if (showInfo === "reviews") {
        this.reviews = true;
      }
    },
    closeAll() {
      this.orders = false;
      this.stays = false;
      this.revenues = false;
      this.reviews = false;
    },
    async getStays() {
      if (!this.userStays) {
        const userId = this.user._id;
        this.userStays = await this.$store.dispatch({
          type: "getStayByUserId",
          userId,
        });
        this.userStays = JSON.parse(JSON.stringify(this.userStays))
      }
    },
    async getUserOrders() {
      if (!this.userOrders) {
        const userId = this.user._id;
        const filterBy = {
          userId,
        };
        this.userOrders = await this.$store.dispatch({
          type: "getUserOrders",
          filterBy,
        });
      }
      this.getAllOrders();
    },
    async getAllOrders() {
      this.allOrders = await this.$store.dispatch({ type: "getOrders" });
      this.setRevenue();
    },
    setRevenue() {
      this.incommingOrders = this.allOrders.filter((order) => {
        return order.hostId === this.user._id;
      });
        this.userRevenue += this.incommingOrders.reduce((acc, order) => {
          this.revenuePerStay[order.stay.name]
            ? (this.revenuePerStay[order.stay.name] += order.totalPrice)
            : (this.revenuePerStay[order.stay.name] = order.totalPrice);
  
          acc += order.totalPrice;
          return acc;
        }, 0);
    },
    setPendingOff() {
      if (this.pendingStaysOrders.length) {
        this.incommingOrders.forEach((order) => {
          order.status = "recieved";
          // this.$store.dispatch({ type: "updateOrder", order });
        });
      }
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    totalRating() {
      var ratings = 0;
      var reviewsNum = 0;
      this.userStays.forEach((stay) => {
        ratings += stay.reviews.reduce((acc, review) => {
          acc += Number(review.rate);
          reviewsNum += 1;
          return acc;
        }, 0);
      });
      return ratings / reviewsNum;
    },

    pendingUserOrders() {
      return this.userOrders.filter((order) => {
        return order.status === "pending";
      });
    },
    pendingStaysOrders() {
      return this.incommingOrders.filter((order) => {
        return order.status === "pending";
      });
    },
    ordersToShow(){
      this.incommingOrders = this.incommingOrders.map((order) => {
        console.log(order);
        order.totalPrice = order.totalPrice.toLocaleString("en-US", {currency: "USD",style: "currency",maximumFractionDigits: 0,})
        order.createdAt = order.createdAt.toString()
        order.Dates[0]=new Date(Date.parse(order.Dates[0])+24*60*60)
        order.Dates[1]=new Date(Date.parse(order.Dates[1])+24*60*60)
        order.Dates =  order.Dates[0].toString().slice(3,10) +' - '+ order.Dates[1].toString().slice(3,15)

        return order
      });
      //  this.incommingOrders.push(this.incommingOrders.map((order) => {
      //    return order
      // }))
         return this.incommingOrders
    },
    myOrdersToShow(){
      this.userOrders = this.userOrders.map((order) => {
        order.totalPrice = order.totalPrice.toLocaleString("en-US", {currency: "USD",style: "currency",maximumFractionDigits: 0,})
        order.createdAt = order.createdAt.toString()
        console.log('date',Date.parse(order.Dates[0]))
        order.Dates =  order.Dates[0].slice(0,10) +' - '+ order.Dates[1].slice(0,10)

        return order
      });
         return this.userOrders
    },
    staysToShow(){
      this.userStays = this.userStays.map((stay) => {
        stay.price = stay.price.toLocaleString("en-US", {currency: "USD",style: "currency",maximumFractionDigits: 0,})
        return stay
      });
         return this.userStays
    },
    reviewsToShow(){
     var reviews = this.userStays.map((stay)=>{
       var reviewObject = {
         name: stay.name,
         reviews: stay.reviews
       }

      return reviewObject
     })
     var reviewObjects = reviews.map((reviewObject)=> {
      var singleReview = reviewObject.reviews.map((review)=>{
         var rev=  {
           name: reviewObject.name,
           review
         }
         return rev
       })
       return singleReview
     })
     return reviewObjects.flat()

     
  }
  },
  
  components: {
    myPercentageChart,
  },
};
</script>
