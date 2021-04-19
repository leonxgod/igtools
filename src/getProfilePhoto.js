const inquirer = require('inquirer');
const https = require('https');
const { IgApiClient } = require('instagram-private-api');
const terminalImage = require('terminal-image');
const got = require('got');
const fs = require('fs');
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
const getProfilePhoto = () => {
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
        const body = await got(await (await api.user.info(await api.user.getIdByUsername(data.target_username))).profile_pic_url).buffer();
	    console.log("\n\n"+await terminalImage.buffer(body, {width:30}));
        https.get(await (await api.user.info(await api.user.getIdByUsername(data.target_username))).profile_pic_url, function(response) {
            response.pipe(fs.createWriteStream('./data/' + data.target_username + '.png'));
        })
        console.log('./data/' + data.target_username + '.png downloaded')
    })
}
module.exports = getProfilePhoto
