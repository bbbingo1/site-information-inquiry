<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 01:10:53
 * @LastEditTime: 2019-08-31 21:52:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="">
    <mapInquiry lat="22.574405" lng="114.095388"></mapInquiry>
    <ul class="info">
    </ul>
    <div class="clr"></div>
  </div>
</template>

<script>
import mapInquiry from "@/components/mapInquiry";
export default {
  name: "PageFirst",
  components: { mapInquiry },
  data() {
    return {
      InquiryData: {
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
    InquiryMap(data) {
      this.InquiryData = {
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
