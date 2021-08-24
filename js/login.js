//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});

function Log(user, pass){

    if (user.trim()==="" || pass.trim()===""){
        alert("Debe ingresar usuario y contraseña");

    }    else{
            localStorage.setItem("login", user.trim());
            localStorage.setItem("password", pass.trim());
            sessionStorage.setItem("login", user.trim());

            location.href="index.html";
        
    }   
}

