const formularios = document.querySelectorAll("form");

for (let i = 0; i < formularios.length; i++) {
    formularios[i].addEventListener("focusin", (event) => {
        const campos = Array.from(formularios[i].querySelectorAll("input, select, textarea"))
            .filter((campo) => campo.required);
        const campoActual = event.target;
        const indiceActual = campos.indexOf(campoActual);
        let primerPendiente = null;

        for (let j = 0; j < campos.length; j++) {
            if (!campos[j].checkValidity()) {
                primerPendiente = campos[j];
                break;
            }
        }

        if (primerPendiente !== null && indiceActual > campos.indexOf(primerPendiente)) {
            primerPendiente.focus();
        }
    });
}
