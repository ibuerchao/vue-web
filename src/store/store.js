import Vue from 'vue'
import Vuex from 'vuex'
import permission from "@/store/modules/permission";
import user from "@/store/modules/user";
import tagsView from "@/store/modules/tagsView";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    permission,
    user,
    tagsView
  }
});

export default store