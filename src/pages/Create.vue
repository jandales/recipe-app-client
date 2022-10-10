
<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import fileReader from '../helpers/fileReader'
import arr from '../helpers/array'

const store = useStore();
const router = useRouter();

const imageSelected = ref(false);
const ingredient = ref();
const instruction = ref();
const errors = ref([]);
const success = ref(false);
const isLoading = ref(false);

const form = reactive({
    name  : null,
    description : null,
    ingredients : [],
    instructions : [],
    image : null,
    status : 'private',  
})

const handleStoreRecipe = async () => {
    errors.value = [];
    success.value = false;
    isLoading.value = true;
    try {     
      await store.dispatch('storeRecipe', form);    
      success.value = true;  
    } catch (err) {
      if(err.response.status === 400){
          errors.value = err.response.data.errors;
      }      
    } finally {
      isLoading.value = false;
    } 
  
    if (!success.value) return;

    router.push({name: 'user', params : {id : authUser.value._id }});
  
  

}

const handleFileOnUploader = async (event) => {   
 
  const image = event.target.files[0]

  const path = await fileReader.fileReaderAsync(image);

  if (path) { 
    imageSelected.value = true;  
    form.image = image;  
  } 
   
  let imageElement = document.getElementById('recipe-image');

  imageElement.setAttribute('src', path);  

}

const handleAddIngredient = () => {
    
    if (!ingredient.value) return;

    const exist = arr.exist(form.ingredients, ingredient.value)

    if(exist) return alert("ingredient already exist");

    form.ingredients = [...form.ingredients, ingredient.value];

    ingredient.value = null    
}

const handleAddInstruction = () => {

    if (!instruction.value) return;

    const exist = arr.exist(form.instructions, instruction.value)

    if(exist) return alert("instructions already exist");

    form.instructions = [...form.instructions, instruction.value];

    instruction.value = null    

}

const removeIngredient = (value) => {
 
  form.ingredients =  arr.remove(form.ingredients, value)

}

const removeInstruction = (value) => {

 form.instructions =  arr.remove(form.instructions, value)

}

const authUser = computed( () => { return store.getters.authUser } )


</script>

<template>

<section class="wrapper min-h-screen  gap-8 my-8 md:my-16">

        <div class="w-full mx-auto px-6 h-full text-gray-800">
            <div class="flex xl:justify-center  justify-center items-center flex-wrap h-full g-6">      
            <div class="w-full mb-8 md:mb-0">
                <h1 class="block mb-8 text-[1.5rem]">Create Recipe</h1>
              <form @submit.prevent="handleStoreRecipe" method="POST" enctype="multipart/form-data"> 

                <div class="flex flex-col gap-4 md:flex-row md:gap-8 border  bg-white rounded-md shadow-lg p-4 mb-8">
                  <div class="w-full">
                    <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label inline-block mb-2 text-gray-700"
                        >Name</label
                      >
                      <input
                        v-model="form.name"
                        type="text"
                        name="name"
                        class="input-field"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />

                      <div v-for="error in errors">
                        <small v-if="error.param == 'name'"  class="block text-rose-500 capitalize mt-2"> 
                            {{error.msg}}                  
                        </small>
                      </div>
                    
                  </div>
  
                  <div class="mb-3">
                      <label for="exampleFormControlInput1" class="form-label inline-block mb-2 text-gray-700"
                        >Description</label
                      >
                      <textarea  
                        cols="3"
                        rows="3"
                        v-model="form.description"
                        name="description"
                        class="input-field"
                        id="exampleFormControlInput1"
                        placeholder=""
                      >
                      </textarea>

                      <div v-for="error in errors">
                        <small v-if="error.param == 'description'"  class="block text-rose-500 capitalize mt-2"> 
                            {{error.msg}}                  
                        </small>
                      </div>
                    
                  </div>

                 
                  <div>
                    <label for="exampleFormControlInput1" class="form-label inline-block mb-4 text-gray-700">Image</label>
                  <div class="relative w-full md:w-[200px]  bg-gradient-to-r from-purple-500 to-pink-500 h-[200px] mb-4"> 
                    <div  class="relative border w-full h-full" :class="{ hidden : imageSelected == false}">
                      <img id="recipe-image"   class="w-full h-full" alt="recipe-image">                      
                    </div>

                    <label for="dropzone-file" class="dropzone-file-wrapper absolute bottom-2 right-2 p-2 bg-white rounded-full">
                      <span class="bg-white ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-sky-500">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                      </svg>                    
                      </span>
                      <input id="dropzone-file" v-on:change="handleFileOnUploader($event)" type="file"  name="image" class="hidden">
                    </label>
                  </div>
                  </div>

                  </div>
                  
                </div>             
                   
                

                <div class="flex flex-col">
                  <div id="ingredient-wrapper" class="border rounded-md  bg-white shadow-lg p-4 mb-8"> 
                    <label for="exampleFormControlInput1" class="form-label inline-block mb-4 text-gray-700">Ingredients</label>
                    <div v-for="(item, index) in form.ingredients" class="input-field !flex !items-center !justify-between !mb-4" >

                        <div class="flex items-center">
                          <div class="flex items-center justify-center text-sm mr-4 w-6 h-6 rounded-full bg-sky-500 text-white">
                              {{ index + 1 }}
                          </div>
                          <label href="">{{ item }}</label>
                        </div>
                        <span @click="removeIngredient(item)"  class="remove-ingredient group hover:bg-rose-500 rounded-full ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:text-white">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>                    
                      </span>
                    </div>
                   
                  <div class="flex items-center gap-4 mb-4">
                      <input
                        @keydown.enter.prevent="handleAddIngredient"
                        type="text"
                        v-model="ingredient"
                        name="ingredients"                    
                        class="input-field"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />            
                  </div>                  
                  <div v-for="error in errors">
                        <small v-if="error.param == 'ingredients'"  class="block text-rose-500 capitalize mt-2"> 
                            {{error.msg}}                  
                        </small>
                  </div>                 
                </div>

                
                <div id="instruction-wrapper" class="border rounded-md  bg-white shadow-lg p-4 mb-8">
                    <label for="exampleFormControlInput1" class="form-label inline-block mb-2 text-gray-700"
                      >Instructions</label
                    >
             

                  <div v-for="(item, index) in form.instructions" class="input-field !mb-4">
                    
                        <div class="flex justify-between items-center mb-1">
                                  <span class="inline-block py-1  text-sky-500 font-semibold">
                                      Step {{ index + 1 }}
                                  </span>
                                  <span @click="removeInstruction(item)"  class="group hover:bg-rose-500 rounded-full ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:text-white">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>                    
                                  </span>
                        </div>
                        <p>{{ item }}</p>
                  </div>




                  <div class="flex items-center gap-4 mb-4">
                      <textarea
                      @keydown.enter.prevent="handleAddInstruction"
                      v-model="instruction"
                      cols="3"
                      rows="3"
                      name="instructions"
                      class="input-field text-left"                    
                      placeholder="">
                    </textarea>  
                                      
                  </div>
                  <div v-for="error in errors">
                        <small v-if="error.param == 'instructions'"  class="block text-rose-500 capitalize mt-2"> 
                            {{error.msg}}                  
                        </small>
                      </div> 



                </div>
                </div>

                <div class="mb-8 border rounded-md  bg-white shadow-lg p-4">
                    <label for="exampleFormControlInput1" class="form-label inline-block mb-2 text-gray-700"
                        >Status</label
                      >
                    <select v-model="form.status" name="status" class="input-field">
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
      
                <div class="mb-8">
                  <button type="submit"                   
                    class="btn !w-full md:!w-auto"                    
                  >
                  <div v-if="isLoading"  class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-green-500" role="status">
                      <span class="visually-hidden">Loading...</span>
                   </div>
                   <label v-else class="text-white">Save</label>
                </button>                  
                  
                </div>
              </form>
            </div>
          </div>
        </div>
    </section> 
</template>
