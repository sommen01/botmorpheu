const ytdl = require('ytdl-core');
exports.run = async (client, message, args, ops) => {
    if (!message.member.voiceChannel) return message.channel.send('Entra na porra de uma sala de voz');
    if (!args[0]) return message.channel.send('Entra com um link doente');
    let validate = await ytdl.validateURL(args[0]);
    if (!validate) {
      let commandFile = require('./p.js/index.js');
      return commandFile.run(client, message, args, ops);
    }
   let info = await  ytdl.getInfo(args[0]);
   let data = ops.active.get(message.guild.id) || {};
    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });
    if (!data.dispatcher) play(client, ops, data);
    else {
        message.channel.send(`TA NA FILA: ${info.title} | COLOCADO POR : ${message.author.id}`)
    }
    ops.active.set(message.guild.id, data);
}
async function play(client, ops, data) {
    client.channels.get(data.queue[0].announceChannel).send(`TOCANDO: ${data.queue[0].songTitle} | COLOCADO POR : ${data.queue[0].requester}`);
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.once('end', function() {
        end(client, ops, data);
    });

}
function end(client, ops, dispatcher){
    let fetched = ops.active.get(dispatcher.guildID);
    fetched.queue.shift();
    if (fetched.queue.length > 0) {
        ops.active.set(dispatcher.guildID, fetched);
        play(client, ops, fetched);
    } else {
        ops.active.delete(dispatcher.guildID);
        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;  
        if (vc) vc.leave();
    }

}