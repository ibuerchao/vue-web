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
                <el-breadcrumb style="padding-bottom: 10px;height: 14px;" separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="breadcrumb in breadcrumbData" :key="breadcrumb">{{breadcrumb}}</el-breadcrumb-item>
                </el-breadcrumb>
                <TagsView/>
                <div class="context">
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
        padding:10px 5px 0 5px;
    }
    .context{
        width: calc(100% - 20px);
        height:calc(100% - 88px);
        background-color: #FFFFFF;
        padding: 10px;
        margin-top: 10px;
        box-shadow: 0 0 10px #c0adaf;
    }
</style>

<script>
  import Header from '../components/Header.vue';
  import Aside from '../components/Aside.vue';
  import TagsView from '../components/TagsView/TagsView.vue';
  import {loadSubMenu} from "@/utils/menu";

  export default {
    components: {
      Header,
      Aside,
      TagsView
    },
    created() {
      this.getBreadcrumb()
    },
    methods:{
      getBreadcrumb(){
        loadSubMenu(this.$route);
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
      }
    }
  };
</script>