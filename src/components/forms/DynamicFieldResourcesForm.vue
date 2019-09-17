<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 14:25:51
 * @LastEditTime: 2019-09-09 03:21:38
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="formbox">
        <el-form v-model="formData">
            <div class="fields">
                <!-- 类型 -->
                <div style="margin:10px 5px">
                    <el-radio-group v-model="siteType" name="siteType">
                        <el-radio v-for="(item,index) in radioOpts" :key="index" :label="item.value">{{item.label}}
                        </el-radio>
                    </el-radio-group>
                </div>
                <!-- 文本框 -->
                <div>
                    <div class="inputItem" v-for="(item,index) in dynamicSiteFields.inputOpts ||''" :key="index">
                        <div class="inputLabel">{{item.label}}</div>
                        <div style="width:65%;display: inline-block;">
                            <el-input size="small" v-model="item.value" :name="item.field" placeholder=""></el-input>
                        </div>
                    </div>
                </div>
                <!-- 单选框 -->
                <div>
                    <div class="radioItem" v-for="(item,index) in dynamicSiteFields.radioOpts ||''" :key="index">
                        <div class="radioLabel">{{item.label}}</div>
                        <div style="width:65%;display: inline-block;">
                            <el-radio-group v-model="item.value" :name="item.field">
                                <el-radio-button v-for="(item,index) in item.radios ||''" :key="index"
                                                 :label="item.label"></el-radio-button>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <!-- 多选框 -->
                <div>
                    <div class="checkboxItem" v-for="(item,index) in dynamicSiteFields.checkboxOpts ||''" :key="index">
                        <div class="checkboxLabel">{{item.label}}</div>
                        <div style="width:65%;display: inline-block;">
                            <el-checkbox-group v-model="item.value" :name="item.field">
                                <el-checkbox-button v-for="(item,index) in item.checkboxs ||''" :key="index"
                                                    :label="item.label"></el-checkbox-button>
                            </el-checkbox-group>
                        </div>
                    </div>
                </div>
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
    import {dynamicSiteFields} from "@/api/config";

    export default {
        name: "DynamicFieldResourcesForm",
        props: {
            formData: Object,
        },
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
                this.dynamicSiteFields.inputOpts && this.dynamicSiteFields.inputOpts.forEach(i => (i.value = ""));
                this.dynamicSiteFields.radioOpts && this.dynamicSiteFields.radioOpts.forEach(i => (i.value = ""));
                this.dynamicSiteFields.checkboxOpts && this.dynamicSiteFields.checkboxOpts.forEach(i => (i.value = []));
            },
        },
        watch: {
            siteType(val) {
                this.showOptionsIndex = this.radioOpts.findIndex(item => item.value === val);
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
                        {inputOpts: "", checkboxOpts: {checkboxs: ""}},
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
