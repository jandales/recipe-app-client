<template>
   <div class="flex  flex-col items-center justify-center w-full min-h-screen">
        <label class="block text-lg text-center text-blue-600 font-bold">404</label>
        <h1 class="text-[4rem] text-black font-bold">Page not found</h1>
        <p class="text-base text-slate-500">Sorry, we couldn't find the page you're looking for.</p>
        <router-link :to="{name : 'home'}" class="mt-8 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Go back home</router-link>
   </div>
</template>