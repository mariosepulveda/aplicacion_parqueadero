
const tipoVehiculo = document.getElementById('type-select');
const ciudadOrigen = document.getElementById('ciudad_field');
const numCascos = document.getElementById('type-select_cascos');
const placaField = document.getElementById('placa_input');

export class Vehiculo{
    constructor(tipo,placa){
        this.tipo = tipo;
        this.placa = placa;
    }

    //getters

    get dataVehiculo(){
        return `${this.tipo} ${this.placa}` 
    }

    set setTipoVehiculo(ntipo){
        this.tipo = ntipo;
    }

    set setPlacaVehiculo(nplaca){
        this.placa = nplaca;
    }

    limpiarCampos(){
        tipoVehiculo.value = '';
        placaField.value = '';
        numCascos.value = 0;
        ciudadOrigen.value = '';

        ciudadOrigen.disabled = true;
        placaField.disabled = true;
    }
}