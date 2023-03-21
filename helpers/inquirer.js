const inquirer = require("inquirer");
require("colors");

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      {
        value: "1",
        name: "1. Crear tarea",
      },
      {
        value: "2",
        name: "2. Listar tareas",
      },
      {
        value: "3",
        name: "3. Listar Tareas completadas",
      },
      {
        value: "4",
        name: "4. Listar Tareas Pendientes",
      },
      {
        value: "5",
        name: "5. Completar tarea(s)",
      },
      {
        value: "6",
        name: "6. Borrar tarea",
      },
      {
        value: "0",
        name: "0. Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("========================".green);
  console.log(" Seleccione una opción ".bold.bgBrightGreen);
  console.log("========================\n".green);

  const { opcion } = await inquirer.prompt(menuOpts);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"Enter".brightGreen} para continuar...`,
    },
  ];

  console.log('\n')
  await inquirer.prompt(question);
};

module.exports = {
  inquirerMenu,
  pausa,
};
