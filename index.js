const fs = require('fs');


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
      console.log('Завдання додано.');
    }
  
    markTaskAsCompleted(title) {                                //Помітити як виканане
      const task = this.findTaskByTitle(title);
      if (task) {
        task.completed = true;
        task.completedDate = new Date();
        console.log('Завдання відмічено як виконане.');
      } else {
        console.log('Завдання не знайдено.');
      }
    }
  
    editTask(title, newTitle, newDescription, newDeadline) {            //Редагувати завдання
      const task = this.findTaskByTitle(title);
      if (task) {
        task.title = newTitle;
        task.description = newDescription;
        task.deadline = newDeadline;
        console.log('Завдання відредаговано.');
      } else {
        console.log('Завдання не знайдено.');
      }
    }
  
    deleteTask(title) {                                  // Видалити завдання
      const taskIndex = this.tasks.findIndex(task => task.title === title);
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        console.log('Завдання видалено.');
      } else {
        console.log('Завдання не знайдено.');
      }
    }
  
    findTaskByTitle(title) {
      return this.tasks.find(task => task.title === title);
    }
  
    showAllTasks() {                                          //Усі завдання
      console.log('Усі завдання:');
      this.tasks.forEach(task => {
        console.log(`Заголовок: ${task.title}`);
        console.log(`Опис: ${task.description || 'Немає'}`);
        console.log(`Дедлайн: ${task.deadline || 'Немає'}`);
        console.log(`Стан виконання: ${task.completed ? 'Виконане' : 'Не виконане'}`);
        console.log(`Дата виконання: ${task.completedDate || 'Немає'}`);
      });
    }
  
    showPendingTasks() {                            //Невиконані завдання
        console.log('Невиконані завдання:');
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
          console.log(`Заголовок: ${task.title}`);
          console.log(`Дедлайн: ${task.deadline || 'Немає'}`);
        });
      }
  
    showOverdueTasks() {                                //Протерміновані завданн
      console.log('Протерміновані завдання:');
      const currentDate = new Date();
      const overdueTasks = this.tasks.filter(task => !task.completed && task.deadline && task.deadline < currentDate);
      overdueTasks.forEach(task => {
        console.log(`Заголовок: ${task.title}`);
        console.log(`Дедлайн: ${task.deadline || 'Немає'}`);
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