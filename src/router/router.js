import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import {getToken,getMenus} from '@/api/api'
import store from "@/store/store";

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
 * 加载左侧子菜单
 */
function loadSubMenu(to) {
  let path = to.path;
  //默认跳转根路由，激活头部第一个主菜单
  let subMenu = store.getters.menus[0];
  if (path ==='/'){
    store.commit('SET_SUBMENU',subMenu);
    store.commit('SET_ACTIVEINDEX',subMenu.path)
    store.commit('SET_SUB_ACTIVEINDEX',subMenu.children[0].path)
  }else {
    //不是根路由，则截取url第一节后匹配出对应的子菜单
    let index = path.substr(1).indexOf('/');
    if (index!==-1){
      path = path.substr(0,index+1);
    }
    subMenu = store.getters.menus.filter(menu => menu.path === path);
    if (subMenu.length>0){
      store.commit('SET_SUBMENU',subMenu[0]);
      store.commit('SET_ACTIVEINDEX',subMenu[0].path);
      store.commit('SET_SUB_ACTIVEINDEX',to.path)
    }
  }
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
  return () => import('@/views/' + path + '.vue');
}

export default routers;