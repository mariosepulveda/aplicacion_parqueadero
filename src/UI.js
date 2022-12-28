import { Vehiculo } from "./Vehiculo.js";

const vehiculo = new Vehiculo();

//const btnNuevo = document.getElementById('myBtn');
const modal = document.getElementById('myModal');


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
    }

}

