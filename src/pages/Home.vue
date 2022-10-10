
<script setup>  
    import ListRecipe from '../components/recipes/ListRecipe.vue';
    import RecipeSkeleton from '../components/RecipeSkeleton.vue'; 
    import { inject } from 'vue'
    const perpage = inject('perpage');  
</script>

<template>
    <Suspense>
        <template #default>
          <div ref="recipeComponent" class="relative flex flex-col lg:flex-row w-full">
            <div class="mt-8">    
              <ListRecipe/>  
            </div>  
          </div>
        </template>
        <template #fallback>
          <div class="mt-8">    
            <RecipeSkeleton :count="perpage" />
          </div>                      
        </template>
    </Suspense>  
</template>