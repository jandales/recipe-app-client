<script setup>
    import { ref, onMounted } from 'vue';

    const observerElement = ref(null)

    const emit = defineEmits(['handleLoadMoreRecipe'])

    const handleLoadMoreRecipe = () => {
        emit('handleLoadMoreRecipe');
    }

    const handleScroll = async () => {

        const element = observerElement.value;

        const observer = new IntersectionObserver(([entry]) => {
            if ( entry && entry.isIntersecting) {
                handleLoadMoreRecipe();
                }       
            });
            observer.observe(element);
        }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll() )
    })

</script>
<template>   
    <div ref="observerElement" class="p-1 w-full">
    </div>
</template>