exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if (!fetched) return message.channel.send('Não ta tocando nada');
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('Você não esta conectado em nenhum canal de voz');
    
    let userCount = message.member.voiceChannel.members.size;
    
    let required = Math.ceil(userCount/2);
    
    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
    
    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Você ja votou. ${fetched.queue[0].voteSkips.length}/${required} para pular`);
    
    fetched.queue[0].voteSkips.push(message.member.id);
    
    ops.active.set(message.guild.id, fetched);
    
    if (fetched.queue[0].voteSkips.length >= required) {
      message.channel.send('Próxima música!');
      return fetched.dispatcher.emit('end');
    }
    
    message.channel.send(`Você votou para pular.  ${fetched.queue[0].voteSkips.length}/${required} necessários para pular.`)
}  