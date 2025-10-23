/*

1. Skapa todos
2. Lista upp todos
3. Radera todos
4. Uppdatera todos
    - Markera som avklarad
    - Byta namn

*/

import readline from "readline-sync";

const todos = [
  {
    title: "Köpa mat",
    deadline: new Date("2025-10-20"),
    status: "oklar",
  },
  {
    title: "Lämna in rapport",
    deadline: new Date("2025-10-18"),
    status: "oklar",
  },
  {
    title: "Träna på gymmet",
    deadline: new Date("2025-10-17"),
    status: "oklar",
  },
  {
    title: "Ringa tandläkaren",
    deadline: new Date("2025-10-25"),
    status: "oklar",
  },
  {
    title: "Fixa med bil service",
    deadline: new Date("2025-11-01"),
    status: "oklar",
  },
  {
    title: "Planera semester",
    deadline: new Date("2025-12-15"),
    status: "oklar",
  },
  {
    title: "Betala räkningar",
    deadline: new Date("2025-10-30"),
    status: "oklar",
  },
  {
    title: "Städa lägenheten",
    deadline: new Date("2025-10-19"),
    status: "oklar",
  },
];

function showMenu() {
  console.log("\nVälkommen till todo applikationen!");
  console.log("Du har dessa val tillgängliga:");
  console.log("1. Skapa en ny todo");
  console.log("2. Visa alla todos");
  console.log("3. Radera en todo");
  console.log("4. Gör ändringar i todos");
  console.log("5. Avsluta applikationen");
}



let keepRunning = true;
while (keepRunning) {
  console.clear();
  showMenu();
  const choiceString = readline.question("Vad vill du göra? ");
  const choice = Number.parseInt(choiceString);

  switch (choice) {
    case 1: {
      createTodo();
      break;
    }
    case 2: {
      listTodos();
      break;
    }
    case 3: {
      deleteTodo();
      break;
    }
    case 4: {
      console.clear();
      listTodos();
      
      let index;
      try{
        index = getValidIndex("Vilken index vill du ändra på ");
      }catch (err) {
        console.log("Detta var inte en index");
        let enter = readline.keyInPause();
        break;
      }
      
      const changesChoice = changesMenu();

      switch(changesChoice){
        case 1:{
            changeStatus(index);
            break;
        }
         case 2:{
            changeName(index);
            break;
        }
         case 3:{
            changeDeadline(index);
            break;
        }
        default:{
            console.log("Något gick fel...")
            break;
        }
      }
      break;
    }
    case 5: {
      keepRunning = false;
      break;
    }
    default:
      console.log("Det valet finns inte! Prova igen.");
  }

  console.log("");
}

console.log("Applikationen avslutas!");

function createTodo() {
  const title = readline.question("Vad vill du kalla todo:n för? ");
  const deadlineString = readline.question(
    "När ska denna todo göras? (ÅÅÅÅ-MM-DD) "
  );

  // Omvandlar en sträng till ett riktigt datum objekt
  const deadlineTime = Date.parse(deadlineString);
  const deadline = new Date(deadlineTime);

  const todo = {
    title: title,
    deadline: deadline,
    status: "oklar",
  };

  todos.push(todo);

  console.log("En ny todo har skapats!");
}

function listTodos() {
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    console.log(" - (" + i + ") " + todo.title);
    console.log("    Deadline: " + formatDate(todo.deadline));
    console.log("    Status: " + todo.status);
  }
}
//Visa en todo
function listOneTodo(index){

  const todo = todos[index];

  console.log("\nUppdaterad todo ---------------------------");
  console.log(" - (" + index + ") " + todo.title);
  console.log("    Deadline: " + formatDate(todo.deadline));
  console.log("    Status: " + todo.status);
  console.log("--------------------------------------------");

  let enter = readline.keyInPause();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
  //return year + "-" + month + "-" + day + " " + hour + ":" + minute;
}

function deleteTodo() {
  const indexString = readline.question("Vilken index vill du radera? ");
  const index = Number.parseInt(indexString);

  const removedTodos = todos.splice(index, 1);
  const removedTodo = removedTodos[0];

  console.log("Todo '" + removedTodo.title + "' has raderats!");
  // todos.filter() man skulle även kunna använda filter
}

// Tillägg
function changeStatus(index){
    const status = getNumber("Ändra status, 1 (påbörjade) 2 (avklarade) ");

    if (status === 1){
        
        todos[index].status = "påbörjad"
        listOneTodo(index);

    } else if (status === 2){
        
        todos[index].status = "avklarad"
        listOneTodo(index);
    }
    else{
        console.log("Detta är inte ett val ")
    }
    let enter = readline.keyInPause();
    
}

function changeName(index){
  const nameString = readline.question("Skriv nya namnet: ");
    
  todos[index].title = nameString;
  listOneTodo(index);
}
function changeDeadline(index){
  const deadlineString = readline.question(
    "När ska denna todo göras? (ÅÅÅÅ-MM-DD) "
  );

  
  const deadlineTime = Date.parse(deadlineString);
  const deadline = new Date(deadlineTime);

  todos[index].deadline = deadline;
  listOneTodo(index);
}
function changesMenu(){
  console.log("1: Ändra Status");
  console.log("2: Ändra Namn");
  console.log("3: Ändra Deadline");

  const index = getNumber("Vad vill du göra? ");

  return index;
 
}

function getNumber(message){
  
  const numString = readline.question(message);
  const num = Number.parseInt(numString);
  
  return num;
}
function getValidIndex(message){
  
  const numString = readline.question(message);
  const num = Number.parseInt(numString);

  if (num < 0 || num >= todos.length){
    throw new Error("index out of range");
  }
  
  if(Number.isNaN(num)){
    throw new Error("Not a number");
  }
  
  return num;
}