<template>
   <div class="header">
        <div style="width: 20%;font-size: 25px;display: flex;justify-content: center; align-items: center;">
            vue-web后台系统
        </div>
       <el-menu
               :default-active="activeIndex"
               class="el-menu-demo header-menu"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               router>
               <el-menu-item v-for="menu in menus" :key="menu.path" :index="menu.path" :route="menu.redirect">{{menu.name}}</el-menu-item>
       </el-menu>

       <div style="display: flex;justify-content: center; align-items: center;">
           <el-dropdown @command="handleCommand">
               <i class="el-icon-setting" style="margin-right: 15px;color: white"></i>
               <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item command="logout">退出</el-dropdown-item>
               </el-dropdown-menu>
           </el-dropdown>
           <span>王小虎</span>
       </div>
   </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: "Header",
    computed: {
      ...mapGetters([
        'menus',
        'activeIndex'
      ])
    },
    data(){
      return {
      }
    },
    methods: {
      handleSelect(key) {
        let subMenu = this.$store.getters.menus.filter(menu => menu.path ===key);
        this.$store.commit('SET_SUBMENU',subMenu[0])
        this.$store.commit('SET_SUB_ACTIVEINDEX',subMenu[0].children[0].path)
      },

      handleCommand(command) {
        eval("this."+command+"()")
      },
      logout(){
        this.$confirm('确定注销并退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('logout').then(() => {
            location.reload()
          })
        }).catch(()=>{})
      }
    }
  }
</script>

<style lang="less">
    .header{
        display: flex;
        flex-direction: row;
        background-color:#545c64;
        color: white;
    }
    .header-menu{
        width: 75%;
    }
</style>