const fs = require('fs');
const readline = require('readline');
const Task = require('./task');

class TaskTracker {
  constructor() {
    this.tasks = [];
  }

  addTask(title, description, deadline) { // Add a task
    const task = new Task(title, description, deadline);
    this.tasks.push(task);
    console.log('Task added.');
  }

  markTaskAsCompleted(title) { // Mark as completed
    const task = this.findTaskByTitle(title);
    if (task) {
      task.completed = true;
      task.completedDate = new Date();
      console.log('The task is marked as completed.');
    } else {
      console.log('No task found.');
    }
  }

  editTask(title, newTitle, newDescription, newDeadline) { // Edit a task
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

  deleteTask(title) { // Delete a task
    const taskIndex = this.tasks.findIndex((task) => task.title === title);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      console.log('The task has been deleted.');
    } else {
      console.log('No task found.');
    }
  }

  findTaskByTitle(title) {
    return this.tasks.find((task) => task.title === title);
  }

  showAllTasks() { // Show all tasks
    console.log('All tasks:');
    this.tasks.forEach((task) => {
      console.log(`Title: ${task.title}`);
      console.log(`Description: ${task.description || 'There is none'}`);
      console.log(`Deadline: ${task.deadline || 'There is none'}`);
      console.log(`Execution status: ${task.completed ? 'Completed' : 'Not done'}`);
      console.log(`Completed date: ${task.completedDate || 'There is none'}`);
    });
  }

  showPendingTasks() { // Show pending tasks
    console.log('Unfinished tasks:');
    const pendingTasks = this.tasks.filter((task) => !task.completed);
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
    sortedTasks.forEach((task) => {
      console.log(`Title: ${task.title}`);
      console.log(`Deadline: ${task.deadline || 'There is none'}`);
    });
  }

  showOverdueTasks() { // Show overdue tasks
    console.log('Overdue tasks:');
    const currentDate = new Date();
    const overdueTasks = this.tasks.filter((task) => !task.completed && task.deadline && task.deadline < currentDate);
    overdueTasks.forEach((task) => {
      console.log(`Title: ${task.title}`);
      console.log(`Deadline: ${task.deadline || 'There is none'}`);
    });
  }

  saveToFile() { // Method responsible for saving tasks to a JSON file
    const filePath = 'tasks.json';
    const tasksData = JSON.stringify(this.tasks, null, 2);

    try {
      fs.writeFileSync(filePath, tasksData);
      console.log('The tasks have been successfully stored in a file.');
    } catch (error) {
      console.log('Error occurred while saving tasks to file:', error.message);
    }
  }

  loadFromFile() { // Method responsible for reading tasks from a JSON file
    const filePath = 'tasks.json';

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const tasks = JSON.parse(fileContent);

      if (Array.isArray(tasks)) {
        this.tasks = tasks.map((taskData) => {
          const { title, description, deadline, completed, completedDate } = taskData;
          const task = new Task(title, description, deadline);
          task.completed = completed;
          task.completedDate = completedDate;
          return task;
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

module.exports = TaskTracker;