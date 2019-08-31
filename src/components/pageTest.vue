<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 01:10:53
 * @LastEditTime: 2019-08-31 21:50:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="">
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
    <ul class="info">
      <li><span>经度：</span>{{ dragData.lng }}</li>
      <li><span>纬度：</span>{{ dragData.lat }}</li>
      <li><span>地址：</span>{{ dragData.address }}</li>
      <li><span>最近的路口：</span>{{ dragData.nearestJunction }}</li>
      <li><span>最近的路：</span>{{ dragData.nearestRoad }}</li>
      <li><span>最近的POI：</span>{{ dragData.nearestPOI }}</li>
    </ul>
    <div class="clr"></div>
  </div>
</template>

<script>
import mapDrag from "@/components/mapDrag";
export default {
  name: "PageFirst",
  components: { mapDrag },
  data() {
    return {
      dragData: {
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
      }
    };
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
    global.currentPath.data = [1];
  }
};
</script>

<style scoped>
.info {
  margin: 20px 0 0 10px;
  padding: 0;
  list-style: none;
  line-height: 30px;
  float: left;
}
.info span {
  display: block;
  color: #999;
}
</style>
