<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        data: Array,
        isDefault : Boolean,
    })
    
    let recipes = computed( () => {
        return  [...recipes.value, ...props.data]; 
    })



</script>
<template>
    <div  v-for="recipe in recipes"  class="relative  w-1/2 md:w-[calc(((100%_+_1rem)_/_3)_-_1rem)]  md:rounded-lg md:shadow-lg md:overflow-hidden md:border  bg-white">                                                  
        <img v-if="recipe.image" class="aspect-square" :src="recipe.image" alt=""/>
        <img v-else class="aspect-square" :src="$defaultRecipeImage" alt=""/>
        <div class="p-2 md:p-4">
            <router-link :to="{ name: 'recipe',  params : { id : recipe._id } }" class="text-gray-900 block text-sm   font-semibold mb-2">{{ recipe.name }}</router-link>                   
        </div>        
    </div>
     <div v-if="recipes.length == 0" class="w-full">

            <div v-if="isDefault"  class="flex flex-col justify-center items-center mt-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 text-gray-500 mb-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                </svg>
                <h1 class="text-lg block text-center text-gray-500">Upload your Recipe</h1>
            </div>
            <div v-else="isDefault"  class="flex flex-col justify-center items-center mt-8">
         
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24 text-gray-500 mb-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                </svg>

                <h1 class="text-lg block text-center text-gray-500">Add  your collection</h1>
            </div>   
                

                    
     </div>
     <Observer/>
</template>