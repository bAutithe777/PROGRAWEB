/*VARIABLES GENERALES*/

const ventanaPrincipal = document.getElementById("ventanaPrincipal");
const ventanaEstilos = document.getElementById("ventanaEstilos");

const btnIngresar = document.getElementById("btnIngresar");
const botonesVolver = document.querySelectorAll(".volverAtras");

const titulos = document.querySelectorAll(".tituloSty");
const botonesComprar = document.querySelectorAll(".btnComprar");
const botonesPlay = document.querySelectorAll(".btnPlay, .play-btn");

const carritoIcono = document.querySelector(".ri-shopping-cart-line");

const hamburguesa = document.getElementById('hamburguesa');
const menu = document.getElementById('menu');

/*MENÚ HAMBURGUESA*/
hamburguesa.addEventListener('click', () => {
    menu.classList.toggle('show');
});

/*MOSTRAR Y OCULTAR SECCIONES*/
function mostrarVentana(id) {
    document.querySelectorAll("section, main").forEach(sec => sec.style.display = "none");
    document.getElementById(id).style.display = "block";
}

btnIngresar.addEventListener("click", () => mostrarVentana("ventanaEstilos"));

botonesVolver.forEach(btn => {
    btn.addEventListener("click", () => {
        const destino = btn.getAttribute("data-volver") || "ventanaEstilos";
        mostrarVentana(destino);
    });
});

/*ABRIR DETALLES POR TÍTULO*/
titulos.forEach(titulo => {
    titulo.addEventListener("click", () => {
        mostrarVentana(titulo.getAttribute("data-detalle"));
    });
});

/*AGREGAR AL CARRITO
*/
function extraerPrecio(el) {
    return Number(el.querySelector(".precio").textContent.replace("Bs/", ""));
}

botonesComprar.forEach(btn => {
    btn.addEventListener("click", () => {
        agregarAlCarrito(btn.getAttribute("data-producto"), extraerPrecio(btn.parentElement));
    });
});

document.querySelectorAll(".agregarCarrito").forEach(btn => {
    btn.addEventListener("click", () => {
        agregarAlCarrito(
            btn.parentElement.querySelector("h3").textContent,
            extraerPrecio(btn.parentElement)
        );
    });
});

function actualizarCarrito() {
    carritoIcono.innerHTML = `<span class="contadorCarrito">${carritoConteo}</span>`;
}

/*REPRODUCTOR DE AUDIO
*/
let audioActual = null;
let botonActual = null;

botonesPlay.forEach(btn => {
    btn.addEventListener("click", () => {
        const audioRuta = btn.getAttribute("data-audio");
        if (!audioRuta) return alert("No hay audio todavía.");

        if (botonActual === btn && audioActual) {
            audioActual.pause();
            audioActual.currentTime = 0;
            btn.classList.remove("playing");
            audioActual = botonActual = null;
            return;
        }

        if (audioActual) {
            audioActual.pause();
            audioActual.currentTime = 0;
        }
        if (botonActual) botonActual.classList.remove("playing");

        audioActual = new Audio(audioRuta);
        audioActual.play();

        btn.classList.add("playing");
        botonActual = btn;

        audioActual.onended = () => {
            btn.classList.remove("playing");
            audioActual = botonActual = null;
        };
    });
});

/*LOGIN Y SIGNUP*/

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

cerrarAuth.addEventListener("click", () => modalAuth.style.display = "none");

window.addEventListener("click", e => {
    if (e.target === modalAuth) modalAuth.style.display = "none";
});

irSignup.addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});

irLogin.addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

/*Validaciones*/
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

document.getElementById("btnSignup").addEventListener("click", () => {
    const nombre = signupNombre.value.trim();
    const email = signupEmail.value.trim();
    const pass = signupPass.value.trim();

    if (!nombre || !email || !pass)
        return alert("Completa todos los campos.");

    if (!regNombre.test(nombre))
        return alert("El nombre solo puede contener letras y espacios.");

    if (!regEmail.test(email))
        return alert("Ingresa un correo electrónico válido.");

    if (pass.length < 6)
        return alert("La contraseña debe tener al menos 6 caracteres.");

    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado?.email === email)
        return alert("Este correo ya está registrado.");

    localStorage.setItem("usuario", JSON.stringify({ nombre, email, pass }));

    alert("Cuenta creada correctamente");
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

/*Login*/
document.getElementById("btnLogin").addEventListener("click", () => {
    const email = loginEmail.value.trim();
    const pass = loginPass.value.trim();
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) return alert("No hay usuarios registrados.");
    if (!email || !regEmail.test(email)) return alert("Ingresa un correo electrónico válido.");
    if (!pass) return alert("Ingresa tu contraseña.");

    if (email === usuario.email && pass === usuario.pass) {
        alert("Bienvenido " + usuario.nombre);
        modalAuth.style.display = "none";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});

/*CARRITO DE COMPRAS*/

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
    if (!carrito.length) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        totalCarrito.textContent = "Bs/0";
        return;
    }

    let total = carrito.reduce((s, p) => s + p.precio, 0);

    carrito.forEach((producto, index) => {
        listaCarrito.innerHTML += `
            <div class="carritoItem">
                <div>
                    <strong>${producto.nombre}</strong><br>
                    <span>Bs/${producto.precio}</span>
                </div>
                <button class="btnEliminarItem" data-index="${index}">X</button>
            </div>`;
    });

    totalCarrito.textContent = `Bs/${total}`;
}

document.addEventListener("click", e => {
    if (e.target.classList.contains("btnEliminarItem")) {
        carrito.splice(e.target.dataset.index, 1);
        mostrarCarrito();
        actualizarCarritoUI();
    }
});

carritoIcono.addEventListener("click", () => {
    mostrarCarrito();
    modalCarrito.style.display = "flex";
});

cerrarCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modalCarrito) modalCarrito.style.display = "none";
});

/*PAGO*/
document.querySelector(".btnPagar").addEventListener("click", () => {
    document.getElementById("formPago").style.display = "flex";
});

document.getElementById("pagarAhora").addEventListener("click", () => {
    const campos = ["nombre", "direccion", "postal", "telefono", "correo"];
    for (let c of campos) if (!document.getElementById(c).value)
        return alert("Por favor complete todos los campos antes de pagar.");

    alert("¡Gracias por su compra!\nSu pedido está en proceso.");

    carrito = [];
    actualizarCarritoUI();
    listaCarrito.innerHTML = "";
    totalCarrito.textContent = "Bs/0";
    formPago.style.display = "none";
    modalCarrito.style.display = "none";

    campos.forEach(c => document.getElementById(c).value = "");
});

/*FOOTER*/
document.querySelectorAll(".link-footer").forEach(enlace => {
    enlace.addEventListener("click", e => {
        e.preventDefault();

        const destino = enlace.dataset.ir;
        if (destino === "login") {
            modalAuth.style.display = "flex";
            loginForm.style.display = "block";
            signupForm.style.display = "none";
        } else if (destino === "carrito") {
            mostrarCarrito();
            modalCarrito.style.display = "flex";
        } else {
            mostrarVentana(destino);
            animacionSuave(destino);
        }
    });
});

/*ANIMACIÓN PARA TRANSICIOENES*/
function animacionSuave(id) {
    const seccion = document.getElementById(id);
    seccion.style.opacity = 0;
    seccion.style.transition = "opacity 0.5s";
    setTimeout(() => (seccion.style.opacity = 1), 50);
}

/*FILTRO POR MARCA*/
const botonesMarcas = document.querySelectorAll("#menu li");
const styles = document.querySelectorAll(".sectionCumbia > div, .sectionBaladas > div");

botonesMarcas.forEach(boton => {
    boton.addEventListener("click", () => {
        const marca = boton.textContent.trim().toLowerCase();

        styles.forEach(style => {
            const marcas = style.dataset.marcas.split(",");
            style.style.display = marcas.includes(marca) ? "flex" : "none";
            if (marcas.includes(marca)) style.classList.add("fade-in");
        });

        btnVerTodo.style.display = "block";
    });
});

/*RESTAURAR LAS SECCIONES INDEPENDIENTES*/
btnVerTodo.addEventListener("click", () => {
    styles.forEach(style => {
        style.style.display = "flex";
        style.classList.add("fade-in");
    });

    btnVerTodo.style.display = "none";
});
