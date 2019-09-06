<template>
  <div class="navicon">
    <i class="fa fa-bars fa-2x" :class="{'fa-rotate-90':isCollapse}"  @click="toggleClick"></i>
  </div>
</template>

<script>
export default {
  name: 'HamBurger',
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$store.dispatch('toggleSidear')
    },
  },
};
</script>

<style lang="scss" scoped>
  //HamBar
  .navicon {
    margin: 15px;
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
</style>
