
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


// MOSTRAR / OCULTAR SECCIONES

function mostrarVentana(id) {
  document.querySelectorAll("section, main").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// PRIMERA VENTANA → SEGUNDA

btnIngresar.addEventListener("click", () => {
  mostrarVentana("ventanaEstilos");
});


// SEGUNDA → PRIMERA (botón volver)

botonesVolver.forEach(btn => {
  btn.addEventListener("click", () => {
    const destino = btn.getAttribute("data-volver");

    if (destino) mostrarVentana(destino);
    else mostrarVentana("ventanaEstilos"); 
  });
});


// ABRIR VENTANA DE DETALLE SEGÚN TITLE

titulos.forEach(titulo => {
  titulo.addEventListener("click", () => {
    const detalleID = titulo.getAttribute("data-detalle");
    mostrarVentana(detalleID);
  });
});


// AGREGAR PRODUCTO AL CARRITO

botonesComprar.forEach(btn => {
  btn.addEventListener("click", () => {
    carritoConteo++;
    actualizarCarrito();
  });
});

document.querySelectorAll(".agregarCarrito").forEach(btn => {
  btn.addEventListener("click", () => {
    carritoConteo++;
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  carritoIcono.setAttribute("data-count", carritoConteo);

  // Si quieres mostrar visualmente el número encima del carrito:
  carritoIcono.style.position = "relative";
  carritoIcono.innerHTML = `<span class="contadorCarrito">${carritoConteo}</span>`;
}


// REPRODUCCIÓN DE AUDIO

let audioActual = null;

botonesPlay.forEach(btn => {
  btn.addEventListener("click", () => {
    const audioRuta = btn.getAttribute("data-audio");

    if (!audioRuta) {
      alert("No hay audio asignado todavía.");
      return;
    }

    if (audioActual) {
      audioActual.pause();
      audioActual.currentTime = 0;
    }

    audioActual = new Audio(audioRuta);
    audioActual.play();
  });
});
