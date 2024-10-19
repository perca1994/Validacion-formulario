document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '' ,
        cc:'',
        asunto:'',
        mensaje: ''
    }

 //Seleccionar los elementos del interfaz
 const inputEmail = document.querySelector('#email');
 const inputCC = document.querySelector('#cc');
 const inputAsunto = document.querySelector('#asunto');
 const inputMensaje = document.querySelector('#mensaje');
 const formulario = document.querySelector('#formulario');
 const btnSubmit = document.querySelector('#formulario button[type="submit"]');
 const btnReset = document.querySelector('#formulario button[type="reset"]');
 const spinner = document.querySelector('#spinner');





 //Asignar Eventos
 

 inputEmail.addEventListener('blur',validar);
 inputAsunto.addEventListener('blur',validar);
 inputMensaje.addEventListener('blur', validar);
 formulario.addEventListener('submit', enviarEmail);

 inputCC.addEventListener('blur', function(e){
    let cc=e.target.value
    if(cc){
       if(!validarEmail(cc)){
        mostrarAlerta('El email  no es válido',e.target.parentElement);
          return;
       } ;
       limpiarAlerta( e.target.parentElement);

       email.cc = cc;

    }
 });

 btnReset.addEventListener('click',function(e){
    e.preventDefault();
    
    //reiniciar el objeto
resetFormulario();



 })

 function enviarEmail(e){
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(()=>{
        spinner.classList.remove('flex');
        spinner.classList.add('hidden');

        resetFormulario();

        //crear una Alerta
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500','text-white', 'p-2', 'text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
        alertaExito.textContent = 'Mensaje enviado Correctamente';


        formulario.appendChild(alertaExito);


         setTimeout(() => {
            alertaExito.remove();
         }, 3000);


    },3000)


 }

   
 function validar(e){
           if(e.target.value.trim() === ""){
           mostrarAlerta(`El campo ${e.target.id} es Obligatorio`, e.target.parentElement);        
           email[e.target.name] = '';
           comprobarEmail();
           return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es Valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
             return;
        }
        limpiarAlerta( e.target.parentElement);

        //asignar Valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //comprobar el objeto de Email
        comprobarEmail();

      

 }

 function mostrarAlerta(mensaje,referencia){
     limpiarAlerta(referencia);
    //Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('bg-red-600','text-white','p-2','text-center','alerta');

    //Inyectar el error al formulario;
    referencia.appendChild
    (error);

 }

 function limpiarAlerta(referencia){
     const alerta = referencia.querySelector('.bg-red-600');
     if(alerta){
        alerta.remove();
 }
}

function validarEmail(email){
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    const resultado = regex.test(email);
    return resultado;
}


function comprobarEmail(){
  
    
    if(Object.values(email).includes('')){
        btnSubmit.classList.add('opacity-50');
        btnSubmit.disabled = true;
        return;
    }
    
    btnSubmit.classList.remove('opacity-50');
    btnSubmit.disabled = false;
    

}


function resetFormulario(){
      
    //reiniciar el objeto
    email.email = '';
    email.cc = '';
    email.asunto = '';
    email.mensaje = '';
    
    formulario.reset();
    comprobarEmail();

}





})