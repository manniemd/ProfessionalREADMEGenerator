const fs = require('fs');
const inquierer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
// const utils = require('utils');
const inquirer = require('inquirer');

// TODO: Include packages needed for this application

// TODO: Create an array of questions for user input
const questions = [{
    type: 'input',
    name: 'title',
    message: 'Whats repo name? (Required)',
    //validate to see value
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('enter repo title.');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'description',
    message: 'Give a short description of repo. (Required)',
    //validate to see value
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Give a short description of repo.');
            return false;
        }
    }
},
//instalation confirmation 
{
    type: 'confirm',
    name: 'confirmInstallation',
    message: 'Is there an installation process?'
},
{
    type: 'input',
    name: 'Instalation',
    message: 'List the installation process instructions.',
    when: ({ confirmInstallation }) => {
        if (confirmInstallation) {
            return true;
        } else {
            return false;
        }
    }
},

{ //confirm
    type: 'confirm',
    name: 'confirmUsage',
    message: 'Would you like to add instruction of how to use app?'
},
{
    type: 'input',
    name: 'Usage',
    message: 'List instructions for app. use images if possible.',
    when: ({ confirmUsage }) => {
        if (confirmUsage) {
            return true;
        } else {
            return false;
        }
    }
},

{ //confirm
    type: 'confirm',
    name: 'confirmContribution',
    message: 'Can other developers contribute to repo?'
},
{
    type: 'input',
    name: 'contribution',
    message: 'list hop developers can contribute to project.',
    when: ({ confirmContribution }) => {
        if (confirmContribution) {
            return true;
        } else {
            return false;
        }
    }
},

{
    type: 'checkbox',
    name: 'licenses',
    message: 'chose a license, you can also choose none and add one later.',
    choices: ['none', 'GNU AGPLv3', 'MIT', 'ISC', 'GNU GPL v2',
        'Apache License 2.0', 'Mozilla Public License 2.0', 'The Unlicense']
},

{
    type: 'input',
    name: 'username',
    message: 'What is your GitHub username? (Requiered)',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter a valid GitHub Username.');
            return false;
        }
    }
},

{
    type: 'input',
    name: 'email',
    message: 'Enter email address  (Requiered)',
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log('Please enter a valid email.');
            return false;
        }
    }


}];

// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, error => {
            if (error) {
                console.log(error);
                return;
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
    });
};

function readMeTemplate(userInput) {
    return `
    # ${userInput.title}

## Description 
${userInput.description}

* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


## Installation
${userInput.Installation}
## Usage 
${userInput.Usage}
## Credits
${userInput.Credits}
## License
${userInput.License}
## Badges
${userInput.Badges}
## Features
${userInput.Features}
## Contributing
${userInput.Contributing}
## Tests
${userInput.Tests}
    `
}

// TODO: Create a function to initialize app
async function init() {
    try {
        const userAnswers = await inquirer.prompt(questions);

        let readMeFile = readMeTemplate(userAnswers);

        await writeFile(readMeFile)
        // console.log('datta is being processed into README.MD:', resolved);
    } catch (error) {
        console.log(error);
    }
};

// Function call to initialize app
init();
