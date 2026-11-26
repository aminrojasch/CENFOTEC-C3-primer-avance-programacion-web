const filtro = document.querySelector("#filtro-modalidad");
const contenedor = document.querySelector("#contenedor-experiencias");

const precioTexto = (precio) => {
    const valor = String(precio);
    let salida = "";
    for (let i = valor.length - 1; i >= 0; i--) {
        salida = valor[i] + salida;
        if (i > 0 && (valor.length - i) % 3 === 0) salida = "." + salida;
    }
    return "₡" + salida;
};

const agregarDato = (tarjeta, titulo, valor) => {
    const linea = document.createElement("p");
    const etiqueta = document.createElement("strong");
    etiqueta.textContent = titulo + ": ";
    linea.appendChild(etiqueta);
    linea.appendChild(document.createTextNode(String(valor)));
    tarjeta.appendChild(linea);
};

const dibujarTarjeta = (experiencia) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("evento-card");
    const nombre = document.createElement("h2");
    nombre.textContent = experiencia.nombre;
    tarjeta.appendChild(nombre);
    agregarDato(tarjeta, "Ubicación", experiencia.ubicacion);

    const detalles = document.createElement("div");
    detalles.classList.add("evento-card__detalles");
    detalles.hidden = true;
    agregarDato(detalles, "Categoría", experiencia.categoria);
    agregarDato(detalles, "Fecha y hora", experiencia.fecha);
    agregarDato(detalles, "Modalidad", experiencia.modalidad);
    agregarDato(detalles, "Cupos", experiencia.cupos);
    agregarDato(detalles, "Precio", precioTexto(experiencia.precio));
    tarjeta.appendChild(detalles);

    const boton = document.createElement("button");
    boton.type = "button";
    boton.classList.add("boton");
    boton.textContent = "Ver evento";
    boton.addEventListener("click", () => {
        detalles.hidden = false;
        const enlace = document.createElement("a");
        enlace.classList.add("boton");
        enlace.href = "reservar.html?experiencia=" + encodeURIComponent(experiencia.codigo);
        enlace.textContent = "Reservar experiencia";
        boton.replaceWith(enlace);
    });
    tarjeta.appendChild(boton);
    return tarjeta;
};

const mostrarExperiencias = () => {
    contenedor.replaceChildren();
    let mostradas = 0;
    for (let i = 0; i < experiencias.length; i++) {
        const coincideModalidad = filtro.value === "todas" || experiencias[i].modalidad === filtro.value;
        if (coincideModalidad) {
            contenedor.appendChild(dibujarTarjeta(experiencias[i]));
            mostradas++;
        }
    }
    if (mostradas === 0) contenedor.textContent = "No hay experiencias que coincidan con los filtros.";
};

filtro.addEventListener("change", mostrarExperiencias);
mostrarExperiencias();
