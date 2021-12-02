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
    if (err) console.log(err);
    jsfile = files.filter((f) => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }
});

function checkGreetings(messageStr, message) {
    let greetings = [
        "gm",
        "good morning",
        "morning",
        "morning guys",
        "morning",
    ];
    let greetings1 = ["hi", "hey", "hello", "hell"];
    let greetings2 = ["nite", "night", "good night", "nighty", "sweet dreams"];
    let greetings3 = ["afternoon"];
    let greetings4 = ["evening"];
    let greetings5 = ["awesome", "good job", "naisu", "cool"];
    let greetings6 = ["scary", "ghost", "dark", "horror"];

    if (greetings.includes(messageStr.toLowerCase())) {
        message.channel.send(`Morning ${message.author.username} :)`);
    }

    if (greetings1.includes(messageStr.toLowerCase())) {
        message.channel.send(`hell  o ${message.author.username} :)`);
    }

    if (greetings2.includes(messageStr.toLowerCase())) {
        message.channel.send(`good night ${message.author.username} :)`);
    }

    if (greetings3.includes(messageStr.toLowerCase())) {
        message.channel.send(`good afternoon ${message.author.username}!`);
    }

    if (greetings4.includes(messageStr.toLowerCase())) {
        message.channel.send(`good evening ${message.author.username}`);
    }

    if (greetings5.includes(messageStr.toLowerCase())) {
        message.channel.send(`No you ${message.author.username}~`);
    }

    if (greetings6.includes(messageStr.toLowerCase())) {
        message.channel.send(`I love it ~`);
    }
}

bot.on("message", async (message) => {
    if (message.author.bot) return;
    let messageStr = message.content;

    if (botsettings.greetings == true) {
        checkGreetings(messageStr, message);
    }

    let prefix = botsettings.prefix;

    let messageArr = messageStr.split(" ");
    let commandName = messageArr[0].substring(1);
    let messageArg = messageArr[1];
    if (messageStr[0] == prefix && jsfile.includes(commandName + ".js")) {
        await require(`./commands/${commandName}`).run(
            bot,
            message,
            messageArg
        );
    }
});

bot.on("messageReactionAdd", async (reaction, user) => {});

bot.login(botsettings.token);
