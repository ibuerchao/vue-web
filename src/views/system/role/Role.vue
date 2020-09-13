<template>
    <el-scrollbar>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="name" placeholder="输入角色名称搜索" size="small" clearable style="width: 210px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="code" placeholder="输入角色编码搜索" size="small" clearable style="width: 190px"></el-input>
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
                    label="角色名称"
                    width="150"
                    header-align="center"
                    align="center"
                    :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="角色编码"
                    width="200"
                    header-align="center"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="100"
                    header-align="center"
                    align="center"
                    column-key="status"
                    :filter-multiple="false"
                    :filters="[{text: '正常', value: '1'}, {text: '禁用', value: '0'}]">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status === 1"
                            active-color="#409EFF"
                            inactive-color="#DCDFE6"
                            @change="changeStatus(scope.row, scope.row.status)"
                    />
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
                    prop="remark"
                    label="备注"
                    header-align="center"
                    align="center"
                    :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="320"
                    align="center"
                    header-align="center">
                <template slot-scope="scope">
                    <el-button @click="detail(scope.row)" type="primary" size="small" icon="el-icon-document"></el-button>
                    <el-button @click="edit(scope.row)" type="warning" size="small" icon="el-icon-edit"></el-button>
                    <el-button @click="org(scope.row,1)" type="warning" size="small" icon="el-icon-office-building"></el-button>
                    <el-button @click="org(scope.row,2)" type="warning" size="small" icon="el-icon-share"></el-button>
                    <el-button @click="org(scope.row,3)" type="warning" size="small" icon="el-icon-tickets"></el-button>
                    <el-button @click="roles(scope.row)" type="warning" size="small" icon="el-icon-s-check"></el-button>
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
        <Detail :visible="visible" :form="form" :disabled="disabled" :title="title" :create="create"
                @closeDialog="closeDialog" @submitEdit="submitEdit(form)" @submitAdd="submitAdd(form)"></Detail>
        <UserRole :visible="role_visible" :title="role_title" :data="role_data" @cancel="cancel"></UserRole>
        <RoleOrg :data="role_org_data" :visible="role_org_visible" @cancel="cancel"></RoleOrg>
        <RoleModule :data="role_module_data" :visible="role_module_visible" @cancel="cancel"></RoleModule>
    </el-scrollbar>
</template>

<script>

  import {list,detail,del,add,edit,updateStatus} from '@/api/role';
  import {list as role_user_list} from '@/api/role_user';
  import {list as role_res_list} from '@/api/role_res';
  import {superior as deptTree} from '@/api/dept';
  import {superior as moduleTree} from '@/api/module';
  import Detail from "@/views/system/role/detail";
  import UserRole from "@/views/system/role/userRole";
  import RoleOrg from "@/views/system/role/roleOrg";
  import RoleModule from "@/views/system/role/roleModule";

  export default {
    name: "Role",
    components: {Detail,UserRole,RoleOrg,RoleModule},
    data() {
      return {
        name: null,
        code: null,
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
        create:false,
        role_visible:false,
        role_data:{},
        role_title:'',
        role_org_data:{},
        role_org_visible:false,
        role_module_data:{},
        role_module_visible:false,
      }
    },
    methods: {
      onSubmit() {
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
      changeStatus(row, status) {
        if (status === 1) {
          row.status = 0;
        } else {
          row.status = 1;
        }
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
        this.name= null;
        this.code= null;
        this.status=  [];
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
        this.visible = true;
        this.form={};
        this.disabled=false;
        this.title='新增角色';
        this.create = true;
      },
      detail(row){
        detail(row.id).then(res=>{
          if (res.code===200){
            this.visible = true;
            this.form = res.data;
            this.disabled=true;
            this.title='角色详情';
          }
        }).catch(()=>{})
      },
      edit(row){
        detail(row.id).then(res=>{
          if (res.code===200){
            this.visible = true;
            this.form = res.data;
            this.disabled=false;
            this.title='编辑角色';
            this.create = false;
          }
        }).catch(()=>{})
      },
      org(row,type){
        let dataParams = {id:'root',status:1};
        let selectParam = {roleId:row.id,targetType:type}
        if (type === 1){
          deptTree(dataParams).then(res=>{
            this.role_org_visible = true;
            this.role_org_data.data = res.data;
            this.role_org_data.title = row.name;
            this.role_org_data.roleId = row.id;
          }).catch(()=>{});
          role_res_list(selectParam).then(res=>{
            this.role_org_data.value = res.data;
          }).catch(()=>{})
        }else if(type === 2){
          moduleTree(dataParams).then(res=>{
            this.role_module_visible = true;
            this.role_module_data.data = res.data;
            this.role_module_data.title = row.name;
            this.role_module_data.roleId = row.id;
          }).catch(()=>{})
          role_res_list(selectParam).then(res=>{
            this.role_module_data.value = res.data;
          }).catch(()=>{})
        }else{
          console.log(type)
        }
      },
      roles(row){
        let data = {id:row.id,type:1};
        role_user_list(data).then(res=>{
          if (res.code===200){
            this.role_visible = true;
            this.role_data = res.data;
            this.role_title = row.name;
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
      cancel(){
        this.role_visible=false;
        this.role_data={};
        this.role_org_visible = false;
        this.role_org_data={};
        this.role_module_visible = false;
        this.role_module_data={};
      },
      submitEdit(form){
        let data = {
          id: form.id,
          name: form.name,
          code: form.code,
          status: form.status,
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
          name: form.name,
          code: form.code,
          status: form.status,
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
    }
  }
</script>

<style lang="scss">
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

    .el-tooltip__popper{max-width:50%}
</style>