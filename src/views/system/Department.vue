<template>
    <el-scrollbar>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="name" placeholder="输入部门名称搜索" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="status" placeholder="状态" size="small" style="width: 90px">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
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
                <el-input v-model="operateName" placeholder="操作人名称" size="small" style="width: 150px" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" size="small" icon="el-icon-search">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="warning" @click="reset()" size="small" icon="el-icon-refresh-right">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData"
                  :row-style="{height:'20px'}"
                  :cell-style="{padding:'5px'}"
                  max-height="480"
                  style="font-size: 13px;"
                  row-key="id"
                  lazy
                  :load="load"
                  stripe
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                    prop="name"
                    label="部门名称"
                    width="180"
                    header-align="left"
                    align="left">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="100"
                    header-align="center"
                    align="center">
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
                    prop="seq"
                    label="排序"
                    width="100"
                    header-align="center"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="operateName"
                    label="操作者"
                    width="200"
                    header-align="center"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="operateTime"
                    label="操作时间"
                    width="152"
                    header-align="center"
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
                    align="center"
                    header-align="center">
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
                    <el-button @click="delete(scope.row)" type="danger" size="small" icon="el-icon-delete"></el-button>
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
        <Detail :visible="visible" :form="form" :disabled="disabled" @closeDialog="closeDialog"></Detail>
    </el-scrollbar>
</template>

<script>

  import {list,detail,del} from '@/api/dept';
  import Detail from "@/views/system/dept/detail";

  export default {
    name: "Department",
    components: {Detail},
    data() {
      return {
        name: null,
        status: null,
        selectTime: null,
        operateName: null,
        tableData: [],
        currentPage:1,
        pageSize:10,
        total:0,
        visible:false,
        form:{},
        disabled:true
      }
    },
    methods: {
      onSubmit() {
        this.tableData=[];
        let start = null, end = null;
        if (this.selectTime) {
          start = this.selectTime[0];
          end = this.selectTime[1];
        }
        let data = {
          name: this.name,
          status: this.status,
          start: start,
          end: end,
          operateName: this.operateName,
          offset:(this.currentPage -1)*this.pageSize,
          limit:this.pageSize
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
      },
      load(row,treeNode,resolve){
        let data = {parentId:row.id};
        list(data).then(res=>{
          resolve(res.data)
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
        this.status=  null;
        this.selectTime=  null;
        this.operateName=  null;
        this.tableData= [];
        this.currentPage= 1;
        this.pageSize=10;
        this.total=0;
        this.onSubmit();
      },
      detail(row){
        detail(row.id).then(res=>{
          if (res.code===200){
            this.visible = true;
            this.form = res.data;
            this.disabled=true;
          }
        }).catch(()=>{})
      },
      edit(row){
        detail(row.id).then(res=>{
          if (res.code===200){
            this.visible = true;
            this.form = res.data;
            this.disabled=false;
          }
        }).catch(()=>{})
      },
      delete(row){
        del(row.id).then(res=>{
          console.log(res)
        }).catch(()=>{})
      },
      closeDialog(){
        this.visible=false;
      }
    },
    created() {
      this.onSubmit();
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