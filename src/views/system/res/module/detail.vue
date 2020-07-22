<template>
    <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" :disabled="true" :show-close="false" width="30%">
        <el-form :model="form">
            <el-form-item label="模块名称" :label-width="labelWidth" maxlength="20">
                <el-input v-model="form.name" :disabled="disabled" size="small" ></el-input>
            </el-form-item>
            <el-form-item label="模块状态" :label-width="labelWidth">
                <el-input v-if="disabled" :value="form.status=== 1 ? '正常':'禁用'" :disabled="disabled" size="small"></el-input>
                <el-select v-else v-model="form.status" placeholder="状态" size="small">
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上级模块" :label-width="labelWidth" v-if="!disabled">
                <treeselect v-model="form.parentId" :options="modules" placeholder="选择上级类目" />
            </el-form-item>
            <el-form-item label="层级" :label-width="labelWidth" v-if="disabled">
                <el-input v-model="form.level" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="序号" :label-width="labelWidth" v-if="disabled">
                <el-input v-model="form.seq" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="labelWidth">
                <el-input v-model="form.remark" type="textarea" rows="3" :disabled="disabled" size="small" resize="none"></el-input>
            </el-form-item>
            <el-form-item label="操作人" :label-width="labelWidth" v-if="disabled">
                <el-input v-model="form.operateName" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="操作时间" :label-width="labelWidth" v-if="disabled">
                <el-input v-model="form.operateTime" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="操作IP" :label-width="labelWidth" v-if="disabled">
                <el-input v-model="form.operateIp" :disabled="disabled" size="small"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary"  @click="submitEdit" :disabled="disabled">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    components: { Treeselect },
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
      title:{
        type:String,default:''
      },
      modules:{type:Array,default:[]},
      create:{
        type:Boolean,default:false
      },
      oldParentId:{
        type:String,default:''
      },
      labelWidth: {type:String,default:'100px'}
    },
    methods: {
      handleClose() {
        this.$emit('closeDialog');
      },
      submitEdit(){
        if (this.create){
          this.$emit('submitAdd',this.from);
        }else {
            this.$emit('submitEdit',this.from,this.oldParentId);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .el-form-item{
        margin-bottom: 10px;
    }
   /deep/ .vue-treeselect__control{
       display: inherit !important;
       height: 36px !important;
    }
</style>