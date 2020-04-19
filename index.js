require("dotenv").config()
var AWS = require('aws-sdk');
const Discord = require("discord.js")
const client = new Discord.Client()

// set the region using data from .env file
AWS.config.update({accessKeyId: process.env.ACCESS_KEY, secretAccessKey: process.env.SECRET_KEY, region: 'sa-east-1'});

// create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// print that is ready when bot is logged
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

// event to get new message sent
client.on("message", msg => {
    // check if the message has !aws command
    if (msg.content.startsWith("!aws")) {

        // replace message to get which command was sent
        let command = msg.content.replace("!aws ","")

        // get the instance ID from .env file
        let params = {
            InstanceIds: [
                process.env.INSTANCE_ID
            ]
        }

        // if the command is start, starts the aws ec2 instance
        if (command === "start") {
            ec2.startInstances(params, (err, data) => {
                if (err)
                    msg.reply("Error ", err.stack)
                else
                    msg.reply("Starting instance... \:face_with_monocle:")
            })
        }
        // if the command is stop, stops the aws ec2 instance
        else if (command === "stop") {
            ec2.stopInstances(params, (err, data) => {
                if (err)
                    msg.reply("Error ", err.stack)
                else
                    msg.reply("Stopping instance... \:face_with_monocle:")
            })
        }
        // if the command is status, gets the aws ec2 instance status and reply to user the status
        else if (command === "status") {
            ec2.describeInstances(params, (err, data) => {
                if (err)
                    msg.reply("Eita: " + err.stack)
                else {
                    if (data.Reservations[0].Instances[0].State.Name === "running")
                        msg.reply(`Instance status: ${data.Reservations[0].Instances[0].State.Name} (${data.Reservations[0].Instances[0].PublicIpAddress}) \:smile:`)
                    else if (data.Reservations[0].Instances[0].State.Name === "stopped")
                        msg.reply(`Instance status: ${data.Reservations[0].Instances[0].State.Name} \:sleeping:`)
                    else 
                        msg.reply(`Instance status: pending \:thinking:`)
                }
            })
        }
    }
})

// event to login the bot on server with the token from .env file
client.login(process.env.BOT_TOKEN)