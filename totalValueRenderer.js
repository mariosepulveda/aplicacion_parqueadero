class TotalValueRenderer {
  // gets called once before the renderer is used
  init(params) {
    // create the cell
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
          <span>
              <span class="my-value"></span>
              <button id="btn_editar"class="btn-simple">Modificar</button>
          </span>
          <span>
          <span class="my-value"></span>
          <button id="btn_cancelar" class="btn-simple">Eliminar</button>
      </span>
       `; // &#128395 // &#128465

    // get references to the elements we want
    this.eButtonEditar = this.eGui.querySelector('#btn_editar');//      this.eButton = this.eGui.querySelector('.btn-simple');
    this.eButtonCancelar = this.eGui.querySelector('#btn_cancelar');//      this.eButton = this.eGui.querySelector('.btn-simple');

    this.eValueEdit = this.eGui.querySelector('#btn_editar');
    this.eValueCancel = this.eGui.querySelector('#btn_cancelar');

    // set value into cell
    //this.cellValue = this.getValueToDisplay(params);
    //this.eValue.innerHTML = this.cellValue;

    // add event listener to button
    this.eventListener1 = () => {
      confirm(`Tipo vehículo: ${params.data.tipo}\n Matrícula: ${params.data.placa}\n Origen: ${params.data.ciudad}`);

      //console.log("console edit",this.eValueEdit);
    } //this.eventListener = () => alert(`${this.cellValue} medals won!`);
    this.eButtonEditar.addEventListener('click', this.eventListener1); //this.eButton.addEventListener('click', this.eventListener);

    this.eventListener2 = () => {
              //console.log("console edit",this.eValueEdit);
              actualizarTabla();


              let idRegistro = params.data.id;
              let value = [...JSON.parse(window.localStorage.getItem("user"))];
              let pos = 0; 
              //console.log("local storage desde el boton",idRegistro);


              value.map((item,index)=>{
                if(item.id === idRegistro){
                  pos = index;
                  //console.log('posicion a eliminar: ',index,item);
                  //totalCaja += item.total;// no hace falta porque solo de desea eliminar
                }
                return null;
              });

              value.splice(pos,1);

      window.localStorage.setItem("user",JSON.stringify(value));
      location.reload();
      gridOptions.api.setRowData(value);
      //alert(`${params.data.id} medals won!3`);
    }
    this.eButtonCancelar.addEventListener('click', this.eventListener2);
  }

  getGui() {
    return this.eGui;
  }

  // gets called whenever the cell refreshes
  refresh(params) {
    // set value into cell again
    //this.cellValue = this.getValueToDisplay(params);
    //this.eValue.innerHTML = this.cellValue;

    // return true to tell the grid we refreshed successfully
    return true;
  }

  // gets called when the cell is removed from the grid
  destroy() {
    // do cleanup, remove event listener from button
    if (this.eButtonEditar) {
      // check that the button element exists as destroy() can be called before getGui()
      this.eButtonEditar.removeEventListener('click', this.eventListener1);
    }

    if (this.eButtonCancelar) {
      // check that the button element exists as destroy() can be called before getGui()
      this.eButtonCancelar.removeEventListener('click', this.eventListener2);
    }
  }

  getValueToDisplay(params) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}