<template>
    <el-dialog :visible.sync="visible" :title="title" :disabled="true" :show-close="false" :center="true" :before-close="cancel">
        <el-transfer
            filterable
            filter-placeholder="请输入用户名称"
            :titles="['未选择用户', '已选择用户']"
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
  import {save} from '@/api/role_user';

  export default {
    name: "userRole",
    props: {
      visible: {type: Boolean, default: false},
      data: {type: Object, default: ()=>{}},
      title: {type: String, default: ''}
    },
    methods: {
      cancel(){
        this.$emit('cancel');
      },
      submit(){
        let data = {id:this.data.id,targetIds:this.data.value,type:1}
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