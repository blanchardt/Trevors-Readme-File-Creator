//add the necessary packages that are needed.
const inquirer = require('inquirer');
const fs = require('fs');

const questions = ['What is your GitHub username?', 'What is your email address?', 'What is your project\'s name?', 'Please writ a short description of your project?', 'What kind of license does your project have?', 'What command should be run to install dependencies?', 'What command should be run to run tests?', 'What does the user need to know about using the repo?', 'What does the user need to know about contributing to the repo?'];

//Went to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll to figure out how to replace spaces with underscores.
//also credited in the README file.
//function that creates the text for the README file.
const createText = ({ userName, email, title, description, license }) =>
  `# ${title}  
![License: ${license}](https://img.shields.io/badge/License-${license.replaceAll(' ', '_')}-blue.svg)    

## Description  
${description}  

## Questions  
If you have any questions about the repo, open an issue or contact me directly at ${email}.  You can find more of my work at [${userName}](https://github.com/${userName}/).  `;

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    //if there is an error, console log the error, other wise console log commit logged!
    err ? console.error(err) : console.log('Generating README')
  );
}

// TODO: Create a function to initialize app
function init() {
  inquirer
  .prompt([
    {
      type: 'input',
      message: questions[0],
      name: 'userName',
    },
    {
      type: 'input',
      message: questions[1],
      name: 'email',
    },
    {
      type: 'input',
      message: questions[2],
      name: 'title',
    },
    {
      type: 'input',
      message: questions[3],
      name: 'description',
    },
    {
      type: 'list',
      message: questions[4],
      choices: [ "MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None" ],
      name: 'license',
    },
  ])
  .then((data) => {
    const text = createText(data);
    writeToFile('./Created-File/README.md', text);
  });
}

// Function call to initialize app
init();
