<script setup>
    
    import handleUserImage from '../helpers/handleImage';
    
    const props = defineProps({
        recipe : Object,    
    })

    const emit = defineEmits(['handleSaveRecipe'])

    const handleSaveRecipe =  () => {
        emit('handleSaveRecipe', props.recipe._id);
    } 

</script>
<template>
    <div ref="item" class="recipe-item"> 
        <div class="w-full hidden  md:flex items-center px-4 py-3 ">
        <img 
            :src="handleUserImage(recipe.user)"
            class="rounded-full w-6 h-6 border"
            alt="Avatar"
         />       
        <router-link 
            :to="{name: 'user', params : {id : recipe.user._id }, force: true}" 
            class="ml-2 text-sm font-semibold text-gray-600 hover:underline">
            {{ recipe.user.name }}
        </router-link>

        <span v-if="!recipe.isAuthUserRecipe" 
            @click="handleSaveRecipe()"
            class="ml-auto hover:text-sky-500" 
            :class="{'text-sky-500' : recipe.isSaved }">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
        </span>  

        </div> 

        <div class="aspect-square md:aspect-video bg-skeleton">
            <img  
                class="aspect-square md:aspect-video" 
                :src="recipe.image" 
                alt="recipe-image"
            />            
        </div> 

        <div class="flex items-center px-4 py-2">
            <router-link 
            :to="{ name: 'recipe',  params : { id : recipe._id } }" 
            class=" block   text-xs md:text-sm tracking-wider text-gray-700 font-semibold mb-2 hover:text-sky-500">
                {{ recipe.name }}
            </router-link >                                          
        </div>
     </div>
</template>