<template>
<div class="explore-layout">

  <div class="edit-container">
    <div class="edit-side-show">
      <img class="side-image" :src="sideImages[pageCount]">
    </div>
    <div v-if="newStay" class="edit-main-show">

      <div v-if="!pageCount" class="edit-card">
    <p class="edit-header">First of all, give your listing a good, selling name</p>
    <input class="edit-input"  placeholder="Stay name" v-model="newStay.name">
<div class="card-address">

    <p class="edit-header">Where is it?</p>
    <input class="edit-input" list="countries" placeholder="Country" type="list" v-model="newStay.loc.country">

    <datalist id="countries">
    <option>Netherlands</option>
    <option>France</option>
    <option>Iceland</option>
    <option>Miami, Florida United States</option>
    </datalist>

    <input class="edit-input" type="text" placeholder="address" v-model="newStay.loc.address">
    <div>
    <a :disabled="!newStay.loc.address" @click="check=true">Check location</a>
    </div>
    <user-location v-if="check" :address="newStay.loc.address" @loc="setLoc"/>
    <a v-if="check" @click="reset">Reset location</a>

</div>

      </div>

<div v-if="pageCount===1" class="edit-card">
    <p class="edit-header">Provide your potential guest information regarding your listing</p>
    <textarea name="name" cols="40" rows="6" placeholder="Stay size, furniture, containing AC? etc." v-model="newStay.space"></textarea>
    <p class="edit-header">Provide your potential guest information regarding your listing</p>
    <textarea name="name" cols="40" rows="6" placeholder="General description" v-model="newStay.summary"></textarea>
</div>

<div v-if="pageCount===2" class="edit-card">
    <p class="edit-header">Provide your potential guest information regarding your listing</p>
    <textarea name="name" cols="40" rows="2" placeholder="Will your guests be restricted? or will they have the whole space?" v-model="newStay.acces"></textarea>
    <textarea name="name" cols="40" rows="2" placeholder="Any notes or notices worth pointing out?" v-model="newStay.notes"></textarea>
</div>

    <div v-if="pageCount===3" class="edit-card">
    <p class="edit-header">General information about the listing</p>
    <label>
      Type:
    <input class="edit-input" list="types" type="list" v-model="newStay.type">
    </label>
    <datalist id="types">
    <option>outdoors</option>
    <option>loft</option>
    <option>apartment</option>
    <option>villa</option>
    </datalist>
    <label>
      Capacity:
    <input class="edit-input-small" min="0" type="number" v-model="newStay.capacity">
    </label>
    <label>
      Bedrooms:
    <input class="edit-input-small" min="0" type="number" v-model="newStay.bedroom">
    </label>
    <label>
      Bathrooms:
    <input class="edit-input-small" min="0" type="number" v-model="newStay.bathrooms">
    </label>
    <label>
      Beds:
    <input class="edit-input-small" min="0" type="number" v-model="newStay.beds">
    </label>
<label>
  Price:
    <input class="edit-input" type="number" min="0" v-model="newStay.price">
</label>

    <p class="edit-header">Describe the listing's surroundings and transportation options</p>
    <textarea name="name" cols="40" rows="4" placeholder="What can guests do around your listing?" v-model="newStay.around"></textarea>
    <textarea name="name" cols="40" rows="4" placeholder="Describe common transportation methods in your listing's proximity" v-model="newStay.transit"></textarea>
      </div>

    <div v-if="pageCount===4" class="edit-card">
    <p class="edit-header">Finally, add at least five pictures of your listing</p>
    <img-upload @save="saveImg"/>
    </div>
    <div class="page-btns">
    <button  :disabled="pageCount===0" @click="setPageCount(-1)">Back</button>
    <button  v-if="pageCount<4" @click="setPageCount(1)">Next</button>
    <button  :disabled="imgCount<4" v-if="pageCount===4" @click="saveStay">Submit listing</button>
    </div>
    </div>
  </div>

</div>
</template>


<script>
import userLocation from '@/cmps/user-location';
import imgUpload from '@/cmps/img-upload';
export default {

  name: "stay-edit",
  props:{
    stay:Object
  },
  data() {
    return {
      newStay:null,
      pageCount:0,
      imgCount:0,
      check:false,
      sideImages:[
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638899198/airdnd/Airbnb-More-Guests-1030x687_kw2pyp.jpg",
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638899204/airdnd/dc60abc6-a945-4b02-9b23-cc00d1077cd6_ahdxwg.jpg",
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638899196/airdnd/FB_What-kind-of-Airbnb-Host-are-you_xfabxh.jpg",
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638544563/airdnd/64f39605-fef0-4ef0-a0f8-caa6c6e011f2_1_abv9oz.webp",
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638899689/airdnd/shutterstock_1151446655-1_optimized-scaled-e1633100162370_tjbyfn.jpg",
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638899192/airdnd/travel-1_llqstg.jpg",
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638550973/airdnd/https___specials-images.forbesimg.com_imageserve_610c19de8bf014c44b4537a9_0x0_o1jn7p.jpg",
        "https://res.cloudinary.com/di0utpbop/image/upload/v1638899205/airdnd/6c9a9a99-9c38-417e-a7f5-a45ede9b3407-1532627926_ihvsol.jpg",
      ]

    };
  },
  async created() {
    if (!this.stay){
      this.addStay()
    }
      this.$store.commit({type:'setUserPage',page:'userPage'})
    // this.$store.commit({type:'clearOrder'})


  },
  methods: {
    reset(){
      this.newStay.loc.address=null
      this.newStay.loc.country=null
      this.click=false
    },
    async addStay(){
      this.newStay= await this.$store.dispatch({type:'getStay'})
      this.newStay.host._id=this.user._id
      this.newStay.host.fullname=this.user.fullname
      this.newStay.host.imgUrl=this.user.imgUrl
    },
    setLoc(loc){
      this.newStay.loc.lat=loc.lat
      this.newStay.loc.lng=loc.lng
    },
    saveImg(imgUrl) {
      this.newStay.imgUrls.push(imgUrl)
      this.imgCount+=1
    },
    setPageCount(pulusOrMinus){
      this.pageCount+=pulusOrMinus
    },
    saveStay(){
      this.$store.dispatch({type:"addStay",stay:this.newStay})
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    }
  },
  components: {
    userLocation,
    imgUpload,
  },
};
</script>
