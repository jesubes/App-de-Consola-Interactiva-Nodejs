
require("colors");

const { inquirerMenu, pausa } = require("./helpers/inquirer.js");
const Tarea = require("./models/tarea.js");
const Tareas = require("./models/tareas.js");

console.clear()

const main = async () => {

  let opt = ''

  do{
    // opt = await inquirerMenu()
    // console.log({opt })
    const tareas = new Tareas()
    const tarea = new Tarea('comprar comida')

    tareas._listado[tarea.id] = tarea

    console.log(tareas)


    await pausa()

  }while( opt !== '0')


};

main();
