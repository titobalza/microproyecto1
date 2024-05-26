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
  const hangmanImage = document.querySelector("#hangman-image");
  const resultModal = new bootstrap.Modal(
    document.getElementById("resultModal"),
    {}
  );
  const resultModalLabel = document.getElementById("resultModalLabel");
  const resultModalBody = document.getElementById("resultModalBody");
  const playAgainButton = document.getElementById("playAgainButton");

  let lives = 6;
  let puntaje = 0;

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

  function actualizarPalabraOculta(palabraOculta) {
    wordContainer.innerHTML = palabraOculta.join(" ");
  }
  function actualizarImagenAhorcado() {
    hangmanImage.src = `./360_F_517383341_8nWEFfM1KL3K5LNTjUDrne3x0kZiuxuj${lives}.jpg`;
  }
  function inicializarJuego() {
    const { palabra, categoria } = seleccionarPalabra(categories);
    const palabraOculta = Array(palabra.length).fill("_");
    lives = 6;
    vidasContainer.innerHTML = "Te quedan " + lives + " vidas";
    categoryContainer.innerHTML = `Categoría: ${categoria
      .charAt(0)
      .toUpperCase() + categoria.slice(1)}`;
    actualizarPalabraOculta(palabraOculta);
    alphabetContainer.innerHTML = "";
    actualizarImagenAhorcado();

    const abecedario = "abcdefghijklmnopqrstuvwxyz".split("");
    abecedario.forEach(letra => {
      const button = document.createElement("button");
      button.textContent = letra;
      button.classList.add("letter-button");
      button.addEventListener("click", () =>
        manejarLetra(letra, palabra, palabraOculta)
      );
      alphabetContainer.appendChild(button);
    });
  }

  function manejarLetra(letra, palabra, palabraOculta) {
    let acierto = false;

    for (let i = 0; i < palabra.length; i++) {
      if (palabra[i] === letra) {
        palabraOculta[i] = letra;
        acierto = true;
      }
    }

    actualizarPalabraOculta(palabraOculta);

    if (!acierto) {
      messageContainer.textContent = `La letra ${letra} no está en la palabra.`;
      lives--;
      vidasContainer.innerHTML = "Te quedan " + lives + " vidas";
      actualizarImagenAhorcado();
      if (lives === 0) {
        deshabilitarBotones();
        mostrarResultado(false);
        puntaje = 0;
      }
    } else {
      messageContainer.textContent = "";
      puntaje += 10;
      messageContainer.textContent = `Tienes ${puntaje} puntos`;
    }

    if (!palabraOculta.includes("_")) {
      mostrarResultado(true);
      deshabilitarBotones();
    }
  }

  function deshabilitarBotones() {
    const buttons = document.querySelectorAll(".letter-button");
    buttons.forEach(button => {
      button.disabled = true;
    });
  }

  function mostrarResultado(ganaste) {
    if (ganaste) {
      resultModalLabel.textContent = "¡Felicidades!";
      resultModalBody.textContent = "Has adivinado la palabra.";
    } else {
      resultModalLabel.textContent = "¡Lo Lamento!";
      resultModalBody.textContent = "Te has quedado sin vidas.";
    }
    resultModal.show();
  }

  playAgainButton.addEventListener("click", () => {
    resultModal.hide();
    inicializarJuego();
  });

  inicializarJuego();
};
