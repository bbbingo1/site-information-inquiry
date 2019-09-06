<template>
    <div class="site-list">
        <dynamic-field-resources-form>
            <div slot="button" class="button-bar">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
                <el-button icon="el-icon-refresh">重置</el-button>
            </div>
        </dynamic-field-resources-form>
        <div class="tool-bar">
            <el-button type="primary" icon="fa fa-plus" @click="add">添加</el-button>
            <el-button type="warning" icon="fa fa-pencil-square-o" @click="edit">修改</el-button>
            <el-button type="danger" icon="fa fa-times" @click="remove">删除</el-button>
            <el-button type="success" icon="fa fa-upload" @click="upload">批量上传</el-button>
            <el-button type="info" icon="fa fa-download" @click="download">下载模板</el-button>
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
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
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
                tableData: [{
                    name: '深圳北站',
                    type: '酒店',
                    address: 'xxxxxxxxxxxx',
                    info: 'xxxxxxxxxxxxxxxxx',
                },{
                    name: '深圳北站',
                    type: '酒店',
                    address: 'xxxxxxxxxxxx',
                    info: 'xxxxxxxxxxxxxxxxx',
                },{
                    name: '深圳北站',
                    type: '酒店',
                    address: 'xxxxxxxxxxxx',
                    info: 'xxxxxxxxxxxxxxxxx',
                },{
                    name: '深圳北站',
                    type: '酒店',
                    address: 'xxxxxxxxxxxx',
                    info: 'xxxxxxxxxxxxxxxxx',
                },{
                    name: '深圳北站',
                    type: '酒店',
                    address: 'xxxxxxxxxxxx',
                    info: 'xxxxxxxxxxxxxxxxx',
                },{
                    name: '深圳北站',
                    type: '酒店',
                    address: 'xxxxxxxxxxxx',
                    info: 'xxxxxxxxxxxxxxxxx',
                },{
                    name: '深圳北站',
                    type: '酒店',
                    address: 'xxxxxxxxxxxx',
                    info: 'xxxxxxxxxxxxxxxxx',
                }],
                multipleSelection: []
            }
        },

        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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