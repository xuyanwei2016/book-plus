import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import mutations from './mutations';
import getters from './getters'
Vue.use(Vuex);

let state = {
  cartList:[]
};
export default new Vuex.Store({
  strict:true,
  modules:{
    a:{
      state,
      mutations,
      getters,
    }
  },
  plugins: [createLogger()]
})
