<template>
    <el-dialog :visible.sync="visible" :title="data.title" :disabled="true" :show-close="false" :center="true" :before-close="cancel">
        <el-transfer
            filterable
            filter-placeholder="请输入资源名称"
            :titles="['未选择资源', '已选择资源']"
            :data="data.data"
            v-model="data.value">
        </el-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
  import {save} from '@/api/role_res';

  export default {
    name: "roleRes",
    props: {
      visible: {type: Boolean, default: false},
      data: {type: Object, default: ()=>{}},
    },
    methods: {
      cancel(){
        this.$emit('cancel');
      },
      submit(){
        let data = {roleId:this.data.id,targetIds:this.data.value,targetType:3}
        save(data).then(()=>{
          this.$message({
            message: '编辑成功',
            type: 'success'
          });
          this.cancel();
        }).catch(()=>{})
      }
    }
  }
</script>