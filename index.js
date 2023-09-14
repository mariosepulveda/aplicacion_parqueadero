var tipoVehiculoField = document.getElementById("type-select");
var placaField = document.getElementById("placa_input");
var ciudad_field = document.getElementById("ciudad_field");
var numCascosField = document.getElementById("type-select_cascos");
var btnIngresar = document.getElementById("btnIngresar");
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";

  //document.getElementById('valor_input').value = 0;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  limpiarCampos();

}

// When the user clicks anywhere outside of the modal, close it (optional)
/* window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } */

  if(window.localStorage.getItem("totalCaja")!== undefined && window.localStorage.getItem("totalCaja")!== null){
    console.log("entro a if:",window.localStorage.getItem("totalCaja"));
    
  }else {
    console.log("entro a if:",window.localStorage.getItem("totalCaja"));
    window.localStorage.setItem("totalCaja",0);
  }

/**para renderizar dinamicamente el datalist de las ciudades de origen */
const ciudadesOrigen = ["Colombia", "Armenia", "Calarcá", "Pereira", "Dosquebradas", "Manizales", "Villa María", "Medellín", "Envigado","Cali","Palmira","Ibagué","Cajamarca"];
addToDataList(ciudadesOrigen);

// create and populate datalist
function addToDataList(data) {
  data.forEach(elem => {
    option = document.createElement("option");
    option.value = elem;
    ciudad_origen.append(option);
  });
}

/**para cerrar el modal */
var cerrarModalBtn = document.getElementById("btn_cerrar_modal");

cerrarModalBtn.onclick = function () {
  modal.style.display = "none";
  limpiarCampos();
}

var columnDefs = [
  { headerName: "Tipo", field: "tipo", sortable: true, filter: true,suppressMovable: true},
  { headerName: "Placa", field: "placa", sortable: true, filter: true, suppressMovable: true },
  { headerName: "Origen", field: "ciudad", sortable: true, filter: true, suppressMovable: true },
  { headerName: "Cascos", field: "cascos", sortable: true, filter: true, cellClass: 'align-center', suppressMovable: true },
  { headerName: "Fecha", field: "fecha", sortable: true, filter: true, cellClass: 'align-center', suppressMovable: true },
  { headerName: "Hora", field: "hora", sortable: true, filter: true, cellClass: 'align-center', suppressMovable: true },
  {
    headerName: "Total", field: "total", sortable: true, filter: true, cellClass: 'align-right', suppressMovable: true,
    valueFormatter: function (params) {
      return formatNumber(params.value);
    },
  },
  { field: 'Operación 1', minWidth: 200, cellRenderer: 'totalValueRenderer', sortable: false, filter: false, cellClass: 'align-center', suppressMovable: true },
  { field: 'Operación 2', minWidth: 120, cellRenderer: 'eliminarBtnRenderer', sortable: false, filter: false, cellClass: 'align-center', suppressMovable: true },
];

var rowData = [];
rowData = JSON.parse(window.localStorage.getItem("user"));
if (rowData === null) {
  rowData = [];
}
//console.log("row data",rowData);
/**    { id:1, tipo:"carro", placa:"XYZ 123", ciudad:"Medellín", cascos:0, hora:"7:03:29", total:2300.00, fecha:"28-11-2022"},
 */

var gridOptions = {
  columnDefs: columnDefs,
  rowData: rowData,
  components: {
    totalValueRenderer: TotalValueRenderer,
    eliminarBtnRenderer: EliminarBtnRenderer
  },
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,

  },
  pagination: true,
  paginationPageSize: 10,
  overlayLoadingTemplate:
    '<span style="padding: 10px; border: 1px solid rgb(90, 137, 199); background: #fefefe; font-weight: bold; font-size:normal; border-radius:3px;" >Por favor espere un momento...</span>', //class="ag-overlay-loading-center"
  overlayNoRowsTemplate:
    '<span style="padding: 10px; border: 1px solid rgb(90, 137, 199); background: #fefefe; font-weight: bold; font-size:normal; border-radius:3px;">!No hay vehículos registrados!</span>',
};

function onBtShowLoading() {
  gridOptions.api.showLoadingOverlay();
}

function onBtHide() {
  gridOptions.api.hideOverlay();
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return number.toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}


/* 
for (let i = 0; i < rowData.length; i++) {
  saldoTotal += rowData[i].total;
} */
let saldoTotal = window.localStorage.getItem("totalCaja");
var elementSaldoTotal = document.getElementById('fieldTotal');

//para darle formato de moneda al texto del campo
elementSaldoTotal.value = new Intl.NumberFormat('en-NZ', {
  style: 'currency',
  currency: 'NZD',
  minimumFractionDigits: 2,
}).format(saldoTotal);

if (saldoTotal < 0) {
  elementSaldoTotal.classList.add('fieldTotalRed');
}

var elmentoInput = document.getElementById("valor_input");

function myFunction() {
  var valueInput = elmentoInput.value;
  var cadena_sin_comas = "";
  if (isNaN(valueInput)) {
    elmentoInput.value = 0;
  } else if (valueInput.includes(",")) {
    var cadenas = valueInput.split(",");
    for (i = 0; i < cadenas.length; i++) {
      cadena_sin_comas = cadena_sin_comas + cadenas[i];
    }
    elmentoInput.value = new Intl.NumberFormat('es-MX').format(cadena_sin_comas);
  } else {
    elmentoInput.value = new Intl.NumberFormat('es-MX').format(valueInput);
  }
}

function validUppercase() {

  if (placaField.value !== "") {
    placaField.value = placaField.value.toUpperCase();
  }

  if (tipoVehiculoField.value !== "") {
    ciudad_field.disabled = false;

    placaField.disabled = false;
    if (tipoVehiculoField.value === "Motocicleta") {
      ciudad_field.value = 'Colombia';
      //ciudad_field.disabled = true;
      numCascosField.disabled = false;
      placaField.pattern = "^([A-Za-z]{3} [0-9]{2}[A-Za-z]{1}){1}?$"

    } else {
      //ciudad_field.disabled = false;
      ciudad_field.value = '';
      numCascosField.disabled = true;
      placaField.pattern = "^([A-Za-z]{3} [0-9]{3}){1}?$"
      numCascosField.value = 0;
    }
  } else if (tipoVehiculoField.value === '') {
    placaField.disabled = true;
    ciudad_field.disabled = true;

  }

}

function limpiarCampos() {
  tipoVehiculoField.value = '';
  placaField.value = '';
  numCascosField.value = 0;
  ciudad_field.value = '';
  ciudad_field.disabled = true;

  placaField.disabled = true;

}

/* function focusfun(){
    var valueInt = elmentoInput.value;
    console.log("valor del focus",valueInt);
}
 */
function habilitarNumCascos() {

  placaField.value = "";
  placaField.disabled = true;

  //console.log("numCascosField",tipoVehiculoField.value);
  validUppercase();

}

crearIngreso = () => {
  btnIngresar.disabled = true;

  if (tipoVehiculoField.value === "Motocicleta") {
    if (placaField.value !== "" && numCascosField.value !== "" && ciudad_field.value !== "") {
      //console.log("click en ingreso btn");
      let hoy = new Date();
      let fecha = `${hoy.getFullYear()}-${agregarCeroSiEsNecesario(hoy.getMonth() + 1)}-${agregarCeroSiEsNecesario(hoy.getDate())}`;//let fecha =  `${hoy.getFullYear()} + '-' + ${(hoy.getMonth() + 1)} + '-' + ${hoy.getDate()}`;let fecha =  hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
      let hora = `${agregarCeroSiEsNecesario(hoy.getHours())}:${agregarCeroSiEsNecesario(hoy.getMinutes())}:${agregarCeroSiEsNecesario(hoy.getSeconds())}`;// hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()let hora = `${agregarCeroSiEsNecesario(hoy.getHours())}:${agregarCeroSiEsNecesario(hoy.getMinutes())}:${agregarCeroSiEsNecesario(hoy.getSeconds())}`;
      let now = hoy.toLocaleString();

      var nuevoRegistro = {
        id: rowData.length + 1,
        tipo: tipoVehiculoField.value,
        placa: placaField.value,
        ciudad: ciudad_field.value,
        cascos: numCascosField.value,
        fecha: fecha,
        hora: hora,
        total: 600,
      }
      //console.log("nuevo registro a guardar en el rowData:",nuevoRegistro);
      setTimeout(() => {
        rowData.push(nuevoRegistro);
        window.localStorage.setItem("user", JSON.stringify(rowData));

        //console.log("rowdatanuevo:",rowData);
        //gridOptions.api.setRowData(gridOptions.rowData);
        actualizarTabla();

        //var eGridDiv = document.querySelector("#myGrid");
        //new agGrid.Grid(eGridDiv,gridOptions);

        cerrarModal();
      }, 500);
    } else {
      alert(`Por favor llene todos los campos!`);
      btnIngresar.disabled = false;
    }

  } else if (tipoVehiculoField.value === "Automóvil") {
    if (placaField.value !== "" && ciudad_field.value !== "") {
      //console.log("click en ingreso btn");
      let hoy = new Date();
      let fecha = `${hoy.getFullYear()}-${agregarCeroSiEsNecesario(hoy.getMonth() + 1)}-${agregarCeroSiEsNecesario(hoy.getDate())}`;//let fecha =  `${hoy.getFullYear()} + '-' + ${(hoy.getMonth() + 1)} + '-' + ${hoy.getDate()}`;
      let hora = `${agregarCeroSiEsNecesario(hoy.getHours())}:${agregarCeroSiEsNecesario(hoy.getMinutes())}:${agregarCeroSiEsNecesario(hoy.getSeconds())}`;// hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
      let now = hoy.toLocaleString();

      var nuevoRegistro = {
        id: rowData.length + 1,
        tipo: tipoVehiculoField.value,
        placa: placaField.value,
        ciudad: ciudad_field.value,
        cascos: numCascosField.value,
        fecha: fecha,
        hora: hora,
        total: 600,
      }
      //console.log("nuevo registro a guardar en el rowData:",nuevoRegistro);
      setTimeout(() => {
        rowData.push(nuevoRegistro);
        window.localStorage.setItem("user", JSON.stringify(rowData));
        //console.log("rowdatanuevo:",rowData);

        //gridOptions.api.setRowData(rowData);
        actualizarTabla();
        cerrarModal();
      }, 500);
    } else {
      alert(`Por favor llene todos los campos!`);
      btnIngresar.disabled =false;
    }
  } else {
    alert(`Por favor llene todos los campos!`);
    btnIngresar.disabled = false;
  }
}

function actualizarTabla() {

  console.log("entro a actualizar tabla");
  //onBtShowLoading();
  var tam = gridOptions.rowData.length;
  //console.log("tamanio rowdata:",tam);
  var fecha_actual = new Date();

  var nuevoArray = [];

  gridOptions.rowData.map(item => {
    var fecha_anterior = new Date(`${item.fecha}T${item.hora}`);
    var timeInit = fecha_anterior.getTime();
    var timeFinal = fecha_actual.getTime();
    let milisec = timeFinal - timeInit;
    let h = Math.floor(milisec / (1000 * 3600));

    milisec -= h * 1000 * 60 * 60;
    //    milisec -= parseInt(milisec );
    let m = Math.floor(milisec / (1000 * 60));

    milisec -= m * 1000 * 60;

    let s = Math.ceil(milisec / (1000));
    let totalHora = 0;

    if (h > 0) {
      totalHora = h * 1000;
    } else {
      totalHora = 0;
    }

    if(item.tipo === 'Automóvil'){
      if (m < 30 && h === 0) {
        item.total = 1200 + totalHora;
      } else if (m >= 30 && h === 0) {
        item.total = 1200 + (73 * Math.ceil((m - 30) / 5));
      } else if (h > 0) {
        item.total = totalHora + (83.333 * Math.ceil((m) / 5));
      }
    }else if (item.tipo === 'Motocicleta'){
      if (m < 30 && h === 0) {
        item.total = 600 + totalHora;
      } else if (m >= 30 && h === 0) {
        item.total = 600 + (66.5 * Math.ceil((m - 30) / 5));
      } else if (h > 0) {
        item.total = totalHora + (83.333 * Math.ceil((m) / 5));
      }
    }


    //console.log("total: $",item.total);

    //m < 30 ? item.total += totalHora : item.total = 600 + (100 * Math.ceil((m-30)/5));
    //console.log("milisegundos ms:",milisec);
    //console.log("segundos s:",s);
    //console.log("Minutos min:",m);
    //console.log("hora Hrs:",h);
    nuevoArray.push(item);
    //console.log("total:",nuevoArray);
    window.localStorage.setItem("user", JSON.stringify(nuevoArray));

  });
  gridOptions.api.setRowData(rowData);
  /* 
    setTimeout(() => {
      //onBtHide();
      gridOptions.api.setRowData(rowData);
    }, 500); */
}

function cerrarModal() {
  //console.log("ENTRO A CERRAR MODAL");
  modal.style.display = "none";
  ciudad_field.disabled = false;
  ciudad_field.value = '';
  limpiarCampos();
  btnIngresar.disabled = false;

}
var eGridDiv = document.querySelector("#myGrid");

new agGrid.Grid(eGridDiv, gridOptions);

/**para agregar el cero si es necesario */
const agregarCeroSiEsNecesario = valor => {
  if (valor < 10) {
    return "0" + valor;
  } else {
    return "" + valor;
  }
}


/**
 para limpiar el local storage
 */
function limpiarTodo() {
  //alert(`!Advertencia!. Se borrarán todos los datos almacenados.`);
  window.localStorage.clear();
  //window.localStorage.removeItem('user');
  gridOptions.rowData = [];
  actualizarTabla();

  location.reload();

}

window.onload = function () {
  setInterval(actualizarTabla, 60000);
  //console.log("entro a actualizar tabla");
}