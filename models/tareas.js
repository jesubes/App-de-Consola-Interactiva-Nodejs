const colors = require("colors");
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea ( id = '' ) {

    if ( this._listado [ id ] ) {
      delete this._listado[ id ]
    }

  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((data) => {
      this._listado[data.id] = data;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    //1: en verde la enumeracion de las tareas
    //Completada : en verde
    //Pendiente: en rojo
    // ejemplo --> 1. Pasear :: Completada | Pendiente

    console.log()
    this.listadoArr.forEach( ( tarea, index ) => {

      const idx = `${ index + 1 }.`.green
      const { desc, completadoEn } = tarea
      const estado = ( completadoEn )
                        ? 'Completada'.green
                        : 'Pendiente'.red

      console.log(`${ idx } ${desc}  ::  ${estado}`)

    })
  }

  listarPendientesCompletadas ( completadas = true ) {
    console.log()
    let contador = 0
    this.listadoArr.forEach( ( tarea ) => {

      const { desc, completadoEn } = tarea
      const estado = ( completadoEn )
                        ? `${completadoEn}`.green
                        : 'Pendiente'.red
      if(completadas && completadoEn){
        contador += 1
        console.log(`${ (contador + '.').green } ${desc}  ::  ${estado}`)

      }else if(!completadas && !completadoEn){
        contador += 1
        console.log(`${ (contador + '.').green } ${desc}  ::  ${estado}`)
      }
    })
  }

  toggleCompletadas( ids = [] ) {
     
    ids.forEach( id => {

      const tarea = this._listado[ id ]

      if( !tarea.completadoEn ) {
        tarea.completadoEn = new Date().toISOString()
      }
     })

     this.listadoArr.forEach( tarea => {
      if( !ids.includes( tarea.id)) {
        this._listado[ tarea.id ].completadoEn = null
      }
     })

  }
}

module.exports = Tareas;
