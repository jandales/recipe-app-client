<template>
    <div>
        <div  class="w-full flex   gap-8 mb-8 py-2 border-t border-b lg:border-t-0">
            <ul class="w-full hidden lg:flex justify-between gap-4 px-4">
                <li v-for="title in tabTitles"
                :key="title"
                @click="selectedTitle = title"
                class="w-1/2 flex justify-center cursor-pointer">{{title}}</li>
            </ul>    
            <ul class="w-full flex lg:hidden justify-between gap-4 px-4">
             
                <li  v-for="title in tabTitles"
                :key="title"
                @click="selectedTitle = title"
                class="w-1/2  flex justify-center cursor-pointer">
                <svg v-if="title == 'Recipes'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <svg v-if="title == 'Saved Collection'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>



            </li>
            </ul>            
        </div>
        <slot></slot>
    </div>
</template>

<script setup>

import { ref, provide, useSlots } from "vue";

const tabTitles = ref();

tabTitles.value = useSlots()
    ?.default?.()
    .map((tab) => tab?.props?.title);

const selectedTitle = ref(tabTitles.value[0]);

provide("selectedTitle", selectedTitle);

</script>