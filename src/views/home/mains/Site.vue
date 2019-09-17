<template>
    <div class="site-list">
        <dynamic-field-resources-form :formData="searchFormData">
            <el-button slot="eventButton" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        </dynamic-field-resources-form>
        <div class="tool-bar">
            <el-button type="primary" icon="fa fa-plus" @click="add" class="fa-button">添加</el-button>
            <el-button type="warning" icon="fa fa-pencil-square-o" @click="edit" class="fa-button">修改</el-button>
            <el-button type="danger" icon="fa fa-times" @click="remove" class="fa-button">删除</el-button>
            <el-button type="success" icon="fa fa-upload" @click="upload" class="fa-button">批量上传</el-button>
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
                        label="场地名称"
                        width="200">
                    <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类型"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="地址"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        prop="info"
                        label="详细信息"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="handlePrevClick"
                    @next-click="handleNextClick"
                    :current-page="pageNum"
                    :page-sizes="[20, 50, 100]"
                    :page-size="20"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import DynamicFieldResourcesForm from '@/components/forms/DynamicFieldResourcesForm.vue';
    export default {
        name: "Site",
        components: {
            DynamicFieldResourcesForm
        },
        beforeCreate: function () {
            this.$store.dispatch('setLevelInfo',[{title:'场地信息',name:'site'}])
        },
        data() {
            return {
                searchFormData: {},
                pageNum:1,
                total:0,
                tableData: [],
                multipleSelection: []
            }
        },

        methods: {
            search() {
                console.log(this.searchFormData)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleSizeChange(val) {
                console.log(val)
            },
            handleCurrentChange(val) {
                console.log(val)
            },
            handlePrevClick(val) {
                console.log(val)
                this.pageNum--
            },
            handleNextClick(val) {
                console.log(val)
                this.pageNum++
            },
            add() {
                this.$router.push('/addSite')
            },
            edit() {
                this.$router.push('/editSite')
            },
            remove() {
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            upload() {

            },
            download() {

            },
        }
    }
</script>

<style lang="scss" scoped>
    .site-list{
        .button-bar {
            width: 100%;
            margin-bottom: 10px;
            text-align: center;
        }
        .tool-bar {
            margin: 0 20px 10px 20px;
            button {
                margin-right:10px;
            }
        }
        .list {
            margin: 0 20px;
            border: 1px solid #ebebeb;
        }
    }
</style>