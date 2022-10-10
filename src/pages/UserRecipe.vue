<script setup>
import BigAvatarSkeleton from '../components/BigAvatarSkeleton.vue'; 
import UserProfile from '../components/user/UserProfile.vue';
import UserRecipeList from '../components/recipes/UserRecipeList.vue';
import UserRecipeSavedCollection from '../components/recipes/UserRecipeSavedCollection.vue';
import RecipeWrapper from '../components/recipes/RecipeWrapper.vue';
import Tab from '../components/recipes/Tab.vue';
import UserRecipeSkeleton from '../components/skeleton/UserRecipeSkeleton.vue';

import { inject } from 'vue';
import { useStore } from 'vuex'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

const router = useRouter();
const perpage = inject('perpage');
const store = useStore();

onBeforeRouteUpdate((to, from, next) => {
    const authUser = store.getters.authUser;
    if (to.params.id == authUser._id) {
      location.href = `/user/${authUser._id}`
      return;    
    }
    return;
})


</script>
<template>   

  <div  class="w-full flex flex-col lg:flex-row gap-8 mt-8">   
    <Suspense>
      <template #default>
        <UserProfile/>
      </template>
      <template #fallback>
        <BigAvatarSkeleton />  
      </template>
    </Suspense>   
    <div class="w-full max-w-2xl">
        <RecipeWrapper>
            <Tab  title="Recipes">
                  <Suspense>
                    <template #default>
                      <UserRecipeList />
                    </template>
                    <template #fallback>  
                      <div class="flex flex-wrap gap-4">
                        <UserRecipeSkeleton v-for="index in perpage"  :key="index"/>  
                      </div>   
                    </template>                        
                  </Suspense>
            </Tab>
            <Tab  title="Saved Collection">
              <Suspense>
                    <template #default>
                      <UserRecipeSavedCollection />
                    </template>
                    <template #fallback>  
                      <div class="flex flex-wrap gap-4">  
                        <UserRecipeSkeleton  v-for="index in perpage"  :key="index"/>  
                      </div>   
                    </template>                        
                  </Suspense>                    
            </Tab>
        </RecipeWrapper>  
    </div>
  </div> 
</template>