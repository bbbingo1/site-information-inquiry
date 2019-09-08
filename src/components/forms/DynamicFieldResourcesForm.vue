<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 14:25:51
 * @LastEditTime: 2019-09-09 03:21:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="formbox">
    <div class="fields">
      <!-- 类型 -->
      <div style="margin:10px 5px">
        <el-radio-group v-model="radio1">
          <el-radio v-for="(item,index) in radioOpts" :key="index" :label="item.label"></el-radio>
        </el-radio-group>
      </div>
      <!-- 文本框 -->
      <div>
        <div class="inputItem" v-for="(item,index) in data.inputOpts ||''" :key="index">
          <div class="inputLabel">{{item.label}}</div>
          <div style="width:65%;display: inline-block;">
            <el-input size="small" v-model="item.value" placeholder=""></el-input>
          </div>
        </div>
      </div>
      <!-- 单选框 -->
      <div>
        <div class="radioItem" v-for="(item,index) in data.radioOpts ||''" :key="index">
          <div class="radioLabel">{{item.label}}</div>
          <div style="width:65%;display: inline-block;">
            <el-radio-group v-model="item.value">
              <el-radio-button v-for="(item,index) in item.radios ||''" :key="index" :label="item.label"></el-radio-button>
            </el-radio-group>
          </div>
        </div>
      </div>
      <!-- 多选框 -->
      <div>
        <div class="checkboxItem" v-for="(item,index) in data.checkboxOpts ||''" :key="index">
          <div class="checkboxLabel">{{item.label}}</div>
          <div style="width:65%;display: inline-block;">
            <el-checkbox-group v-model="item.value">
              <el-checkbox-button v-for="(item,index) in item.checkboxs ||''" :key="index" :label="item.label"></el-checkbox-button>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索框 -->
    <div slot="button" class="button-bar">
      <el-button type="primary" icon="el-icon-search" @click.stop="search()">搜索</el-button>
      <el-button icon="el-icon-refresh" @click="resize()">重置</el-button>
    </div>
  </div>
</template>

<script>
import { getIndexSearchFields } from "@/api/config";
// import eventBus from "@/utils/eventBus.js";

export default {
  name: "DynamicFieldResourcesForm",
  data() {
    return {
      data: {},
      radio1: "酒店",
      radioOpts: null,
      showOptionsIndex: 0
    };
  },
  methods: {
    search() {
      let dataForm = {};
      if (this.data.inputOpts) this.deelArray(this.data.inputOpts, dataForm);
      if (this.data.radioOpts) this.deelArray(this.data.radioOpts, dataForm);
      if (this.data.checkboxOpts)
        this.deelArray(this.data.checkboxOpts, dataForm);
      this.$store.dispatch('setIndexSearchResults',dataForm)
      // eventBus.$emit("refreshData");//考虑执行顺序问题，避免数据未得到先渲染，放到store的mutation中调用
    },
    resize() {
      if (this.data.inputOpts) this.data.inputOpts.forEach(i => (i.value = ""));
      if (this.data.radioOpts) this.data.radioOpts.forEach(i => (i.value = ""));
      if (this.data.checkboxOpts)
        this.data.checkboxOpts.forEach(i => (i.value = []));
    },
    deelArray(arr, obj) {
      let key = "";
      let value = "";
      arr.forEach(i => {
        key = i.field;
        value = i.value;
        if (value) obj[key] = value;
      });
    }
  },
  watch: {
    radio1(val) {
      var idx = this.radioOpts.findIndex(item => item.label === val);
      this.showOptionsIndex = idx;
      this.data = Object.assign(
        { inputOpts: "" },
        this.radioOpts[this.showOptionsIndex].options
      );
    }
  },
  created() {
    getIndexSearchFields()
      .then(response => {
        console.log(response);
        this.radioOpts = response.radioOpts;
        this.data = Object.assign(
          { inputOpts: "", checkboxOpts: { checkboxs: "" } },
          this.radioOpts[0].options
        );
      })
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss" scoped>
@mixin labels {
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
.formbox {
  margin: 20px;
  border: 1px solid #ebebeb;
  width: 97%;
  height: auto;
  .fields {
    // border: 1px solid #e8e8e8ea;
    margin: 2px 5px;
    padding: 5px;
    .inputItem {
      display: inline-block;
      margin: 10px 2px;
      .inputLabel {
        @include labels;
      }
    }
    .radioItem {
      margin: 10px 2px;
      .radioLabel {
        @include labels;
      }
    }
    .checkboxItem {
      margin: 10px 2px;
      .checkboxLabel {
        @include labels;
      }
    }
  }
}
.button-bar {
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
}
</style>
