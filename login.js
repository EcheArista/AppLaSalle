const API_URL = "http://desmadre.serveminecraft.net:3000";

async function login() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ usuario, password })
  });

  const data = await res.json();

  if (data.success) {
    window.location.href = "bienvenido.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}