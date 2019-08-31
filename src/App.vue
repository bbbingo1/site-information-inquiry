<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 01:10:53
 * @LastEditTime: 2019-08-29 15:40:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div id="app">
    <m-header></m-header>
    <router-view />
  </div>
</template>

<script>
import MHeader from "@/components/header";
export default {
  name: "App",
  components: { MHeader }
};
</script>

<style>
body {
  margin: 0;
  font-size: 16px;
  font-family: "微软雅黑", "Microsoft Yahei", Verdana, sans-serif;
  min-width: 1002px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.active {
  background-color: #fff!important;
  color: #0091ea!important;
}
</style>
