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
}