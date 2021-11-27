const express = require("express");
const app = express();
const fs = require("fs");
const botsettings = require("./config.json");
const { Client, Intents } = require("discord.js");

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

app.all("/", function (request, response) {
    console.log(Date.now() + " Ping Received");
    response.send("success");
});

const listener = app.listen(3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

let jsfile;
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err)
    jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
      return console.log("[LOGS] Couldn't Find Commands!");
    }
});

bot.on("message", async (message) => {
    if (message.author.bot) return;

    let prefix = botsettings.prefix;
    let messageStr = message.content;
    let messageArr = messageStr.split(" ")
    let commandName = messageArr[0].substring(1)
    let messageArg = messageArr[1]
    if(messageStr[0] == prefix && jsfile.includes(commandName+".js")){
        require(`./commands/${commandName}`).run(bot, message, messageArg)
    }
});

bot.on("messageReactionAdd", async (reaction, user) => {});

bot.login(botsettings.token);
