<template>
    <el-dialog :visible.sync="visible" :title="data.title" :disabled="true" :show-close="false"
               :center="true" :before-close="cancel" width="30%">
        <el-input placeholder="输入模块名称搜索" v-model="modulename" size="small"></el-input>
        <el-scrollbar style="height: 300px">
            <el-tree :data="data.data"
                     show-checkbox
                     node-key="id"
                     v-model="modulename"
                     default-expand-all
                     :filter-node-method="filterNode"
                     highlight-current
                     :default-checked-keys="data.value"
                     ref="tree">
            </el-tree>
        </el-scrollbar>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
  import {save} from '@/api/role_res';

  export default {
    name: "roleOrg",
    data() {
      return {
        modulename: null
      }
    },
    watch: {
      modulename(val) {
        this.$refs.tree.filter(val);
      }
    },
    props: {
      visible: {type: Boolean, default: false},
      data: {type: Object, default: () => {}},
    },
    methods: {
      cancel() {
        this.$emit('cancel');
      },
      submit() {
        let data = {roleId:this.data.roleId,targetType:2,targetIds:this.$refs.tree.getCheckedKeys()}
        save(data).then(()=>{
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.cancel();
        }).catch(()=>{})
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    }
  }
</script>