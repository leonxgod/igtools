global.inquirer = require('inquirer');
global.colors = require('colors');
global.getUserInfo = require('./getUserInfo');
global.getProfilePhoto = require('./getProfilePhoto');
global.unFollowAll = require('./unFollowAll');
global.unSavedAll = require('./unSavedAll');


const question = [
    {
        type:'list',
        name:'toollist',
        message:'Select tool: ',
        choices:
        [
            "[1] Get user info",
            "[2] Get profile photo",
            "[3] Unfollow all",
            "[4] Delete all photo",
            "[5] Get username by hashtag",
            "[6] Unsaved all",
            "[7] Url photo upload",
            "[8] Follow by hashtag",
            "[9] commentUserPosts"
        ]
    }
];

const getToolList = async () => {
    let textLines = [
    " /$$",                                    
    "| $$",                                   
    "| $$        /$$$$$$   /$$$$$$  /$$$$$$$", 
    "| $$       /$$__  $$ /$$__  $$| $$__  $$",
    "| $$      | $$$$$$$$| $$  \  $$| $$  \  $$",
    "| $$      | $$_____/| $$  | $$| $$  | $$",
    "| $$$$$$$$|  $$$$$$$|  $$$$$$/| $$  | $$",
    "|________/ \_______/ \______/ |__/  |__/",
    ""]
    for(arrayIndex = 0; arrayIndex< textLines.length; arrayIndex++) {
        process.stdout.write('\033c');
        textLines.forEach((line, index) => {
            if(index <= arrayIndex) {
                console.log(line.green);
            } else {
                console.log(line);
            }
        });
        await sleep(50);
    }
    for(let i = 0; i<=10; i++) {
        process.stdout.write('\033c');
        if(i<10) {
            textLines[textLines.length-1]= colors.trap(    "      Leon");
        } else {
            textLines[textLines.length-1]=    "      Instagram by @xleongod \n";
        }
        textLines.forEach(line => {
            console.log(line.green);
        });
        await sleep(30);
    } 
    try{
        toolList = await inquirer.prompt(question)
        toolList = toolList.toollist
        switch(toolList){
            case "[1] Get user info":
                getUserInfo();
                break;
            case "[2] Get profile photo":
                getProfilePhoto();
                break;
            case "[3] Unfollow all":
                unFollowAll();
                break;
            case "[4] Delete all photo":
                require('./deleteAllPhoto');
                break;
            case "[5] Get username by hashtag":
                require('./getUsernameByHashtag');
                break;
            case "[6] Unsaved all":
                unSavedAll();
                break;
            case "[7] Url photo upload":
                require('./urlPhotoUpload');
                break; 
            case "[8] Follow by hashtag":
                require('./followByHashtag');
                break;
            case "[9] commentUserPosts":
                require('./commentUserPosts');
                break;
        }
    }catch(err){
        throw err
    }
}
function sleep(ms){
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
module.exports = getToolList
