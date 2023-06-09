const { rejects } = require("assert");

require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("========================".green);
    console.log(" Seleccione una opción ".bold.bgBrightGreen);
    console.log("========================\n".green);

    console.log(`${"1".green}. Crear tarea`);
    console.log(`${"2".green}. Listar Tareas`);
    console.log(`${"3".green}. Listar Tareas completadas`);
    console.log(`${"4".green}. Listar Tareas pendientes`);
    console.log(`${"5".green}. Completar Tarea(s)`);
    console.log(`${"6".green}. Borrar tarea`);
    console.log(`${"0".green}. Salir \n`);

    //mostrar y recibir informacion del usuario con process.stdin y process.stdout
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`Seleccione una opción ${ '--->'.brightBlue }`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"ENTER".green} para Continuar `, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa,
};
