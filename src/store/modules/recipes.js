import axios from '../../axios'

const state =  {

    recipes : [],

    recipe : null,

    recipeUser : null,

    savedRecipes : [],
}


const getters = {

    recipes : state => { return state.recipes },

    recipe  : state => { return state.recipe },

    recipeUser : state => { return state.recipeUser },

    recipesCount : state => { return state.recipes.length },

    savedRecipes : state => { return state.savedRecipes },

    savedRecipesCount : state => { return state.savedRecipes.length }

}

const mutations = {

    SET_RECIPES(state, data) {        
        state.recipes = data;
    },

    SET_SAVED_RECIPES(state, data) {        
        state.savedRecipes = data;
    },

    SET_RECIPE_USER(state, data) {
        state.recipeUser = data;
    },

    SET_RECIPE(state, data) {
        state.recipe = data;
    }

}

const actions = {

    async getRecipes({commit, getters}, page) {

        let api = `/api/recipes`; 
      
        if (page != null) {
            api += `?page=${page}`; 
        }

        let response = await axios.get(api); 
        commit('SET_RECIPES', response.data);        

    },

    async getUserRecipes({commit}, payload) {

        const { id, page} = payload;
        let api = `/api/recipes/user/${id}`; 

        if(page != null) {
            api += `?page=${page}`;
        } 

        let response = await axios.get(api); 
        commit('SET_RECIPES', response.data);       
    },

    async getSavedRecipes({commit}, payload) {

        const { id, page} = payload;

        let api = `/api/recipes/saved/user/${id}` 

        if (page != null) {
            api += `?page=${page}`
        }  

        let response = await axios.get(api); 
        commit('SET_SAVED_RECIPES', response.data);        
    },

    async searchRecipes({commit}, payload ){            
        let response = await axios.get(`/api/recipes/search/${payload}`); 
        commit('SET_RECIPES', response.data);   
    },



    async getRecipe({commit}, payload) {
        let response = await axios.get(`/api/recipe/${payload}`);
        commit('SET_RECIPE', response.data);
    },

    async destroyRecipe({commit}, payload) {
        let response = await axios.delete(`/api/recipe/destroy/${payload}`);    
    },

    async updateRecipe({commit}, payload) {
        const { id , form } = payload     
        let response = await axios.put(`/api/recipe/update/${id}`, form, {
            headers : { 'Content-Type': 'multipart/form-data' }
        });
        commit('SET_RECIPE', response.data);
    },

    async storeRecipe({commit}, payload) {
        let response = await axios.post(`/api/recipe/store`, payload, {
            headers : {  'Content-Type': 'multipart/form-data' }
        });
        commit('SET_RECIPE', response.data);
    },

    async saveRecipe({commit}, payload) {
        let response = await axios.put(`/api/recipes/${payload}/saved`);
        commit('SET_RECIPE', response.data);
    }
}

export default {
    state, getters, mutations, actions,
}