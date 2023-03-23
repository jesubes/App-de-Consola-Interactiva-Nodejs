require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo.js");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostarListadoChecklist
} = require("./helpers/inquirer.js");

const Tareas = require("./models/tareas.js");

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //imprimir el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      case "2": // listar todas las tareas
        tareas.listadoCompleto();
        break;

        case "3": // listar completadas
        tareas.listarPendientesCompletadas(true);
        break;
        
      case "4": // listar pendientes
      tareas.listarPendientesCompletadas(false);
      break;

      case '5': // completado | pendiente
        const ids = await mostarListadoChecklist( tareas.listadoArr )
        tareas.toggleCompletadas( ids )

        break

      case "6": // borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== '0') {
                // Preguntar si esta seguro
          const ok = await confirmar("Esta seguro?");

          if (ok) {
            tareas.borrarTarea(id);
            console.log("\nTarea Borrada Correctamente");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
