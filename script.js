// DECLARO LAS CONSTANTES PARA QUE OBTENGA LOS ELEMENTOS DEL FORMULARIO
// EN EL INDEX 

const ingresocapacidad = document.getElementById('capacidad');
const ingresoprecio = document.getElementById('precio');
const ingresocantidad = document.getElementById('cantidad');
const ingresomarca = document.getElementById('marca');
const addButton = document.getElementById('add-button');
const filtrocapacidad = document.getElementById('filtrocapacidad');
const filtromarca = document.getElementById('filtromarca');
const tablainventario = document.getElementById('tablainventario');
const itemsinventario = document.getElementById('itemsinventario');
const clearStorageButton = document.getElementById('clear-storage-button');



// DECLARO LA VARIANTE INVENTARIO PARA QUE ME LO TRAIGA DEL LOCALSTORAGE O ME CREE UN ARRAY VACÍO
// USANDO EL OR 
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];



// CREO LA FUNCIÓN MOSTRARINVENTARIO 
function mostrarinventario() {
  itemsinventario.innerHTML = ''; //ESTABLECE EL CONTENIDO EN UN STRING VACÍO

  const itemsfiltrados = inventario.filter(item => //DECLARO LA VARIABLE "ITEMS FILTRADOS" PARA ALMACENAR  EL RESULTADO
    //LA FUNCION FILTER LA USO EN EL ARRAY INVENTARIO PARA QUE ME CREE UN NUEVO ARRAY QUE CUMPLAN LAS CONDICIONES
    // DE CAPACIDAD Y MARCA
  {
    const capacidadencontrada = item.capacidad === parseInt(filtrocapacidad.value);
    const marcaencontrada = item.marca.toLowerCase().includes(filtromarca.value.toLowerCase());

    return (!filtrocapacidad.value || capacidadencontrada) && (!filtromarca.value || marcaencontrada);
  });

  itemsfiltrados.forEach(item => { //USO DE METODO FOREACH EN EL ARRAY DE ITEMS FILTRADOS
    const row = document.createElement('tr'); //CREA UN ELEMENTO HTML CON LA FUNCION CREATEELEMENT
    row.innerHTML = ` 
      <td>${item.capacidad}</td>
      <td>$${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>${item.marca}</td>
    `;

    itemsinventario.appendChild(row); //SE AGREGA COMO HIJO DEL ELEMENTO "ITEMINVENTARIO"
  });
}

// DEFINO LA FUNCION DE AGREGARAIRE 
//OBTIENEN EL VALOR DEL ELEMENTO HTML
function agregaraire() {
  const capacidad = parseInt(ingresocapacidad.value); 
  const precio = parseFloat(ingresoprecio.value);
  const cantidad = parseInt(ingresocantidad.value);
  const marca = ingresomarca.value;

  if (capacidad && precio && cantidad && marca) { //ESTE IF VERIFICA QUE TODAS LAS VARIABLES SEAN VALIDAS, CON UN VALOR DIFERENTE DE NULL, UNDEFINED O STRING VACIO

    const nuevoaire = { //CREO LA CONSTANTE NUEVO AIRE CON LAS PROPIEDADES DE LOS VALORES QUE SE OBTUVIERON ANTERIORMENTE
      capacidad: capacidad,
      precio: precio,
      cantidad: cantidad,
      marca: marca
    };

    inventario.push(nuevoaire); //SE AGREGA AL INVENTARIO MEDIANTE EL PUSH
    localStorage.setItem('inventario', JSON.stringify(inventario));//TRANSFORMA EL ARRAY INVENTARIO AL FORMATO JSON CON EL STRINGIFY Y LO GUARDA EN EL LOCALSTORAGE
    mostrarinventario();

//AL MOSTRAR EL INVENTARIO BORRA LOS ELEMENTOS PARA LIMPIAR LOS CAMPOS DE ELEMENTO
    ingresocapacidad.value = '';
    ingresoprecio.value = '';
    ingresocantidad.value = '';
    ingresomarca.value = '';
  }
}

// USO DE LA FUNCION CLEARLOCALSTORAGE PARA CON EL REMOTEITEM ELEIMINAR DEL LOCALSTORAGE EL INVENTARIO 
function clearLocalStorage() {
  localStorage.removeItem('inventario');
  inventario = [];
  mostrarinventario(); //LLAMADO A LA FUNCION MOSTRAR INVENTARIO PARA REINICIAR EL ARRAY
}

// USO DEL EVENTO CLICK PARA LLAMAR A LA FUNCION AGREGARAIRE
addButton.addEventListener('click', agregaraire);


// ESCUCHA EL EVENTO DE INPUT PARA FILTROCAPACIDAD O FILTRO MARCA, LUEGO EJECUTARÁ LA OPCIÓN MOSTRAR INVENTARIO
filtrocapacidad.addEventListener('input', mostrarinventario);
filtromarca.addEventListener('input', mostrarinventario);



// ESCUCHA EL EVENTO CLICK PARA LLAMAR A LA FUNCION CLEARLOCALSTORAGE
clearStorageButton.addEventListener('click', clearLocalStorage);



// LLAMADO A LA FUNCIÓN PARA MOSTRAR EL ARRAY
mostrarinventario();
