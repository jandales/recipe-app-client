<script setup>
import { useStore } from 'vuex';     
import { ref, computed, getCurrentInstance } from 'vue';

//components
import Observer from '../../components/Observer.vue';
import Recipe from '../../components/Recipe.vue';
import Spinner from '../../components/Spinner.vue';

const store = useStore(); 
const app = getCurrentInstance(); 

const recipes = ref([]);
const page = ref(0);
const haveNothingToLoad = ref(false);
const lastEntryCount = ref(0);

const { $perpage, $defaultRecipeImage, $baseUrl } =  app.appContext.config.globalProperties;

const getRecipes = async (page = 0) => {     
    try {   
        await store.dispatch('getRecipes', page);
        recipes.value = [...recipes.value, ...Filterrecipes.value];
        lastEntryCount.value = Filterrecipes.value.length; 
    } catch (err) {
        console.log(err)
    } 
}

let Filterrecipes = computed(() => {
    return store.getters.recipes.map(recipe => {
        const user_id = store.getters.authUser._id       
        recipe.isSaved = recipe.saved.includes(user_id);
        recipe.isAuthUserRecipe = user_id == recipe.user._id ? true : false;
        if(!recipe.image){
          recipe.image = $defaultRecipeImage;
        }else {
          recipe.image = $baseUrl + recipe.image;
        }         
        return recipe;
    })
})

const handleSaveRecipe = async(id) =>  {
      store.dispatch('saveRecipe', id);
} 

const handleLoadMoreRecipe = async () => { 
    if(lastEntryCount.value < $perpage) return haveNothingToLoad.value = false; 
    haveNothingToLoad.value = true;   
    page.value += $perpage;      
    await getRecipes(page.value);    
    haveNothingToLoad.value =  false;  
}

await getRecipes();

</script>
<template>
    <div class="flex  flex-wrap w-full gap-4 px-4 md:gap-8">  
         <Recipe 
            v-for="recipe in recipes"
            :recipe="recipe" 
            @handleSaveRecipe="handleSaveRecipe"                 
         />   
         <Observer @handleLoadMoreRecipe="handleLoadMoreRecipe" />  
    </div>
<Spinner v-if="haveNothingToLoad" />
</template>