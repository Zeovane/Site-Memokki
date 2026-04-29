import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

let auth = null;
let isConfigured = false;
let authObserverStarted = false;

const elements = {
  accountDropdownToggle: document.getElementById("accountDropdownToggle"),
  accountDropdown: document.getElementById("accountDropdown"),
  authStateBadge: document.getElementById("authStateBadge"),
  authShortcutLabel: document.getElementById("authShortcutLabel"),
  authUserName: document.getElementById("authUserName"),
  authUserEmail: document.getElementById("authUserEmail"),
  authFeedback: document.getElementById("authFeedback"),
  googleLoginBtn: document.getElementById("googleLoginBtn"),
  logoutBtn: document.getElementById("logoutBtn"),
  signupForm: document.getElementById("signupForm"),
  loginForm: document.getElementById("loginForm")
};

function syncFirebaseServices() {
  const firebaseServices = window.firebaseServices || {};
  auth = firebaseServices.auth || null;
  isConfigured = Boolean(firebaseServices.isConfigured && auth);
  return isConfigured;
}

function setFeedback(message, type = "info") {
  if (!elements.authFeedback) return;
  elements.authFeedback.textContent = message;
  elements.authFeedback.dataset.type = type;
}

function positionDropdown() {
  if (!elements.accountDropdown || !elements.accountDropdownToggle) return;

  const rect = elements.accountDropdownToggle.getBoundingClientRect();
  const dropdownWidth = Math.min(340, window.innerWidth - 16);
  const top = rect.bottom + 12;
  const left = Math.max(8, Math.min(rect.right - dropdownWidth, window.innerWidth - dropdownWidth - 8));

  elements.accountDropdown.style.top = `${top}px`;
  elements.accountDropdown.style.left = `${left}px`;
  elements.accountDropdown.style.right = "auto";
  elements.accountDropdown.style.width = `${dropdownWidth}px`;
}

function setDropdownOpenState(isOpen) {
  if (!elements.accountDropdown) return;
  elements.accountDropdown.classList.toggle("active", isOpen);
  elements.accountDropdown.style.display = isOpen ? "grid" : "none";
  if (isOpen) {
    positionDropdown();
  }
}

function setAuthenticatedAppearance(isAuthenticated) {
  if (elements.accountDropdown) {
    elements.accountDropdown.classList.toggle("is-authenticated", isAuthenticated);
  }

  if (elements.accountDropdownToggle) {
    elements.accountDropdownToggle.classList.toggle("is-authenticated", isAuthenticated);
  }

  if (elements.authStateBadge) {
    elements.authStateBadge.textContent = isAuthenticated ? "Conectado" : "Desconectado";
    elements.authStateBadge.classList.toggle("is-authenticated", isAuthenticated);
  }
}

function setAuthReadyState() {
  if (elements.authUserName) {
    elements.authUserName.textContent = "Nenhum usuario conectado";
  }
  if (elements.authUserEmail) {
    elements.authUserEmail.textContent = "Entre com sua conta";
  }
  if (elements.authShortcutLabel) {
    elements.authShortcutLabel.textContent = "Entrar";
  }
  if (elements.logoutBtn) {
    elements.logoutBtn.disabled = true;
  }
  setAuthenticatedAppearance(false);
  setFeedback("Faca login ou entre com Google.", "info");
}

function setSignedInState(user) {
  const displayName = user.displayName || "Usuario conectado";
  if (elements.authUserName) {
    elements.authUserName.textContent = displayName;
  }
  if (elements.authUserEmail) {
    elements.authUserEmail.textContent = user.email || "E-mail indisponivel";
  }
  if (elements.authShortcutLabel) {
    elements.authShortcutLabel.textContent = displayName.split(" ")[0];
  }
  if (elements.logoutBtn) {
    elements.logoutBtn.disabled = false;
  }
  setAuthenticatedAppearance(true);
  setFeedback("Conta conectada com sucesso.", "success");
}

function translateError(error) {
  const code = error?.code || "";

  const messages = {
    "auth/email-already-in-use": "Este e-mail ja esta cadastrado.",
    "auth/invalid-credential": "E-mail ou senha invalidos.",
    "auth/invalid-email": "Digite um e-mail valido.",
    "auth/missing-password": "Digite sua senha para continuar.",
    "auth/popup-blocked": "O navegador bloqueou o popup do Google. Libere popups e tente de novo.",
    "auth/popup-closed-by-user": "O login com Google foi fechado antes da conclusao.",
    "auth/too-many-requests": "Muitas tentativas seguidas. Aguarde um pouco e tente novamente.",
    "auth/unauthorized-domain": "Este dominio ainda nao esta autorizado no Firebase Authentication.",
    "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres."
  };

  return messages[code] || "Nao foi possivel concluir a autenticacao agora.";
}

function disableAuthForms(message) {
  [elements.googleLoginBtn, elements.logoutBtn].forEach((button) => {
    if (button) button.disabled = true;
  });

  [elements.signupForm, elements.loginForm].forEach((form) => {
    if (!form) return;
    Array.from(form.elements).forEach((field) => {
      field.disabled = true;
    });
  });

  if (elements.authShortcutLabel) {
    elements.authShortcutLabel.textContent = "Conta";
  }
  setFeedback(message, "error");
}

function ensureAuthAvailable() {
  if (syncFirebaseServices()) {
    if (elements.googleLoginBtn) elements.googleLoginBtn.disabled = false;
    if (elements.loginForm) {
      Array.from(elements.loginForm.elements).forEach((field) => {
        field.disabled = false;
      });
    }
    if (elements.signupForm) {
      Array.from(elements.signupForm.elements).forEach((field) => {
        field.disabled = false;
      });
    }
    return true;
  }

  disableAuthForms("Firebase ainda esta carregando ou nao foi configurado.");
  return false;
}

async function handleSignup(event) {
  event.preventDefault();
  if (!ensureAuthAvailable() || !elements.signupForm) return;

  const email = elements.signupForm.elements.signupEmail.value.trim();
  const password = elements.signupForm.elements.signupPassword.value;

  try {
    setFeedback("Criando sua conta...", "info");
    await createUserWithEmailAndPassword(auth, email, password);
    elements.signupForm.reset();
    setDropdownOpenState(true);
  } catch (error) {
    setFeedback(translateError(error), "error");
  }
}

async function handleLogin(event) {
  event.preventDefault();
  if (!ensureAuthAvailable() || !elements.loginForm) return;

  const email = elements.loginForm.elements.loginEmail.value.trim();
  const password = elements.loginForm.elements.loginPassword.value;

  try {
    setFeedback("Entrando na sua conta...", "info");
    await signInWithEmailAndPassword(auth, email, password);
    elements.loginForm.reset();
    setDropdownOpenState(true);
  } catch (error) {
    setFeedback(translateError(error), "error");
  }
}

async function handleGoogleLogin() {
  if (!ensureAuthAvailable()) return;

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  try {
    setFeedback("Abrindo login com Google...", "info");
    await signInWithPopup(auth, provider);
    setDropdownOpenState(true);
  } catch (error) {
    setFeedback(translateError(error), "error");
  }
}

async function handleLogout() {
  if (!ensureAuthAvailable()) return;

  try {
    await signOut(auth);
    setFeedback("Voce saiu da conta com sucesso.", "success");
    setDropdownOpenState(true);
  } catch (error) {
    setFeedback(translateError(error), "error");
  }
}

function startAuthObserverIfReady() {
  if (authObserverStarted || !syncFirebaseServices()) {
    return false;
  }

  authObserverStarted = true;
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedInState(user);
      return;
    }
    setAuthReadyState();
  });

  return true;
}

function initializeAuth() {
  setAuthReadyState();

  if (elements.signupForm) {
    elements.signupForm.addEventListener("submit", handleSignup);
  }

  if (elements.loginForm) {
    elements.loginForm.addEventListener("submit", handleLogin);
  }

  if (elements.googleLoginBtn) {
    elements.googleLoginBtn.addEventListener("click", handleGoogleLogin);
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", handleLogout);
  }

  if (elements.accountDropdownToggle) {
    elements.accountDropdownToggle.addEventListener("click", () => {
      const isOpen = elements.accountDropdown?.classList.contains("active");
      setDropdownOpenState(!isOpen);
    });
  }

  document.addEventListener("click", (event) => {
    if (!elements.accountDropdown || !elements.accountDropdownToggle) return;

    const clickedInsideDropdown = elements.accountDropdown.contains(event.target);
    const clickedToggle = elements.accountDropdownToggle.contains(event.target);

    if (!clickedInsideDropdown && !clickedToggle) {
      setDropdownOpenState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (elements.accountDropdown?.classList.contains("active")) {
      positionDropdown();
    }
  });

  window.addEventListener("scroll", () => {
    if (elements.accountDropdown?.classList.contains("active")) {
      positionDropdown();
    }
  }, { passive: true });

  if (startAuthObserverIfReady()) {
    return;
  }

  let attempts = 0;
  const retryTimer = window.setInterval(() => {
    attempts += 1;
    if (startAuthObserverIfReady() || attempts >= 30) {
      window.clearInterval(retryTimer);
    }
  }, 300);
}

initializeAuth();
