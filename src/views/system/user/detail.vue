<template>
    <el-dialog :title="title" :visible.sync="visible" :before-close="handleClose" :disabled="true"
               :show-close="false" width="30%">
        <el-form :model="form">
            <el-form-item label="用户名称" :label-width="labelWidth" maxlength="20">
                <el-input v-model="form.username" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="labelWidth" maxlength="20">
                <el-input v-model="form.telephone" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="labelWidth" maxlength="20">
                <el-input v-model="form.email" :disabled="disabled" size="small"></el-input>
            </el-form-item>
            <el-form-item label="所在部门" :label-width="labelWidth" v-if="!disabled">
                <treeselect v-model="form.deptId" :options="depts" placeholder="选择上级类目"/>
            </el-form-item>
            <el-form-item label="用户状态" :label-width="labelWidth">
                <el-input v-if="disabled" :value="getTextStatus(form.status)" :disabled="disabled"
                          size="small"></el-input>
                <el-select v-else v-model="form.status" placeholder="状态" size="small">
                    <el-option label="冻结" :value="0"></el-option>
                    <el-option label="正常" :value="1"></el-option>
                    <el-option label="删除" :value="2"></el-option>
                    <el-option label="未激活" :value="3"></el-option>
                    <el-option label="锁定" :value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" :label-width="labelWidth">
                <el-input v-model="form.remark" type="textarea" rows="3" :disabled="disabled" size="small"
                          resize="none"></el-input>
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
            <el-button type="primary" @click="submitEdit" :disabled="disabled">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    components: {Treeselect},
    name: "detail",
    props: {
      visible: {
        type: Boolean, default: false
      },
      form: {
        type: Object
      },
      disabled: {
        type: Boolean, default: true
      },
      title: {
        type: String, default: ''
      },
      depts: {type: Array, default: ()=>[]},
      create: {
        type: Boolean, default: false
      },
      oldParentId: {
        type: String, default: ''
      },
      labelWidth: {type: String, default: '100px'}
    },
    methods: {
      handleClose() {
        this.$emit('closeDialog');
      },
      submitEdit() {
        if (this.create) {
          this.$emit('submitAdd', this.from);
        } else {
          this.$emit('submitEdit', this.from);
        }
      },
      getTextStatus(value) {
        if (value === 0) {
          return '冻结';
        } else if (value === 1) {
          return '正常';
        } else if (value === 2) {
          return '删除';
        } else if (value === 3) {
          return '未激活';
        } else if (value === 4) {
          return '锁定';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .el-form-item {
        margin-bottom: 10px;
    }

    /deep/ .vue-treeselect__control {
        display: inherit !important;
        height: 36px !important;
    }
</style>