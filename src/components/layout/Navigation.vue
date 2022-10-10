<template>
    <nav class="
  relative
  w-full
  flex flex-wrap
  items-center
  justify-between
  py-4
  bg-gray-100
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light
  ">
  <div  class="wrapper container-fluid w-full flex flex-wrap items-center justify-between px-4 lg:px-0">
  <button class="
      hidden
      navbar-toggler
      text-gray-500
      border-0
      hover:shadow-none hover:no-underline
      py-2
      px-2.5
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
    " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
    class="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="currentColor"
      d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
    </path>
  </svg>
  </button>
  <div class="collapse navbar-collapse flex  items-center" id="navbarSupportedContent">
  <router-link  class="
        flex
        nav-top-item
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900
        mt-2
        lg:mt-0
        mr-1
        cursor-pointer
      " :to="{name : 'home' }">
      <span class="text-gray-500 font-semibold">RECIPE APP</span>  
    
  </router-link>
  
  <!-- Left links -->
  </div>
  <!-- Collapsible wrapper -->
  <router-link class="
        md:hidden
        flex
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900       
        lg:mt-0
        mr-1
        nav-top-item
      " :to="{name : 'home'}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>    
    
  </router-link>

  <div class="flex items-center justify-center gap-1 mx-auto border px-2 py-1 rounded-lg bg-white md:w-[400px]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input type="text" @keydown.enter="search" v-model="keyword" placeholder="Search" class="w-full bg-transparent content-none outline-none"/>
      <svg v-if="closeSearchIcon" @click="closeSearch" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rounded-full hover:bg-rose-500 hover:text-white ">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
  </div>


  <!-- Right elements -->
  <div class="flex items-center  ml-auto   relative">   
    <router-link  :to="{name : 'home'}" class="text-gray-500 nav-top-item hidden md:block hover:text-gray-700 focus:text-gray-700 mr-4" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>      
    </router-link>
    <router-link :to="{ name : 'create' }" class="nav-top-item  text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-4" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>      
    </router-link>
  
  <div class="dropdown relative">
   
    <ul class="
      dropdown-menu
      min-w-max
      w-[200px]
      absolute
      hidden
      bg-white
      text-base
      z-50
      float-left
      py-2
      list-none
      text-left
      rounded-lg
      shadow-lg
      mt-1  
      m-0
      bg-clip-padding
      border-none
      left-auto
      right-0
    " aria-labelledby="dropdownMenuButton1">
      <li>
        <router-link class="
          dropdown-item
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-gray-700
          hover:bg-gray-100
        "  :to="{name: 'account.profile', params : {id : authUser._id }, force : true }">Profile</router-link>
      </li>
      <li>
        <router-link  class="
          dropdown-item
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-gray-700
          hover:bg-gray-100
        " :to="{name : 'account.edit'}">Settings</router-link>
      </li>
      <li>
        <a 
          @click="logout"
          class="        
          dropdown-item
          text-sm
          py-2
          px-4
          font-normal
          block
          w-full
          whitespace-nowrap
          bg-transparent
          text-gray-700
          hover:bg-gray-100
        " href="/logout">Logout</a>
      </li>
    </ul>
  </div>

  <div class="dropdown relative">
    <a class="dropdown-toggle flex items-center hidden-arrow" href="#" id="dropdownMenuButton2" role="button"
      data-bs-toggle="dropdown" aria-expanded="false">
      <img v-if="authUser && authUser.image " v-bind:src="authUserImage" class="rounded-full"
        style="height: 25px; width: 25px" alt="" loading="lazy" />
      <img v-else v-bind:src="$defaultAvatar" class="rounded-full"
        style="height: 25px; width: 25px" alt="" loading="lazy" />
    </a>
    <ul class="
    dropdown-menu
    min-w-max
    absolute
    w-[200px]
    hidden
    bg-white
    text-base
    z-50
    float-left
    py-2
    list-none
    text-left
    rounded-lg
    shadow-lg
    mt-1
    hidden
    m-0
    bg-clip-padding
    border-none
    left-auto
    right-0
  " aria-labelledby="dropdownMenuButton2">
      <li>
        <router-link class="
            dropdown-item
            text-sm
            py-2
            px-4
            font-normal
            block
            w-full
            whitespace-nowrap
            bg-transparent
            text-gray-700
            hover:bg-gray-100" 
            :to="{name: 'account.profile', params : {id : authUser._id }, force : true }">Profile</router-link>
      </li>      
      <li>
        <router-link class="
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      " :to="{name : 'account.edit' }">Setting</router-link>
      </li>
      <li>
        <a 
        @click="logout"
        class="        
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      " href="#">Logout</a>
      </li>
    </ul>
  </div>
  </div>
  <!-- Right elements -->
  </div>
  </nav>

</template>
<script setup>
  
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';  
import { useStore } from 'vuex'

const store = useStore();  
const router = useRouter();
const route = useRoute();
const keyword = ref();
const closeSearchIcon = ref(false);  

const logout = async() => {

    try {
      await store.dispatch('logout');
      location.reload()
    } catch (error) {
      console.log(error);
    }   

}

const search = async() => {   
  closeSearchIcon.value = true;
  router.push({name : 'search', query : { keyword : keyword.value }, replace: true  });
}

const closeSearch = () => {      
    closeSearchIcon.value = false   
    keyword.value = null;  
}

const searchState = () => {
  if(route.name == 'search') {
    closeSearchIcon.value = true
    keyword.value = route.query.keyword
    return;
  } 
  closeSearchIcon.value = false
  keyword.value = null    
}

const authUser = computed( ()=> { return store.getters.authUser })
const authUserImage  = computed( ()=> { return store.getters.authUserImage });

watch(searchState())




</script>