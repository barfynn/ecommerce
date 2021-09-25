//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var comentarios = [];

function mostrarImagenes(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function mostrarComentarios(array){

    let htmlContentToAppend = "";
    

    for(let i = 0; i < array.length; i++){
        let comments = array[i];

        htmlContentToAppend += `
            <div class= "comentarios">
                <p >puntuación: ` + comments.score + ` </p>
                <p >` + comments.description + ` </p>
                <p >` + comments.user + ` </p>
                <p >` + comments.dateTime + ` </p>
            </div>
        `

        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}


function mostrarRelacionados(array){

    let htmlContentToAppend = "";
    

        htmlContentToAppend += `
           <a <a href="product-info.html" class="list-group-item list-group-item-action">
             <div>
               <div class="col-3" >
                 <img src=" `+product[1].imgSrc+` " class="img-thumbnail">
               </div>  
               <div class="col">
                   <div class="d-flex w-100 justify-content-between">
                     <h4 class="mb-1"> `+ product[1].name +` </h4>
                   </div>
                   <p class="mb-1"> `+product[1].cost+` `+product[1].currency+` </p>
                 </div>
               </div>
            </div>
          </a>
          <a <a href="product-info.html" class="list-group-item list-group-item-action">
             <div>
               <div class="col-3" >
                 <img src=" `+product[3].imgSrc+` " class="img-thumbnail">
               </div>  
               <div class="col">
                   <div class="d-flex w-100 justify-content-between">
                     <h4 class="mb-1"> `+ product[3].name +` </h4>
                   </div>
                   <p class="mb-1"> `+product[3].cost+` `+product[3].currency+` </p>
                 </div>
               </div>
            </div>
          </a>
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
            mostrarImagenes(product.images);
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
});
