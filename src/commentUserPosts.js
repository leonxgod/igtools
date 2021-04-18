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
},
{
    type: 'input',
    name: 'target_username',
    message: '[>] Target username:',
    mask: '*',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }
},
{
    type: 'input',
    name: 'post_count',
    message: '[>] How many posts:',
    mask: '*',
    validate: function(value) {
        if (!value) return 'Can\'t Empty';
        return true;
    }
}]


const commentUserPosts = async (username, password, target_username, count) => {
        api.state.generateDevice(username);
        const auth = await api.account.login(username, password);
        var getMedia = await api.feed.user(await api.user.getIdByUsername(target_username)).items();
        for(i = 0; i < count; i++){
            var timeNow = new Date();
            timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
            var callback = '';
            await api.media.comment({mediaId: getMedia[i]['pk'], text: 'test'}) ? callback = chalk `{bold.green Success}` : callback = chalk `{bold.red Failed}`;
            console.log(chalk `{magenta ⌭ ${timeNow}}: instagram.com/${getMedia[i]['code']} ➾  Comment: ` + callback);
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
inquirer.prompt(question).then(answers => commentUserPosts(answers.username, answers.password, answers.target_username, answers.post_count))
