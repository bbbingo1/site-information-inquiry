<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-22 17:13:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index">
    <dynamic-field-resources-form ref="searchForm">
      <el-button slot="eventButton" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
    </dynamic-field-resources-form>
    <gaode-map lat="22.574405" lng="114.095388" :listMsg="currentListContent">
      <el-pagination background slot="pagination" :hide-on-single-page="true" layout="prev, pager, next" :current-page="currentPage" :page-size="pageSize" :total="total" @current-change="search"></el-pagination>
    </gaode-map>
  </div>
</template>

<script>
import DynamicFieldResourcesForm from "@/components/forms/DynamicFieldResourcesForm.vue";
import GaodeMap from "@/components/maps/GaodeMap.vue";
import serializer from "form-serialize";
import { getIndexSearchResults } from "@/api/config.js";

export default {
  name: "Index",
  components: {
    DynamicFieldResourcesForm,
    GaodeMap
  },
  beforeCreate: function() {
    this.$store.dispatch("setLevelInfo", [{ title: "首页", name: "index" }]);
  },
  data() {
    return {
      searchFormData: {},
      currentListContent: [],
      currentPage: 1,
      pageSize: 8,
      total: 0
    };
  },
  methods: {
    search(val = 0) {
      if (val) {
        this.currentPage = val;
      }
      this.searchFormData = serializer(
        this.$refs.searchForm.$refs.dynamicFiledForm.$el,
        { hash: true }
      );
      getIndexSearchResults(
        this.currentPage,
        this.pageSize,
        this.searchFormData
      ).then(res => {
        console.log(res.data);
        this.currentListContent = res.data.result;
        this.total = res.data.total;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>