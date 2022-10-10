<script setup>

const props = defineProps({
    recipe : Object,
})

</script>
<template>
    <div  class="relative w-[calc(((100%_+_1rem)_/_2)_-_1rem)] md:w-[calc(((100%_+_1rem)_/_3)_-_1rem)] md:rounded-lg md:shadow-lg md:overflow-hidden md:border   bg-white">                                                  
        <div class="aspect-square md:aspect-video  bg-skeleton">
            <img v-if="recipe.image" class="aspect-square md:aspect-video" :src="$baseUrl + recipe.image" alt=""/>
            <img v-else class="aspect-video" :src="$defaultRecipeImage" alt=""/>
        </div>        
        <div class="px-4 py-2">
            <router-link :to="{ name: 'recipe',  params : { id : recipe._id } }" class="text-gray-900 block text-xs  font-medium">{{ recipe.name }}</router-link>                   
        </div>  
    </div> 
</template>

