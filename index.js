const readline = require('readline');
const nonInteractiveInput= require('./nonInteractiveMode');
const interactiveInput = require('./interactiveInput');
const { isInteractiveMode }= require('./operatingModes');

// Creating an interface for reading input from the console
const rl = require('./rl');


rl.on('line', (input) => {
  const [command, ...args] = input.trim().split(' ');

  if (isInteractiveMode()) {
    interactiveInput(command, args, rl);
  } else {
    nonInteractiveInput(command, args);
  }

  rl.prompt();
});

if (isInteractiveMode()) {
  console.log('Task Tracker');
  rl.prompt();
} else {
  const [command, ...args] = process.argv.slice(2);
  nonInteractiveInput(command, args);
  process.exit();
}


module.exports = rl;