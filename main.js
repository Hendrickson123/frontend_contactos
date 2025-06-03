
const API_URL = "https://mi-backend-agenda.onrender.com/api/contactos";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const lista = document.getElementById("lista-contactos");

  const cargarContactos = async () => {
    const res = await fetch(API_URL);
    const datos = await res.json();
    lista.innerHTML = "";
    datos.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `${c.nombre} - ${c.correo} <button data-id="${c._id}">🗑</button>`;
      li.querySelector("button").addEventListener("click", async () => {
  await fetch(`${API_URL}/${c._id}`, { method: "DELETE" });
  cargarContactos(); // actualiza lista
});

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
