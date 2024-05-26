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
  let categories = {
    frutas: frutas,
    animales: animales,
    colores: colores,
    paises: paises,
    deportes: deportes
  };

  function generador(e) {
    return e[Math.floor(Math.random() * e.length)];
  }

  // Select a random category
  let categoryKeys = Object.keys(categories);
  let randomCategoryKey = generador(categoryKeys);
  let randomCategory = categories[randomCategoryKey];

  // Select a random word from the chosen category
  let randomWord = generador(randomCategory);

  // Combine category and word to form the excuse
  let excuse = `${randomCategoryKey} ${randomWord}`;
  holaaaaaaaaaaaaaaaaaaaaaaaa.innerHTML = excuse;
};