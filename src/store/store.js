import Vue from 'vue'
import Vuex from 'vuex'
import permission from "@/store/modules/permission";
import user from "@/store/modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    permission,
    user
  }
});

export default store