//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var comentarios = [];

function mostrarImagenes(array){

    let htmlContentToAppend = "";

        htmlContentToAppend += `
              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                          <div class="carousel-item active">
                             <img src="` + product.images[0] + `" alt="img">
                          </div>
                          <div class="carousel-item">
                             <img src="` + product.images[1] + `" alt="img1">
                          </div>
                          <div class="carousel-item">
                             <img src="` + product.images[2] + `" alt="img2">
                          </div>
                          <div class="carousel-item">
                             <img src="` + product.images[3] + `" alt="img3">
                          </div>
                          <div class="carousel-item">
                             <img src="` + product.images[4] + `" alt="img3">
                          </div>
                     </div>
                       <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                           <span class="sr-only">Previous</span>
                       </a>
                      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                           <span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="sr-only">Next</span>
                       </a>
               </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

function mostrarComentarios(array){

    let htmlContentToAppend = "";
    

    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        htmlContentToAppend += `
        <div >
             <div class="col-md-6">
                  <div class="p-3 bg-white rounded">
                       <div class="card p-3 comentarios">
                          <p class="font-weight-bold text-primary">` + comments.user + ` </p>
                          <p>puntuación: ` + comments.score + ` </p>
                          <p class="font-weight-bold">` + comments.description + ` </p>
                          <p>` + comments.dateTime + ` </p>
                       </div>
                   </div> 
               </div>
            </div>
        </div>
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}

function comentario(){


    let htmlContentToAppend = "";
    artex = document.getElementById("areatext").value;
    usuario = localStorage.getItem("login", user);

    if (artex !== "" && user !== ""){


    htmlContentToAppend += `
        <div >
             <div class="col-md-6">
                  <div class="p-3 bg-white rounded">
                       <div class="card p-3 comentarios">
                          <p class="font-weight-bold text-primary">${usuario}</p>
                          <p id="estrellas">puntuación: </p>
                          <p class="font-weight-bold">${artex}</p>
                          <p id="date"></p>
                       </div>
                   </div> 
               </div>
            </div>
        </div>
        `
    document.getElementById("hola").innerHTML = htmlContentToAppend;
    alert("Su comentario se ha ingresado con éxito");
    }
    stars();
    fecha();
    hora();
    document.getElementById("areatext").value="";
};

function fecha(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

   if (dd < 10) {
     dd = '0' + dd;
    }

   if (mm < 10) {
     mm = '0' + mm;
   }

   today = yyyy + '-' + mm + '-' + dd;

   document.getElementById("date").innerHTML = today;

};

function hora(){
    var hour = new Date();
    var hh = hour.getHours();
    var mn = hour.getMinutes();
    var ss = hour.getSeconds();

    hour = hh + ':' + mn + ':' + ss;

    document.getElementById("date").innerHTML += ' '+ hour;

}; 

function stars(){
    if(document.getElementById("5").checked == true){
        document.getElementById("estrellas").innerHTML += '5';
    }
    if(document.getElementById("4").checked == true){
        document.getElementById("estrellas").innerHTML += '4';
    }
    if(document.getElementById("3").checked == true){
        document.getElementById("estrellas").innerHTML += '3';
    }
    if(document.getElementById("2").checked == true){
        document.getElementById("estrellas").innerHTML += '2';
    }
    if(document.getElementById("1").checked == true){
        document.getElementById("estrellas").innerHTML += '1';
    }
};

function mostrarRelacionados(array){

    let htmlContentToAppend = "";
    

        htmlContentToAppend += `
        <div class="tarjetabox">
            <div class="tarjeta">
               <a href="product-info.html" class="list-group-item-action">
                  <div>
                      <div>
                       <img src=" `+product[1].imgSrc+` " class="img-thumbnail">
                      </div>  
                      <div class="col">
                         <div >
                           <h4 class="textocard"> `+ product[1].name +` </h4>
                         </div>
                         <p class="textocard" > `+product[1].cost+` `+product[1].currency+` </p>
                      </div>
                  </div>
              </a>
           </div>

          <div class="tarjeta">
                <a href="product-info.html" class="list-group-item-action">
                    <div>
                       <div>
                         <img src=" `+product[3].imgSrc+` " class="img-thumbnail">
                       </div>  
                       <div class="col">
                           <div>
                             <h4 class="textocard"> `+ product[3].name +` </h4>
                           </div>
                           <p class="textocard"> `+product[3].cost+` `+product[3].currency+` </p>
                        </div>
                    </div>
                </a>
          </div>
        </div>
       ` 

        document.getElementById("relatedProd").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            
            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comentarios = resultObj.data;
            mostrarComentarios(comentarios);
        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;
            mostrarRelacionados(product);
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
          product = resultObj.data;
          mostrarImagenes(product);
      }
  });
});
