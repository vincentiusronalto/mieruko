const editJsonFile = require("edit-json-file");
const botsettings = require("./config.json");
let file = editJsonFile(`./config.json`);

module.exports.run = async (bot, message, args) => {
    if (message.author.id.trim() == botsettings.masterId) {
        message.channel.send(`I will try to be quiet this time, peace~`);
        file.set("greetings", false);
        file.save();
        return 0
        
    } else {
        return message.channel.send(`you are not my master, you are mine, jk, upps forgot about that`);
    }
};
