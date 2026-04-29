import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = window.firebaseConfig || {};
const hasValidFirebaseConfig = window.hasValidFirebaseConfig || (() => false);
const isConfigured = hasValidFirebaseConfig(firebaseConfig);

let app = null;
let auth = null;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  console.info("Firebase inicializado com sucesso.");
} else {
  console.warn(
    "Firebase ainda nao foi configurado. Preencha o arquivo firebase-config.js com as credenciais do seu projeto."
  );
}

window.firebaseServices = {
  app,
  auth,
  firebaseConfig,
  isConfigured
};
