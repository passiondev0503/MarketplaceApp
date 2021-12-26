<template>
  <section class="card-list">
    <h1 class="stays-text" v-if="currCountry">{{staysCount}} Stays in {{currCountry}}</h1>
    <h1 class="stays-text" v-else> {{staysCount}} stays worldwide </h1>
    <ul class="card-grid">
      <li v-for="stay in stays" :key="stay._id">
        <stay-preview :stay="stay" @setLiked="$emit('setLiked', stay)"/>        
        <!-- <router-link v-if="userId===stay.host._id" :to="'/stay/edit/'+stay._id">Edit</router-link> -->
      </li>
    </ul>
  </section>
</template>


<script>
    import stayPreview from './stay-preview.vue'

export default {
  name: "stay-list",
      props: {
        stays:Array
      },

  data() {
    return {
      isLiked:false,
    };
  },
  created() {
  },
  methods: {
    setFilter(filterBy){
      this.$emit('setFilter',filterBy)
    }
  },
  computed: {
    userId(){
      if(this.$store.getters.user) return this.$store.getters.user._id
    },
    staysCount(){
      return this.stays.length
    },
    currCountry(){
      return this.$store.getters.currCountry
    }
    
  },
  components: {
    stayPreview,
  },
};
</script>

