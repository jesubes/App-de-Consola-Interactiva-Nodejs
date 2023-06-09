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
        name: `${ '1.'.brightGreen} Crear Tarea`,
      },
      {
        value: "2",
        name: `${ '2.'.brightGreen} Listar Tareas `,
      },
      {
        value: "3",
        name: `${ '3.'.brightGreen} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${ '4.'.brightGreen} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${ '5.'.brightGreen} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${ '6.'.brightGreen} Borrar Tareas`,
      },
      {
        value: "0",
        name: `${ '0.'.brightGreen} Salir`,
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

  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar =  async ( tareas = [] ) => {
  const choices =  tareas.map ( ( tarea, i ) => {

    const idx = `${ i+1 }.`.green

    return {
      value: tarea.id,
      name: `${ idx } ${ tarea.desc }`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices

    }
  ]

  const { id  } = await inquirer.prompt( preguntas )

  return id

}

const confirmar = async ( message ) => {
  
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];
  
  const { ok  } = await inquirer.prompt( question )
  
  return ok;
  
}

const mostarListadoChecklist  =  async ( tareas = [] ) => {
  const choices =  tareas.map ( ( tarea, i ) => {

    const idx = `${ i+1 }.`.green

    return {
      value: tarea.id,
      name: `${ idx } ${ tarea.desc }`,
      checked: ( tarea.completadoEn ) ? true : false
    }
  })

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'selecciones', 
      choices

    }
  ]

  const { ids  } = await inquirer.prompt( pregunta )

  return ids

}

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostarListadoChecklist 
};
