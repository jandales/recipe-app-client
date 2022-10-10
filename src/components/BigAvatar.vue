<script setup>
import handleUserImage  from '../helpers/handleImage';
const props = defineProps({
    user : Object,
    isAuth : Boolean,
})

// const handleUserImage = user => {        
//     return userImage(user);
// }

</script>
<template>
    <div class="w-full flex flex-col items-center justify-center">
        
            <img
                v-if="user.image"
                :src="handleUserImage(user)"
                class="rounded-full w-24 h-24 aspect-square md:w-28 md:h-28   border-sky-700"
                alt="Avatar"
            />
            <img v-else
                :src="$defaultAvatar"
                class="rounded-full w-24 h-24 aspect-square md:w-28 md:h-28   border-sky-700"
                alt="Avatar"
            />        
     
        
       
            <label class=" block text-[1.5rem] mt-4 mb-4">{{ user.name }}</label>                      
     
           <router-link v-if="isAuth" :to="{ name : 'account.edit', params : {id : user._id }}" class="block px-3 py-2  w-40  text-center text-sm bg-white rounded-md border hover:border-blue-500 hover:text-white hover:bg-blue-500">Edit Profile</router-link>            
        
    </div>
</template>