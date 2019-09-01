<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 14:25:51
 * @LastEditTime: 2019-09-01 20:42:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search-box">
    <ul class="title">
      <li class="list_title"><a class="active">场地筛选</a></li>
    </ul>
    <div class="menus">
      <div style="margin:10px 5px">
        <el-radio-group v-model="radio1">
          <el-radio v-for="(item,index) in radioOpts" :key="index" :label="item.label"></el-radio>
        </el-radio-group>
      </div>
      <div v-show="showInput==1">
        <div class="inputItem" v-for="(item,index) in inputOpts1" :key="index">
          <div class="inputLabel">{{item.label}}</div>
          <div style="width:65%;display: inline-block;">
            <el-input size="small" v-model="item.vallue" placeholder=""></el-input>
          </div>
        </div>
      </div>
      <div v-show="showInput==2">
        <div class="inputItem" v-for="(item,index) in inputOpts2" :key="index">
          <div class="inputLabel">{{item.label}}</div>
          <div style="width:65%;display: inline-block;">
            <el-input size="small" v-model="item.vallue" placeholder=""></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { option } from "@/assets/inquiryOpt.js";

export default {
  name: "searching",
  data() {
    return {
      data: null,
      radio1: "酒店",
      radioOpts: null,
      showInput: 1,
      inputOpts1: null,
      inputOpts2: null
    };
  },
  watch: {
    radio1(val) {
      var idx = this.radioOpts.findIndex(item => item.label === val);
      console.log(idx)
      this.showInput = idx+1;
    }
  },
  created() {
    this.data = option;
    this.radioOpts = option.radioOpts;
    this.inputOpts1 = option.inputOpts1;
    this.inputOpts2 = option.inputOpts2;
  }
};
</script>

<style lang="less">
.search-box {
  & {
    margin: 20px;
    border: 1px solid #ebebeb;
    width: 97%;
    min-height: 200px;
  }
  .title {
    & {
      margin-bottom: 12px;
      margin-top: 2px;
      width: 100%;
      height: 28px;
      line-height: 28px;
      background: none;
      box-sizing: border-box;
    }
    a {
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      line-height: 25px;
      vertical-align: middle;
      margin-right: 10px;
      color: #0091ea;
      padding-bottom: 4px;
      border-bottom: 2px solid #0091ea;
      margin-left: 15px;
    }
  }
  .menus {
    & {
      // border: 1px solid #e8e8e8ea;
      margin: 2px 5px;
      padding: 5px;
    }
    .inputItem {
      & {
        display: inline-block;
        margin: 10px 2px;
      }
      .inputLabel {
        display: inline-block;
        width: 30%;
        max-width: 100px;
        font-size: 14px;
        color: #606266;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
      }
    }
  }
}
</style>
