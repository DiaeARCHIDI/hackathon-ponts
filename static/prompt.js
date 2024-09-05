const promptForm = document.getElementById("prompt-form");
const submitButton = document.getElementById("submit-button");
const questionButton = document.getElementById("question-button");
const messagesContainer = document.getElementById("messages-container");
const qcmButton = document.getElementById("qcm-button");
const AButton = document.getElementById("A-button");
const BButton = document.getElementById("B-button");
const CButton = document.getElementById("C-button");
const DButton = document.getElementById("D-button");
const qcmForm = document.getElementById("qcm-form");
const zoomInButton = document.getElementById("zoomIn");
const zoomOutButton = document.getElementById("zoomOut");

let fontSize = 16; // Taille de police initiale en pixels
const fontSizeStep = 2; // Pas de zoom en pixels
const maxFontSize = 32; // Taille maximale de la police
const minFontSize = 10; // Taille minimale de la police

const appendHumanMessage = (message) => {
  const humanMessageElement = document.createElement("div");
  humanMessageElement.classList.add("message", "message-human");
  humanMessageElement.innerHTML = message;
  messagesContainer.appendChild(humanMessageElement);
};

const appendAIMessage = async (messagePromise) => {
  // Add a loader to the interface
  const loaderElement = document.createElement("div");
  loaderElement.classList.add("message");
  loaderElement.innerHTML =
    "<div class='loader'><div></div><div></div><div></div>";
  messagesContainer.appendChild(loaderElement);

  // Await the answer from the server
  const messageToAppend = await messagePromise();

  // Replace the loader with the answer
  loaderElement.classList.remove("loader");
  loaderElement.innerHTML = messageToAppend;
};

const handlePrompt = async (event) => {
  event.preventDefault();
  // Parse form data in a structured object
  const data = new FormData(event.target);
  promptForm.reset();

  let url = "/prompt";
  if (questionButton.dataset.question !== undefined) {
    url = "/answer";
    data.append("question", questionButton.dataset.question);
    delete questionButton.dataset.question;
    questionButton.classList.remove("hidden");
    submitButton.innerHTML = "Message";
  }

  appendHumanMessage(data.get("prompt"));

  await appendAIMessage(async () => {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    return result.answer;
  });
};

promptForm.addEventListener("submit", handlePrompt);

// Fonction pour ajuster la taille de la police des messages
const adjustFontSize = (increment) => {
  fontSize = Math.max(minFontSize, Math.min(maxFontSize, fontSize + increment));
  const messages = document.querySelectorAll(".message");
  messages.forEach((message) => {
    message.style.fontSize = `${fontSize}px`;
  });
};

// Ajout des événements sur les boutons de zoom
zoomInButton.addEventListener('click', () => adjustFontSize(fontSizeStep));
zoomOutButton.addEventListener('click', () => adjustFontSize(-fontSizeStep));

const handleQuestionClick = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/question", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.add("hidden");
    submitButton.innerHTML = "Répondre à la question";
    return question;
  });
};

questionButton.addEventListener("click", handleQuestionClick);



const handleQcmClick = async (event) => {
  appendAIMessage(async () => {
    const response = await fetch("/qcm", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    questionButton.classList.add("hidden");
    qcmForm.classList.remove("hidden");
    qcmButton.innerHTML = "Question suivante";
    return question;
  });
};

qcmButton.addEventListener("click", handleQcmClick);


 
const handleAClick = async (event) => {
  event.preventDefault();
  
  appendAIMessage(async () => {
    const response = await fetch("/A", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;

    return result.answer;
  });
};

AButton.addEventListener("click", handleAClick);

const handleBClick = async (event) => {
  event.preventDefault();
  
  appendAIMessage(async () => {
    const response = await fetch("/B", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    
    return result.answer;
  });
};

BButton.addEventListener("click", handleBClick);

const handleCClick = async (event) => {
  event.preventDefault();
  
  appendAIMessage(async () => {
    const response = await fetch("/C", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    
    return result.answer;
  });
};

CButton.addEventListener("click", handleCClick);

const handleDClick = async (event) => {
  event.preventDefault();
  
  appendAIMessage(async () => {
    const response = await fetch("/D", {
      method: "GET",
    });
    const result = await response.json();
    const question = result.answer;

    questionButton.dataset.question = question;
    
    return result.answer;
  });
};

DButton.addEventListener("click", handleDClick);


function changeBackground(imageUrl) {
  if (!document.body.classList.contains("dark-mode")) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }
}

document.getElementById("books-button").addEventListener("click", function () {
  changeBackground('https://i.pinimg.com/236x/25/c8/e6/25c8e63a547ae3195d23fa682337d7c2.jpg');
});

document.getElementById("beach-button").addEventListener("click", function () {
  changeBackground('https://i.pinimg.com/236x/71/5b/ba/715bba198259cc620f57eb28a2cd6ad3.jpg');
});

document.getElementById("trees-button").addEventListener("click", function () {
  changeBackground('https://i.pinimg.com/736x/af/40/4b/af404b4a88e60e22dc2e1fffa9d18370.jpg');
});

document.getElementById("theme-button").addEventListener("click", function () {
  const themeOptions = document.getElementById("theme-options");
  themeOptions.classList.toggle("visible");
});




// 
document.getElementById("dark-mode-toggle").addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  // Sauvegarder le mode sombre dans le localStorage
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

// Appliquer le mode sombre si il est déjà activé
window.onload = function () {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
  }
};









