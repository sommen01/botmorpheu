const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const prefix = 'seu prefixo aqui';
const ownerID = 'seu id aqui';
/* global Map*/
/* global client*/
const active = new Map()
client.on("ready",() =>{
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);

});

client.on("guildCreate", guild =>{
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id})). População ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

client.on("guildDelete", guild =>{
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} serves`);
});


client.on("message",  message =>{
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    //let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    if(message.author.bot)return;
    if(message.channel.type == "dm")return;
    if(!message.content.startsWith(prefix)) return;

    try{
        delete require.cache[require.resolve(`./comandos/${cmd}.js`)];
        
        let ops ={
           ownerID : ownerID,
           active : active
        } 

        let commandFile = require(`./comandos/${cmd}.js`);
        commandFile.run(client, message, args, ops);
        
        
        } catch (e){
        console.log(e.stack);
        }
        

});

client.on('ready', () => console.log('Funcionando'));
client.login(config.token);







