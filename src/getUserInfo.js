const inquirer = require('inquirer');
const { IgApiClient } = require('instagram-private-api');
const api = new IgApiClient();
const fs = require('fs')

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
    {
        type:'input',
        name:'target_username',
        mask: '*',
        message:'[>] Target username: ',
        validate: function(value){
            if(!value) return 'Can\'t Empty';
            return true;
        }
    }
];
const getUserInfo = () => {
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
    inquirer.prompt(question).then(async function (data){
        api.state.generateDevice(data.username);
        const auth = await api.account.login(data.username, data.password);
        var a = JSON.stringify(await api.user.info(await api.user.getIdByUsername(data.target_username)), undefined, '\n')
        fs.writeFile('./data/' + data.target_username + '.json', a, err => {
            if(err) throw err
        })
        console.log('/data/' +data.target_username + '.json saved in file')
    })
}
module.exports = getUserInfo