const form = document.querySelector("#formulario-reserva");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const telefono = document.querySelector("#telefono");
const experiencia = document.querySelector("#experiencia");
const entradas = document.querySelector("#entradas");
const condiciones = document.querySelector("#condiciones");
const reservas = [];
// Acepta ocho dígitos juntos o separados en dos grupos de cuatro.
const formatoTelefono = /^(?:\d{8}|\d{4}-\d{4})$/;
const campos = [nombre, correo, telefono, experiencia, entradas, condiciones];

for (let i = 0; i < experiencias.length; i++) {
    const opcion = document.createElement("option");
    opcion.value = experiencias[i].codigo;
    opcion.textContent = experiencias[i].nombre;
    experiencia.appendChild(opcion);
}

const codigoSeleccionado = new URLSearchParams(window.location.search).get("experiencia");
if (codigoSeleccionado !== null) experiencia.value = codigoSeleccionado;

const precioTexto = (precio) => {
    const valor = String(precio);
    let salida = "";
    for (let i = valor.length - 1; i >= 0; i--) {
        salida = valor[i] + salida;
        if (i > 0 && (valor.length - i) % 3 === 0) salida = "." + salida;
    }
    return "₡" + salida;
};

const mensajeError = (campo) => {
    if (campo === nombre) {
        if (nombre.value.trim() === "") return "Ingrese su nombre.";
        if (nombre.value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
    }
    if (campo === correo) {
        if (correo.value.trim() === "") return "Ingrese su correo.";
        if (!formatoCorreo.test(correo.value.trim())) return "Ingrese un correo con formato válido.";
    }
    if (campo === telefono) {
        if (telefono.value.trim() === "") return "Ingrese su teléfono.";
        if (!formatoTelefono.test(telefono.value.trim())) return "Use ocho dígitos, juntos o separados por guion.";
    }
    if (campo === experiencia && experiencia.value === "") return "Seleccione una experiencia.";
    if (campo === entradas) {
        const cantidad = Number(entradas.value);
        if (entradas.value.trim() === "") return "Ingrese la cantidad de entradas.";
        if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 4) return "La cantidad debe ser un entero entre 1 y 4.";
    }
    if (campo === condiciones && !condiciones.checked) return "Acepte las condiciones de reserva.";
    return "";
};

const mensajeAsociado = (campo) => document.querySelector("#" + campo.getAttribute("aria-describedby"));
const marcarError = (campo, texto) => {
    campo.classList.add("input-error");
    campo.setAttribute("aria-invalid", "true");
    const mensaje = mensajeAsociado(campo);
    mensaje.textContent = texto;
    mensaje.hidden = false;
};
const quitarError = (campo) => {
    campo.classList.remove("input-error");
    campo.removeAttribute("aria-invalid");
    mensajeAsociado(campo).hidden = true;
};

const validar = () => {
    let hayError = false;
    let primerInvalido = null;
    for (let i = 0; i < campos.length; i++) {
        const texto = mensajeError(campos[i]);
        if (texto !== "") {
            marcarError(campos[i], texto);
            hayError = true;
            if (primerInvalido === null) primerInvalido = campos[i];
        } else quitarError(campos[i]);
    }
    if (primerInvalido !== null) primerInvalido.focus();
    return hayError;
};

form.addEventListener("focusin", (event) => {
    const indiceActual = campos.indexOf(event.target);
    if (indiceActual < 1) return;

    for (let i = 0; i < indiceActual; i++) {
        const texto = mensajeError(campos[i]);
        if (texto !== "") {
            marcarError(campos[i], texto);
            campos[i].focus();
            break;
        }
    }
});

for (let i = 0; i < campos.length; i++) {
    campos[i].addEventListener("input", () => {
        if (campos[i].getAttribute("aria-invalid") === "true") {
            const texto = mensajeError(campos[i]);
            if (texto === "") quitarError(campos[i]);
            else marcarError(campos[i], texto);
        }
    });
    campos[i].addEventListener("change", () => {
        if (campos[i].getAttribute("aria-invalid") === "true") {
            const texto = mensajeError(campos[i]);
            if (texto === "") quitarError(campos[i]);
            else marcarError(campos[i], texto);
        }
    });
}
form.addEventListener("reset", () => {
    for (let i = 0; i < campos.length; i++) quitarError(campos[i]);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (validar()) {
        Swal.fire({ icon:"error", title:"Revise la reserva", text:"Corrija los campos señalados antes de continuar." });
        return;
    }

    let seleccionada = null;
    for (let i = 0; i < experiencias.length; i++) {
        if (experiencias[i].codigo === experiencia.value) {
            seleccionada = experiencias[i];
            break;
        }
    }
    if (seleccionada === null) return;

    const cantidad = Number(entradas.value);
    const precioUnitario = seleccionada.precio;
    const reserva = {
        nombre:nombre.value.trim(), correo:correo.value.trim(), telefono:telefono.value.trim(),
        codigoExperiencia:seleccionada.codigo, nombreExperiencia:seleccionada.nombre,
        cantidad:cantidad, precioUnitario:precioUnitario, total:precioUnitario * cantidad
    };
    reservas.push(reserva);
    console.log(JSON.stringify(reserva, null, 2));
    Swal.fire({
        icon:"success", title:"Reserva lista",
        text:seleccionada.nombre + " · " + cantidad + " entrada(s) · Total: " + precioTexto(reserva.total)
    });
});
