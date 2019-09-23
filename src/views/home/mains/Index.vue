<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-08 16:00:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="index">
    <dynamic-field-resources-form ref="searchForm">
      <el-button slot="eventButton" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
    </dynamic-field-resources-form>
    <gaode-map lat="22.574405" lng="114.095388"></gaode-map>
  </div>
</template>

<script>
import DynamicFieldResourcesForm from "@/components/forms/DynamicFieldResourcesForm.vue";
import GaodeMap from "@/components/maps/GaodeMap.vue";
import serializer from "form-serialize";

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
    };
  },
  methods: {
    search() {
        console.log(serializer(this.$refs.searchForm.$refs.dynamicFiledForm.$el, { hash: true }))
    },
  }
};
</script>

<style lang="scss" scoped>
</style>