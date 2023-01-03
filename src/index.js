import { UI } from './UI.js';
import { Vehiculo } from "./Vehiculo.js";


const ui = new UI();
const vehiculo = new Vehiculo("", "");

console.log("datos del vehiculo", vehiculo.dataVehiculo);
//vehiculo.set("moto","dfg 23f");
vehiculo.setTipoVehiculo = "carro";
vehiculo.setPlacaVehiculo = "SDF 234";

console.log("datos del vehiculo:", vehiculo.dataVehiculo);

const clickBtnNuevo = document.getElementById("myBtn");
clickBtnNuevo.addEventListener("click", ui.abrirModal);

const span = document.getElementsByClassName("close")[0]; // tratar de modificar para usar el id
span.addEventListener("click", ui.cerrarModal);

const cerrarModalBtn = document.getElementById("btn_cerrar_modal"); // boton de cancelar en el modal de ingreso vehiculo
cerrarModalBtn.addEventListener("click", ui.cerrarModal);


const tipoVehiculoSelect = document.getElementById("type-select");  // evento del onchange del select de tipo vehiculo
tipoVehiculoSelect.addEventListener("change",ui.habilitarPlaca);

const placaField = document.getElementById('placa_input');
placaField.addEventListener("blur",ui.validarUpperCase);

const btnIngreso = document.getElementById('btnIngresar');
btnIngreso.addEventListener("click",ui.crearIngreso);