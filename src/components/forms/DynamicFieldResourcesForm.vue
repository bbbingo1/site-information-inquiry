<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-01 14:25:51
 * @LastEditTime: 2019-09-01 20:42:52
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="formbox">
        <div class="fields">
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
        <slot name="button">

        </slot>
    </div>
</template>

<script>
    import {getIndexSearchFields} from '@/api/config'

    export default {
        name: "DynamicFieldResourcesForm",
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
                var idx = this.radioOpts.findIndex(item => item.label === val)
                console.log(idx)
                this.showInput = idx + 1
            }
        },
        created() {
            getIndexSearchFields().then(response => {
                console.log(response)
                this.data = response
                this.radioOpts = response.radioOpts
                this.inputOpts1 = response.inputOpts1
                this.inputOpts2 = response.inputOpts2
            }).catch(error => console.log(error))
        }
    };
</script>

<style lang="scss" scoped>
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
