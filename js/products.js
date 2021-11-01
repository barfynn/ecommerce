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
       <div class="col-md-4">
              <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img class="bd-placeholder-img card-img-top"  src="`+product.imgSrc+`">
                <h3 class="m-3">`+ product.name +` (`+product.soldCount+`)</h3>
                <div class="card-body">
                  <p class="card-text">`+product.description+`</p>
                  <p class="mb-1"> `+product.cost+` `+product.currency+` </p>
                </div>
              </a>
            </div>
       ` 
      }
      document.getElementById("rowresponsive").innerHTML = htmlContentToAppend;
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

