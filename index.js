//add the necessary packages that are needed.
const inquirer = require('inquirer');
const fs = require('fs');

const questions = ['What is your GitHub username?', 'What is your email address?', 'What is your project\'s name?', 'Please writ a short description of your project?', 'What kind of license should your project have?', 'What command should be run to install dependencies?', 'What command should be run to run tests?', 'What does the user need to know about using the repo?', 'What does the user need to know about contributing to the repo?'];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    //if there is an error, console log the error, other wise console log commit logged!
    err ? console.error(err) : console.log('Commit logged!')
  );
}

// TODO: Create a function to initialize app
function init() {
    writeToFile('./Created-File/README.md', 'test')
}

// Function call to initialize app
init();
