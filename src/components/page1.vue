<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 01:10:53
 * @LastEditTime: 2019-09-01 14:32:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="">

    <inquirySearch></inquirySearch>
    <mapInquiry lat="22.574405" lng="114.095388"></mapInquiry>
  </div>
</template>

<script>
import mapInquiry from "@/components/mapInquiry";
import inquirySearch from "@/components/inquirySearch";
export default {
  name: "PageFirst",
  components: { mapInquiry, inquirySearch },
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
}
.info span {
  display: block;
  color: #999;
}
</style>
