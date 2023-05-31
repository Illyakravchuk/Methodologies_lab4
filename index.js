const fs = require('fs');
const readline = require('readline');

class Task {
    constructor(title, description, deadline) {
      this.title = title;
      this.description = description;
      this.deadline = deadline;
      this.completed = false;
      this.completedDate = null;
    }
  }
  
  class TaskTracker {
    constructor() {
      this.tasks = [];
    }
  
    addTask(title, description, deadline) {                        //Додати завдання
      const task = new Task(title, description, deadline);
      this.tasks.push(task);
      console.log('Task added.');
    }
  
    markTaskAsCompleted(title) {                                //Помітити як виканане
      const task = this.findTaskByTitle(title);
      if (task) {
        task.completed = true;
        task.completedDate = new Date();
        console.log('The task is marked as completed.');
      } else {
        console.log('No task found.');
      }
    }
  
    editTask(title, newTitle, newDescription, newDeadline) {            //Редагувати завдання
      const task = this.findTaskByTitle(title);
      if (task) {
        task.title = newTitle;
        task.description = newDescription;
        task.deadline = newDeadline;
        console.log('The task has been edited.');
      } else {
        console.log('No task found.');
      }
    }
  
    deleteTask(title) {                                  // Видалити завдання
      const taskIndex = this.tasks.findIndex(task => task.title === title);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        console.log('The task has been deleted.');
      } else {
        console.log('No task found.');
      }
    }
  
    findTaskByTitle(title) {
      return this.tasks.find(task => task.title === title);
    }
  
    showAllTasks() {                                          //Усі завдання
      console.log('All tasks:');
      this.tasks.forEach(task => {
        console.log(`Title: ${task.title}`);
        console.log(`Description: ${task.description || 'There is none'}`);
        console.log(`Deadline: ${task.deadline || 'There is none'}`);
        console.log(`Стан виконання: ${task.completed ? 'Completed' : 'Not done'}`);
        console.log(`Execution status: ${task.completedDate || 'There is none'}`);
      });
    }
  
    showPendingTasks() {                            //Невиконані завдання
        console.log('Unfinished tasks:');
        const pendingTasks = this.tasks.filter(task => !task.completed);
        const sortedTasks = pendingTasks.sort((a, b) => {
          if (a.deadline && b.deadline) {
            return a.deadline - b.deadline;
          } else if (a.deadline) {
            return -1;
          } else if (b.deadline) {
            return 1;
          } else {
            return 0;
          }
        });
        sortedTasks.forEach(task => {
          console.log(`Title: ${task.title}`);
          console.log(`Deadline: ${task.deadline || 'There is none'}`);
        });
      }
  
    showOverdueTasks() {                                //Протерміновані завданн
      console.log('Overdue tasks:');
      const currentDate = new Date();
      const overdueTasks = this.tasks.filter(task => !task.completed && task.deadline && task.deadline < currentDate);
      overdueTasks.forEach(task => {
        console.log(`Title: ${task.title}`);
        console.log(`Deadline: ${task.deadline || 'There is none'}`);
      });
    }

    // saveToFile() метод, який відповідає за збереження завдань у файл JSON
    saveToFile() {
      const filePath = 'task.json';
      const tasksData = JSON.stringify(this.tasks, null, 2);


      try {
        fs.writeFileSync(filePath, tasksData);
        console.log('The task has been successfully stored in a file.');
      } catch (error) {
        console.log('Error occurred while saving tasks to file:', error.message);
      }
    }

    // loadFromFile() метод, який відповідає за читання завдань із файлу JSON
    loadFromFile() {
      const filePath = 'task.json';


      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const tasks = JSON.parse(fileContent);

        if (Array.isArray(tasks)) {
          tasks.forEach(taskData => {
            const { title, description, deadline, completed, completedDate } = taskData;
            const task = new Task(title, description, deadline);
            task.completed = completed;
            task.completedDate = completedDate;
            this.tasks.push(task);
          });

          console.log('Tasks loaded from file.');
        } else {
          console.log('Invalid file format. Unable to load tasks.');
        }
      } catch (error) {
        console.log('Error occurred while loading tasks from file:', error.message);
      }
    }
  }

  
  const tracker = new TaskTracker();

// Створення інтерфейсу для зчитування введення з консолі
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Функція для обробки команди "add"
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

// Функція для обробки команди "complete"
function handleCompleteCommand() {
  rl.question('Enter task title to mark as completed: ', (title) => {
    tracker.markTaskAsCompleted(title);
    rl.prompt();
  });
}

// Функція для обробки команди "edit"
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

// Функція для обробки команди "delete"
function handleDeleteCommand() {
  rl.question('Enter task title to delete: ', (title) => {
    tracker.deleteTask(title);
    rl.prompt();
  });
}

// Функція для обробки команди "show all"
function handleShowAllCommand() {
  tracker.showAllTasks();
  rl.prompt();
}

// Функція для обробки команди "show pending"
function handleShowPendingCommand() {
  tracker.showPendingTasks();
  rl.prompt();
}

// Функція для обробки команди "show overdue"
function handleShowOverdueCommand() {
  tracker.showOverdueTasks();
  rl.prompt();
}

// Функція для обробки команди "save"
function handleSaveCommand() {
  tracker.saveToFile();
  rl.prompt();
}

// Функція для обробки команди "load"
function handleLoadCommand() {
  tracker.loadFromFile();
  rl.prompt();
}

// Обробка введених команд
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

// Виведення повідомлення і отримання першої команди
console.log('Task Tracker');
rl.prompt();