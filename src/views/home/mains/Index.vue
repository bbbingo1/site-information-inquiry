<template>
    <div class="index">
        <dynamic-field-resources-form>
            <div slot="button" class="button-bar">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button icon="el-icon-refresh">重置</el-button>
            </div>
        </dynamic-field-resources-form>
        <gaode-map lat="22.574405" lng="114.095388"></gaode-map>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from '@/components/forms/DynamicFieldResourcesForm.vue';
    import GaodeMap from '@/components/maps/GaodeMap.vue';
    export default {
        name: "Index",
        components: {
            DynamicFieldResourcesForm,
            GaodeMap,
        },
        beforeCreate: function () {
            this.$store.dispatch('setLevelInfo',[{title:'首页',name:'index'}])
        },
        data() {
            return {
            };
        },
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .index{
        .button-bar {
            width: 100%;
            margin-bottom: 10px;
            text-align: center;
        }
    }
</style>