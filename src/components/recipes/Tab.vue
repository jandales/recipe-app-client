<template>
 
    <div v-show="title == selectedTitle">
        <slot></slot>
    </div>
</template>

<script setup>
    import { inject } from 'vue';
    const props = defineProps({
        title : String,
    }); 

    const selectedTitle = inject('selectedTitle');
    
</script>