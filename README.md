## Methodologies_lab4

# Task Manager

## [Design document](https://docs.google.com/document/d/1-ffyT4KuQeuLafxj1x7n-A_iA3BmjE4l6fe1D8Jsfzw/edit?usp=sharing)

## Description

The Task Manager is a command-line application that allows you to manage your tasks and deadlines. With this application, you can add tasks, edit them, mark them as completed, and delete tasks. It provides both interactive and non-interactive modes of operation. In the interactive mode, you can enter commands directly in the command-line interface, while in the non-interactive mode, you can pass commands and arguments as command-line arguments. The application uses a TaskTracker object to manage the tasks, which are stored in memory. The tasks can be saved to and loaded from a file in JSON format. The application provides various commands, such as add, complete, edit, delete, show all, show pending, show overdue, save, and load, to perform different actions on the tasks. The interactiveInput and nonInteractiveInput modules handle user input and execute the corresponding commands based on the input. The TaskTracker module provides methods to add, edit, delete, and display tasks. The rl module is used to read input from the console. The application also includes unit tests to ensure the correctness of its functionality.

## Installation

To run the task tracker application, follow these steps:

1. Clone the repository:

```
git clone https://github.com/Illyakravchuk/Methodologies_lab4
```

2. Install the dependencies:

```
npm install
```

```
npm install fs
```

```
npm install readline
```
## Key Features

1. Add Task: You can add a task to the task manager by providing a title, description, and deadline. The task is then saved in the task list.

2. Edit Task: You can edit an existing task by providing the title of the task you want to edit, along with the new title, description, and deadline.

3. Mark Task as Completed: You can mark a task as completed by providing the title of the task. Once marked as completed, the task's status is updated.

4. Delete Task: You can delete a task from the task manager by providing the title of the task you want to delete. The task is then removed from the task list.

5. Show All Tasks: You can view all the tasks in the task manager, including their titles, descriptions, deadlines, and completion status.

6. Show Pending Tasks: You can view all the pending tasks in the task manager, sorted by their deadlines.

7. Show Overdue Tasks: You can view all the tasks that have missed their deadlines.

8. Save and Load Tasks: You can save the tasks to a file and load them from a file. This allows you to persist the task data across multiple sessions.

## Usage

### Non-interactive Mode

To run the Task Tracker application, use the following command:

```
node index.js <command> [arguments]
```

Available commands:

* `add`: Add a new task.
* `complete`: Mark a task as completed.
* `edit`: Edit a task.
* `delete`: Delete a task.
* `show all`: Show all tasks.
* `show pending`: Show pending tasks.
* `show overdue`: Show overdue tasks.
* `save`: Save tasks to a file.
* `load`: Load tasks from a file.

Examples:

Add a task:

```
node index.js add "Task title" "Task description" "Task deadline"
```

Mark a task as completed:

```
node index.js complete "Task title"
```

Edit a task:

```
node index.js edit "Task title" "New task title" "New task description" "New task deadline"
```

Delete a task:

```
node index.js delete "Task title"
```

Show all tasks:

```
node index.js show all
```

Show pending tasks:

```
node index.js show pending
```

Show overdue tasks:

```
node index.js show overdue
```

Save tasks to a file:

```
node index.js save
```

Load tasks from a file:

```
node index.js load
```

### Interactive Mode

To start the task tracker in interactive mode, run the following command:

```
node index.js
```

You will see the "Task Tracker" title and a prompt where you can enter commands.

**The following commands are available in interactive mode:**

* **add**: Add a new task to the tracker.
* **complete**: Mark a task as completed.
* **edit**: Edit the details of a task.
* **delete**: Delete a task.
* **show all**: Show all tasks.
* **show pending**: Show pending tasks.
* **show overdue**: Show overdue tasks.
* **save**: Save the tasks to a file.
* **load**: Load tasks from a file.

Enter the command name followed by any required arguments.

`Note`: Ensure that you enter the command names exactly as shown above.

`Note`: Before exiting the interactive mode, you should use the command **save**


## Conclusion

In this project, we developed a command-line application called "Task Manager" for managing tasks and deadlines. The application allows users to perform various operations such as adding tasks, marking tasks as completed, editing tasks, deleting tasks, and displaying task information.

The application supports both interactive and non-interactive modes. In the interactive mode, users can enter commands and interact with the application in real-time. In the non-interactive mode, users can provide a list of commands and arguments as command-line arguments.

The main difference between the interactive and non-interactive modes lies in how user input is processed. In the interactive mode, the application listens for user input events using the readline module and responds accordingly. On the other hand, in the non-interactive mode, the application processes the commands and arguments provided through command-line arguments.

During the development of this project, we faced several challenges. One challenge was handling different command formats and validating user input. We implemented input validation and provided appropriate error messages when invalid commands or arguments were provided.

Another challenge was managing task data and persisting it to a file. We used the TaskTracker class to handle task-related operations and implemented methods for adding, editing, deleting, and displaying tasks. We also added functionality to save tasks to a file and load tasks from a file using the fs module.

Overall, this project allowed us to practice command-line application development, user input handling, and data management. The Task Manager application provides a convenient way to manage tasks and deadlines through a simple command-line interface.