<template>
    <div>
        <label v-for="navMenu in navMenus" :key="navMenu.path">
            <el-menu-item v-if="navMenu.children==null"
                          :key="navMenu.path" :index="navMenu.path" :route="navMenu.path">
                <i class="el-icon-loading"></i>
                <span slot="title" class="item_title">{{navMenu.name}}</span>
            </el-menu-item>
            <el-submenu v-if="navMenu.children" :key="navMenu.path" :index="navMenu.path" >
                <template slot="title">
                    <i class="el-icon-loading"></i>
                    <span class="item_title"> {{navMenu.name}}</span>
                </template>
                <NavMenu :navMenus="navMenu.children"></NavMenu>
            </el-submenu>
        </label>
    </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    props: ['navMenus'],
    data () {
      return {}
    },
    mounted () {
    },
    methods: {}
  }
</script>

<style scoped>

</style>