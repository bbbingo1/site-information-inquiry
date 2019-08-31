<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 01:10:53
 * @LastEditTime: 2019-08-29 17:35:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="">
    <mapDrag @drag="dragMap"></mapDrag>
  </div>
</template>

<script>
import mapDrag from "@/components/mapDrag";
export default {
  name: "PageSecond",
  components: { mapDrag },
  data() {
    return {};
  },
  methods: {
    dragMap(data) {
      this.dragData = {
        lng: data.position.lng,
        lat: data.position.lat,
        address: data.address,
        nearestJunction: data.nearestJunction,
        nearestRoad: data.nearestRoad,
        nearestPOI: data.nearestPOI
      };
    }
  },
  created() {
    global.currentPath.data = [2]
  },
};
</script>

<style scoped lang='scss'>
</style>
