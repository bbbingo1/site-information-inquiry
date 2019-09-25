<template>
    <div class="add-site">
        <dynamic-field-resources-form ref="siteForm">
            <address-info-fields slot="otherFileds" :siteInfo="siteInfo"></address-info-fields>
            <el-button  slot="eventButton" type="primary" icon="fa fa-plus" @click="add" class="fa-button">添加</el-button>
        </dynamic-field-resources-form>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from '@/components/forms/DynamicFieldResourcesForm.vue';
    import AddressInfoFields from '@/components/forms/AddressInfoFields.vue';

    export default {
        name: "AddSite",
        components: {
            DynamicFieldResourcesForm,
            AddressInfoFields
        },
        data() {
            return {
                siteInfo: {
                    id:'',
                    name:'',
                    pic:'',
                    location: {
                        lng:'',
                        lat:'',
                    },
                    otherMsg:''
                }
            }
        },
        mounted() {
            this.$refs.siteForm.$refs.dynamicFiledForm.$el.reset()
        },
        beforeCreate: function () {
            this.$store.dispatch('setLevelInfo', [{title: '场地信息管理', name: 'site'}, {title: '添加', name: 'addSite'}])
        },
        methods: {
            add() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .add-site {
        .button-bar {
            width: 100%;
            margin-bottom: 10px;
            text-align: center;
        }
    }
</style>