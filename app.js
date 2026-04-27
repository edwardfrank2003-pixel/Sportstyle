let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

// -------- LOGIN --------
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const userText = document.getElementById("user");

loginBtn.addEventListener("click", () => {
  const nombre = document.getElementById("loginNombre").value.trim();

  if (nombre === "") {
    alert("Ingresa tu nombre");
    return;
  }

  const usuario = { nombre };
  sessionStorage.setItem("usuario", JSON.stringify(usuario));

  actualizarUI();
});

logoutBtn.addEventListener("click", () => {
  sessionStorage.clear();
  carrito = [];
  actualizarUI();
  mostrarCarrito();
});

// -------- MOSTRAR USUARIO --------
function actualizarUI() {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  if (usuario) {
    userText.innerText = "Bienvenido, " + usuario.nombre + " 👋";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
  } else {
    userText.innerText = "";
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
  }
}

actualizarUI();

// -------- CARRITO --------
function agregarCarrito(nombre, precio) {
  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  if (!usuario) {
    alert("Debes iniciar sesión primero");
    return;
  }

  const producto = carrito.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  sessionStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("carrito");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.nombre} - $${p.precio} x${p.cantidad}`;
    lista.appendChild(li);

    total += p.precio * p.cantidad;
  });

  document.getElementById("total").innerText = "Total: $" + total;
}

mostrarCarrito();

// -------- FORMULARIO --------
document.getElementById("formulario").addEventListener("submit", function(e) {
  e.preventDefault();

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));

  if (!usuario) {
    alert("Debes iniciar sesión para comprar");
    return;
  }

  const correo = document.getElementById("correo").value;
  const telefono = document.getElementById("telefono").value;

  if (!correo.includes("@")) {
    alert("Correo inválido");
    return;
  }

  if (!/^[0-9]+$/.test(telefono)) {
    alert("Teléfono inválido");
    return;
  }

  document.getElementById("mensaje").innerText =
    "✅ Gracias por tu compra, " + usuario.nombre;

  sessionStorage.removeItem("carrito");
  carrito = [];
  mostrarCarrito();
});