import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        userInfo: {
            user: null,
            token: null
        }
    },
    mutations: {
        userInfo (state,userInfo) {
            state.userInfo = userInfo;
        },
        logOut(state){
            state.userInfo = {
                username: null,
                token: null
            };
        }
    }
});
export default store;
