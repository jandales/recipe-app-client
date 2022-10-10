<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { useRoute } from  'vue-router'
import { useStore } from 'vuex'
//components
import Recipe from './Recipe.vue';
import Observer from '../Observer.vue';
import Spinner from '../Spinner.vue';

const store = useStore();
const route = useRoute();
const app = getCurrentInstance();

const { $perpage } = app.appContext.config.globalProperties;

const recipes = ref([]);
const page = ref(0);
const isMoreToLoad = ref(false);
const lastEntryCount = ref(0);

const getRecipes = async(page = 0) => {
    await store.dispatch('getUserRecipes', { id : route.params.id, page : page });
    recipes.value = [...recipes.value, ...userRecipes.value]
    lastEntryCount.value = userRecipes.value.length; 
}

const userRecipes = computed( () => { return store.getters.recipes } );

const handleLoadMoreRecipe = async () => {
    if (lastEntryCount.value < $perpage) return 
    page.value += $perpage;  
    isMoreToLoad.value  = true;
    await getRecipes(page.value);     
    isMoreToLoad.value = false;   
}


await getRecipes();



</script>

<template>
    <div class="w-full flex flex-wrap gap-4 px-4 md:px-0">                          
        <Recipe  v-for="recipe in recipes" :recipe="recipe" :key="recipe._id"/>  
        <Observer @handleLoadMoreRecipe="handleLoadMoreRecipe" />
    </div>
    <div  v-if="recipes && recipes.length == 0" class=" w-full flex flex-col justify-center items-center mt-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 text-gray-500 mb-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                    </svg>
             <h1 class="text-lg block text-center text-gray-500">Upload your Recipe</h1>
    </div>
    <Spinner v-if="isMoreToLoad" />  
</template>