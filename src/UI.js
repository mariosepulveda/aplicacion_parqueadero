import { Vehiculo } from "./Vehiculo.js";

const vehiculo = new Vehiculo();


// constantes que se podrian declarar en el constructor para ser enviados desde index.js
//const btnNuevo = document.getElementById('myBtn');
const modal = document.getElementById('myModal');
const tipoVehiculo = document.getElementById('type-select');
const ciudadOrigen = document.getElementById('ciudad_field');
const numCascos = document.getElementById('type-select_cascos');
const placaField = document.getElementById('placa_input');
export class UI {
    constructor() {

    }

    abrirModal() {
        console.log("dio click desde class ui");

        modal.style.display = "block";

        console.log('onj modal', modal);

    }

    cerrarModal() {
        modal.style.display = "none";
        //vehiculo.limpiarCampos();
    }

    habilitarPlaca() {
        console.log("entro a habilitar placa",tipoVehiculo.value);
        if(tipoVehiculo.value !== ""){
            placaField.disabled = false;
            ciudadOrigen.disabled = false;

            if(tipoVehiculo.value === 'Motocicleta'){
                numCascos.disabled = false;
                ciudadOrigen.value = 'Colombia';
                

            } else if(tipoVehiculo.value === 'Automóvil'){
                numCascos.disabled = true;
                numCascos.value = 0;

            }
 
        } else{
            numCascos.disabled = true;
            placaField.disabled = true;
            ciudadOrigen.disabled = true;
            ciudadOrigen.value = '';
            placaField.value = '';
            numCascos.value = 0;
        }
    }

    validarUpperCase(){
        if (placaField.value !== "") {
            placaField.value = placaField.value.toUpperCase();
        }

        if(placaField.value !== ''){
            if(tipoVehiculo.value === 'Motocicleta'){
                placaField.pattern ="^([A-Za-z]{3} [0-9]{2}[A-Za-z]{1}){1}?$";
            }else if(tipoVehiculo.value === 'Automóvil'){
                placaField.pattern = "^([A-Za-z]{3} [0-9]{3}){1}?$"
            }
        }
        
    }

    crearIngreso(){
        console.log("entro a crear ingreso");
        if(tipoVehiculo.value === "Motocicleta"){
            if (placaField.value !== "" && numCascos.value !== "" && ciudadOrigen.value !== "") {
                
            }

        } else if(tipoVehiculo.value === "Automóvil"){
            if (placaField.value !== "" && ciudadOrigen.value !== "") {

            }
        } else {
            alert(`Por favor llene todos los campos!`);
          }
    }

}



