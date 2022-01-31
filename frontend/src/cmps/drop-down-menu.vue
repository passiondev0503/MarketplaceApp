<template>
    <div>
  <button class="wrapping-btn big right-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-badge @click="OpenProfile" v-if="notification" :value="1" class="item">
            <button class="header-btn">
              ☰
              <img v-if="user" :src="user.imgUrl" alt="" />
              <img v-else src="https://res.cloudinary.com/di0utpbop/image/upload/v1638552963/airdnd/pngfind.com-default-image-png-6764065_c91w16.png"/>
            </button>
            </el-badge>

            <button v-else class="header-btn">
              ☰
              <img v-if="user" :src="user.imgUrl" alt="" />
              <img v-else src="https://res.cloudinary.com/di0utpbop/image/upload/v1638552963/airdnd/pngfind.com-default-image-png-6764065_c91w16.png"/>
            </button>

          </span>
          <el-dropdown-menu slot="dropdown">

            <router-link style="text-decoration:none;" :disabled="user" to="/login">
            <el-dropdown-item>Log in</el-dropdown-item>
            </router-link>

            <router-link style="text-decoration:none;" :disabled="user" to="/login/signup">
            <el-dropdown-item>Sign up</el-dropdown-item>
            </router-link>

            <router-link style="text-decoration:none;" to="/stay/edit">
            <el-dropdown-item>Host your home</el-dropdown-item>
            </router-link>

            <router-link v-if="user"  style="text-decoration:none;" :to="'/profile/'+user._id">
            <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>

            <el-dropdown-item v-if="user" @click.native="logOut()">Log out</el-dropdown-item>
            
          </el-dropdown-menu>
        </el-dropdown>
  </button>
    </div>
</template>

<script>
    export default {
        props:{
            notification:Boolean
        },
        methods:{
            logOut(){
                this.$emit('logOut')
            }
        },
        computed: {
    user() {

      return this.$store.getters.user;
    }
        }
    }
</script>
