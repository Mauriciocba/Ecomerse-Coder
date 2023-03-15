const Viajes = [
    {
        nombre: "Brasil",
        descripcion : "Río de Janeiro",
        precio : 60000,
        cantidad: 40,
        imagen: "./viajes/brasil-min.jpg",
        id: 0

    },

    {
        nombre: "Estados unidos",
        descripcion : "trekking gran cañon del colorado",
        precio : 80000,
        cantidad: 20,
        imagen: "./viajes/estados_unidos-min.jpg",
        id: 1

    },

    {
        nombre: "Ecuador",
        descripcion : "Divertite en las hermosa playa de Ecuador",
        precio : 55000,
        cantidad: 10,
        imagen: "./viajes/ecuador-min.jpg",
        id: 2

    },

    {
        nombre: "Chile",
        descripcion : "Campamento bosques de Chile",
        precio : 40000,
        cantidad: 30,
        imagen: "./viajes/chile-min.jpg",
        id: 3

    },

    {
        nombre: "Peru",
        descripcion : "trekking por Peru",
        precio : 45000,
        cantidad: 40,
        imagen: "./viajes/peru-min.jpg",
        id: 4

    },

    {
        nombre: "Italia",
        descripcion : "Verona",
        precio : 99000,
        cantidad: 50,
        imagen: "./viajes/verona-min.jpg",
        id: 5

    },

   
] 

const contenedor = document.querySelector(".conteiner")
const main = document.querySelector("#main");
const sidebar = document.querySelector(".sidebar");
const btnCarrito = document.querySelector(".btn-carrito");
let contenedorPreciosDolar = document.querySelector("#tablaDolar")
const btnFinalCompra =document.getElementById("btnFinalCompra")

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


btnCarrito.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
  

  const cargarViajes = () => {
    Viajes.forEach((element) => {
      main.innerHTML += `      
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${element.imagen}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title nombre">${element.nombre}</h5>
                <p class="card-text">${element.descripcion}</p>
                <p class="card-text precio">$ <span>${element.precio}</span></p>
                <button class="btn btn-primary btn-agregar" data-id="${element.id}">Comprar</button>
                </div>
            </div>`

    });
    const btnAgregar = document.querySelectorAll(".btn-agregar");
    btnAgregar.forEach((e) =>
      e.addEventListener("click", (e) => {
        let cardPadre = e.target.parentElement;
        
        agregado()
        agregarAlCarrito(cardPadre);
        
      })
    );
  };

  const agregarAlCarrito = (cardPadre) => {
    let producto = {
      nombre: cardPadre.querySelector(".nombre").textContent,
      precio: Number(cardPadre.querySelector(".precio span").textContent),
      cantidad: 1,
      imagen: cardPadre.parentElement.querySelector("img").src,
      id: Number(cardPadre.querySelector("button").getAttribute("data-id")),
    };
  
    let productoEncontrado = carrito.find(
      (element) => element.id === producto.id
    );
  
    if (productoEncontrado) {
      productoEncontrado.cantidad++;
    } else {
      carrito.push(producto);
    }
    console.log(carrito);
    mostrarCarrito();
  };
  
  const mostrarCarrito = () => {
    sidebar.innerHTML = "";
    carrito.forEach((element) => {
      let { imagen, nombre, precio, cantidad, id } = element;
      sidebar.innerHTML += `
          <div class="caja--carrito" >
            <img class="caja-carrito-img" src="${imagen}">
            
            <div class="caja--carrito--datos">
              <p class="nombre">${nombre}</p>
              <p class="cantidad">CANTIDAD: ${cantidad}</p>
              <p class="subtotal">Subtotal: $${precio * cantidad}</p>
              <p class="precio">Precio $ <span>${precio}</span> </p>
            <button class="badge bg-danger btn-restar" data-id="${id}">-</button>
            <button class="badge bg-danger btn-borrar" data-id="${id}">BORRAR</button>
            
            </div>

          </div>`;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    aumentarNumeroCantidadCarrito();
    CalcularTotal()
  };


  const restarProducto = (productoRestar) => {
    let productoEncontrado = carrito.find(
      (element) => element.id === Number(productoRestar)
    );
    if (productoEncontrado) {
      productoEncontrado.cantidad--;
      if (productoEncontrado.cantidad === 0) {
        productoEncontrado.cantidad = 1;
      }
    }
    mostrarCarrito();
  };
  
  const borrarProducto = (productoBorrar) => {
    carrito = carrito.filter((element) => element.id !== Number(productoBorrar));
    mostrarCarrito();
  };
  
  const escucharBotonesSidebar = () => {
    sidebar.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-restar")) {
        restarProducto(e.target.getAttribute("data-id"));
      }
      if (e.target.classList.contains("btn-borrar")) {
        borrarProducto(e.target.getAttribute("data-id"));
      }
    });
  };
  
  const aumentarNumeroCantidadCarrito = () => {
    let total = carrito.reduce((acc, ite) => acc + ite.cantidad, 0);
    document.querySelector(".cant--carrito").textContent = total;
  };
  
  
  function CalcularTotal() {
    let totalProducto = carrito.reduce((total, viajes) => total + viajes.precio, 0);
    document.querySelector(".mostrartotal").innerHTML = `Total : $${totalProducto}`;

  }

  btnFinalCompra.addEventListener('click', ()=>{

    let totalProducto = carrito.reduce((total, viajes) => total + viajes.precio, 0);
    document.querySelector(".mostrartotal").innerHTML = `Total : $${totalProducto}`;

    swal("Compra finalizada!", `El importe de su compra es de $${totalProducto}`, "success");

    
})


/*TOASTIFy*/
  function agregado() {
    Toastify({
  
      text: "Producto Agregado",
      
      duration: 3000
      
      }).showToast();
      
  }
  
  cargarViajes();
  mostrarCarrito();
  escucharBotonesSidebar();
  
/*API DOLAR*/
let api = document.getElementById("tablaDolar");
fetch("https://criptoya.com/api/dolar")
.then(objectoPromesa => objectoPromesa.json())
.then(data => {
  
  
  let {oficial,solidario,mep,blue } = data
   
  console.log(data)

  api.innerHTML = `
        <tr>
        <th scope="row"></th>
        <td>${oficial}</td>
        <td>${solidario}</td>
        <td>${mep}</td>
        <td>${blue}</td>
      </tr>
        `    


})
    
/*API cambio moneda*/


let moneda = document.getElementById("divisas")
   
fetch("http://api.exchangeratesapi.io/v1/latest?access_key=c4b0217aacad793939be0d2d213b64b1&format=1")
.then(objectoPromesas => objectoPromesas.json())
.then(data => {

  let {rates} = data
  let {ARS,USD,EUR} = rates



console.log(data)

  moneda.innerHTML = `
        <tr>
        <th scope="row"></th>
        <td>${EUR}</td>
        <td>${USD}</td>
        <td>${ARS}</td>
      </tr>
        `        

})