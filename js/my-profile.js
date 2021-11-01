//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
"use strict";

const arr = [];

const buttonSave = () => {
  const nombr = document.getElementById("nam");
  const apell = document.getElementById("last");
  const email = document.getElementById("mail");
  const tele = document.getElementById("cell");
  const edad = document.getElementById("age");
  const name = nombr.value;
  const last = apell.value;
  const mail = email.value;
  const cell = tele.value;
  const age = edad.value;

  nombr.value = "";
  apell.value = "";
  email.value = "";
  tele.value = "";
  edad.value = "";

 
  if (name && last && mail && cell && age) {
    const nombreadd = document.getElementById("nombreadd");
    const emailadd = document.getElementById("emailadd");
    const ageadd = document.getElementById("ageadd");
    const celladd = document.getElementById("celladd");

    nombreadd.innerHTML = `${name}` + ' ' + `${last}`;
    emailadd.innerHTML = `${mail}`;
    ageadd.innerHTML = `${age}` + ' ' + 'años';
    celladd.innerHTML = `${cell}`;
    arr.push({
        name,
        last,
        mail,
        age,
        cell,
      });
  } else {
    alert("Debe completar todos los campos");
  }
};

const storage = () => {
    localStorage.setItem("DATA", JSON.stringify(arr));
};

const showData = (array) => {
    const nombr = document.getElementById("nombreadd");
    const emai = document.getElementById("emailadd");
    const ages = document.getElementById("ageadd");
    const tel = document.getElementById("celladd");
    for (let data of array) {
      nombr.innerHTML = `${data.name}` + ' ' + `${data.last}`;
      emai.innerHTML = `${data.mail}`;
      ages.innerHTML = `${data.age}` + ' ' + 'años';
      tel.innerHTML = `${data.cell}`;
    }
};

const cancel = () => {
  document.getElementById("nam").value = "";
  document.getElementById("last").value = "";
  document.getElementById("mail").value = "";
  document.getElementById("cell").value = "";
  document.getElementById("age").value = "";
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btnsave").addEventListener("click", buttonSave);
  document.getElementById("btnsave").addEventListener("click", storage);
  showData(JSON.parse(localStorage.getItem("DATA")));
  document.getElementById("btncancel").addEventListener("click", cancel);
});
