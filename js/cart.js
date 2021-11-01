//Función que se ejecuta una vez que se haya lanzado el evento de   
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function carrito(array) {
    let htmlContentToAppend = "";

    
    for(let i = 0; i < array.length; i++){
        let articles = array[i];


             htmlContentToAppend += `
                     <div class="row border-top border-bottom">
                         <div class="row mains align-items-center">
                             <div class="col-2"><img class="img-fluid" src="${cart.articles[i].src}"></div>
                             <div class="col">
                                 <div class="row">${cart.articles[i].name}</div>
                             </div>
                             <div class="quantity-container col">
                               <button class="decrease" type="button" title="Decrease Quantity">-</button>
                               <input id="cantidad"" class="quantity-amount" name="" value="${cart.articles[i].count}" />
                               <button class="increase" type="button" title="Increase Quantity">+</button>
                             </div>
                    
                             <div class="col" id="num2" >${cart.articles[i].unitCost} ${cart.articles[i].currency}</div>
                             <div class="col" id="totalUnit" ></div><span class="close">&#10005;</span>
                         </div>
                     </div>
            `
              document.getElementById("carrito").innerHTML = htmlContentToAppend;
    }
}

function multiplicar(array){
    
    for(let i = 0; i < array.length; i++){
        let articles = array[i];

       cantidad = document.getElementById("cantidad");
       n1 = cantidad.value;
       n2 = cart.articles[i].unitCost;
       r = n1*n2;
       document.getElementById("totalUnit").innerHTML = '$' + r;
    }
}

function Subtotal(array){

    for(let i = 0; i < array.length; i++){
        let articles = array[i];

       cantidad = document.getElementById("cantidad");
       n1 = cantidad.value;
       n2 = cart.articles[i].unitCost;
       r = n1*n2;
       document.getElementById("resultado").innerHTML = '$' + r;
    }
}


function total(array){
    
    for(let i = 0; i < array.length; i++){
        let articles = array[i];

       cantidad = document.getElementById("cantidad");
       n1 = cantidad.value;
       n2 = cart.articles[i].unitCost;
       r = n1*n2;
       document.getElementById("total").innerHTML = '$' + r;
    }   
}


function flechas() {

   Array.prototype.slice.call(document.querySelectorAll('.quantity-container'))
     .map(function (container) {
       return {
         input: container.querySelector('.quantity-amount'),
         decrease: container.querySelector('.decrease'),
         increase: container.querySelector('.increase'),
         get value () { return parseInt(this.input.value); },
         set value (v) { this.input.value = v; }
       }
     })
     .forEach(function (item) {
       item.decrease.addEventListener('click', function () { 
           if (item.value > 1 ) {
               item.value -= 1;
               multiplicar(cart.articles);
               Subtotal(cart.articles);
               total(cart.articles);
            }else{
                item.value = 1;
            }
       });
       item.increase.addEventListener('click', function () {
         item.value += 1;
         multiplicar(cart.articles);
         Subtotal(cart.articles);
         total(cart.articles);
       });
   });
}

document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    multiplicar(cart.articles);
    Subtotal(cart.articles);
    total(cart.articles);
  }); 

  
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cart = resultObj.data;
            carrito(cart.articles);
            multiplicar(cart.articles);
            Subtotal(cart.articles);
            total(cart.articles);
            flechas(cart.articles);
        }
    });
});