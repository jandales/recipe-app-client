<template>
    <section class="h-screen">
      <div class="mt-8 md:mt-0 md:px-6 h-full text-gray-800">
        <div class="flex flex-col   md:justify-center md:items-center  h-full g-6">
 
          <div v-if="success.state" class="md:w-[400px] md:mx-auto bg-green-100 rounded-lg py-5 px-6 text-base mb-4 text-green-700 inline-flex items-center w-full" role="alert">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
            {{ success.message }}
          </div>
 
          <div class="w-full md:w-[400px] px-8  md:px-0">
            <h1 class="block text-center text-[2rem] font-semibold text-sky-500 mb-8">Recipe App</h1>
            <h1 class="block text-center text-[1.7rem] mb-4">Reset Password</h1>
            <p class="mb-4 text-sm">Enter your email address below and we'll send you a link to reset your password.</p>
            <form @submit.prevent="submit"  method="post">
              <!-- Email input -->
              <div class="mb-6">
                <label for="" class="block mb-2 text-sm">Email</label>
                <input
                v-model="email"
                  name="email"
                  type="text"
                  class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                />
                <div v-for="error in errors">
                        <small class="block text-rose-500 capitalize mt-2"> 
                            {{error.msg}}                  
                        </small>
                      </div> 
              </div>

            

          
              <div class="w-full text-center lg:text-left">
                <button
                  type="submit"
                  name="submit"
                  value="Submit"
                  class="w-full inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                <div v-if="isLoading"  class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-green-500" role="status">
                      <span class="visually-hidden">Loading...</span>
                   </div>
                <label v-else>Submit</label>
                </button> 

                <p class="text-sm text-center font-semibold mt-2 pt-1 mb-0">
                  <router-link
                    to="/login"
                    class="text-sky-600 hover:text-sky-700 focus:text-sky-700 transition duration-200 ease-in-out"
                    >Login</router-link>
                  
                  or
                  <router-link
                    to="/register"
                    class="text-sky-600 hover:text-sky-700 focus:text-sky-700 transition duration-200 ease-in-out"
                    >Register</router-link>
                  
                </p>
          
              
              </div>
            </form>
          </div>
        </div>
      </div>
  </section> 
</template>


<script setup>

  import axios from '../axios'
  import {ref, reactive} from 'vue'
  import { useStore } from 'vuex'

  const store = useStore();

  const email = ref()
  const isLoading = ref(false);
  const errors = ref([]);

  const success = reactive({
    state: false,
    message : null,
  })

  const submit = async() => {

    isLoading.value = true;
    errors.value = [];

    success.state = false;
    success.message = null;    

    try {
    
      const response = await store.dispatch('passwordReset', { email : email.value} );

      if (response.status === 200){
        success.state = true;
        success.message = response.data.message;   
      } 

    } catch (err) {

      errors.value = err.response.data.errors;

    } finally {

      isLoading.value = false;

    }     

  }

</script>