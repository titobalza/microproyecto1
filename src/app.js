/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here
  const holaaaaaaaaaaaaaaaaaaaaaaaa = document.querySelector("#excuse");

  let culpable = ["Isa", "Anabella", "Anag", "yoda", "camiladiaz"];
  let accion = ["devoro", "mato", "rompio", "se comio", "daño"];
  let problema = [
    "la tarea",
    "algoritmos y programacion",
    "fisica",
    "la serie del caribe",
    "nuestro trabajo"
  ];
  let cuando = ["ayer", "el sabado", "el domingo", "el lunes", "no se cuando"];

  function generador(e) {
    return e[Math.floor(Math.random() * e.length)];
  }
  let excusa =
    generador(culpable) +
    " " +
    generador(accion) +
    " " +
    generador(problema) +
    " " +
    generador(cuando);

  holaaaaaaaaaaaaaaaaaaaaaaaa.innerHTML = excusa;
};
