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
                <slot name="otherFileds">

                </slot>
                <!-- 类型 -->
                <div style="margin:10px 5px">
                    <el-radio-group v-model="type" name="type">
                        <el-radio v-for="(item,index) in radioOpts" :key="index" :label="item.label">{{item.label}}
                        </el-radio>
                    </el-radio-group>
                </div>
                <div class="el-input-group">
                    <div class="inputItem" v-for="(item,index) in dynamicSiteFields.inputOpts ||''" :key="index">
                        <div class="inputLabel">{{item.label}}</div>
                        <div style="display: inline-block;">
                            <div class="dynamic-input">
                                <input type="text" :name="item.field" :value="item.value"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="el-input-group">
                    <div class="radioItem" v-for="(item,index) in dynamicSiteFields.radioOpts ||''" :key="index">
                        <div class="radioLabel">{{item.label}}</div>
                        <div class="radio-choices single-row">
                            <div v-for="(i,index) in item.radios" :key="index" style="display: inline-block;">
                                <input type="radio" :name="item.field" :id='item.field + i.label'
                                       :value="i.label"/>
                                <label :for='item.field + i.label'><span>{{i.label}}</span></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="el-input-group">
                    <div class="checkboxItem" v-for="(item,index) in dynamicSiteFields.checkboxOpts ||''" :key="index">
                        <div class="checkboxLabel">{{item.label}}</div>
                        <div class="radio-choices single-row">
                            <div v-for="(i,index) in item.checkboxs" :key="index" style="display: inline-block;">
                                <input type="checkbox"  :name="item.field"
                                       :id='item.field + i.label' :value="i.label"/>
                                <label :for='item.field + i.label'><span>{{i.label}}</span></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 搜索框 -->
            <div class="button-bar">
                <slot name="eventButton"></slot>
                <el-button icon="el-icon-refresh" @click="reset()">重置</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "DynamicFieldResourcesForm",
        props: {
            siteType: String,
            dynamicFiledValues: Object
        },
        data() {
            return {
                type: this.siteType,
                showOptionsIndex: 0
            };
        },
        methods: {
            reset() {
                // this.dynamicSiteFields.inputOpts &&
                // this.dynamicSiteFields.inputOpts.forEach(i => (i.value = ""));
                // this.dynamicSiteFields.radioOpts &&
                // this.dynamicSiteFields.radioOpts.forEach(i => (i.value = ""));
                // this.dynamicSiteFields.checkboxOpts &&
                // this.dynamicSiteFields.checkboxOpts.forEach(i => (i.value = []));
                this.$refs.dynamicFiledForm.$el.reset()
            }
        },
        watch: {
            siteType(val)  {
                this.type = val
            },
            type(val) {
                this.showOptionsIndex = this.radioOpts.findIndex(
                    item => item.label === val
                );
            },
            dynamicFiledValues(val) {
                Object.keys(val).forEach(item => {
                    const inputNodeList = document.getElementsByName(item)
                    if (inputNodeList.length === 0) {
                        return
                    }
                    if (inputNodeList[0].type === 'text') {
                        inputNodeList[0].value = val[item]
                    }
                    if (inputNodeList[0].type === 'radio') {
                        inputNodeList.forEach(radio => {
                            if (radio.value === val[item]) {
                                radio.checked = true
                            }
                        })
                    }
                    if (inputNodeList[0].type === 'checkbox') {
                        inputNodeList.forEach(checkbox => {
                            if (val[item].some(value => value === checkbox.value)) {
                                checkbox.checked = true
                            }
                        })
                    }
                });
            }
        },
        computed: {
            radioOpts() {
                return this.$store.state.dynamicSiteFields
            },
            dynamicSiteFields() {
                return Object.assign({
                        inputOpts: [],
                        radioOpts: [],
                        checkboxOpts: []
                    },
                    this.$store.state.dynamicSiteFields[this.showOptionsIndex].options
                );
            },
        },
    };
</script>

<style lang="scss" scoped>

    @mixin items {
        margin: 10px 15px;
        display: block;
        float: left;
        width: auto;
    }

    @mixin labels {
        display: inline-block;
        width: 120px;
        font-size: 14px;
        color: #606266;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: 400;
        clear: both;
        &:after {
            content: ":";
        }
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
                @include items;

                .inputLabel {
                    @include labels;
                }
            }

            .radioItem {
                @include items;

                .radioLabel {
                    @include labels;
                }
            }

            .checkboxItem {
                @include items;

                .checkboxLabel {
                    @include labels;
                }
            }
        }
    }


    .single-row {
        display: inline;
    }

    .button-bar {
        width: 100%;
        margin-bottom: 10px;
        text-align: center;
    }

    /* 输入框 */
    .dynamic-input {
        display: inline-block;
        font-size: 13px;
        width: auto;
        position: relative;
        input[type="text"] {
            width: 200px;
            height: 30px;
            border-radius: 5px;
            padding: 0 10px;
        }
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
