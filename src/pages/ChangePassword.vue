<template>
    <section class="h-screen">
  <div class="mt-8 md:mt-0 h-full text-gray-800">    

    <div class="flex flex-col md:justify-center md:items-center   h-full g-6">

        <div v-if="success" class="w-[400px] bg-green-100 rounded-lg py-5 px-6 text-base mb-4 text-green-700 inline-flex items-center" role="alert">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
              </svg>
              Successfully Updated
       </div>

      <div  v-for="error in errors">
          <div v-if="error.message" class="w-[400px] bg-red-100 rounded-lg py-5 px-6  mb-4 text-base text-red-700 inline-flex items-center" role="alert">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
          </svg>
          {{error.message}}
        </div>
      </div>
    


      <div class="w-full md:w-[400px] px-4  md:px-0">
        <h1 class="block text-center text-[2rem] font-semibold text-sky-500 mb-8">Recipe App</h1>

        <h1 class="block text-center text-[1.7rem] mb-4">Change Password</h1>
       
        <form @submit.prevent="handleSubmit" method="post">
          <!-- Email input -->
          <div class="mb-6">
            <label for="" class="block mb-2 text-sm">Password</label>
            <input
              v-model="form.password"
              name="password"
              type="password"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Password"
            />
            <div v-for="error in errors">
                  <small v-if="error.param == 'password'" class="block text-rose-500 capitalize mt-2"> 
                            {{error.msg}}                  
                </small>
            </div> 
          </div>

            <!-- Email input -->
            <div class="mb-6">
            <label for="" class="block mb-2 text-sm">Confirm Password</label>
            <input
              v-model="form.confirmation_password"
              name="confirmation_password"
              type="password"
              class="form-control block w-full px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Confirmation Password"
            />
            <div v-for="error in errors">
                  <small v-if="error.param == 'confirmation_password'" class="block text-rose-500 capitalize mt-2"> 
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
            
            <label v-else>Submit</label></button>

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
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useStore  } from 'vuex';

const route = useRoute();
const store = useStore();

const errors = ref([]);
const isLoading = ref(false);
const success =  ref();

const form = reactive({
  token : null,
  password : null,
  confirmation_password : null,
});

const handleSubmit = async () => {

  form.token = route.params.token;
  isLoading.value = true;
  success.value  = null;

  try {

    let res = await store.dispatch('passwordChange', form)
    if (res.status == 200) {
      success.value = res.status.data.message;
    }
  
  } catch (err) {
  
      errors.value = err.response.data.errors;

  } finally {

    isLoading.value = false;

  }
  
}


</script>