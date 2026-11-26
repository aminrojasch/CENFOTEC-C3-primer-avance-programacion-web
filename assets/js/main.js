const paginaActual = window.location.pathname.split("/").pop() || "index.html";
const enlacesPagina = document.querySelectorAll("header nav a, footer a");
for (let i = 0; i < enlacesPagina.length; i++) {
    if (enlacesPagina[i].getAttribute("href") === paginaActual) enlacesPagina[i].setAttribute("aria-current", "page");
}