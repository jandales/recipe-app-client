<script setup>
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { provide } from 'vue'
import { useStore } from 'vuex';

const store = useStore();

const isAuthUser = user_id => { 
    const authUser = store.getters.authUser;
    return authUser._id === user_id ? true : false;
};

provide('perpage', 12)
provide('isAuthUser', isAuthUser)

</script>
<template>  
  <router-view></router-view> 
</template>





