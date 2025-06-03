const API_URL = "https://mi-backend-agenda.onrender.com/contactos";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const lista = document.getElementById("lista-contactos");

  const cargarContactos = async () => {
    const res = await fetch(API_URL);
    const datos = await res.json();
    lista.innerHTML = "";
    datos.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.nombre} - ${c.correo}`;
      lista.appendChild(li);
    });
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo })
    });

    form.reset();
    cargarContactos();
  });

  cargarContactos();
});
