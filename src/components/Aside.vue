<template>
    <el-menu :default-openeds="['systemManage','userManage']"
             @select="handleSelect"
             router>
        <NavMenu :navMenus='subMenu.children'></NavMenu>
    </el-menu>
</template>

<script>
  import NavMenu from './NavMenu.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: "Aside",
    components: {
      NavMenu
    },
    computed: {
      ...mapGetters([
        'subMenu'
      ])
    },
    data () {
      return {
        leftMenus: {
          'entity': null,
          'children': [
            {
              'entity': {
                'id': 1,
                'parentMenuId': 0,
                'icon': 'el-icon-message',
                'name': '系统管理',
                'sort': 0,
                'path': '/system',
                'type': 'NONE',
                'discription': '用于系统管理的菜单',
                'createUserId': 1
              },
              'children': [
                {
                  'entity': {
                    'id': 3,
                    'parentMenuId': 1,
                    'icon': 'el-icon-loading',
                    'name': '权限管理',
                    'sort': 0,
                    'path': '/system/dept',
                    'type': 'NONE',
                    'discription': '用于权限管理的菜单',
                    'createUserId': 1
                  },
                  'children': null
                },
                {
                  'entity': {
                    'id': 4,
                    'parentMenuId': 1,
                    'name': '角色管理',
                    'icon': 'el-icon-bell',
                    'sort': 1,
                    'path': '/system/user',
                    'type': 'LINK',
                    'discription': '用于角色管理的菜单',
                    'createUserId': 1
                  },
                  'children': null
                },
                {
                  'entity': {
                    'id': 2,
                    'parentMenuId': 1,
                    'name': '菜单管理',
                    'icon': 'el-icon-edit',
                    'sort': 2,
                    'path': '/system/menu',
                    'type': 'LINK',
                    'discription': '用于菜单管理的菜单',
                    'createUserId': 1
                  },
                  'children': null
                },
                {
                  'entity': {
                    'id': 5,
                    'parentMenuId': 1,
                    'name': '分组管理',
                    'icon': 'el-icon-mobile-phone',
                    'sort': 3,
                    'path': '/system/group',
                    'type': 'LINK',
                    'discription': '用于分组管理的菜单',
                    'createUserId': 1
                  },
                  'children': null
                }
              ]
            }
          ]
        }
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key,keyPath);
      }
    }
  }
</script>

<style lang="less">
    .el-menu{
        border: none;
    }
</style>