<script setup>
import { useStore } from 'vuex'; 
import { ref, reactive,onMounted } from 'vue';
import { useRouter } from 'vue-router';

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

      if (err.response.status === 500 || err.response.status ===  401 ){
        errors.value = [...errors.value, { message : 'Server Error 500'} ]
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
             
              <!-- <a 
                :href="$serverURL + `/api/auth/facebook`"        
                class="w-full flex items-center justify-center gap-2 p-3 mb-4 text-sky-500 hover:text-white text-center font-medium border text-xs leading-tight  rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="w-4 h-4">
               
                  <path
                    fill="currentColor"
                    d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  />
                </svg>
                <label class="text-base mb-0 mr-4">Sign in with Facebook</label>
              </a> -->

              <a                
                href="/api/auth/google"
                class="w-full flex items-center justify-center gap-2 p-3 mb-4 border text-sky-500 hover:text-white text-center font-medium text-xs leading-tight rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
              >
                <!-- Google -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" class="w-4 h-4"><!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                <label class="text-base mb-0 mr-4">Sign in with Google</label>
            </a>


         
           </div>

          </form>
      </div>
    </div>
  </div>
</section> 
</template>