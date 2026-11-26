const formulario = document.querySelector("#formulario-contacto");
const campos = [
    document.querySelector("#nombre"),
    document.querySelector("#correo"),
    document.querySelector("#asunto"),
    document.querySelector("#mensaje")
];
const idsMensajes = ["error-nombre", "error-correo", "error-asunto", "error-mensaje"];

const mensajeError = (campo, indice) => {
    if (campo.value.trim() === "") {
        const textos = ["Ingrese su nombre.", "Ingrese su correo.", "Ingrese el asunto.", "Escriba el mensaje."];
        return textos[indice];
    }
    if (indice === 1 && !formatoCorreo.test(campo.value.trim())) return "Ingrese un correo con formato válido.";
    return "";
};

const actualizarSiMarcado = (indice) => {
    const campo = campos[indice];
    if (campo.getAttribute("aria-invalid") !== "true") return;
    const texto = mensajeError(campo, indice);
    const mensaje = document.querySelector("#" + idsMensajes[indice]);
    if (texto === "") {
        campo.classList.remove("input-error");
        campo.removeAttribute("aria-invalid");
        mensaje.hidden = true;
    } else {
        campo.classList.add("input-error");
        campo.setAttribute("aria-invalid", "true");
        mensaje.textContent = texto;
        mensaje.hidden = false;
    }
};

for (let i = 0; i < campos.length; i++) {
    campos[i].setAttribute("aria-describedby", idsMensajes[i]);
    campos[i].addEventListener("input", () => actualizarSiMarcado(i));
    campos[i].addEventListener("change", () => actualizarSiMarcado(i));
}
formulario.addEventListener("reset", () => {
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("input-error");
        campos[i].removeAttribute("aria-invalid");
        document.querySelector("#" + idsMensajes[i]).hidden = true;
    }
});
formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    let hayError = false;
    let primerInvalido = null;
    for (let i = 0; i < campos.length; i++) {
        const campo = campos[i];
        const texto = mensajeError(campo, i);
        const mensaje = document.querySelector("#" + idsMensajes[i]);
        if (texto !== "") {
            campo.classList.add("input-error");
            campo.setAttribute("aria-invalid", "true");
            mensaje.textContent = texto;
            mensaje.hidden = false;
            hayError = true;
            if (primerInvalido === null) primerInvalido = campo;
        } else {
            campo.classList.remove("input-error");
            campo.removeAttribute("aria-invalid");
            mensaje.hidden = true;
        }
    }
    if (hayError) {
        primerInvalido.focus();
        Swal.fire({ icon:"error", title:"Revise el formulario", text:"Complete los campos indicados y revise el correo." });
    } else {
        Swal.fire({ icon:"success", title:"Mensaje listo", text:"El envío del mensaje se confirmó de forma simulada." });
    }
});