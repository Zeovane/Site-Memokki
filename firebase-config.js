window.firebaseConfig = {
  apiKey: "AIzaSyDZai1zmaPo3W1ExAmRlkFDePqDfWl-TD4",
  authDomain: "site-memokki.web.app",
  projectId: "site-memokki",
  storageBucket: "site-memokki.firebasestorage.app",
  messagingSenderId: "143091616471",
  appId: "1:143091616471:web:dffa3a90fcb1e1d8b2fe92"
};

window.hasValidFirebaseConfig = function hasValidFirebaseConfig(config = window.firebaseConfig) {
  const requiredKeys = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId"
  ];

  return requiredKeys.every((key) => {
    const value = String(config[key] ?? "").trim();
    return value !== "" && !value.startsWith("COLE_") && !value.startsWith("SEU_");
  });
};
