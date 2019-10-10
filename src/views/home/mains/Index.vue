<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 21:25:37
 * @LastEditTime: 2019-09-22 17:13:35
 * @LastEditors: Please set LastEditors
 -->
<template>
    <div class="index">
        <dynamic-field-resources-form :siteType="siteType" :dynamicFiledValues="dynamicFiledValues" ref="searchForm">
            <el-button slot="eventButton" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </dynamic-field-resources-form>
        <gaode-map lat="22.574405" lng="114.095388" :listMsg="currentListContent">
            <el-pagination background slot="pagination" :hide-on-single-page="true" layout="prev, pager, next"
                           :current-page="pageNum" :page-size="pageSize" :total="total"
                           @current-change="search"></el-pagination>
        </gaode-map>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from "@/components/forms/DynamicFieldResourcesForm.vue";
    import GaodeMap from "@/components/maps/GaodeMap.vue";
    import serializer from "form-serialize";
    import {siteList} from "@/api/site.js";

    function searchData(instance, pageNum = 1) {
        instance.pageNum = pageNum;
        instance.searchFormData = serializer(
            instance.$refs.searchForm.$refs.dynamicFiledForm.$el,
            {hash: true}
        );
        siteList(
            instance.pageNum,
            instance.pageSize,
            instance.searchFormData
        ).then(res => {
            instance.currentListContent = res.data.result;
            instance.total = res.data.total;
        });
    }

    export default {
        name: "Index",
        components: {
            DynamicFieldResourcesForm,
            GaodeMap
        },
        beforeCreate: function () {
            this.$store.dispatch("setLevelInfo", [{title: "首页", name: "index"}])
        },
        data() {
            return {
                dynamicFiledValues: null,
                searchFormData: {},
                currentListContent: [],
                pageNum: 1,
                pageSize: 8,
                total: 0
            };
        },
        computed: {
            siteType() {
                return this.$store.state.dynamicSiteFields[0].label
            }
        },
        mounted() {
            this.$refs.searchForm.$refs.dynamicFiledForm.$el.reset()
            searchData(this, 1)
        },
        methods: {
            search(val) {
                searchData(this, val)
            }
        },
    };
</script>

<style lang="scss" scoped>
</style>