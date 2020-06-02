import { getToken, setToken } from '@/utils/auth'
import {login} from '@/api/api'
import store from "@/store/store";

const user = {
  state: {
    token: getToken(),
    roles:[],
    activeIndex:'',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_ACTIVEINDEX:(state,activeIndex) =>{
      state.activeIndex = activeIndex;
    },
  },

  actions: {
    getInfo({ commit }) {
      commit('SET_ROLES', ['ROLE_SYSTEM_ADMIN'])
    },

    // 登录
    login({ commit }, userInfo) {
      return new Promise((resolve) => {
        let data = login(userInfo.username);
        store.dispatch('updateMenuFlag',true).then(() => {});
        setToken(data.token, true)
        commit('SET_TOKEN', data.token)
        commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
        commit('SET_MENU_FLAG', true)
        resolve()
      })
    }
  },

  getters:{
    roles(state){
      return state.roles;
    },
    activeIndex(state){
      return state.activeIndex;
    },

  }
};

// export const logOut = (commit) => {
//   commit('SET_TOKEN', '')
//   commit('SET_ROLES', [])
//   removeToken()
// }

export default user
