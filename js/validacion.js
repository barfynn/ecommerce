var user = localStorage.getItem("login", user);
var pass = localStorage.getItem("password", pass);

function validacion() {
        
        if(user == null){

            location.href="login.html";

        }else{
            document.getElementById("datos").innerHTML=localStorage.getItem("login");
        }
    }

validacion();
