//add the necessary packages that are needed.
const inquirer = require('inquirer');
const fs = require('fs');

const questions = ['What is your GitHub username?', 'What is your email address?', 'What is your project\'s name?', 'Please write a short description of your project?', 'What kind of license does your project have?', 'What command should be run to install dependencies?', 'What command should be run to run tests?', 'What does the user need to know about using the repo?', 'What does the user need to know about contributing to the repo?'];

//Went to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll to figure out how to replace spaces with underscores.
//also credited in the README file.
//function that creates the text for the README file.
const createText = ({ userName, email, title, description, license, install, run, useRepo, contribution }) => {
  //add variables that will add text based off if there is a license or not.
  var licenseBadge = ``;
  var licenseSection = ``;

  //check if there was a license selected or not.
  if (license !== "None") {
    licenseBadge = `![License: ${license}](https://img.shields.io/badge/License-${license.replaceAll(' ', '_')}-blue.svg)  
`;
    licenseSection = `

## License  
This project is licensed under the ${license} license.  `
  }

  //return the text for the README file.
  return `# ${title}  
${licenseBadge}
## Description  
${description}  

## Installation  
To install necessary dependencies, run the following command:  

\`\`\`  
${install}  
\`\`\`  

## Usage  
${useRepo} 
${licenseSection}
## Contributing  
${contribution}  

## Tests  
To run tests, run the following command:  

\`\`\`  
${run}  
\`\`\`  

## Questions  
If you have any questions about the repo, open an issue or contact me directly at ${email}.  You can find more of my work at [${userName}](https://github.com/${userName}/).  `;
}

// function that writes to the README file.
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    //if there is an error, console log the error, other wise console log commit logged!
    err ? console.error(err) : console.log('Generating README')
  );
}

// initialize app by asking questions to the user.
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
      validate: function(email) {
        //went to https://www.abstractapi.com/tools/email-regex-guide to learn more about regular expressions,speciffically about validating
        //email addresses.
        var acceptanceCriteria = /[-a-zA-Z0-9!#$%&'*+-./=<>?^@\\_`|~]+@[-a-zA-Z0-9]+.[-a-zA-Z0-9]/;
        if (acceptanceCriteria.test(email)) {
          return true;
        }
        else {
          return "Please enter a valid email address.";
        }
      }
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
    {
      type: 'input',
      message: questions[5],
      default: 'npm i',
      name: 'install',
    },
    {
      type: 'input',
      message: questions[6],
      default: 'npm index.js',
      name: 'run',
    },
    {
      type: 'input',
      message: questions[7],
      name: 'useRepo',
    },
    {
      type: 'input',
      message: questions[8],
      name: 'contribution',
    },
  ])
  .then((data) => {
    const text = createText(data);
    writeToFile('./Created-File/README.md', text);
  });
}

// Function call to initialize app
init();
