<script setup>
import { useStore } from 'vuex'; 
import { ref, reactive,onMounted } from 'vue';
import { useRouter } from 'vue-router';

import GoogleButton from '../components/socails/GoogleButton.vue'

const store = useStore();
const router = useRouter();
const errors = ref([]);
const isLoading = ref(false);

const recipes = ref([]);

const form = reactive({
    name : null,
    email : null,
    password : null,
})

const handleRegister = async() => {

  

  if (isLoading.value) return;

  try {
      errors.value = []
      isLoading.value = true;

      let response = await store.dispatch('register', form); 

      if (response.status == 200) {
         router.push({name : 'home'});
      }

  } catch (err) { 

      if (err.response.status > 400 ){      
        errors.value = [...errors.value, { message : err.response.data.message } ]
        return;
      }

      errors.value = err.response.data.errors;

  } finally {

    isLoading.value = false;

  }

}


</script>
<template>
    <section class="h-screen">
  <div class="mt-8 md:mt-0 h-full text-gray-800">
    <div
      class="flex   md:justify-center md:items-center  h-full g-6"
    >

    <div class="min-w-[400px] px-8 md:px-0">
      <div v-for="error in errors" >
  <div v-if="error.message" class="bg-red-100 rounded-lg py-5 px-6  mb-4 text-sm text-red-700 inline-flex items-center w-full" role="alert">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
  </svg>
  {{error.message}}
</div>
</div>
          <h1 class="block text-center text-[2rem] font-semibold text-sky-500 mb-8">Recipe App</h1>

          <form @submit.prevent="handleRegister"  method="POST">
           

              <!-- Email input -->
              <div class="mb-6">
              <input
                v-model="form.name"
                type="text"
                name="name"
                class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"        
                placeholder="Name"
          
              />
              <div v-for="error in errors">                
                 <small v-if="error.param == 'name' " class="block text-rose-500 mt-2">{{error.msg}}</small> 
              </div>
            </div>


            <!-- Email input -->
            <div class="mb-6">
              <input
                v-model="form.email"
                type="email"
                name="email"
                class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
              />
              <div v-for="error in errors">                
                 <small v-if="error.param == 'email'" class="block text-rose-500 mt-2">{{error.msg}}</small> 
              </div>

            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input
                v-model="form.password"
                type="password"
                name="password"
                class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"               
                placeholder="Password"
               
              />
              <div v-for="error in errors">                
                 <small v-if="error.param == 'password'" class="block text-rose-500 mt-2">{{error.msg}}</small> 
              </div>
            </div>



            <div class="text-center lg:text-left">
              <input v-if="!isLoading" type="submit"
                name="button"
                class="w-full inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                value="Register"
              >   
              <button v-else type="submit"  class="btn !w-full" >
                  <div class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-green-500" role="status">
                      <span class="visually-hidden">Loading...</span>
                   </div>                  
              </button>  

            </div>
            <p class="text-sm text-center font-semibold mt-2 pt-1 mb-0">
                Already have an account?
                <router-link
                  to="/login"
                  class="text-sky-600 hover:text-sky-700 focus:text-sky-700 transition duration-200 ease-in-out"
                  >Login
                </router-link>
              </p>

              <div
              class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
            >
              <p class="text-center font-semibold mx-4 mb-0">Or</p>
            </div>

            <div class="flex flex-col items-center justify-center lg:justify-start">
             
            
              <GoogleButton/>


         
           </div>

          </form>
      </div>
    </div>
  </div>
</section> 
</template>