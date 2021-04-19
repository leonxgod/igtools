const { IgApiClient } = require('instagram-private-api');
const inquirer = require('inquirer');
const _ = require('lodash')
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
},]


const deleteAllPhoto = async (username, password) => {
        api.state.generateDevice(username);
        const auth = await api.account.login(username, password);
        var getMedia = await api.feed.user(auth.pk).items();
        getMedia.length === 0 ? console.log(chalk `{bold.red Failed media not found}`) : undefined;
        getMedia = _.chunk(getMedia, 10);
        for(i = 0; i < getMedia.length; i++){
            var timeNow = new Date();
            timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
            await Promise.all(getMedia[i].map(async media => {
                var callback = '';
                await api.media.delete({mediaId:media.pk}) ? callback = chalk `{bold.green Success}` : callback = chalk `{bold.red Failed}`;
                console.log(chalk `{magenta ⌭ ${timeNow}}: instagram.com/p/${media.code} ➾  Delete: ` + callback);
            }))
        }
        if(getMedia.length != 0){
            deleteAllPhoto(username, password)
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
inquirer.prompt(question).then(answers => deleteAllPhoto(answers.username, answers.password))
