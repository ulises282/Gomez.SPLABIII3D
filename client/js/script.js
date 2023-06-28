import { actualizarTabla } from "./tabla.js";
import { Heroe } from "./heroes.js";
import {getObjetos} from "./fetch.js";
import {create, deleteObj, update} from "./ajax.js";
import { filtrar } from "./filtros.js";

const $seccionTabla = document.getElementById("tabla");
const $formulario = document.getElementById("formulario");
const $botonEliminar = document.getElementById("botonEliminar");
const $botonCancelar = document.getElementById("botonCancelar");
const $loader = document.getElementById("loader-section");
const $filtroEditorial = document.getElementById("filtroEditorial");
const $checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
const $selectArmas = document.getElementById("selectArma");

const armasLocal = [
  "Armadura",
  "Espada",
  "Martillo",
  "Escudo",
  "Arma de Fuego",
  "Flechas",
  "Musculos",
  "Lazo",
];

const armas =
  JSON.parse(localStorage.getItem("armas")) ||
  localStorage.setItem("armas", JSON.stringify(armasLocal));

armas.forEach((element) => {
  const option = document.createElement("option");
  option.textContent = element;
  option.value = element;
  $selectArmas.appendChild(option);
});
$botonEliminar.style.display = "none";
$botonCancelar.style.display = "none";

$loader.style.display = "none";
const heroes = await getObjetos();
actualizarTabla($seccionTabla, heroes);

$checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    actualizarTabla($seccionTabla, heroes);
  });
});

$filtroEditorial.addEventListener("change", function () {
  const editorialSeleccionada = $filtroEditorial.value;
  actualizarTabla($seccionTabla, filtrar(editorialSeleccionada, heroes));
});

window.addEventListener("click", (e) => {
  if (e.target.matches("td")) {
    const id = e.target.parentElement.dataset.id;
    const selected = heroes.find((anuncio) => anuncio.id == id);
    cargarForm($formulario, selected);
    $botonEliminar.style.display = "inline-block";
    $botonCancelar.style.display = "inline-block";
  } else if (e.target.matches("input[value='Eliminar']")) {
    if ($formulario.txtId.value !== "") {
      handlerDelete(parseInt($formulario.txtId.value));
      $botonEliminar.style.display = "none";
    }
  } else if (e.target.matches("input[value='Cancelar']")) {
    actualizarFormulario();
  }
});

$formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const {
    txtId,
    txtNombre,
    txtAlias,
    rdoEditorial,
    inputFuerza,
    selectArma,
  } = $formulario;
  if (txtId.value === "") {
    //anuncio nuevo
    const newHeroe = new Heroe(
      Date.now(),
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(inputFuerza.value),
      selectArma.value
    );
    handlerCreate(newHeroe);
  } else {
    ////////
    const updatedHeroe = new Heroe(
      parseInt(txtId.value),
      txtNombre.value,
      txtAlias.value,
      rdoEditorial.value,
      parseInt(inputFuerza.value),
      selectArma.value
    );
    handlerUpdate(updatedHeroe);
  }
  actualizarFormulario();
});

function handlerCreate(nuevo) {
  heroes.push(nuevo); ////////////////////////
  create(nuevo);
  actualizarTabla($seccionTabla, heroes);
}
function handlerUpdate(editAnuncio) {
  let index = heroes.findIndex((heroe) => heroe.id == editAnuncio.id);
  heroes.splice(index, 1, editAnuncio);
  update(editAnuncio);
  actualizarTabla($seccionTabla, heroes);
}
function handlerDelete(id) {
  let index = heroes.findIndex((heroe) => heroe.id == id);
  heroes.splice(index, 1);
  deleteObj(id);
  actualizarTabla($seccionTabla, heroes);
  actualizarFormulario();
}

function cargarForm(formulario, heroe) {
  formulario.txtId.value = heroe.id;
  formulario.txtNombre.value = heroe.nombre;
  formulario.txtAlias.value = heroe.alias;
  formulario.rdoEditorial.value = heroe.editorial;
  formulario.inputFuerza.value = heroe.fuerza;
  formulario.selectArma.value = heroe.arma;
}

function actualizarFormulario() {
  $formulario.reset();
  $formulario.txtId.value = "";
  $botonEliminar.style.display = "none";
  $botonCancelar.style.display = "none";
  $loader.style.display = "none";
}
