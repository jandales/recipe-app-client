<script setup>
    const props = defineProps({
        user : Object,
    })
</script>


<template>
    <div class="flex items-center">

<img v-if="user.image"
    :src="user.image"
    class="rounded-full w-16 h-16 border"
    alt="Avatar"
 />

<img v-else 
    :src="$defaultAvatar" 
    class="rounded-full w-16  h-16 border" 
    alt="Avatar"
/>

<router-link 
    :to="{name: 'user', params : {id : user._id }}" 
    class="ml-2 text-sm  text-gray-700 font-semibold hover:underline">
    {{ user.name }}
</router-link> 

<div class="ml-auto">
    <label class="text-sm text-sky-500 cursor-pointer">Sign Out</label>
</div>

</div> 
</template>
