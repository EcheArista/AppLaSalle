const API_URL = "https://backend-inicial-36dt.onrender.com";

async function login(event) {
  event.preventDefault();

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
    document.getElementById("error").textContent =
      "Usuario o contraseña incorrectos";
    document.getElementById("error").style.display = "block";
  }
}
