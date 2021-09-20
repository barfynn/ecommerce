//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDENPRECIO_ASC = "ASC";
const ORDENPRECIO_DES = "DES";
const ORDEN_REL = "Rel.";
var currentProductArray = [];
var currentSortClasificacion = undefined;
var minCost = undefined;
var maxCost = undefined;


function sortProduct(clasificacion, array){
  let result = [];
  if (clasificacion === ORDENPRECIO_ASC)
  {
      result = array.sort(function(a, b) {
          if ( a.cost < b.cost ){ return -1; }
          if ( a.cost > b.cost ){ return 1; }
          return 0;
      });
  }else if (clasificacion === ORDENPRECIO_DES){
      result = array.sort(function(a, b) {
          if ( a.cost > b.cost ){ return -1; }
          if ( a.cost < b.cost ){ return 1; }
          return 0;
      });
  }else if (clasificacion === ORDEN_REL){
      result = array.sort(function(a, b) {
          let aCount = parseInt(a.soldCount);
          let bCount = parseInt(b.soldCount);

          if ( aCount > bCount ){ return -1; }
          if ( aCount < bCount ){ return 1; }
          return 0;
      });
  }

  return result;
}

function showProduct(array){

  let htmlContentToAppend = "";
  for(let i = 0; i < currentProductArray.length; i++){
      let product = currentProductArray[i];

      if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
      ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

       htmlContentToAppend += `
           <a <a href="product-info.html" class="list-group-item list-group-item-action">
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
       ` 
      }
      document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
  }
}

function sortAndShowProduct(sortClasificacion, productArray){
  currentSortClasificacion = sortClasificacion;

  if(productArray != undefined){
    currentProductArray = productArray;
  }

  currentProductArray = sortProduct(currentSortClasificacion, currentProductArray);

  showProduct();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showSpinner();
            currentProductArray = resultObj.data;
            showProduct(currentProductArray);
            hideSpinner();
            sortAndShowProduct(ORDENPRECIO_ASC, resultObj.data);
        }
        
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
      sortAndShowProduct(ORDENPRECIO_ASC);
  });

  document.getElementById("sortDesc").addEventListener("click", function(){
      sortAndShowProduct(ORDENPRECIO_DES);
  });

  document.getElementById("sortByCost").addEventListener("click", function(){
      sortAndShowProduct(ORDEN_REL);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function(){
      document.getElementById("rangeFilterCostMin").value = "";
      document.getElementById("rangeFilterCostMax").value = "";

      minCost = undefined;
      maxCost = undefined;

      showProduct();
  });

  document.getElementById("rangeFilterCost").addEventListener("click", function(){
    
      minCost = document.getElementById("rangeFilterCostMin").value;
      maxCost = document.getElementById("rangeFilterCostMax").value;

      if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
          maxCost = parseInt(maxCost);
      }
      else{
          maxCost = undefined;
      }

      showProduct();
  });
});

