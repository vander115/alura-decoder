// Elements

let theme = "light";
const root = document.getElementById('root');
const textarea = document.querySelector('textarea');
const messagesInformation = document.getElementById('informations');
const messagesData = document.getElementById('data');
const text = document.getElementById('data_text');
const img = document.querySelectorAll('img');

loadThemeFromLocalStorage();

function encryptText(text) {
  return text
    .replace("e", "enter")
    .replace("i", "imes")
    .replace("a", "ai")
    .replace("o", "ober")
    .replace("u", "ufat");
}

function decryptText(text) {
  return text
    .replace("enter", "e")
    .replace("imes", "i")
    .replace("ai", "a")
    .replace("ober", "o")
    .replace("ufat", "u");
}

function handleEncrypt() {
  const encryptedText = encryptText(textarea.value);
  text.innerHTML = encryptedText;

  toggleMessagesContent();
  saveHistoryOnLocalStorage();
}

function handleDecrypt() {
  const decrypetText = decryptText(textarea.value);
  text.innerText = decrypetText;

  toggleMessagesContent();
  saveHistoryOnLocalStorage();
}

function toggleMessagesContent() {
  if (textarea.value != "") {
    messagesInformation.removeAttribute('data-visible');
    messagesData.setAttribute('data-visible', true);
  } else {
    messagesInformation.setAttribute('data-visible', true);
    messagesData.removeAttribute('data-visible');
  }
}

async function copyToClipboard() {
  try {
    const { innerText } = document.getElementById('data_text');
    await navigator.clipboard.writeText(innerText);
  } catch (error) {
    console.error('Erro ao copiar para área de transferência', err);
  }
}

// Theme

function handleToggleTheme() {
  if (theme == "dark") {
    theme = "light";
  } else if (theme == "light") {
    theme = "dark";
  }

  updateTheme();
  saveThemeOfLocalStorage();
}

function updateTheme() {
  if (theme == "light") {
    root.classList.remove('dark');
    root.classList.add('light');
  } else if (theme == "dark") {
    root.classList.remove('light');
    root.classList.add('dark');
  }
}

// LocalStorage

function saveThemeOfLocalStorage() {
  localStorage.setItem('@alura-decoder:theme', theme);
}

function loadThemeFromLocalStorage() {
  const storedTheme = localStorage.getItem('@alura-decoder:theme');

  if (storedTheme) {
    theme = storedTheme;
  }
  updateTheme();
}
