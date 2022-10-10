<script setup>
    import  { ref } from 'vue'

    const openMenu = ref(false)

</script>
<template>
    
    <div class="w-full flex flex-col md:flex-row  md:mt-8">
        <div class="hidden h-full md:relative md:flex md:flex-col w-3/4 md:w-80 p-4" :class="{'!fixed top-0 !block w-full bg-gray-100 border-r shadow-slate-400' : openMenu}">
            <span @click="openMenu=false" class="md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mb-4 mt-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </span>
            <router-link @click="openMenu=false" :to="{ name : 'account.edit'}" class="flex items-center px-2 py-3 gap-2 mb-2 text-base rounded-md transition duration-300 ease-in-out  text-gray-400 hover:text-gray-500 hover:bg-white group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400 group-hover:text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <label class="text-black">Account</label>
            </router-link>
            <router-link @click="openMenu=false" :to="{name : 'account.security'}" class="flex items-center px-2 py-3 gap-2 mb-2 text-base rounded-md transition duration-300 ease-in-out text-gray-400 hover:text-gray-500 hover:bg-white group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-400 group-hover:text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <label class="text-black">Security</label>            
            </router-link>
        </div>

        <div class="md:hidden w-full p-4 mt-4">
            <svg @click="openMenu=true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>
       
        <div class="w-full md:w-[calc(100%_-_80px)] px-4 py-4">
            <router-view></router-view>
        </div>
    </div>
</template>