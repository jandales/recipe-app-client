<script setup>
    const props = defineProps({
        count : 0,       
    })
</script>
<template>
     <div  class="flex  flex-wrap w-full gap-4 px-4 md:gap-8"> 
        <div  v-for="index in count" :key="index" class="recipe-item"> 
            
            <div class="w-full hidden  md:flex items-center px-4 py-2">

                <div class="rounded-full w-8 h-8 bg-skeleton" alt="Avatar"></div>

                <div class="ml-2 w-32 p-3 bg-skeleton"></div>

                <div class="w-4 h-4 bg-skeleton ml-auto"></div>        

            </div> 

            <div class="aspect-square md:aspect-video bg-skeleton">
             
            </div>

            <div class="w-full px-4 py-2">
                <div class="w-3/4 py-2 bg-skeleton"></div>
            </div>
        </div>
     </div>
</template>