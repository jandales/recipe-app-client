
const removeInputElement = (elem) => {   

    const parent = elem.closest('.flex') 
  
    if (parent == null) return;

    const instructionWrapper = document.getElementById('instruction-wrapper');   
    instructionWrapper.removeChild(parent);        
  
}


export default function createInputInstructionElement() {

    const instructionWrapper = document.getElementById('instruction-wrapper');

    const div = document.createElement('div');
    const input = document.createElement('textarea');
    const span = document.createElement('span');

    input.name = 'instructions';      
    input.className = 'input-field'; 
    input.cols="3"
    input.rows="3"     


    span.className = 'group hover:bg-rose-500 rounded-full';
    span.addEventListener('click', () => removeInputElement(span));
    span.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 group-hover:text-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg> `;

    div.className ='flex items-center gap-4 mb-4';
    div.appendChild(input);
    div.appendChild(span);
              
    instructionWrapper.appendChild(div);

}


