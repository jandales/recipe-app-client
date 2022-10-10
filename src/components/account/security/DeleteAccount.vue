
<template>
    <div class="w-full bg-white p-6 border rounded-md">
        <h1 class="text-lg font-semibold mb-4">Delete account</h1>
        <button
                @click="handleOpenPasswordEnter"
                type="submit"
                name="submit"
                value="Delete"
                class="btn-danger-border"
                >
            Delete
        </button>
    </div>
    <teleport to="body">
        <div v-if="openEnterPassword" class="w-full  fixed  flex items-center justify-center h-screen  backdrop-grayscale-0 bg-black/30 top-0 left-0 p-8 md:p-0">
            <div class="w-96 relative bg-white overflow-hidden rounded-lg shadow-lg p-8">
               <h1 class="block mb-4 font-semibold">Enter your Password</h1>
            <div class="w-full mb-4">          
                <input type="password" v-model="password" class="form-control  
                    w-full             
                    px-3
                    py-1.5
                    text-sm
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                    aria-describedby="emailHelp">
                    <div v-for="error in errors">                
                        <small v-if="error.param == 'password'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
                    </div>                       
            </div>  
            
      <div class="flex gap-3">
        <button
            @click="handleConfirmDelete" class="btn-primary lg:!w-1/2">
            <div v-if="isLoading"  class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-green-500" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <label v-else class="text-white">Submit</label>
        </button>
        <button
            @click="openEnterPassword = false"   
            class="btn-danger-border lg:!w-1/2">
            Cancel
        </button>
      </div>
            

            </div>
        </div> 
    </teleport>
</template>
<script setup>

import { ref } from 'vue'
import { useStore }  from 'vuex'

const isLoading = ref(false);
const openEnterPassword = ref(false);
const store = useStore();
const password = ref(null);
const errors = ref([]);

const handleOpenPasswordEnter = () => {
    errors.value = [];
    openEnterPassword.value = true;
}

const handleConfirmDelete = async () => {
   
    try {
       isLoading.value = true;
       const res = await store.dispatch('confirmDelete', {password : password.value } );      
       if(res.data === true){
            await handleDeleteAccount(); 
       }
    } catch (err) { 
        if (err.response.status === 400) return errors.value = err.response.data.errors;

    } finally {
        isLoading.value = false;
    }
}

const handleDeleteAccount = async() =>  {
   
    try {
        await store.dispatch('deleteAccount')
        location.reload();
    } catch (err) { 
        console.log(err)
    }
   
}
</script>