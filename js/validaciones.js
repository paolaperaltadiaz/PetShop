//esta funcion se manda a llamar cada vez que el usuario sale del imput que esta rellenando 
export function valida (input) {
    //llamando el elemento fecha de nacimiento con data-tipo="nacimiento" de html a js // verifica el tipo de input
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores [tipoDeInput](input);
    }

    // se utiliza para verificar si valid esta en true (que no se ha escrito) para que quite la clase sino esta en false y la agrege (hay algo escrito) 
    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = "";
    }else {
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];


const mensajeDeError = {
    nombre: {
        valueMissing: "El campo Nombre no puede estar vacío",
    },
    email: {
        valueMissing: "El campo Email no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo Contraseña no puede estar vacío",
        patternMismatch: "Debe contener: min 6 - max 12 caracteres - una letra mayuscula - una letra minuscula - un numero  /  NO puede contener caracteres especiales",
    },
    nacimiento: {
        valueMissing: "El campo Fecha de Nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo Numero Telefonico no puede estar vacío",
        patternMismatch: "El formato requerido es +57 XXX XXXXXXX",
    },
    direccion: {
        valueMissing: "El campo Dirección no puede estar vacío",
        patternMismatch: "La dirección debe de contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El campo Ciudad no puede estar vacío",
        patternMismatch: "La dirección debe de contener entre 03 a 20 caracteres",
    },
    estado: {
        valueMissing: "El campo Estado no puede estar vacío",
        patternMismatch: "La dirección debe de contener entre 03 a 20 caracteres",
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach( (error) => {
        if (input.validity[error]) {
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje;
};


function validarNacimiento (input) {
    const fechaCliente = new Date (input.value);
    let mensaje = "";
   if (!mayorDeEdad (fechaCliente)){
    mensaje = "Debes tener al menos 18 años de edad.";
   };

    //.setCustomValidity = define el mensaje de validacion personalizado para el elemento seleccionado con el mensaje especifico
    input.setCustomValidity(mensaje);
};

function mayorDeEdad (fecha) {
    const fechaActual = new Date ();
    const diferenciaFechas = new Date (
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
};