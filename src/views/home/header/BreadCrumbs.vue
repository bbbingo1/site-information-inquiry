<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-07 20:30:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bread-crumbs">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item :to="{ name: item.name }" v-for="item in levelList" :key="item.name">
          <span v-if="item.redirect==='noredirect'" class="no-redirect">{{item.title}}</span>
          <!--<router-link v-else :to="item.name">{{item.title}}</router-link>-->
          <span v-else :to="item.name">{{item.title}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadCrumbs",
  props: {
    levelList: Array
  }
};
</script>

<style lang="scss" scoped>
//BreadCrumbs
.bread-crumbs {
  position: absolute;
  left: 60px;
  top: 0;
  right: 340px;
  bottom: 0;
  padding: 10px;
  overflow: hidden;
  .el-breadcrumb {
    line-height: 40px;
  }
}
</style>
