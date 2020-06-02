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

function loadMenus(next, to){
  let menus = getMenus();
  store.commit('SET_MENUS',menus)
  let router = filterRouter(menus);
  store.dispatch('generateRoutes',router).then(() =>{
    routers.addRoutes([
      {
        path: '/',
        name: 'home',
        component: loadView('Index'),
        meta: {
          title: '首页'
        },
        children:router
      },
      { path: '*', redirect: '/404', hidden: true }
    ]); // 动态添加可访问路由表
    next({ ...to, replace: true })
  })
}

function filterRouter(menus) {
  return menus.filter(menu => {
    if (menu.component==='menu') {
      delete menu.component;
    }else{
      const component = menu.component
      menu.component = loadView(component)
    }
    if (menu.children && menu.children.length) {
      menu.children = filterRouter(menu.children)
    }
    return true
  })
}

function loadView(path) {
  return () => import('@/views/' + path + '.vue');
}

export default routers;