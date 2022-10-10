<script>

    const handleremoveInputElement = (elem) => {  
        
    } 
</script>
<template>
  
    <div class="flex items-center gap-4 mb-4">
        <input
        type="text"
        name="ingredients"
        v-model="form.ingredients"
        class="input-field"
        id="exampleFormControlInput1"
        placeholder=""
      />
      <span @click="handleremoveInputElement($event, 'ingredients')" class="remove-ingredient group hover:bg-rose-500 rounded-full ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:text-white">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>                    
      </span>
    </div>

  

</template>