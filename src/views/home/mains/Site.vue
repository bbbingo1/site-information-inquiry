<template>
    <div class="site-list">
        <dynamic-field-resources-form :siteType="siteType" :dynamicFiledValues="dynamicFiledValues" ref="searchForm">
            <el-button slot="eventButton" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </dynamic-field-resources-form>
        <div class="tool-bar">
            <el-button type="primary" icon="fa fa-plus" @click="add" class="fa-button">添加</el-button>
            <el-button type="warning" icon="fa fa-pencil-square-o" @click="edit" class="fa-button">修改</el-button>
            <el-button type="danger" icon="fa fa-times" @click="remove" class="fa-button">删除</el-button>
            <el-button type="success" icon="fa fa-upload" @click="showUploadFileWindow" class="fa-button">批量上传
            </el-button>
            <el-button type="info" icon="fa fa-download" @click="download" class="fa-button">下载模板</el-button>
        </div>
        <div class="list">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="ID"
                        prop="id"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="场地名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="场地类型"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="详细信息"
                        show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row }}</template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="search"
                    :current-page="pageNum"
                    :page-sizes="[20, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <el-dialog
                title="批量上传场地信息"
                :visible.sync="dialogVisible"
                :modal=false
                @before-close="resetUploadFileForm"
                width="410px" center>
            <el-form  ref="uploadFileForm">
                <el-upload
                        ref="uploadFileInput"
                        :class="selectedFile"
                        :action="baseUrl + '/site/upload'"
                        :file-list="fileList"
                        :limit="1"
                        :auto-upload="false"
                        :on-change="hideUploadFileComponent"
                        :on-remove="showUploadFileComponent"
                        drag>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将场地信息文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetUploadFileForm">重置</el-button>
                <el-button type="primary" @click="upload">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from '@/components/forms/DynamicFieldResourcesForm.vue';
    import serializer from "form-serialize";
    import {siteList, deleteSiteInfo, upload, downloadTemplate} from '@/api/site.js'

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
            instance.tableData = res.data.result;
            instance.total = res.data.total;
        }).catch(error => console.log(error));
    }

    // 创建模板下载链接
    function downloads(data, name){
        if(!data){
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display ='none'
        link.href = url
        link.setAttribute('download', `template.xlsx`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    export default {
        name: "Site",
        components: {
            DynamicFieldResourcesForm
        },
        beforeCreate: function () {
            this.$store.dispatch('setLevelInfo', [{title: '场地信息', name: 'site'}])
        },
        data() {
            return {
                dynamicFiledValues: null,
                searchFormData: {},
                pageNum: 1,
                total: 0,
                tableData: [],
                multipleSelection: [],
                dialogVisible: false,
                selectedFile: "",
                fileList:[],
            }
        },
        computed: {
            siteType() {
                return this.$store.state.dynamicSiteFields[0].label
            },
            baseUrl() {
                return this.$store.state.baseURL
            },
        },
        mounted() {
            this.$refs.searchForm.$refs.dynamicFiledForm.$el.reset()
            searchData(this, 1)
        },
        methods: {
            search(val = 0) {
                searchData(this, val)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleSizeChange(val) {
                this.pageSize = val
                searchData(this, 1)
            },
            add() {
                this.$router.push('/addSite')
            },
            edit() {
                if (this.multipleSelection.length == 0 || this.multipleSelection.length > 1) {
                    this.$message({
                        type: 'warning',
                        message: '请选择一条数据进行修改!'
                    });
                    return
                }
                this.$router.push('/editSite/' + this.multipleSelection[0].id)
            },
            remove() {
                if (this.multipleSelection.length == 0) {
                    this.$message({
                        type: 'warning',
                        message: '请至少选择一条数据!'
                    });
                    return
                }

                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteSiteInfo(this.multipleSelection).then(() => {
                        this.$message({
                            message: '删除成功!',
                            type: 'success',
                            duration: 1000,
                        });
                    }).catch(error => console.log(error))
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            hideUploadFileComponent: function () {
                this.selectedFile = "selectedFile";
            },

            showUploadFileComponent: function () {
                this.$refs.uploadFileForm.clearFiles();
                this.selectedFile = "";
            },

            showUploadFileWindow() {
                this.dialogVisible = true;
            },

            resetUploadFileForm: function () {
                this.$refs.uploadFileForm.clearFiles();
                this.selectedFile = "";
            },

            upload() {
                let form = this.$refs.uploadFileForm.$el
                let formData = new FormData(form)
                upload(formData).then(() =>{
                    this.$message({
                        message: '上传成功!',
                        type: 'success',
                        duration: 1000,
                    });
                }).catch(error=>console.log(error));
                this.$refs.uploadFileInput.clearFiles();
                this.selectedFile = "";
                this.dialogVisible = false;
            },

            download() {
                downloadTemplate().then(res =>
                    downloads(res.data)
                )
            },
        }
    }
</script>

<style lang="scss">
    .site-list {
        .button-bar {
            width: 100%;
            margin-bottom: 10px;
            text-align: center;
        }

        .tool-bar {
            margin: 0 20px 10px 20px;

            button {
                margin-right: 10px;
            }
        }

        .list {
            margin: 0 20px;
            border: 1px solid #ebebeb;
        }
    }

    .selectedFile {
        .el-upload {
            display: none;
        }
    }
</style>