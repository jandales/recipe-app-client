<script setup>
  import { reactive, ref, computed } from 'vue'

  import { useStore } from 'vuex'
    
  const store = useStore();
  const message = ref();
  const errors = ref([]);
  const isLoading = ref(false);

  const form = reactive({
      new_password : null,
      password_confirmation : null,
      password : null,
  });

  const handleDeleteAccount = async() =>  {

      isLoading.value = true;
      try {
        await store.dispatch('deleteAccount')
        location.reload();
      } catch (err) { 
        console.log(err)
      }
      finally {
        isLoading.value = false;
      }
      
  }

  const handleChangePassword = async () => {  
      errors.value = [];
      message.value = null;
      try {
        let response = await store.dispatch('changePassword', form);
        message.value = response.data.message;
      } catch(err){  

        const  resErrors = err.response.data.errors

        if(err.response.status === 400){
          errors.value = resErrors;
        }
        
        if(err.response.status > 400) {
          errors.value = [...errors.value, { message : resErrors }];
        }        
      }  
    
  }

  const authUser = computed( ()=> { return store.getters.authUser } )
  

</script>

<template>
    
<div class="flex flex-col w-full items-end mb-2 gap-8">

<div v-if="message" class="bg-green-100 rounded-lg py-5 px-6 text-base text-green-700 inline-flex items-center w-full" role="alert">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
  </svg>
  {{ message }}
</div>

<div v-for="error in errors">
    <div v-if="error.message"  class="bg-red-100 rounded-lg py-5 px-6  text-base text-red-700 inline-flex items-center w-full" role="alert">
    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
    </svg>
    {{error.message}}
  </div>
</div>



  <div class="w-full bg-white p-6 border rounded-md mb-4">
    
    <h1 class="text-lg text-gray-500 font-semibold mb-4">Change password</h1>
    <div class="w-full mb-6">
      <label for="exampleInputEmail2" class="block mb-2 text-gray-700">Old Password</label>
      <input type="password" v-model="form.password" class="form-control
        w-full      
        px-3
        py-1.5
        text-base        
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
        aria-describedby="emailHelp">
        <div v-for="error in errors">                
            <small v-if="error.param == 'password'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
        </div>
    </div>
    <div class="w-full mb-6">
      <label for="exampleInputEmail2" class="block mb-2  text-gray-700">New Password</label>
      <input type="password" v-model="form.new_password" class="form-control
        w-full        
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
        aria-describedby="emailHelp">
        <div v-for="error in errors">                
            <small v-if="error.param == 'new_password'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
        </div>
    </div>
    <div class="w-full mb-6">
      <label for="exampleInputEmail2" class="block mb-2  text-gray-700">Confirm Password</label>
      <input type="password" v-model="form.password_confirmation" class="form-control
        w-full          
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
        aria-describedby="emailHelp">
        <div v-for="error in errors">                
            <small v-if="error.param == 'password_confirmation'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
        </div>
    </div>
    <div class="w-full"> 

            <button
              @click="handleChangePassword"
              type="submit"
              name="submit"
              value="Change Password"
              :disabled="authUser.provider"
              :class="{ 'cursor-not-allowed bg-gray-500 hover:bg-gray-500'  : authUser.provider}"
              class="inline-block px-7 py-3 w-full lg:w-auto bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
            <div v-if="isLoading"  class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-green-500" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
              <label v-else class="text-white" >Delete</label>
          </button>
          
    </div>
  </div>

  <div class="w-full bg-white p-6 border rounded-md">
    <h1 class="text-lg font-semibold mb-4">Delete account</h1>
    <button
              @click="handleDeleteAccount"
              type="submit"
              name="submit"
              value="Delete"
              class="group inline-block px-7 py-3 w-full lg:w-auto border   text-sm font-semibold leading-snug uppercase rounded shadow-md border-rose-500  hover:bg-rose-500 hover:text-white hover:shadow-lg focus:bg-rose-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
            <div v-if="isLoading"  class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-green-500" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
              <label v-else class="text-rose-500 group-hover:text-white" >Delete</label>
    </button>
  </div>

   
</div>

    


</template>