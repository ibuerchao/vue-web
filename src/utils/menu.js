import store from "@/store/store";

/**
 * 加载左侧子菜单
 */
export function loadSubMenu(to) {
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