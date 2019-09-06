<template>
    <div class="edit-site">
        <dynamic-field-resources-form>
            <div slot="button" class="button-bar">
                <el-button type="primary">修改</el-button>
                <el-button>返回</el-button>
            </div>
        </dynamic-field-resources-form>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from '@/components/forms/DynamicFieldResourcesForm.vue';

    export default {
        name: "EditSite",
        components: {
            DynamicFieldResourcesForm
        },
        beforeCreate: function () {
            this.$store.dispatch('setLevelInfo', [{title: '场地信息管理', name: 'site'}, {title: '修改', name: 'editSite'}])
        },
    }
</script>

<style lang="scss" scoped>
    .edit-site {
        .button-bar {
            width: 100%;
            margin-bottom: 10px;
            text-align: center;
        }
    }
</style>