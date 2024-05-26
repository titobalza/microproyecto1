/* eslint-disable */
import "./style.css";
import "./assets/img/360_F_517383341_8nWEFfM1KL3K5LNTjUDrne3x0kZiuxuj.jpg";
import "./assets/img/Hangman.ico";

window.onload = function() {
  const wordContainer = document.querySelector("#excuse");
  const alphabetContainer = document.querySelector("#alphabet-container");
  const messageContainer = document.querySelector("#message");
  const categoryContainer = document.querySelector("#category");
  const vidasContainer = document.querySelector("#vidas");
  let lives = 6;
  const frutas = [
    "manzana",
    "banana",
    "cereza",
    "durazno",
    "kiwi",
    "limon",
    "mango"
  ];
  const animales = [
    "perro",
    "gato",
    "elefante",
    "jirafa",
    "tigre",
    "leon",
    "delfin"
  ];
  const colores = [
    "rojo",
    "azul",
    "verde",
    "amarillo",
    "negro",
    "blanco",
    "naranja"
  ];
  const paises = [
    "argentina",
    "brasil",
    "canada",
    "dinamarca",
    "venezuela",
    "francia",
    "japon"
  ];
  const deportes = [
    "futbol",
    "baloncesto",
    "tenis",
    "natacion",
    "ciclismo",
    "golf",
    "beisbol"
  ];

  const categories = { frutas, animales, colores, paises, deportes };

  function seleccionarPalabra(categorias) {
    const categoryKeys = Object.keys(categorias);
    const randomCategoryKey =
      categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const randomCategory = categorias[randomCategoryKey];
    const randomWord =
      randomCategory[Math.floor(Math.random() * randomCategory.length)];
    return { palabra: randomWord, categoria: randomCategoryKey };
  }

  const { palabra, categoria } = seleccionarPalabra(categories);
  const palabraOculta = Array(palabra.length).fill("_");

  function actualizarPalabraOculta() {
    wordContainer.innerHTML = palabraOculta.join(" ");
  }

  function inicializarJuego() {
    categoryContainer.innerHTML = `Categoría: ${categoria
      .charAt(0)
      .toUpperCase() + categoria.slice(1)}`;
    actualizarPalabraOculta();

    const abecedario = "abcdefghijklmnopqrstuvwxyz".split("");
    abecedario.forEach(letra => {
      const button = document.createElement("button");
      button.textContent = letra;
      button.classList.add("letter-button");
      button.addEventListener("click", () => manejarLetra(letra));
      alphabetContainer.appendChild(button);
    });
  }

  function manejarLetra(letra) {
    let acierto = false;

    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        palabraOculta[i] = letra;
        acierto = true;
      }
    }

    actualizarPalabraOculta();

    if (!acierto) {
      messageContainer.textContent = La letra ${letra} no está en la palabra.;
      lives--;
      vidasContainer.innerHTML = "Te quedan " + lives + " vidas";
      if (lives == 0) {
        deshabilitarBotones();
        messageContainer.textContent = "¡Lo Lamento! te has quedado sin vidas.";
      }
    } else {
      messageContainer.textContent = "";
    }

    if (!palabraOculta.includes("_")) {
      messageContainer.textContent = "¡Felicidades! Has adivinado la palabra.";
      deshabilitarBotones();
    }
  }

  function deshabilitarBotones() {
    const buttons = document.querySelectorAll(".letter-button");
    buttons.forEach(button => {
      button.disabled = true;
    });
  }

  inicializarJuego();
};
