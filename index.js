const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

client.login(process.env.TOKEN);


client.commands = new Discord.Collection();

fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);

    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvée!");

    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);
        console.log(`${f} commande chargée !`);

    client.commands.set(commande.help.name, commande);
    });
});

fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`${f.length} events en chargement`);

    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
    });
});

client.on("guildMemberAdd", user => {
    let joinEmbed = new Discord.RichEmbed()
        .setColor("#15f0be")
        .setAuthor(user.user.username, user.user.displayAvatarURL)
        .setDescription("Bienvenue" + user + "sur **" + user.guild.name + "** !")
        .setFooter("Passe dans annonces entretien afin de prendre connaisance des futures scéance de withelist")
    user.guild.channels.get("587436412631121941").send(joinEmbed)
});

client.on("guildMemberRemove", user => {
    user.guild.channels.get("587436412631121941").send("**" + user.user.username + " a quitté le serveur.. :disappointed:  ")
});

client.on('message', message => {
    if(message.content === "C'est quand les prochaines Withlist"){
        message.reply("consulte #📡-annonces-entretiens pour avoir plus d'information la dessus");
        console.log('Répond à la demande de WL')
    }
});

client.on('message', message => {
    if(message.content === "Les prochaines WL ?"){
        message.reply("consulte #📡-annonces-entretiens pour avoir plus d'information la dessus");
        console.log('Répond à la demande de WL')
    }
});
