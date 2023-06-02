const fs = require('fs');
const TaskTracker = require('../taskTracker.js');
const Task = require('../task.js');
const readline = require('readline');
const rl = require('../rl.js');
// Mock console.log
console.log = jest.fn();

describe('TaskTracker', () => {
  let taskTracker;

  beforeEach(() => {
    taskTracker = new TaskTracker();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addTask', () => {
    it('should add a task and log "Task added."', () => {
      const title = 'Task 1';
      const description = 'Task 1 description';
      const deadline = new Date('2023-06-01');

      taskTracker.addTask(title, description, deadline);

      expect(taskTracker.tasks.length).toBe(1);
      expect(taskTracker.tasks[0]).toBeInstanceOf(Task);
      expect(taskTracker.tasks[0].title).toBe(title);
      expect(taskTracker.tasks[0].description).toBe(description);
      expect(taskTracker.tasks[0].deadline).toBe(deadline);
      expect(console.log).toHaveBeenCalledWith('Task added.');
    });
  });

  describe('markTaskAsCompleted', () => {
    it('should mark a task as completed and log "The task is marked as completed."', () => {
      const title = 'Task 1';
      const task = new Task(title);
      taskTracker.tasks.push(task);

      taskTracker.markTaskAsCompleted(title);

      expect(task.completed).toBe(true);
      expect(task.completedDate).toBeInstanceOf(Date);
      expect(console.log).toHaveBeenCalledWith('The task is marked as completed.');
    });

    it('should log "No task found." when task with the given title is not found', () => {
      const title = 'Task 1';

      taskTracker.markTaskAsCompleted(title);

      expect(console.log).toHaveBeenCalledWith('No task found.');
    });
  });

  describe('editTask', () => {
    it('should edit a task and log "The task has been edited."', () => {
      const title = 'Task 1';
      const task = new Task(title);
      taskTracker.tasks.push(task);

      const newTitle = 'Task 1 (Updated)';
      const newDescription = 'Task 1 updated description';
      const newDeadline = new Date('2023-06-02');

      taskTracker.editTask(title, newTitle, newDescription, newDeadline);

      expect(task.title).toBe(newTitle);
      expect(task.description).toBe(newDescription);
      expect(task.deadline).toBe(newDeadline);
      expect(console.log).toHaveBeenCalledWith('The task has been edited.');
    });

    it('should log "No task found." when task with the given title is not found', () => {
      const title = 'Task 1';

      taskTracker.editTask(title, 'Updated Task', 'Updated description', new Date('2023-06-02'));

      expect(console.log).toHaveBeenCalledWith('No task found.');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and log "The task has been deleted."', () => {
      const title = 'Task 1';
      const task = new Task(title);
      taskTracker.tasks.push(task);

      taskTracker.deleteTask(title);

      expect(taskTracker.tasks.length).toBe(0);
      expect(console.log).toHaveBeenCalledWith('The task has been deleted.');
    });

    it('should log "No task found." when task with the given title is not found', () => {
      const title = 'Task 1';

      taskTracker.deleteTask(title);

      expect(console.log).toHaveBeenCalledWith('No task found.');
    });
  });

  describe('findTaskByTitle', () => {
    it('should return the task with the given title if found', () => {
      const title = 'Task 1';
      const task = new Task(title);
      taskTracker.tasks.push(task);

      const foundTask = taskTracker.findTaskByTitle(title);

      expect(foundTask).toBe(task);
    });

    it('should return undefined if no task with the given title is found', () => {
      const title = 'Task 1';

      const foundTask = taskTracker.findTaskByTitle(title);

      expect(foundTask).toBeUndefined();
    });
  });

  describe('showAllTasks', () => {
    it('should log all tasks with their details', () => {
      const task1 = new Task('Task 1', 'Description 1', new Date('2023-06-01'));
      taskTracker.tasks.push(task1);
      const task2 = new Task('Task 2');
      taskTracker.tasks.push(task2);
  
      taskTracker.showAllTasks();
  
      expect(console.log).toHaveBeenCalledWith('All tasks:');
      expect(console.log).toHaveBeenCalledWith(`Title: ${task1.title}`);
      expect(console.log).toHaveBeenCalledWith(`Description: ${task1.description}`);
      expect(console.log).toHaveBeenCalledWith(`Deadline: ${task1.deadline}`);
      expect(console.log).toHaveBeenCalledWith(`Execution status: ${task1.completed ? 'Completed' : 'Not done'}`);
      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Completed date: null|\w+/));
      expect(console.log).toHaveBeenCalledWith(`Title: ${task2.title}`);
      expect(console.log).toHaveBeenCalledWith(`Description: There is none`);
      expect(console.log).toHaveBeenCalledWith(`Deadline: There is none`);
      expect(console.log).toHaveBeenCalledWith(`Execution status: ${task2.completed ? 'Completed' : 'Not done'}`);
      expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/Completed date: null|\w+/));
    });
  });
  
  describe('showPendingTasks', () => {
    it('should log pending tasks sorted by deadline', () => {
      const task1 = new Task('Task 1', 'Description 1', new Date('2023-06-02'));
      taskTracker.tasks.push(task1);
      const task2 = new Task('Task 2', 'Description 2', new Date('2023-06-01'));
      taskTracker.tasks.push(task2);
      const task3 = new Task('Task 3', 'Description 3');
      taskTracker.tasks.push(task3);

      taskTracker.showPendingTasks();

      expect(console.log).toHaveBeenCalledWith('Unfinished tasks:');
      expect(console.log).toHaveBeenCalledWith(`Title: ${task2.title}`);
      expect(console.log).toHaveBeenCalledWith(`Deadline: ${task2.deadline}`);
      expect(console.log).toHaveBeenCalledWith(`Title: ${task1.title}`);
      expect(console.log).toHaveBeenCalledWith(`Deadline: ${task1.deadline}`);
      expect(console.log).toHaveBeenCalledWith(`Title: ${task3.title}`);
      expect(console.log).toHaveBeenCalledWith(`Deadline: There is none`);
    });
  });

  describe('showOverdueTasks', () => {
    it('should log overdue tasks', () => {
      const currentDate = new Date('2023-06-03');
      const task1 = new Task('Task 1', 'Description 1', new Date('2023-06-01'));
      taskTracker.tasks.push(task1);
      const task2 = new Task('Task 2', 'Description 2', new Date('2023-06-02'));
      taskTracker.tasks.push(task2);
      const task3 = new Task('Task 3', 'Description 3', new Date('2023-06-03'));
      taskTracker.tasks.push(task3);

      jest.spyOn(global, 'Date').mockImplementation(() => currentDate);

      taskTracker.showOverdueTasks();

      expect(console.log).toHaveBeenCalledWith('Overdue tasks:');
      expect(console.log).toHaveBeenCalledWith(`Title: ${task1.title}`);
      expect(console.log).toHaveBeenCalledWith(`Deadline: ${task1.deadline}`);
    });
  });

  describe('saveToFile', () => {
    it('should save tasks to a JSON file and log "The tasks have been successfully stored in a file."', () => {
        const filePath = 'tasks.json';
        const tasksData = [{ title: 'Task 1' }, { title: 'Task 2' }];
        taskTracker.tasks = tasksData.map((taskData) => new Task(taskData.title));
      
        fs.writeFileSync = jest.fn();
      
        taskTracker.saveToFile();
      
        expect(fs.writeFileSync).toHaveBeenCalledWith(
          filePath,
          expect.stringMatching(JSON.stringify(tasksData, null, 2))
        );
        expect(console.log).toHaveBeenCalledWith('The tasks have been successfully stored in a file.');
      });
      
    it('should log an error message when an error occurs while saving tasks to a file', () => {
      const errorMessage = 'File write error';
      fs.writeFileSync = jest.fn(() => {
        throw new Error(errorMessage);
      });

      taskTracker.saveToFile();

      expect(console.log).toHaveBeenCalledWith('Error occurred while saving tasks to file:', errorMessage);
    });
  });

  describe('loadFromFile', () => {
    it('should load tasks from a JSON file and log "Tasks loaded from file."', () => {
      const filePath = 'tasks.json';
      const tasksData = [{ title: 'Task 1' }, { title: 'Task 2' }];
      const fileContent = JSON.stringify(tasksData);
      fs.readFileSync = jest.fn(() => fileContent);

      taskTracker.loadFromFile();

      expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
      expect(taskTracker.tasks.length).toBe(2);
      expect(taskTracker.tasks[0]).toBeInstanceOf(Task);
      expect(taskTracker.tasks[0].title).toBe(tasksData[0].title);
      expect(taskTracker.tasks[1]).toBeInstanceOf(Task);
      expect(taskTracker.tasks[1].title).toBe(tasksData[1].title);
      expect(console.log).toHaveBeenCalledWith('Tasks loaded from file.');
    });

    it('should log an error message when an error occurs while loading tasks from a file', () => {
      const errorMessage = 'File read error';
      fs.readFileSync = jest.fn(() => {
        throw new Error(errorMessage);
      });

      taskTracker.loadFromFile();

      expect(console.log).toHaveBeenCalledWith('Error occurred while loading tasks from file:', errorMessage);
    });

    it('should log "Invalid file format. Unable to load tasks." when the file does not contain an array of tasks', () => {
      const filePath = 'tasks.json';
      const fileContent = '{"title": "Task 1"}';
      fs.readFileSync = jest.fn(() => fileContent);

      taskTracker.loadFromFile();

      expect(console.log).toHaveBeenCalledWith('Invalid file format. Unable to load tasks.');
    });
  });
});
