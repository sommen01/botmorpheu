const { RichEmbed } = require('discord.js');
exports.run = (client, msg, args) => {
  const image = new RichEmbed()
     .setTitle("Comandos:")
     .addField("6help","Listar comandos.")
     .addField("6invite","Cria um método de me incovar!!!.")
     .addField("6p","Buscar música.")
     .addField("6skip","Pular Votação para pular música.")
     .setTimestamp()
     .setFooter(`Criado por Maestro`)
    .attachFiles(['../botmorpheu/1.png'])
    .setImage('attachment://1.png')
   msg.channel.send(image);
};