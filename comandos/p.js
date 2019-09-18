const search = require('yt-search');


exports.run = (client, message, args, ops) => {
 
  search(args.join(' '), function(err, res) {
    
    if (err) return message.channel.send('Alguma coisa não esta certa');
    
    let videos = res.videos.slice(0, 10);
    
    let resp = '';
    
    for (var i in videos) {
      resp += `**[${parseInt(i)+1}]:** \`${videos[i].title}\`\n`;
      
    }
    
    resp += `\n **Escolha um numero entre \`1-${videos.length}\``;
    
    message.channel.send(resp);

    if(videos.length == 1){
   
    }
    
    const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
    
    const collector = message.channel.createMessageCollector(filter);
    
    collector.videos = videos;
    
    collector.once('collect', function(m){
      let commandFile = require('./play.js');
      commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
    });
  
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