const camposSoloLetras = document.querySelectorAll('form input[type="text"], form textarea');

for (let i = 0; i < camposSoloLetras.length; i++) {
    camposSoloLetras[i].addEventListener("input", (event) => {
        const campo = event.currentTarget;
        const posicion = campo.selectionStart;
        const valorAnterior = campo.value;
        const valorLimpio = valorAnterior.replace(/[^\p{L}\s]/gu, "");

        if (valorLimpio !== valorAnterior) {
            const posicionLimpia = valorAnterior.slice(0, posicion).replace(/[^\p{L}\s]/gu, "").length;
            campo.value = valorLimpio;
            campo.setSelectionRange(posicionLimpia, posicionLimpia);
        }
    });
}
