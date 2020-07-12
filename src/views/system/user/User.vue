<template>
    <el-container style="height: 100%;">
        <el-header style="font-size: 12px;padding: 0">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="deptname" placeholder="输入部门名称搜索" size="small" clearable style="width: 210px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="username" placeholder="输入用户名称或邮箱搜索" size="small" clearable style="width: 190px"></el-input>
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
                <el-tree :data="tree" v-model="deptname" show-checkbox node-key="id"
                         :filter-node-method="filterNode" highlight-current
                         ref="tree"></el-tree>
            </el-aside>
            <el-main style="background-color: #FFFFFF">
                <el-scrollbar class="user">

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
                                prop="username"
                                label="用户名称"
                                width="150"
                                header-align="center"
                                align="center"
                                :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column
                                prop="deptname"
                                label="所在部门"
                                width="150"
                                header-align="center"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                label="邮箱"
                                width="180"
                                header-align="center"
                                align="center">
                        </el-table-column>
                        <el-table-column
                                prop="telephone"
                                label="手机号"
                                width="110"
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
                                :filters="[{text: '冻结', value: '0'}, {text: '正常', value: '1'},{text: '删除', value: '2'}, {text: '未激活', value: '3'},{text: '锁定', value: '4'}]">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.status" placeholder="状态" size="small" style="width: 90px"
                                           @change="changeStatus(scope.row)">
                                    <el-option label="冻结" :value="0"></el-option>
                                    <el-option label="正常" :value="1"></el-option>
                                    <el-option label="删除" :value="2"></el-option>
                                    <el-option label="未激活" :value="3"></el-option>
                                    <el-option label="锁定" :value="4"></el-option>
                                </el-select>
                            </template>
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
                    <Detail :visible="visible" :form="form" :disabled="disabled" :title="title" :depts="depts" :create="create"
                            @closeDialog="closeDialog" @submitEdit="submitEdit(form)" @submitAdd="submitAdd(form)"></Detail>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

  import {list,detail,del,add,edit,updateStatus} from '@/api/user';
  import {superior} from '@/api/dept';
  import Detail from "@/views/system/user/detail";

  export default {
    name: "User",
    components: {Detail},
    data() {
      return {
        username: null,
        deptname: null,
        deptId:[],
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
        depts:[],
        create:false,
        tree:[],
        first:true
      }
    },
    watch: {
      deptname(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      onSubmit() {
        if (this.first){
          this.first = false;
        }else{
          this.deptId = this.$refs.tree.getCheckedKeys()
        }
        this.tableData=[];
        this.form = {};
        let start = null, end = null;
        if (this.selectTime) {
          start = this.selectTime[0];
          end = this.selectTime[1];
        }
        let data = {
          username: this.username,
          deptId:this.deptId,
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
        this.username= null;
        this.status=  [];
        this.deptId = [];
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
        this.title='新增用户';
        this.create = true;
      },
      detail(row){
        detail(row.id).then(res=>{
          if (res.code===200){
            this.visible = true;
            this.form = res.data;
            this.disabled=true;
            this.title='用户详情';
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
            this.title='编辑用户';
            this.create = false;
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
          this.depts=res.data;
        }).catch(()=>{})
      },
      submitEdit(form){
        let data = {
          id: form.id,
          username: form.username,
          status: form.status,
          email: form.email,
          deptId: form.deptId,
          telephone: form.telephone,
          remark: form.remark
        };
        edit(data).then(()=>{
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.visible=false;
          this.onSubmit();
        }).catch(()=>{})
      },
      submitAdd(form){
        let data = {
          username: form.username,
          status: form.status,
          email: form.email,
          deptId: form.deptId,
          telephone: form.telephone,
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