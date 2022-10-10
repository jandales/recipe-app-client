<template>
    <div class="relative w-full">
        <div v-if="!isLoading" class="w-full">
            <div v-if="recipes" class="mt-8 flex flex-col md:flex-row flex-wrap w-full gap-4 md:gap-8">  
                <Recipe v-for="recipe in recipes" :recipe="recipe" :key="recipe._id" /> 
            </div>   
            <div v-if="recipes.length == 0" class="w-full text-center">
                No result Found
            </div> 
        </div>
        <PageLoading v-else> </PageLoading>
    </div>
   
</template>
<script setup>

    import Recipe from '../components/Recipe.vue';
    import PageLoading from '../components/PageLoading.vue'

    import { useStore } from 'vuex'; 
    import { useRoute } from 'vue-router';    
    import { ref, onMounted, watchEffect, computed, getCurrentInstance } from 'vue';    

    const store = useStore();
    const route = useRoute();
    const app = getCurrentInstance();

    const isLoading = ref(false);
    const { $defaultRecipeImage, $baseUrl } = app.appContext.config.globalProperties;

    const searchRecipes = async() => {

        isLoading.value = true;
        let keyword = route.query.keyword;
        try   {
            await store.dispatch('searchRecipes', keyword);
        } catch(err) {
            console.log(err);            
        } finally {
            isLoading.value = false;
        }
    }

    let recipes = computed(() => {
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

    onMounted(searchRecipes);   
    
    watchEffect(
        () => route.query.keyword, searchRecipes,      
     );

</script>