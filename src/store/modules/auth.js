import axios from '../../axios'
import { getCurrentInstance } from 'vue';



const state = {
    authUser : null,
    isAuthenticated : false,
}

const mutations = {

    SET_AUTH_USER(state, user){

        state.authUser = user;
    },

    SET_AUTH(state, data) {

        state.isAuthenticated = data;

    }

}

const getters = {
    
    isAuthenticated : state => { return state.isAuthenticated },

    authUser : state => { return state.authUser },

    authUserImage : state => {

        const app = getCurrentInstance()

        if (state.authUser.provider){
            return state.authUser.image;
        }    
        
        const path = app.appContext.config.globalProperties.$baseUrl;
        return path + state.authUser.image;  
    }

}

const actions = {
    
    async auth({commit, getters}) {
        try {
            let response = await axios.get('/api/auth');             
            commit('SET_AUTH', response.data.isAuthenticated); 
            commit('SET_AUTH_USER', response.data.user);  
        } catch (error) {           
            commit('SET_AUTH', false);   
        }   
    },

    async login({commit, getters}, payload) {
        let response = await axios.post('/api/auth/login', payload);  
    },

    async logout({commit, getters}) {
        await axios.post('/api/logout'); 
   },

    async passwordReset({commit},payload) {
        return await axios.post('/api/password/reset', payload);
    },

    async passwordChange({commit}, payload) {
        return await axios.put('/api/account/password/change', payload);
    }
 
}

export default {
     actions,
     state,
     getters,
     mutations,
}