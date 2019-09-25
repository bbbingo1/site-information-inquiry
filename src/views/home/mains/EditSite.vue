<template>
    <div class="edit-site">
        <dynamic-field-resources-form ref="siteForm">
            <address-info-fields slot="otherFileds" :siteInfo="siteInfo"></address-info-fields>
            <el-button slot="eventButton" type="warning" icon="fa fa-pencil-square-o" @click="edit" class="fa-button">修改</el-button>
        </dynamic-field-resources-form>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from '@/components/forms/DynamicFieldResourcesForm.vue'
    import AddressInfoFields from '@/components/forms/AddressInfoFields.vue'
    import {getSiteInfo} from '@/api/site.js'

    export default {
        name: "EditSite",
        props: ['id'],
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
            getSiteInfo(this.id).then(res => {
                let s = '';
                Object.keys(res.data).forEach((item) => {
                    if (res.data[item].value && res.data[item].label) {
                        s += '\'' + item + '\':{\'label\':\'' + res.data[item].label + '\',\'value\':\'' + res.data[item].value + '\'},'
                    }
                });
                this.siteInfo = Object.assign({otherMsg: s.substr(0, s.length - 1)}, res.data);
            }).catch(error => console.log(error))
        },
        beforeCreate: function () {
            this.$store.dispatch('setLevelInfo', [{title: '场地信息管理', name: 'site'}, {title: '修改', name: 'editSite'}])
        },
        methods: {
            edit() {
                this.$refs.siteForm.$refs.dynamicFiledForm
            }
        }
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