<template>
    <div class="add-site">
        <dynamic-field-resources-form :siteType="siteType" :dynamicFiledValues="dynamicFiledValues" ref="siteForm">
            <address-info-fields slot="otherFileds" :siteInfo="siteInfo"></address-info-fields>
            <el-button slot="eventButton" type="primary" icon="fa fa-plus" @click="add" class="fa-button">添加</el-button>
        </dynamic-field-resources-form>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from '@/components/forms/DynamicFieldResourcesForm.vue';
    import AddressInfoFields from '@/components/forms/AddressInfoFields.vue';
    import serializer from "form-serialize";
    import {addSite} from '@/api/site.js'

    export default {
        name: "AddSite",
        components: {
            DynamicFieldResourcesForm,
            AddressInfoFields
        },
        data() {
            return {
                siteInfo: {
                    id: '',
                    name: '',
                    pic: '',
                    location: {
                        lng: '',
                        lat: '',
                    },
                    otherMsg: ''
                },
                dynamicFiledValues: null,
            }
        },
        computed: {
            siteType() {
                return this.$store.state.dynamicSiteFields[0].label
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
                let data = serializer(
                    this.$refs.siteForm.$refs.dynamicFiledForm.$el,
                    {hash: true}
                );
                addSite(data).then(() => {
                    this.$message({
                        message: '添加成功!',
                        type: 'success',
                        duration: 1000,
                    });
                    this.$refs.siteForm.$refs.dynamicFiledForm.$el.reset()
                    this.$router.push('/site')
                }).catch(error => console.log(error))
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