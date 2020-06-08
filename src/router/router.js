import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import {getToken,getMenus} from '@/api/api'
import store from "@/store/store";
import {loadSubMenu} from "@/utils/menu";

Vue.use(Router);

// 注册路由
let routers =new Router({
  mode: 'history',
  routes
});

const whiteList = ['/login'];

/**
 * 前置守卫
 */
routers.beforeEach((to,from,next) =>{
  console.log('token',getToken(),from.path,'=>',to.path)
  if (getToken()){
    if (to.path === '/login'){
      next({ path: '/' })
    }else{
      if (store.getters.roles.length === 0){
        store.dispatch('getInfo').then(() => {
          loadMenus(next, to)// 动态路由，拉取菜单
        })
      }else if(store.getters.menuFlag){
        store.dispatch('updateMenuFlag',false).then(() => {});
        loadMenus(next,to);
      }else{
        next()
      }
    }
  }else{
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
});

/**
 * 动态加载路由
 */
function loadMenus(next, to){
  let menus = getMenus();
  store.commit('SET_MENUS',menus);
  loadSubMenu(to);
  let router = filterRouter(menus);
  router = [
    {
      path: '/',
      name: '首页',
      component: loadView('Index'),
      meta: {
        title: '首页',
        affix: true
      },
      children:router
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
  store.dispatch('generateRoutes',router).then(() =>{
    routers.addRoutes(router); // 动态添加可访问路由表
    next({ ...to, replace: true })
  })
}


/**
 * 将字符串类型的component实例化
 */
function filterRouter(menus) {
  return menus.filter(menu => {
    menu.component = loadView(menu.component)
    if (menu.children && menu.children.length) {
      menu.redirect=menu.children[0].path;
      menu.children = filterRouter(menu.children)
    }
    return true
  })
}

/**
 * 加载组件
 */
function loadView(path) {
  return (resolve) => require([`@/views/${path}`], resolve)
}

export default routers;