const { IgApiClient } = require('instagram-private-api');
const inquirer = require('inquirer');
const fs = require('fs')
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
},
{
    type: 'input',
    name: 'filename',
    message: '[>] Filename(no extension):',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }  
}
]


const hastagGetUsername = async (username, password, hash, filename) => {
    const users = new Set();
    api.state.generateDevice(username);
    const auth = await api.account.login(username, password);
    var feed = await api.feed.tag(hash, 'recent');
    feed = await feed.items();
    feed.forEach(data => users.add(data['user']['username']))
    var file = fs.createWriteStream('../data/' + filename + '.txt');
    file.on('error', function(err) { if(err) console.log(err)});
    Array.from(users).forEach(function(v) { file.write(v + '\n')});
    file.end();
    console.log('../data/' + filename + '.txt saved in file')
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
inquirer.prompt(question).then(answers => hastagGetUsername(answers.username, answers.password, answers.hash, answers.filename))

