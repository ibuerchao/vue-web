<template>
    <el-container style="height: 100%;">
        <el-header style="text-align: right; font-size: 12px;padding: 0">
            <Header/>
        </el-header>
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px">
                <Aside/>
            </el-aside>
            <el-main>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="breadcrumb in breadcrumbData">{{breadcrumb}}</el-breadcrumb-item>
                </el-breadcrumb>

                <el-tag style="margin: 5px"
                        v-for="tag in tags"
                        :key="tag.name"
                        closable
                        :type="tag.type">
                    {{tag.name}}
                </el-tag>
                    <div style="border-top: solid 1px red">
                        <transition mode="out-in">
                            <router-view/>
                        </transition>
                    </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<style>
    .el-main{
        background-color: #F5F7F9;
    }
</style>

<script>
  import Header from '../components/Header.vue';
  import Aside from '../components/Aside.vue';

  export default {
    components: {
      Header,
      Aside
    },
    created() {
      this.getBreadcrumb()
    },
    methods:{
      getBreadcrumb(){
        this.breadcrumbData = [this.$store.getters.subMenu.name,this.$route.name]
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        breadcrumbData:[],
        tableData: Array(200).fill(item),
        tags: [
          { name: '标签一', type: '' },
          { name: '标签二', type: 'success' },
          { name: '标签三', type: 'info' },
          { name: '标签四', type: 'warning' },
          { name: '标签五', type: 'danger' }
        ]
      }
    }
  };
</script>