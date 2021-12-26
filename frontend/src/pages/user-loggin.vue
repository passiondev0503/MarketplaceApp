<template>
<div class="details-layout">
  <div class="main-login">
    <section v-if="!goSign" class="login-form-container">
      <form class="login-form" @submit.prevent="logUser">
        <div class="login-header">
          <h2>Log in</h2>
        </div>
        <div class="login-body">
          <h2>Welcome back</h2>
          <input type="text" v-model="user.username" placeholder="Username" />
          <input
            type="password"
            v-model="user.password"
            placeholder="Password"
          />
          <p v-if="wrongUser" class="wrong-user">Wrong username or Password</p>
          <button class="login-btn" :class="{wrong : wrongUser}" :disabled="isDisabled">Login</button>
        </div>
        <div class="user-btns-container">
        <button @click="goSign = true" class="new-user-btn">New user?</button>
        <button @click="goDemo" class="new-user-btn">Demo user</button>
        </div>
      </form>
    </section>

    <section v-else class="login-form-container">
      <form class="login-form" @submit.prevent="saveUser">
        <div class="login-header">
          <h2>Sign Up</h2>
        </div>
        <div class="login-body">
          <h2>Welcome to Airdnd</h2>
          <input type="text" v-model="user.fullname" placeholder="Fullname" />
          <input type="text" v-model="user.username" placeholder="Username" />
          <input
            type="password"
            v-model="user.password"
            placeholder="Password"
          />

          <button
            class="login-btn"
            @click="goSign = true"
            :disabled="isDisabled"
          >
            Sign up
          </button>
        </div>
        <div class="user-btns-container">
        <button @click="goSign = false" class="new-user-btn">
          Already have an acount
        </button>
        <button @click="goDemo" class="new-user-btn">Demo user</button>
        </div>
      </form>
    </section>
    
  </div>
  </div>
</template>

<script>
import { showMsg } from "@/services/event-bus.service.js";
import { userService } from "@/services/user.service.js";
import exploreHeader from "@/cmps/explore-header";
export default {
  data() {
    return {
      goSign: false,
      wrongUser:false,
      user: {
        username: null,
        password: null,
        fullname: null,
      },
    };
  },
  created() {
    this.goSign = this.$route.params.signup;
    this.$store.commit({ type: "setUserPage", page: "details" });

  },
  methods: {
    goDemo(){
      this.user.username="nofi1"
      this.user.password="1234"
      this.logUser()
    },
    async saveUser() {
      const user = this.user;
      await this.$store.dispatch({ type: "signUser", user });
      this.$router.push("/stay");
      showMsg("New user logged in: " + JSON.parse(JSON.stringify(user)));
    },
    async logUser() {
      const user = this.user;
      try{
        const isUser = await this.$store.dispatch({ type: "setUser", user });
        console.log(isUser); 
        this.$router.push("/stay");
        showMsg("User logged in:" + JSON.parse(JSON.stringify(user.username)));
      } catch(err){
  // alert(`Wrong username or password`);
  this.wrongUser=true
        this.user = {
          username: null,
          password: null,
          fullname: null,
      }
      }
    },
  },
  computed: {
    isDisabled() {
      return !(this.user.username && this.user.password);
    },
  },
  watch: {
    "$route.params.signup"() {
      if (!this.$route.params.signup) {
        this.goSign = false;
      } else this.goSign = true;
    },
  },
  components: {
    exploreHeader,
  },
};
</script>