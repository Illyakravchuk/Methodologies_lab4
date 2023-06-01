const readline = require('readline');
const TaskTracker = require('./taskTracker');

const tracker = new TaskTracker();

// Creating an interface for reading input from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to handle the "add" command
function handleAddCommand() {
  rl.question('Enter task title: ', (title) => {
    rl.question('Enter task description: ', (description) => {
      rl.question('Enter task deadline: ', (deadline) => {
        tracker.addTask(title, description, deadline);
        rl.prompt();
      });
    });
  });
}

// Function to handle the "complete" command
function handleCompleteCommand() {
  rl.question('Enter task title to mark as completed: ', (title) => {
    tracker.markTaskAsCompleted(title);
    rl.prompt();
  });
}

// Function to handle the "edit" command
function handleEditCommand() {
  rl.question('Enter task title to edit: ', (title) => {
    rl.question('Enter new title: ', (newTitle) => {
      rl.question('Enter new description: ', (newDescription) => {
        rl.question('Enter new deadline: ', (newDeadline) => {
          tracker.editTask(title, newTitle, newDescription, newDeadline);
          rl.prompt();
        });
      });
    });
  });
}

// Function to handle the "delete" command
function handleDeleteCommand() {
  rl.question('Enter task title to delete: ', (title) => {
    tracker.deleteTask(title);
    rl.prompt();
  });
}

// Function to handle the "show all" command
function handleShowAllCommand() {
  tracker.showAllTasks();
  rl.prompt();
}

// Function to handle the "show pending" command
function handleShowPendingCommand() {
  tracker.showPendingTasks();
  rl.prompt();
}

// Function to handle the "show overdue" command
function handleShowOverdueCommand() {
  tracker.showOverdueTasks();
  rl.prompt();
}

// Function to handle the "save" command
function handleSaveCommand() {
  tracker.saveToFile();
  rl.prompt();
}

// Function to handle the "load" command
function handleLoadCommand() {
  tracker.loadFromFile();
  rl.prompt();
}

// Handling the entered commands
rl.on('line', (input) => {
  const command = input.trim().toLowerCase();
  switch (command) {
    case 'add':
      handleAddCommand();
      break;
    case 'complete':
      handleCompleteCommand();
      break;
    case 'edit':
      handleEditCommand();
      break;
    case 'delete':
      handleDeleteCommand();
      break;
    case 'show all':
      handleShowAllCommand();
      break;
    case 'show pending':
      handleShowPendingCommand();
      break;
    case 'show overdue':
      handleShowOverdueCommand();
      break;
    case 'save':
      handleSaveCommand();
      break;
    case 'load':
      handleLoadCommand();
      break;
    default:
      console.log('Invalid command. Please try again.');
      rl.prompt();
      break;
  }
});

// Displaying a message and receiving the first command
console.log('Task Tracker');
rl.prompt();
