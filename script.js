const STORAGE_KEY = "flyrank-user-settings";

const form = document.getElementById("settings-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const statusMessage = document.getElementById("form-status");

function setError(input, errorEl, message) {
  const hasError = Boolean(message);
  input.classList.toggle("invalid", hasError);
  input.setAttribute("aria-invalid", hasError ? "true" : "false");
  errorEl.hidden = !hasError;
  errorEl.textContent = message;
}

function clearError(input) {
  const errorEl = input.id === "name" ? nameError : emailError;
  setError(input, errorEl, "");
}

function validateName(value) {
  const name = value.trim();
  if (!name) {
    return "Please enter your name.";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters.";
  }
  return "";
}

function validateEmail(value) {
  const email = value.trim();
  if (!email) {
    return "Please enter your email.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }
  return "";
}

function isValidStoredSettings(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof value.name === "string" &&
    typeof value.email === "string"
  );
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    const saved = JSON.parse(raw);
    if (!isValidStoredSettings(saved)) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    nameInput.value = saved.name;
    emailInput.value = saved.email;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  statusMessage.textContent = "";
  statusMessage.classList.remove("error");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const nameMessage = validateName(nameInput.value);
  const emailMessage = validateEmail(emailInput.value);

  setError(nameInput, nameError, nameMessage);
  setError(emailInput, emailError, emailMessage);

  if (nameMessage || emailMessage) {
    statusMessage.textContent = "Please fix the highlighted fields.";
    statusMessage.classList.add("error");
    const firstInvalid = nameMessage ? nameInput : emailInput;
    firstInvalid.focus();
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
  statusMessage.textContent = "Settings saved.";
});

[nameInput, emailInput].forEach((input) => {
  input.addEventListener("input", () => {
    clearError(input);
    statusMessage.textContent = "";
    statusMessage.classList.remove("error");
  });
});

loadSettings();
