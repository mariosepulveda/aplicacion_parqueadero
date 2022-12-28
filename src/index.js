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

const cerrarModalBtn = document.getElementById("btn_cerrar_modal");
cerrarModalBtn.addEventListener("click", ui.cerrarModal);
