const {
    handleShowAllCommand,
    handleShowPendingCommand,
    handleShowOverdueCommand,
    handleSaveCommand,
    handleLoadCommand,
} = require('./operatingModes');
const TaskTracker = require("./taskTracker");
const tracker = new TaskTracker();
const readline = require('readline');
const rl = require('./rl');


//Non-interactive input function performs actions based on command and arguments.
function nonInteractiveInput(command, args) {
    switch (command) {
        case 'add':
            if (args.length === 3) {
                const [title, description, deadline] = args;
                tracker.addTask(title, description, deadline);
                tracker.saveToFile();
            } else {
                console.log('Invalid command format. Usage: node index.js add "title" "description" "deadline"');
            }
            break;
        case 'complete':
            if (args.length === 1) {
                const [title] = args;
                tracker.markTaskAsCompleted(title);
            } else {
                console.log('Invalid command format. Usage: node index.js complete "title"');
            }
            break;
        case 'edit':
            if (args.length === 4) {
                const [title, newTitle, newDescription, newDeadline] = args;
                tracker.editTask(title, newTitle, newDescription, newDeadline);
            } else {
                console.log('Invalid command format. Usage: node index.js edit "title" "newTitle" "newDescription" "newDeadline"');
            }
            break;
        case 'delete':
            if (args.length === 1) {
                const [title] = args;
                tracker.deleteTask(title);
            } else {
                console.log('Invalid command format. Usage: node index.js delete "title"');
            }
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
}

module.exports = nonInteractiveInput;