exports.run = (client, message, args) => {
    message.channel.send(`Você pode me invocar neste link:\nhttps://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=51200&scope=bot`)
}