<template>
    <div class="shrinkable-menu">
        <!-- 预留填充 log 可以没有 -->
        <slot name="top"></slot>
        <el-menu default-active="/index" active="this.$route.path" :collapse="isCollapse"
                 background-color="#304156"
                 text-color="#fff"
                 active-text-color="#409EFF"
                 router>
            <el-menu-item index="/index">
                <i class="el-icon-location"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/site">
                <i class="el-icon-s-order"></i>
                <span slot="title">场地信息管理</span>
            </el-menu-item>
            <el-submenu index="/setting">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户设置</span>
                </template>
                <el-menu-item index="/operateLog">用户操作日志</el-menu-item>
                <el-menu-item index="/user">用户信息</el-menu-item>
                <el-menu-item index="/logout">退出系统</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "ShrinkableMenu",
        props: {
            isCollapse: {
                type: Boolean,
                default: false,
            },
        },
    }
</script>

<style lang="scss" scoped>
    .shrinkable-menu {
        .el-menu{
            border-right-width: 0;
            .el-menu-item {
                font-size: 12px;
            }
        }
    }
</style>