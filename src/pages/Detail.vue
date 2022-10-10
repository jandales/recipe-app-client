<script setup>
  import Detail from '../components/details/Detail.vue'; 
  import DetailSkeleton from '../components/details/DetailSkeleton.vue';
</script>
<template> 
   <Suspense>
        <template #default>
            <Detail/>
        </template>
        <template #fallback>
            <DetailSkeleton/>
        </template>
    </Suspense> 
</template>