const {IgApiClient} = require('instagram-private-api');
const chalk = require('chalk');
const _ = require('lodash');
const inquirer = require('inquirer');
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
]


const unFollowAll = () => {
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
        const feed = await api.feed.accountFollowing(auth.pk);
        var cursor;
        do {
            var getPollowers = await feed.items();
            getPollowers = _.chunk(getPollowers, getPollowers.length);
            for (let i = 0; i < getPollowers.length; i++) {
                var timeNow = new Date();
                timeNow = `${timeNow.getHours()}:${timeNow.getMinutes()}:${timeNow.getSeconds()}`
                await Promise.all(getPollowers[i].map(async (account) => {
                    var callback = '';
                    await api.friendship.destroy(account.pk) ? callback = chalk `{bold.green Success}` : callback = chalk `{bold.red Failed}`;
                    console.log(chalk `{magenta ⌭ ${timeNow}}: @${account.username} ➾  Unfollow: ` + callback);
                }));
            }
        } while (feed.isMoreAvailable())
    })
}
module.exports = unFollowAll