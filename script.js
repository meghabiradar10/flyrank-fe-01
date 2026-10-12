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
  errorEl.hidden = !hasError;
  errorEl.textContent = message;
}

function validateName(value) {
  if (!value.trim()) {
    return "Please enter your name.";
  }
  if (value.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  return "";
}

function validateEmail(value) {
  if (!value.trim()) {
    return "Please enter your email.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "Please enter a valid email address.";
  }
  return "";
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) {
      return;
    }
    nameInput.value = saved.name ?? "";
    emailInput.value = saved.email ?? "";
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
  const nameMessage = validateName(name);
  const emailMessage = validateEmail(email);

  setError(nameInput, nameError, nameMessage);
  setError(emailInput, emailError, emailMessage);

  if (nameMessage || emailMessage) {
    statusMessage.textContent = "Please fix the highlighted fields.";
    statusMessage.classList.add("error");
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
  statusMessage.textContent = "Settings saved.";
});

[nameInput, emailInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("invalid");
    const errorEl = input.id === "name" ? nameError : emailError;
    errorEl.hidden = true;
    statusMessage.textContent = "";
  });
});

loadSettings();
