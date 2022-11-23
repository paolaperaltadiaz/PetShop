import {valida} from './validaciones.js';

//se selecciona todos los inputs que hay en el html
const inputs = document.querySelectorAll("input");

inputs.forEach( input => {
    //le agrega el addEventListener de blur cuando salga de foco y cuando salga de foco llama la funcion = valida(input.target)
    input.addEventListener('blur', (input) => {
        valida(input.target);
    })
})