import { getToken, setToken } from '@/utils/auth'
import {signIn} from '@/api/user'
import store from "@/store/store";

const user = {
  state: {
    token: getToken(),
    roles:[],
    activeIndex:'',
    subActiveIndex:''
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

    SET_SUB_ACTIVEINDEX:(state,subActiveIndex) =>{
      state.subActiveIndex = subActiveIndex;
    },
  },

  actions: {
    getInfo({ commit }) {
      commit('SET_ROLES', ['ROLE_SYSTEM_ADMIN'])
    },

    // 登录
    login({ commit }, userInfo) {
      return new Promise((resolve,reject) => {
        signIn(userInfo).then(res => {
          store.dispatch('updateMenuFlag',true).then(() => {});
          setToken(res.data, userInfo.rememberMe);
          commit('SET_TOKEN', res.data)
          commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
          commit('SET_MENU_FLAG', true)
          resolve()
        }).catch(error => {
          reject(error)
        })
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

    subActiveIndex(state){
      return state.subActiveIndex;
    },
  }
};

// export const logOut = (commit) => {
//   commit('SET_TOKEN', '')
//   commit('SET_ROLES', [])
//   removeToken()
// }

export default user
