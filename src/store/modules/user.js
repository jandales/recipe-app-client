import axios from '../../axios'

const state =  {
    user : null,  
    message : null,    
}


const getters = {

    user : state => { return state.user},
      
    message : state => {return state.message }

}

const mutations = {

    SET_USER(state, data) {
        state.user = data;
    },

  

}

const actions = {
  
    async user({commit, getters}) {    
        let response = await axios.get('/api/user');
        commit('SET_USER', response.data); 
    }, 

    async getUserInfo({commit}, id) {
        let response = await axios.get(`/api/user/info/${id}`);  
        commit('SET_USER', response.data);  
    },

    async updateUser({commit }, payload) {
        let response = await axios.put('/api/user/update', payload);  
        commit('SET_USER', response.data);        
    }, 

    async changePassword({commit}, payload) {       
        return await axios.put('/api/user/change-password', payload)      
    },

    async confirmDelete({commit}, payload) {     
        return await axios.post('/api/user/confirm/password', payload)
    },

    async deleteAccount({commit}) {
        const response =  await axios.delete('/api/user/delete/account') 
        return response.data;
    },

    async uploadAvatar({commit}, payload) {   
        const response =  await axios.put('/api/user/upload/avatar', {image :  payload}, {
            headers : { 'Content-Type': 'multipart/form-data' }
        });
        commit('SET_USER', response.data);
    },

    async removeAvatar({commit}) {  
        const response =  await axios.delete('/api/user/remove/avatar')
        commit('SET_USER', response.data);
    }  
}

export default {
    state, getters, mutations, actions,
}