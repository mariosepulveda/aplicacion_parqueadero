class EliminarBtnRenderer {
  // gets called once before the renderer is used
  init(params) {
    // create the cell
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
          <span>
              <span class="my-value"></span>
              <button class="btn-simple btn-terminar">Finalizar</button>
          </span>
       `;//&#9201;

    // get references to the elements we want
    this.eButton = this.eGui.querySelector('.btn-simple');
    this.eValue = this.eGui.querySelector('.my-value');

    // set value into cell
    this.cellValue = this.getValueToDisplay(params);

    //this.eValue.innerHTML = this.cellValue;

    // add event listener to button
    this.eventListener = () => {

      actualizarTabla();
      //alert(`${params.data.tipo} medals won!`);
      let idRegistro = params.data.id;
      let value = [...JSON.parse(window.localStorage.getItem("user"))];
      let pos = 0; 
      //console.log("local storage desde el boton",idRegistro);

      var totalCaja = 0;

      totalCaja += parseFloat(window.localStorage.getItem("totalCaja")); 
      

      //let itemDelete = value.filter(item => item.id !== idRegistro);
      value.map((item,index)=>{
        if(item.id === idRegistro){
          pos = index;
          //console.log('posicion a eliminar: ',index,item);
          totalCaja += item.total;
        }
        return null;
      });
      window.localStorage.setItem("totalCaja", totalCaja);


      //console.log("total caja:",totalCaja);


      value.splice(pos,1);
      //console.log("nuevo value:",value);

      window.localStorage.setItem("user",JSON.stringify(value));
      location.reload();
      gridOptions.api.setRowData(value);


      //console.log('item a eliminar: ',itemDelete);
    }
    this.eButton.addEventListener('click', this.eventListener);
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
    if (this.eButton) {
      // check that the button element exists as destroy() can be called before getGui()
      this.eButton.removeEventListener('click', this.eventListener);
    }
  }

  getValueToDisplay(params) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }
}