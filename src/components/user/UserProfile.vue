<script setup>
import { useStore } from 'vuex'; 
import { useRoute } from 'vue-router'    
import { computed } from 'vue';

//components
import BigAvatar from '../../components/BigAvatar.vue';

const store = useStore();
const route = useRoute();

const getUser = async () => {
  try {   
    await store.dispatch('getUserInfo', route.params.id );  
  } catch(err) {
        console.log(err)
  }
}

await getUser();

const authUser = computed( () => { return store.getters.authUser } );
const user = computed( () => { return store.getters.user } );
const isAuth = computed( () => { return authUser.value._id == user.value._id ? true : false } );

</script>

<template>
    <div  class="w-full  mx-auto lg:max-w-xs lg:mx-0  p-4 lg:bg-white rounded-md">              
              <BigAvatar             
                :user="user"
                :isAuth="isAuth"            
              />   
              <ul class="flex  justify-center gap-8 mt-4 mb-4">
                  <li class="text-base"><span class="font-semibold">{{ user.recipes_count }}</span> Recipes</li>                                  
                  <li v-if="isAuth" class="text-base text-sx"><span class="font-semibold">{{ user.recipes_saved_count }}</span> Saved Collection</li>                                
              </ul> 
              <p class="block  text-center text-sm mb-4 ">{{user.bio}}</p>
      </div> 
</template>