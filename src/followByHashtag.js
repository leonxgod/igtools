const { IgApiClient } = require('instagram-private-api');
const inquirer = require('inquirer');
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
    name: 'hash',
    message: '[>] Hash:',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }
}
]


const followByHastag = async (username, password, hash, filename) => {
    api.state.generateDevice(username);
    const auth = await api.account.login(username, password);
    var feed = await api.feed.tag(hash, 'recent');
    feed = await feed.items();
    feed.forEach(async function (data) {
        var callback = ''
        var timeNow = new Date();
        timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
        await api.friendship.create(data['user']['pk']) ? callback = chalk `{bold.green Success}` : callback = chalk `{bold.red Failed}`;
        console.log(chalk `{magenta ⌭ ${timeNow}}: @${await data['user']['username']} ➾  Follow: ` + callback);
    })
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
inquirer.prompt(question).then(answers => followByHastag(answers.username, answers.password, answers.hash))

