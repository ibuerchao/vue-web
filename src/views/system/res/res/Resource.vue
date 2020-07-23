<template>
    <el-container style="height: 100%;">
        <el-header style="font-size: 12px;padding: 0">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="moduleName" placeholder="输入模块名称搜索" size="small" clearable style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="name" placeholder="输入资源名称搜索" size="small" clearable style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="code" placeholder="输入资源编码搜索" size="small" clearable style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                            size="small"
                            v-model="selectTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="small" icon="el-icon-search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="add()" size="small" icon="el-icon-circle-plus">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="add()" size="small" icon="el-icon-document">导出</el-button>
                </el-form-item>
            </el-form>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-scrollbar style="height: 480px">
                    <el-tree :data="tree" v-model="moduleName" show-checkbox node-key="id"
                             :filter-node-method="filterNode" highlight-current
                             ref="tree"></el-tree>
                </el-scrollbar>
            </el-aside>
            <el-main style="background-color: #FFFFFF">
                <el-scrollbar>
                    <el-table :data="tableData"
                              @filter-change="filterHandler"
                              @sort-change='sortHandler'
                              ref="filterTable"
                              :row-style="{height:'20px'}"
                              :cell-style="{padding:'4px'}"
                              max-height="480"
                              style="font-size: 13px;"
                              row-key="id"
                              stripe>
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column
                                prop="name"
                                label="资源名称"
                                width="100"
                                header-align="center"
                                align="center"
                                :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column
                                prop="code"
                                label="资源编码"
                                width="150"
                                header-align="center"
                                align="center"
                                :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column
                                prop="moduleName"
                                label="所在模块"
                                width="100"
                                header-align="center"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="seq"
                                label="序号"
                                width="70"
                                header-align="center"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="status"
                                label="状态"
                                width="110"
                                header-align="center"
                                align="center"
                                column-key="status"
                                :filters="[{text: '禁用', value: '0'}, {text: '正常', value: '1'}]">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.status" placeholder="状态" size="small" style="width: 90px"
                                           @change="changeStatus(scope.row)">
                                    <el-option label="禁用" :value="0"></el-option>
                                    <el-option label="正常" :value="1"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="类型"
                                width="70"
                                header-align="center"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="URL"
                                width="150"
                                header-align="center"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="operateTime"
                                label="操作时间"
                                width="152"
                                header-align="center"
                                align="center"
                                sortable='custom'>
                        </el-table-column>
                        <el-table-column
                                fixed="right"
                                label="操作"
                                width="150"
                                align="center"
                                header-align="center">
                            <template slot-scope="scope">
                                <el-button @click="detail(scope.row)" type="primary" size="small" icon="el-icon-document"></el-button>
                                <el-button @click="edit(scope.row)" type="warning" size="small" icon="el-icon-edit"></el-button>
                                <el-button @click="del(scope.row)" type="danger" size="small" icon="el-icon-delete" :disabled="scope.row.status === 1"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                    <Detail :visible="visible" :form="form" :disabled="disabled" :title="title" :modules="modules" :create="create" :oldModuleId="oldModuleId"
                            @closeDialog="closeDialog" @submitEdit="submitEdit(form,oldModuleId)" @submitAdd="submitAdd(form)"></Detail>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

  import {list,detail,del,add,edit,updateStatus} from '@/api/res';
  import {superior} from '@/api/module';
  import Detail from "@/views/system/res/res/detail";

  export default {
    name: "User",
    components: {Detail},
    data() {
      return {
        name: null,
        moduleName: null,
        code:null,
        moduleId:[],
        status: [],
        selectTime: null,
        order:'operate_time desc',
        tableData: [],
        currentPage:1,
        pageSize:10,
        total:0,
        visible:false,
        form:{},
        disabled:true,
        title:'',
        modules:[],
        create:false,
        tree:[],
        first:true,
        oldModuleId:''
      }
    },
    watch: {
      moduleName(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      onSubmit() {
        if (this.first){
          this.first = false;
        }else{
          this.moduleId = this.$refs.tree.getCheckedKeys()
        }
        this.tableData=[];
        this.form = {};
        let start = null, end = null;
        if (this.selectTime) {
          start = this.selectTime[0];
          end = this.selectTime[1];
        }
        let data = {
          name: this.name,
          code: this.code,
          moduleId:this.moduleId,
          status: this.status,
          start: start,
          end: end,
          offset:(this.currentPage -1)*this.pageSize,
          limit:this.pageSize,
          order:this.order
        };
        list(data).then(res => {
          this.tableData = res.data;
          this.total = res.total;
        }).catch(() => {
        })
      },
      changeStatus(row) {
        let data = {id:row.id,status:row.status};
        updateStatus(data).then(()=>{
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.onSubmit();
        }).catch(()=>{})
      },
      handleSizeChange(size){
        this.pageSize = size;
        this.onSubmit();
      },
      handleCurrentChange(page){
        this.currentPage = page;
        this.onSubmit();
      },
      reset(){
        this.$refs.tree.setCheckedKeys([]);
        this.name= null;
        this.code= null;
        this.moduleName = null;
        this.status=  [];
        this.moduleId = [];
        this.selectTime=  null;
        this.tableData= [];
        this.currentPage= 1;
        this.pageSize=10;
        this.total=0;
        this.clearFilter();
        this.clearSort();
        this.onSubmit();
      },
      add(){
        this.superior();
        this.visible = true;
        this.form={};
        this.disabled=false;
        this.title='新增资源';
        this.create = true;
      },
      detail(row){
        detail(row.id).then(res=>{
          if (res.code===200){
            this.visible = true;
            this.form = res.data;
            this.disabled=true;
            this.title='资源详情';
          }
        }).catch(()=>{})
      },
      edit(row){
        detail(row.id).then(res=>{
          if (res.code===200){
            this.superior();
            this.visible = true;
            this.form = res.data;
            this.disabled=false;
            this.title='编辑资源';
            this.create = false;
            this.oldModuleId = res.data.moduleId;
          }
        }).catch(()=>{})
      },
      del(row){
        del(row.id).then(()=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.onSubmit();
        }).catch(()=>{})
      },
      closeDialog(){
        this.visible=false;
      },
      superior(){
        let params = {id:'root',status:null}
        superior(params).then(res=>{
          this.modules=res.data;
        }).catch(()=>{})
      },
      submitEdit(form,oldModuleId){
        let data = {
          id: form.id,
          name: form.name,
          code: form.code,
          moduleId: form.moduleId,
          status: form.status,
          type: form.type,
          url: form.url,
          remark: form.remark
        };
        edit(data).then(()=>{
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.$set(this.$refs.filterTable.store.states.lazyTreeNodeMap, oldModuleId, []);
          this.visible=false;
          this.onSubmit();
        }).catch(()=>{})
      },
      submitAdd(form){
        let data = {
          name: form.name,
          code: form.code,
          moduleId: form.moduleId,
          status: form.status,
          type: form.type,
          url: form.url,
          remark: form.remark
        };
        add(data).then(()=>{
          this.$message({
            message: '新增成功',
            type: 'success'
          });
          this.visible=false;
          this.onSubmit();
        }).catch(()=>{})
      },
      filterHandler(filters){
        if(filters.status && filters.status.length>0){
          for(const s of filters.status){
            this.status.push(s)
          }
        }else{
          this.status = [];
          this.$refs.filterTable.clearFilter();
        }
        this.onSubmit();
      },
      sortHandler(column){
        let prop = column.prop;
        if (column.prop ==='operateTime'){
          prop = 'operate_time'
        }
        if (column.order === 'descending') {
          this.order = prop+' desc'
        } else {
          this.order = prop+' asc'
        }
        this.onSubmit();
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      clearSort() {
        this.$refs.filterTable.clearSort();
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    created() {
      this.tableData=[];
      this.onSubmit();
      let params = {id:'root'}
      superior(params).then(res=>{
        this.tree=res.data;
      }).catch(()=>{})
    }
  }
</script>

<style scoped>
    .el-form-item{
        margin-bottom: 10px;
    }

    .el-button--small {
        padding: 9px 9px;
    }

    .pagination{
        text-align: center;
        padding: 15px;
    }

    .el-table__body-wrapper{
        overflow-y: auto;
    }
</style>