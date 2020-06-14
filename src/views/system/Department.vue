<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="name" placeholder="输入部门名称搜索" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="status" placeholder="状态" size="small" style="width: 90px">
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
                <el-button type="warning" @click="onSubmit" size="small" icon="el-icon-refresh-right">重置</el-button>
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
                    <el-button @click="handleClick(scope.row)" type="primary" size="small" icon="el-icon-document"></el-button>
                    <el-button @click="handleClick(scope.row)" type="warning" size="small" icon="el-icon-edit"></el-button>
                    <el-button @click="handleClick(scope.row)" type="danger" size="small" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
    </div>
</template>

<script>

  import {list} from '@/api/dept';

  export default {
    name: "Department",
    data() {
      return {
        name: null,
        status: null,
        selectTime: null,
        operateName: null,
        tableData: [],
        currentPage:1
      }
    },
    methods: {
      onSubmit() {
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
          operateName: this.operateName
        };
        list(data).then(res => {
          this.tableData = res.data
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
      handleSizeChange(){

      },
      handleCurrentChange(){

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