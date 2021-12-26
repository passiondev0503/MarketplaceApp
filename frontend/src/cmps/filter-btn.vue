<template>
  <section v-if="modalType">
    <button @click="toggleModal(modalType)" :class="getBtnClass(modalType)">
      {{ modalType }} <i :class="getModalClass"> </i>
    </button>
  </section>
</template>

<script>
export default {
  props: ["modalType", "status"],
  data() {
    return {
    };
  },
  methods: {
    toggleModal(modalType) {
      this.$emit("toggleModal", modalType);
    },
    getBtnClass() {
      return this.modalType === "price" ? "price-filter" : "type-filter";
    },
  },
  computed: {
    getModalClass() {
      return (this.status === this.modalType)? "el-icon-arrow-up": "el-icon-arrow-down";
    },
  },
};
</script>
