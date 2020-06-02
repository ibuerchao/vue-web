import constRoutes from '@/router/routes';

function updateProperty(menus) {
  menus.forEach(menu =>{
    delete menu.component;
    if (menu.children && menu.children.length){
      menu.path=menu.children[0].path;
      updateProperty(menu.children)
    }
  });
  return menus;
}

const permission = {
  state: {
    routes: constRoutes,
    menus:[],
    menuFlag:false,
    subMenu:[]
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.routes = constRoutes.concat(routes);
    },

    SET_MENUS: (state, menus) => {
      let temp = JSON.parse(JSON.stringify(menus));
      state.menus = updateProperty(temp);
    },

    SET_MENU_FLAG:(state,menuFlag)=>{
      state.menuFlag = menuFlag;
    },

    SET_SUBMENU:(state,subMenu) =>{
      state.subMenu = subMenu;
    }
  },
  actions:{
    generateRoutes({commit}, routes) {
      commit('SET_ROUTES',routes);
    },

    generateMenus({commit}, menus) {
      commit('SET_MENUS',menus)
    },

    updateMenuFlag({commit},menuFlag){
      return new Promise(() => {
        commit('SET_MENU_FLAG', menuFlag)
      })
    }
  },
  getters:{
    menuFlag(state){
      return state.menuFlag;
    },

    menus(state){
      return state.menus;
    },

    subMenu(state){
      return state.subMenu;
    }
  }
};

export default permission