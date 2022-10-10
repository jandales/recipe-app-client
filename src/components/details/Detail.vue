<script setup>

import { ref, computed } from 'vue'
import { useStore } from  'vuex'
import { useRoute, useRouter} from 'vue-router';
import handleUserImage from '../../helpers/handleImage';   
import recipes from '../../store/modules/recipes';


const route = useRoute();
const store =  useStore();
const router = useRouter();


const getRecipe = async() => {
    try {       
        await store.dispatch('getRecipe', route.params.id);
    } catch (err) {
        console.log(err)
    } finally {
      
    }
}

const handleDestroyRecipe = async () => { 

    try {
        await store.dispatch('destroyRecipe', recipe.value._id);
        router.push({name : 'home'});
    } catch(err) {
        console.log(err);
    }
}   

const handleSaveRecipe = async() => {
    try {
        await store.dispatch('saveRecipe', recipe.value._id);   
        console.log(isSaved.value);    
    } catch (err) {
        if (err.response.status == 401){
            router.push({name : 'login'});
        }
    }  
}

const authUser = computed(() => { return store.getters.authUser });
const recipe = computed(() => {  
    let recipe = store.getters.recipe;
    recipe.isSaved = recipe.saved.includes(store.getters.authUser._id);
    recipe.user.image = handleUserImage(recipe.user); 
    return recipe;
});
const canEditDelete = computed(() => { return authUser.value._id == recipe.value.user._id ? true : false; }); 

await getRecipe();


</script>
<template>
    <div   class="w-full flex flex-col md:flex-row mt-4 md:mt-8">
        <div class="max-w-2xl">
        <div  class="w-full px-4 md:px-0">
        <div class="w-full mb-4">
            <h1 class="text-[2rem]">{{ recipe.name }}</h1>
            <div class="flex items-center py-4 ">              
                  <img :src="recipe.user.image" class="rounded-full h-12 w-12  border" alt="Avatar"/>
                
                    <div class="flex w-full">  
                        <div class="ml-2">
                            <router-link :to="{name: 'user', params : {id : recipe.user._id }}" class="block hover:underline text-sm font-medium text-sky-500">{{ recipe.user.name }}</router-link>
                            <span class="block text-sm">{{recipe.createdAt}}</span>
                        </div>                     
                                                                                     
                        <span v-if="authUser._id != recipe.user._id" @click="handleSaveRecipe()" class="ml-auto hover:text-sky-500" :class="{'text-sky-500' : recipe.isSaved}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>
                        </span>
                        <div v-if="canEditDelete" class="ml-auto">                           
                            <router-link :to="{ name: 'edit',  params : { id : recipe._id } }" class="underline cursor-pointer hover:text-sky-500" >Edit </router-link>
                            <span  @click="handleDestroyRecipe()" class="underline ml-2 cursor-pointer hover:text-rose-500">Delete</span>
                        </div>
                    </div>                    
                </div> 
            <p>{{recipe.description}}</p>
        </div>
        <div class="w-full mb-4">          
            <img v-if="recipe.image" :src="$baseUrl + recipe.image" class="w-full h-full" alt="img">
            <img v-else :src="$defaultRecipeImage" class="w-full h-full"/>
        </div>
        <div class="w-full mb-4">
            <h1 class="text-[2rem] mb-2">Ingredients</h1>
            <ul>
                <li v-for="ingredient in recipe.ingredients" class="flex items-center gap-2 mb-2">
                    <span class="flex items-center justify-center text-sm w-2 h-2 rounded-full bg-sky-500 text-white">                       
                    </span>
                    <label>{{ ingredient }}</label>
                  
                </li>
            </ul>
        </div>
        <div class="w-full mb-4">
            <h1 class="text-[2rem] mb-2">Instructions</h1>
            <ul>
                <li v-for="(instruction, index) in recipe.instructions" class="mb-2">
                    <label class="block mb-2 font-semibold text-sky-500">
                        Step {{ index + 1 }}
                    </label>
                    <p class="text-gray-700">{{ instruction }}</p>
                </li>
            </ul>
        </div>
    </div>
        </div>
        <div class="hidden w-full max-w-xs ml-10 mt-26 lg:block">
            <!-- <div class="px-6 py-6 mx-2 mt-10 mb-6 text-center bg-white border rounded-lg lg:mt-0 xl:px-10">
                <div class="space-y-4 xl:space-y-6">
                    <img class="mx-auto rounded-full border  h-36 w-36" v-if="recipe.user.image" :src="handleUserImage(recipe.user)" alt="author avatar">
                        <div class="space-y-2">
                            <div class="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
                                <h3>{{recipe.user.name}}</h3>
                                <div class="flex justify-center mt-5 space-x-5">
                                    
                                           
                                </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
   
</template>