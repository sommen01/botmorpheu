exports.run = async (client, message, args, ops) => {
    message.delete()
    let fetched = ops.active.get(message.guild.id);
    ops.active.set(message.guild.id, fetched);
      message.channel.send('Proxima musica!');
      fetched.dispatcher.emit('end');
  }
  