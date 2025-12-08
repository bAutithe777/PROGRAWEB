
const ventanaPrincipal = document.getElementById("ventanaPrincipal");
const ventanaEstilos = document.getElementById("ventanaEstilos");

const btnIngresar = document.getElementById("btnIngresar");
const botonesVolver = document.querySelectorAll(".volverAtras");

const titulos = document.querySelectorAll(".tituloSty");
const botonesComprar = document.querySelectorAll(".btnComprar");
const botonesPlay = document.querySelectorAll(".btnPlay, .play-btn");

const carritoIcono = document.querySelector(".ri-shopping-cart-line");
let carritoConteo = 0;

 const hamburguesa = document.getElementById('hamburguesa');
    const menu = document.getElementById('menu');

    hamburguesa.addEventListener('click', () => {
      menu.classList.toggle('show');
    });


// MOSTRAR Y OCULTAR SECCIONES

function mostrarVentana(id) {
  document.querySelectorAll("section, main").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// PRIMERA VENTANA Y SEGUNDA para volver

btnIngresar.addEventListener("click", () => {
  mostrarVentana("ventanaEstilos");
});


// SEGUNDA Y PRIMERA para volver

botonesVolver.forEach(btn => {
  btn.addEventListener("click", () => {
    const destino = btn.getAttribute("data-volver");

    if (destino) mostrarVentana(destino);
    else mostrarVentana("ventanaEstilos"); 
  });
});


// ABRIR VENTANA DE INFORMACION SEGUN EL TITULO O ARTISTA

titulos.forEach(titulo => {
  titulo.addEventListener("click", () => {
    const detalleID = titulo.getAttribute("data-detalle");
    mostrarVentana(detalleID);
  });
});


// AGREGAR PRODUCTO AL CARRITO

botonesComprar.forEach(btn => {
  btn.addEventListener("click", () => {
      const producto = btn.getAttribute("data-producto");
      const precio = Number(btn.parentElement.querySelector(".precio").textContent.replace("Bs/", ""));

      agregarAlCarrito(producto, precio);
  });
});

document.querySelectorAll(".agregarCarrito").forEach(btn => {
  btn.addEventListener("click", () => {
      const nombre = btn.parentElement.querySelector("h3").textContent;
      const precio = Number(btn.parentElement.querySelector(".precio").textContent.replace("Bs/", ""));

      agregarAlCarrito(nombre, precio);
  });
});


function actualizarCarrito() {
  carritoIcono.setAttribute("data-count", carritoConteo);
  carritoIcono.style.position = "relative";
  carritoIcono.innerHTML = `<span class="contadorCarrito">${carritoConteo}</span>`;
}


// REPRODUCCIÓN DE AUDIO

let audioActual = null;
let botonActual = null;

botonesPlay.forEach(btn => {
  btn.addEventListener("click", () => {
    const audioRuta = btn.getAttribute("data-audio");

    if (!audioRuta) {
      alert("No hay audio todavía.");
      return;
    }

    if (botonActual === btn && audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;

      btn.classList.remove("playing");
      audioActual = null;
      botonActual = null;
      return;
    }

    if (audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;
    }
    if (botonActual) {
      botonActual.classList.remove("playing");
    }

    audioActual = new Audio(audioRuta);
    audioActual.play();

    // Agregar animación al botón cuando le de play
    btn.classList.add("playing");
    botonActual = btn;

    audioActual.onended = () => {
      btn.classList.remove("playing");
      botonActual = null;
      audioActual = null;
    };
  });
});

/*LOGIN Y SIGNUP */

const modalAuth = document.getElementById("modalAuth");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const perfilIcono = document.querySelector(".ri-account-circle-line");
const cerrarAuth = document.getElementById("cerrarAuth");

const irSignup = document.getElementById("irSignup");
const irLogin = document.getElementById("irLogin");

perfilIcono.addEventListener("click", () => {
    modalAuth.style.display = "flex";
    loginForm.style.display = "block";
    signupForm.style.display = "none";
});

cerrarAuth.addEventListener("click", () => {
    modalAuth.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modalAuth) {
        modalAuth.style.display = "none";
    }
});

/* Cambiar entre login y signup */
irSignup.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});

irLogin.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

/* FUNCIONALIDAD */

// VALIDACIONES
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

document.getElementById("btnSignup").addEventListener("click", () => {
    const nombre = document.getElementById("signupNombre").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const pass = document.getElementById("signupPass").value.trim();

    // Validación PARA CAMPOS VACIOS
    if (!nombre || !email || !pass) {
        alert("Completa todos los campos.");
        return;
    }

    // Validación PARA EL NOMBRE
    if (!regNombre.test(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        return;
    }

    // Validación PARA EMAIL INCOERECTO
    if (!regEmail.test(email)) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }

    // Validación PARA QUE LA CONTRASEÑA SOLO EA 6 DIFIGTOS
    if (pass.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    // EMAIL REPETIDO
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado && usuarioGuardado.email === email) {
        alert("Este correo ya está registrado.");
        return;
    }

    // GUARDARE USUARIO
    localStorage.setItem("usuario", JSON.stringify({ nombre, email, pass }));

    alert("Cuenta creada correctamente");
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

// Iniciar sesióN
document.getElementById("btnLogin").addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        alert("No hay usuarios registrados.");
        return;
    }

    // Validación email
    if (!email || !regEmail.test(email)) {
        alert("Ingresa un correo electrónico válido.");
        return;
    }

    // Validación contraseña
    if (!pass) {
        alert("Ingresa tu contraseña.");
        return;
    }

    if (email === usuario.email && pass === usuario.pass) {
        alert("Bienvenido " + usuario.nombre);
        modalAuth.style.display = "none";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});


/* CARRITO DE COMPRAS REAL*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const modalCarrito = document.getElementById("modalCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");

function actualizarCarritoUI() {
    carritoIcono.innerHTML = `<span class="contadorCarrito">${carrito.length}</span>`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarritoUI();
}

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        totalCarrito.textContent = "Bs/0";
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;

        listaCarrito.innerHTML += `
            <div class="carritoItem">
                <div>
                    <strong>${producto.nombre}</strong><br>
                    <span>Bs/${producto.precio}</span>
                </div>
                <button class="btnEliminarItem" data-index="${index}">X</button>
            </div>
        `;
    });

    totalCarrito.textContent = `Bs/${total}`;
}

// PARA ELIMINAR PRODUCTO DE CARRITO
document.addEventListener("click", e => {
    if (e.target.classList.contains("btnEliminarItem")) {
        const i = e.target.getAttribute("data-index");
        carrito.splice(i, 1);
        mostrarCarrito();
        actualizarCarritoUI();
    }
});

// Abrir carrito al presionar el icono
carritoIcono.addEventListener("click", () => {
    mostrarCarrito();
    modalCarrito.style.display = "flex";
});

// Cerrar carrito
cerrarCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});

// Cerrar al hacer clic afuera
window.addEventListener("click", e => {
    if (e.target === modalCarrito) {
        modalCarrito.style.display = "none";
    }
});

/* ================= FILTRAR POR MARCA DEL MENÚ ================= */

const opcionesMenu = document.querySelectorAll("#menu li");
const ventanaFiltrada = document.getElementById("ventanaFiltrada");
const listaFiltrada = document.getElementById("listaFiltrada");
const tituloFiltro = document.getElementById("tituloFiltro");

opcionesMenu.forEach(op => {
  op.addEventListener("click", () => {
    const marca = op.textContent.trim().toUpperCase();
    filtrarPorMarca(marca);

    // cerrar menú hamburguesa en móvil
    menu.classList.remove("show");
  });
});

function filtrarPorMarca(marca) {
  // limpiar vista
  listaFiltrada.innerHTML = "";

  // buscar todas las tarjetas de estilos
  const estilos = document.querySelectorAll(
    ".AngelesAzules, .Grupo5, .SonoraDinamita, .LuisMiguel, .AlejandroSanz, .CristianCastro"
  );

  let encontrados = 0;

  estilos.forEach(est => {
    const texto = est.querySelector("small").textContent.toUpperCase();

    if (texto.includes(marca)) {
      encontrados++;

      const img = est.querySelector("img").src;
      const nombre = est.querySelector("strong").textContent;
      const desc = est.querySelector("small").textContent;

      listaFiltrada.innerHTML += `
        <div class="filtroItem">
          <img src="${img}">
          <div>
            <strong>${nombre}</strong>
            <br>
            <small>${desc}</small>
          </div>
        </div>
      `;
    }
  });

  tituloFiltro.textContent = `Compatible con: ${marca}`;

  if (encontrados === 0) {
    listaFiltrada.innerHTML = "<p>No hay estilos compatibles con esta marca.</p>";
  }

  mostrarVentana("ventanaFiltrada");
}
