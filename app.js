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
  const playerNameInput = document.getElementById("playerNameInput");
  const selectNameButton = document.getElementById("selectNameButton");
  const nameModal = document.getElementById("nameModal");
  const selectNameConfirmButton = document.getElementById(
    "selectNameConfirmButton"
  );
  const leaderboardButton = document.getElementById("leaderboardButton");
  leaderboardButton.addEventListener("click", mostrarLeaderboard);
  let userScores = {};
  let lives = 6;
  let puntaje = 0;
  selectNameConfirmButton.addEventListener("click", () => {
    const selectedName = playerNameInput.value;
    if (selectedName) {
      playerNameInput.value = selectedName;

      let storedUserScores = localStorage.getItem("userScores");
      if (storedUserScores) {
        userScores = JSON.parse(storedUserScores);
      }

      if (!userScores[selectedName]) {
        userScores[selectedName] = 0;
        localStorage.setItem("userScores", JSON.stringify(userScores));
      }

      localStorage.setItem("playerName", selectedName);
    }
    $(nameModal).modal("hide");
  });

  selectNameButton.addEventListener("click", () => {
    cargarNombresRegistrados();
  });

  nameModal.addEventListener("show.bs.modal", () => {
    cargarNombresRegistrados();
  });
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
  function mostrarLeaderboard() {
    const storedUserScores = localStorage.getItem("userScores");
    if (storedUserScores) {
      userScores = JSON.parse(storedUserScores);
    }

    const leaderboardModal = new bootstrap.Modal(
      document.getElementById("leaderboardModal"),
      {}
    );
    const leaderboardModalBody = document.getElementById(
      "leaderboardModalBody"
    );

    let leaderboardHTML = "<h3>Leaderboard</h3>";
    leaderboardHTML += "<table>";
    leaderboardHTML += "<tr><th>Nombre</th><th>Puntuación</th></tr>";

    for (const [name, score] of Object.entries(userScores)) {
      leaderboardHTML += `<tr><td>${name}</td><td>${score}</td></tr>`;
    }

    leaderboardHTML += "</table>";

    leaderboardModalBody.innerHTML = leaderboardHTML;
    leaderboardModal.show();
  }
  function cargarNombresRegistrados() {
    const storedPlayerName = localStorage.getItem("playerName");
    if (storedPlayerName) {
      const option = document.createElement("option");
      option.value = storedPlayerName;
      option.textContent = storedPlayerName;
      option.selected = true;
    }
  }
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
      button.classList.add("letter-button", "btn", "btn-secondary", "m-1");
      button.addEventListener("click", () => {
        manejarLetra(letra, palabra, palabraOculta);
        button.classList.add("active");
        button.disabled = true;
      });
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
    const storedPlayerName = localStorage.getItem("playerName");
    const playerName = storedPlayerName ? storedPlayerName : "Jugador";
    const playerScore = userScores[playerName] || 0;

    if (ganaste) {
      userScores[playerName] = playerScore + 10;
      localStorage.setItem("userScores", JSON.stringify(userScores));

      resultModalLabel.textContent = "¡Felicidades!";
      resultModalBody.textContent = `Has adivinado la palabra, llevas ${userScores[playerName]} puntos, ${playerName}!`;
    } else {
      resultModalLabel.textContent = "¡Lo lamento!";
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
