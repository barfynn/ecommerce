//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productArray = [];

function showProduct(array){

  let htmlContentToAppend = "";
  for(let i = 0; i < array.length; i++){
      let product = array[i];

      htmlContentToAppend += `
      <div class="container">
        <div class="list-group" id="cat-list-container">
          <a class="list-group-item list-group-item-action">
            <div class="row">
              <div class="col-3" >
                <img src=" `+product.imgSrc+` " class="img-thumbnail">
              </div>  
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1"> `+ product.name +` </h4>
                    <small class="text-muted"> `+product.soldCount+` artículos </small>
                  </div>
                  <p class="mb-1"> `+product.description+` </p>
                  <p class="mb-1"> `+product.cost+` `+product.currency+` </p>
                </div>
              </div>
           </div>
          </a>
        </div>
      </div>  
      ` 

      document.getElementById("cont").innerHTML = htmlContentToAppend;
  }
}


document.addEventListener("DOMContentLoaded", function (e) {
  
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showSpinner();
            productArray = resultObj.data;
            showProduct(productArray);
            hideSpinner();
        }
        
    });
});

