const editJsonFile = require("edit-json-file");
const botsettings = require("./config.json");
let file = editJsonFile(`./config.json`);

module.exports.run = async (bot, message, args) => {
    if (message.author.id == botsettings.masterId) {
        message.channel.send(`Hi again`);
        file.set("greetings", true);
        file.save();
        return 0
    } else {
        return message.channel.send(`you are not my master`);
    }
};