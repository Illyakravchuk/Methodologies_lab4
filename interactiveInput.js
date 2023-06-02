const {
    handleAddCommand,
    handleCompleteCommand,
    handleEditCommand,
    handleDeleteCommand,
    handleShowAllCommand,
    handleShowPendingCommand,
    handleShowOverdueCommand,
    handleSaveCommand,
    handleLoadCommand,
} = require('./operatingModes');
const readline = require('readline');
const rl = require('./rl');

function interactiveInput(command) {
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
}

module.exports = interactiveInput;