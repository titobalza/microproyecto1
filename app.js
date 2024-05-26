/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here
  const holaaaaaaaaaaaaaaaaaaaaaaaa = document.querySelector("#excuse");
  let frutas = [
    "manzana",
    "banana",
    "cereza",
    "durazno",
    "kiwi",
    "limón",
    "mango"
  ];
  let animales = [
    "perro",
    "gato",
    "elefante",
    "jirafa",
    "tigre",
    "león",
    "delfín"
  ];
  let colores = [
    "rojo",
    "azul",
    "verde",
    "amarillo",
    "negro",
    "blanco",
    "naranja"
  ];
  let paises = [
    "argentina",
    "brasil",
    "canadá",
    "dinamarca",
    "españa",
    "francia",
    "japón"
  ];
  let deportes = [
    "fútbol",
    "baloncesto",
    "tenis",
    "natación",
    "ciclismo",
    "golf",
    "béisbol"
  ];
  let categories = [frutas, animales, colores, paises, deportes];
  function generador(e) {
    return e[Math.floor(Math.random() * e.length)];
  }
  let categoria = generador(categories);
  let excusa = generador(categoria);
  holaaaaaaaaaaaaaaaaaaaaaaaa.innerHTML = excusa;
};
