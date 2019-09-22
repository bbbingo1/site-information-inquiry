<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 14:25:51
 * @LastEditTime: 2019-09-22 15:17:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="formbox">
    <el-form ref="dynamicFiledForm">
      <div class="fields">
        <!-- 类型 -->
        <div style="margin:10px 5px">
          <el-radio-group v-model="siteType" name="siteType">
            <el-radio v-for="(item,index) in radioOpts" :key="index" :label="item.value">{{item.label}}
            </el-radio>
          </el-radio-group>
        </div>
        <!-- 文本框 -->
        <el-form-item label="文本项">
          <div>
            <div class="inputItem" v-for="(item,index) in dynamicSiteFields.inputOpts ||''" :key="index">
              <div class="inputLabel">{{item.label}}</div>
              <div style="width:65%;display: inline-block;">
                <el-input size="small" v-model="item.value" :name="item.field"></el-input>
              </div>
            </div>
          </div>
        </el-form-item>
        <!-- 单选框 -->
        <el-form-item label="单选项">
          <div>
            <div class="radioItem" v-for="(item,index) in dynamicSiteFields.radioOpts ||''" :key="index">
              <div class="radioLabel">{{item.label}}</div>
              <div style="width:65%" class="team-choices radio-choices">
                <div v-for="(i,index) in item.radios" :key="index" style="display: inline-block;">
                  <input type="radio" :name="item.field" :id='item.field + i.label' :value="i.label" />
                  <label :for='item.field + i.label'><span>{{i.label}}</span></label>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
        <!-- 多选框 -->
        <el-form-item label="多选项">
          <div>
            <div class="checkboxItem" v-for="(item,index) in dynamicSiteFields.checkboxOpts ||''" :key="index">
              <div class="checkboxLabel">{{item.label}}</div>
              <div style="width:65%" class="team-choices radio-choices">
                <div v-for="(i,index) in item.checkboxs" :key="index" style="display: inline-block;">
                  <input type="checkbox" :name="item.field" :id='item.field + i.label' :value="i.label" />
                  <label :for='item.field + i.label'><span>{{i.label}}</span></label>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
      </div>
      <!-- 搜索框 -->
      <div class="button-bar">
        <slot name="eventButton"></slot>
        <el-button icon="el-icon-refresh" @click="resize()">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { dynamicSiteFields } from "@/api/config";

export default {
  name: "DynamicFieldResourcesForm",
  data() {
    return {
      dynamicSiteFields: {},
      siteType: "0",
      radioOpts: null,
      showOptionsIndex: 0
    };
  },
  methods: {
    resize() {
      this.dynamicSiteFields.inputOpts &&
        this.dynamicSiteFields.inputOpts.forEach(i => (i.value = ""));
      this.dynamicSiteFields.radioOpts &&
        this.dynamicSiteFields.radioOpts.forEach(i => (i.value = ""));
      this.dynamicSiteFields.checkboxOpts &&
        this.dynamicSiteFields.checkboxOpts.forEach(i => (i.value = []));
    }
  },
  watch: {
    siteType(val) {
      this.showOptionsIndex = this.radioOpts.findIndex(
        item => item.value === val
      );
      this.dynamicSiteFields = Object.assign(
        {
          inputOpts: "",
          radioOpts: "",
          checkboxOpts: ""
        },
        this.radioOpts[this.showOptionsIndex].options
      );
    }
  },
  created() {
    dynamicSiteFields()
      .then(response => {
        console.log(response);
        this.radioOpts = response.radioOpts;
        this.dynamicSiteFields = Object.assign(
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
  // display: inline-block;
  width: 30%;
  max-width: 100px;
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
  clear: both;
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
      margin: 10px 15px;
      width: 400px;
      .inputLabel {
        @include labels;
      }
    }
    .radioItem {
      margin: 10px 15px;
      .radioLabel {
        @include labels;
      }
    }
    .checkboxItem {
      margin: 10px 15px;
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
/* 单选框 */

.radio-choices {
  color: #5c6d83;
  margin: 5px 0;
}

input[type="checkbox"],
input[type="radio"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.fa-mb {
  font-size: 22px !important;
  color: #5c6d83;
}

.radio-choices label {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-left: 35px;
  padding-right: 10px;
  line-height: 36px;
  cursor: pointer;
  z-index: 2;
}

.radio-choices label::before {
  content: " ";
  position: absolute;
  top: 6px;
  left: 0;
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid #5c6d83;
  border-radius: 4px;
  z-index: -1;
}

input[type="radio"] + label::before {
  border-radius: 18px;
}

/* Checked */

input[type="checkbox"]:checked + label,
input[type="radio"]:checked + label {
  padding-left: 10px;
  color: #fff;
}

input[type="checkbox"]:checked + label::before,
input[type="radio"]:checked + label::before {
  top: 0;
  width: 100%;
  height: 100%;
  background: #5c6d83;
}

/* Transition */

.radio-choices label,
.radio-choices label::before {
  -webkit-transition: 0.25s all ease;
  -o-transition: 0.25s all ease;
  transition: 0.25s all ease;
}
</style>
