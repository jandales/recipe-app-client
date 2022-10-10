<script setup>
import { ref, onMounted, reactive, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex'
  
const store = useStore();

const errors = ref([]);
const message = ref();
const loading = ref(false);
const changeAvatarState = ref(false);

const app = getCurrentInstance()

const form = reactive({
    id : null,
    name : null,
    email : null,
    phone: null,
    bio : null,
});

const toggleAvatarUploader = () => {
    changeAvatarState.value = changeAvatarState.value == false ? true : false;
}

const fileReaderAsync = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload  = () => {
          resolve(reader.result);        
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const handleUploadAvatar = async (event) => {   

    let avatar = document.getElementById('avatar'); 
    const path = await fileReaderAsync(event.target.files[0]);
    avatar.setAttribute('src', path);

    try {
      loading.value = true;

      await store.dispatch('uploadAvatar', event.target.files[0]);
      store.commit('SET_AUTH_USER', store.getters.user)  
      toggleAvatarUploader();

    } catch(err) {

      console.log(err);

    } finally {

      loading.value = false;

    }
   
    
}

const handleRemoveImage = async() => {

    try {
      loading.value = true;

      await store.dispatch('removeAvatar');

      store.commit('SET_AUTH_USER', store.getters.user)  

      toggleAvatarUploader();

    } catch(err) {

      console.log(err);

    } finally {

      loading.value = false;

    }
  
}

const getUser = async () => { 
 
      const { name, email, phone, id, bio } = authUser.value;

      form.id = id;
      form.name = name;
      form.email = email;
      form.phone = phone;
      form.bio = bio; 
}

const handleUpdateUser = async () => { 

    errors.value = [];
    message.value = null;
    try {
        const { id, name, phone, bio } = form;

        await store.dispatch('updateUser', { id, name, phone, bio });    
      
        store.commit('SET_AUTH_USER', store.getters.user)      

        message.value = "Your profile successfully updated";

    } catch (err) {
        const  resErrors = err.response.data.errors
        if(err.response.status === 400){
          errors.value = resErrors
        }
        if(err.response.status > 400) {
          errors.value = [...errors.value, { message : resErrors }];
        }        
    }    
}

onMounted(getUser);

const authUser = computed( ()=> { return store.getters.authUser } )

const authUserImage  = computed( () => { return store.getters.authUserImage })

</script>

<template>
 

<div v-if="message" class="bg-green-100 rounded-lg py-5 px-6 text-base mb-4 text-green-700 inline-flex items-center w-full" role="alert">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
  </svg>
  {{ message }}
</div>

<div v-for="error in errors" >
  <div v-if="error.message" class="bg-red-100 rounded-lg py-5 px-6  mb-4 text-base text-red-700 inline-flex items-center w-full" role="alert">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
  </svg>
  {{error.message}}
</div>
</div>

<div v-if="authUser" class="w-full">
  <div  class="flex items-center bg-white p-6 border rounded-md  gap-4 mb-8">
    <div class="flex w-auto">
        <img v-if="authUser.image"
        v-bind:src="authUserImage"        
        class="rounded-full w-16 h-16 border-2 border-sky-500"
        alt="Avatar"
         /> 
        <img v-else 
         :src="$defaultAvatar"
         class="rounded-full w-16 h-16 border-2 border-sky-500"
         alt="avatar">
    </div>
   
    <div class="w-auto">
        <label for="" class="block  text-base">{{ authUser.name }}</label>
        <p v-if="authUser.provider" class="text-gray-500 text-sm">Go to {{ authUser.provider }} account to change your avatar</p>
        <span v-else @click="toggleAvatarUploader"  class="block text-sky-500 text-sm cursor-pointer hover:underline">Change profile image</span>
    </div>                   
</div> 

<div   class="flex flex-col w-full  mb-4 gap-8 bg-white p-6 border rounded-md">
    <h1 class="text-lg text-gray-500 font-semibold">Profile</h1>
    <div class="w-full">
      <label for="exampleInputEmail2" class="block mb-2 text-gray-700">Name</label>
      <input type="email" v-model="form.name" class="form-control
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
            <small v-if="error.param == 'name'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
        </div>
    </div>

    <div class="w-full">
      <label for="exampleInputEmail2" class="block mb-2 text-gray-700">Email Address</label>
      <input type="email" v-model="form.email" class="form-control  
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
        aria-describedby="emailHelp" disabled>
        <div v-for="error in errors">                
            <small v-if="error.param == 'email'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
        </div>
    </div>

    <div class="w-full">
      <label for="exampleInputEmail2" class="block mb-2 text-gray-700">Phone Number</label>
      <input type="tel" v-model="form.phone" class="form-control  
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
            <small v-if="error.param == 'phone'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
        </div>
    </div>

    <div class="w-full">
      <label for="exampleInputEmail2" class="block mb-2 text-gray-700">Bio</label>
      <textarea name="bio" v-model="form.bio" cols="0" rows="5" class="form-control  
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"></textarea>
        <div v-for="error in errors">                
            <small v-if="error.param == 'bio'" class="block text-rose-500  mt-2">{{error.msg}}</small> 
        </div>
    </div>
      




    <div class="w-full">
        

            <input
              @click="handleUpdateUser()"
              type="submit"
              name="submit"
              value="Submit"
              class="inline-block px-7 py-3 bg-blue-600 w-full lg:w-auto text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            />
        
    </div>

</div>
</div>



<div v-if="changeAvatarState" class="w-full  fixed  flex items-center justify-center h-screen  backdrop-grayscale-0 bg-black/30 top-0 left-0 p-8 md:p-0">
    <div class="w-96 relative   bg-white overflow-hidden rounded-lg shadow-lg">
          <div class="p-8 w-full">  
              <img v-if="authUser.image"
                id="avatar"               
                :src="authUserImage"        
                class="rounded-full border-2 border-sky-500 mx-auto w-24 h-24"
                alt="Avatar"                 
              /> 
              <img v-else 
                :src="$defaultAvatar"
                id="avatar"
                class="rounded-full border-2 border-sky-500 mx-auto w-24 h-24"                  
                alt="avatar">    
          </div>

          <div class="w-full">      
            <label  class="block w-full text-sm text-center py-2 text-sky-500 hover:bg-slate-100 cursor-pointer border-t border-b">                    
                Upload Photo
                <input type="file"  @change="handleUploadAvatar($event)"  class="hidden" name="image"/>
            </label>
            <span @click="handleRemoveImage"  for="" class ="block w-full text-sm text-center py-2 text-rose-500 hover:bg-slate-100 cursor-pointer border-b">                   
                Remove
            </span>
            <span @click="toggleAvatarUploader" class ="block w-full text-sm text-center py-2 hover:bg-slate-100 cursor-pointer">
                
                Cancel
            </span>
          </div>             
          <div v-if="loading" class="absolute  top-0 left-0 w-full h-full flex items-center justify-center backdrop-grayscale-0 bg-white/30">
              <div class="
                spinner-border
                animate-spin
                inline-block
                w-8
                h-8
                border-4
                rounded-full
                text-green-500
              " role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
          </div>


    </div>


  
</div> 


</template>