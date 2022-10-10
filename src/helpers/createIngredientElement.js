const createIngredientsElement = () => {

    const wrapper = document.getElementById('ingredient-wrapper');

    const div = document.createElement('div');
    const input = document.createElement('input');
    const span = document.createElement('span');

    input.name = 'ingredients';
    input.type = 'text';
    input.className = 'input-field';  

    span.className = 'group hover:bg-rose-500 rounded-full';
    span.addEventListener('click', () => removeInputElement(span,'ingredients') );
    span.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:text-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg> `;

    div.className ='flex items-center gap-4 mb-4';
    div.appendChild(input);
    div.appendChild(span);

    wrapper.appendChild(div);
}

const removeInputElement = (elem, type) => {   

  const parent = elem.closest('.flex') 

  if (parent == null) return;

  if (type == 'ingredients')  {
      const ingredientWrapper = document.getElementById('ingredient-wrapper');  
      return ingredientWrapper.removeChild(parent);
  }
    
  const instructionWrapper = document.getElementById('instruction-wrapper');   
  instructionWrapper.removeChild(parent);        

} 




export default {
  createIngredientsElement
}


