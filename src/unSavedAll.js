const inquirer = require('inquirer');
const { IgApiClient } = require('instagram-private-api');
const chalk = require('chalk');
const api = new IgApiClient();

const question = [
    {
        type:'input',
        name:'username',
        message:'[>] Username: ',
        validate: function(value){
            if(!value) return 'Can\'t Empty';
            return true;
        }
    },
    {
        type:'password',
        name:'password',
        mask: '*',
        message:'[>] Password: ',
        validate: function(value){
            if(!value) return 'Can\'t Empty';
            return true;
        }
    },
];

const unSavedAll = () => {
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
    textLines.forEach((line, index) => {
        console.log(line.green)
    })
    inquirer.prompt(question).then(async function(data) {
        api.state.generateDevice(data.username);
        const auth = await api.account.login(data.username, data.password);
        const feed = await api.feed.saved(auth.pk).items();
        feed.length === 0 ? console.log(chalk `{bold.red Failed saved is empty}`) : undefined
        feed.forEach(async function(save) {
            var timeNow = new Date();
            timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
            var callback = '';
            await api.media.unsave(save.pk) ? callback = chalk `{bold.green Success}` : callback = chalk `{bold.red Failed}`;
            console.log(chalk `{magenta ⌭ ${timeNow}}: instagram.com/p/${save.code} ➾  Unsaved: ` + callback);
        })
    })
}
module.exports = unSavedAll