const { IgApiClient } = require('instagram-private-api');
const inquirer = require('inquirer');
const { get } = require('request-promise');
const fs = require('fs');
const chalk = require('chalk');
const api = new IgApiClient();


const question = [{
    type: 'input',
    name: 'username',
    message: '[>] Username:',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }
},
{
    type: 'password',
    name: 'password',
    message: '[>] Password:',
    mask: '*',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }
},
{
    type: 'input',
    name: 'url',
    message: '[>] Url:',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }  
},
{
    type: 'input',
    name: 'number',
    message: '[>] Number of shares:',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }  
}]
const urlPhotoUupload = async (username, password, url, number) => {
    api.state.generateDevice(username);
    const auth = await api.account.login(username, password);
    const getPhoto = await get({
        url:url,
        encoding:null
    })
    for(let i = 0; i < number; i++){
        const photo = await api.publish.photo({file:getPhoto})
        var timeNow = new Date();
        timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
        photo ? callback = chalk `{bold.green Success}` : callback = chalk `{bold.red Failed}`;
        console.log(chalk `{magenta ⌭ ${timeNow}}: instagram.com/p/${await photo['media']['code']} ➾  Upload: ` + callback);
    }
}
process.stdout.write('\033c');
let textLines = [
"/$$",                                    
"| $$",                                   
"| $$        /$$$$$$   /$$$$$$  /$$$$$$$", 
"| $$       /$$__  $$ /$$__  $$| $$__  $$",
"| $$      | $$$$$$$$| $$  \  $$| $$  \  $$",
"| $$      | $$_____/| $$  | $$| $$  | $$",
"| $$$$$$$$|  $$$$$$$|  $$$$$$/| $$  | $$",
"|________/ \_______/ \______/ |__/  |__/",
""]
textLines.forEach((line) => {
    console.log(line.green)
})
inquirer.prompt(question).then(answers => urlPhotoUupload(answers.username, answers.password, answers.url, answers.number))

