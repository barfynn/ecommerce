const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

const Login = () => {

  const divlogin = document.createElement("div");
  divlogin.classList.add("dropdown");
  divlogin.id = "login1";
  document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between")[0].appendChild(divlogin);

  const button = document.createElement('button');
  button.className += "dropbtn dropdown-toggle";
  button.id = "bton";
  button.onclick = myFunction
  document.getElementById("login1").appendChild(button);

  var image = document.createElement("img");
  image.src = "img/icono.png";
  image.classList.add("imagen");
  var src = document.getElementById("bton");
  src.appendChild(image);

  const divenlaces = document.createElement("div");
  divenlaces.id = "myDropdown";
  divenlaces.classList.add("dropdown-content");
  document.getElementById("login1").appendChild(divenlaces);

  let a = document.createElement("a");
  a.setAttribute("href", "cart.html");
  let aTexto = document.createTextNode("Ver carrito");
  a.appendChild(aTexto);
  document.getElementById("myDropdown").appendChild(a);

  const enlacePerfil = document.createElement("a");
  enlacePerfil.setAttribute("href", "my-profile.html");
  const texto = document.createTextNode("Mi perfil");
  enlacePerfil.appendChild(texto);
  document.getElementById("myDropdown").appendChild(enlacePerfil);

  const enlaceSesion = document.createElement("a");
  enlaceSesion.onclick = CerrarSesion
  enlaceSesion.setAttribute("href", "CerrarSesion()")
  enlaceSesion.setAttribute("href", "login.html");
  const texto1 = document.createTextNode("Cerrar sesión");
  enlaceSesion.appendChild(texto1);
  document.getElementById("myDropdown").appendChild(enlaceSesion);

  const nombreDiv = document.createElement("div");
  nombreDiv.className += "py-2 d-none d-md-inline-block";
  nombreDiv.id = "datos";
  document.getElementById("bton").appendChild(nombreDiv);

};
function CerrarSesion() {
  localStorage.removeItem("login");
  localStorage.removeItem("password");
  sessionStorage.removeItem('login');
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show"); 
}     

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) 
  if (!event.target.matches('.imagen'))
  if (!event.target.matches('#datos'))
  {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

var user = localStorage.getItem("login", user);
var pass = localStorage.getItem("password", pass);

function validacion() {
        
        if(user == null){

            location.href="login.html";

        }else{
            document.getElementById("datos").innerHTML=localStorage.getItem("login");
        }
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  Login();
  validacion();
});