// Lista de productos
const productos = [
  { id: 1, nombre: "Polo blanco", precio: 35, categoria: "ropa", imagen: "img/polo.jpg", descripcion: "Polo de algodón 100% suave y cómodo." },
  { id: 2, nombre: "Gorra azul", precio: 25, categoria: "accesorios", imagen: "img/gorra.jpg", descripcion: "Gorra ajustable con diseño moderno." },
  { id: 3, nombre: "Zapatillas deportivas", precio: 120, categoria: "calzado", imagen: "img/zapatillas.jpg", descripcion: "Zapatillas ligeras para entrenamiento diario." },
  { id: 4, nombre: "Polo blanco", precio: 35, categoria: "ropa", imagen: "img/polo.jpg", descripcion: "Polo de algodón 100% suave y cómodo." },
  { id: 5, nombre: "Gorra azul", precio: 25, categoria: "accesorios", imagen: "img/gorra.jpg", descripcion: "Gorra ajustable con diseño moderno." },
  { id: 6, nombre: "Zapatillas deportivas", precio: 120, categoria: "calzado", imagen: "img/zapatillas.jpg", descripcion: "Zapatillas ligeras para entrenamiento diario." }
];


// Mostrar productos destacados (solo los 3 primeros)
const destacados = document.getElementById("destacados");
if (destacados) {
  productos.slice(0, 3).forEach(p => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>S/ ${p.precio}</p>
    `;
    div.addEventListener("click", () => {
      window.location.href = `producto.html?id=${p.id}`;
    });
    destacados.appendChild(div);
  });
}

// Mostrar todos los productos con búsqueda y filtro
const lista = document.getElementById("lista-productos");
if (lista) {
  const inputBuscar = document.getElementById("buscar");
  const selectCategoria = document.getElementById("categoria");

  function mostrarProductos(filtroTexto = "", filtroCategoria = "todos") {
    lista.innerHTML = "";
    const filtrados = productos.filter(p => {
      const coincideTexto = p.nombre.toLowerCase().includes(filtroTexto.toLowerCase());
      const coincideCategoria = filtroCategoria === "todos" || p.categoria === filtroCategoria;
      return coincideTexto && coincideCategoria;
    });

    if (filtrados.length === 0) {
      lista.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    filtrados.forEach(p => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>S/ ${p.precio}</p>
      `;
      div.addEventListener("click", () => {
        window.location.href = `producto.html?id=${p.id}`;
      });
      lista.appendChild(div);
    });
  }

  // Mostrar todos al inicio
  mostrarProductos();

  // Escuchar búsqueda y cambio de categoría
  inputBuscar.addEventListener("input", () => {
    mostrarProductos(inputBuscar.value, selectCategoria.value);
  });

  selectCategoria.addEventListener("change", () => {
    mostrarProductos(inputBuscar.value, selectCategoria.value);
  });
}


// Mostrar detalle del producto
const detalle = document.getElementById("detalle");
if (detalle) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const p = productos.find(x => x.id === id);

  if (p) {
    detalle.innerHTML = `
      <h2>${p.nombre}</h2>
      <img src="${p.imagen}" alt="${p.nombre}">
      <p>${p.descripcion}</p>
      <h3>Precio: S/ ${p.precio}</h3>
      <a href="https://wa.me/51944024962?text=Hola, estoy interesado en ${encodeURIComponent(p.nombre)}" class="btn" target="_blank">📲 Contactar por WhatsApp</a>
    `;
  } else {
    detalle.innerHTML = "<p>Producto no encontrado.</p>";
  }
}

