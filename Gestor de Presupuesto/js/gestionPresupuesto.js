// TODO: Variables globales
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


// TODO: Funciones adicionales


function actualizarPresupuesto(valor) {
  
  if (typeof valor === "number" && valor >= 0) {
    presupuesto = valor;
    return presupuesto;
  } else {
    
    console.log("el valor debe ser un numero no negativo");
    return -1;
  }
}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";

}

function CrearGasto(descripcion, valor, fechaStr) {
    // TODO
    if (typeof valor !== "number" || valor < 0 ){
        valor = 0
    }
  
    this.descripcion = descripcion;
    this.valor = valor;

    let timestamp;
    if (typeof fechaStr === "string") {
      const parsed = Date.parse(fechaStr);
      if (!isNaN(parsed)) {
        timestamp = parsed
      } else{
        timestamp = Date.now();
      } 
    } else {
      timestamp = Date.now();
    }

    this.fecha = timestamp;

    this.etiquetas = [];

    this.mostrarGasto = function(){
      return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };

    this.actualizarDescripcion = function(nuevaDescripcion){
      this.descripcion = nuevaDescripcion;
    };
    
    this.actualizarValor = function(nuevoValor){
      if (typeof nuevoValor === "number" && nuevoValor >= 0){
        this.valor = nuevoValor;
      } else {
        console.log("el valor debe ser un numero negativo.")
      }
    };

    this.mostrarGastoCompleto = function(){
     const fechaLocal = new Date(this.fecha).toLocaleString();
     let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
     texto += `Fecha: ${fechaLocal}\n`;

    if (this.etiquetas.length > 0) {
      texto += "Etiquetas:\n";
      for (let et of this.etiquetas) {
        texto += `- ${et}\n`;
      }
    }
      return texto;
   };

    this.actualizarFecha = function(nuevaFechaStr){
      const parsed = Date.parse(nuevaFechaStr);
      if (!isNaN(parsed)) {
        this.fecha = parsed;
      }
    };

    this.anyadirEtiquetas = function(){
      for (let i = 0; i < arguments.length; i++){
        const et = arguments[i];
        if (this.etiquetas.indexOf(et) === -1){
          this.etiquetas.push(et);
        }
      }
    };

    this.borrarEtiquetas = function(etiqueta){
      for (let i = 0; i < arguments.length; i++){
        const et = arguments[i];
        const index = this.etiquetas.indexOf(et);
        if (index !== -1){
          this.etiquetas.splice(index, 1);
        }
      }

      if (this.etiquetas.length === 0){
        this.etiquetas = [];
      }
    };

    if (arguments.length > 3){
      const extras = [];
      for (let i = 3; i < arguments.length; i++){
        extras.push(arguments[i]);
      }
      this.anyadirEtiquetas.apply(this, extras);
  }
}


function listarGastos(){
  return gastos;
}

function anyadirGasto(gasto){
  gasto.id = idGasto;
  idGasto = idGasto + 1;
  gastos.push(gasto);
}

function borrarGasto(id){
  for (let i = 0; i < gastos.length; i++){
    if (gastos[i].id === id) {
      gastos.splice(i, 1);
      break;
    }
  }
}

function calcularTotalGastos(){
  let total = 0;
  for (let i= 0; i< gastos.length; i++){
    total += gastos[i].valor;
  }
  return total;
}

function calcularBalance(){
  return presupuesto - calcularTotalGastos();
}

// Exportación de funciones
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
};
