<template>
    <el-dialog title="部门详情" :visible.sync="visible" :before-close="handleClose" :disabled="true" :show-close="false"
               class="dialog">
        <el-form :model="form">
            <el-form-item label="部门名称" :label-width="labelWidth" maxlength="20">
                <el-input v-model="form.name" :disabled="disabled" size="small" ></el-input>
            </el-form-item>
            <el-form-item label="部门状态" :label-width="labelWidth">
                <el-input :value="form.status=== 1 ? '正常':'禁用'" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="层级序号" :label-width="labelWidth">
                <el-input v-model="form.seq" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="labelWidth">
                <el-input v-model="form.remark" type="textarea" rows="3" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="操作人" :label-width="labelWidth">
                <el-input v-model="form.operateName" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" :label-width="labelWidth">
                <el-input v-model="form.operateTime" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="操作IP" :label-width="labelWidth">
                <el-input v-model="form.operateIp" :disabled="disabled" size="small"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleClose">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
  export default {
    name: "detail",
    props: {
      visible:{
        type:Boolean,default:false
      },
      form:{
        type:Object
      },
      disabled:{
        type:Boolean,default:true
      },
      labelWidth: {type:String,default:'100px'}
    },
    methods: {
      handleClose() {
        this.$emit('closeDialog');
      }
    }
  }
</script>

<style lang="scss" scoped>
    .el-textarea__inner {
        resize: none;
    }

    .el-form-item{
        margin-bottom: 10px;
    }

    .dialog {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .el-dialog {
            margin: 0 auto !important;
            width: 30%;
            height: 90%;
            overflow: hidden;

            .el-dialog__body {
                position: absolute;
                left: 0;
                top: 54px;
                bottom: 0;
                right: 0;
                padding: 0;
                z-index: 1;
                overflow: hidden;
                overflow-y: auto;
            }
        }
    }
</style>