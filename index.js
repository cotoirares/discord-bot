//This Code was made for Consiliul Judetean al Elevilor Cluj Discord Bot, by Cotoi Rares-Andrei
//Token hidden for security reasons

const Discord = require('discord.js');
const client = new Discord.Client();


const ytdl = require('ytdl-core');
const yts = require('yt-search');

const prefix = '!';
const lim = 0;
var version = '1.0.1';
var token = '';

const { readdirStnc } = require('fs');
const { join } = require('path');


const queue = new Map();

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

let autoModLogs = "833245563604041750";
let welcomeID = "832997399643160577";
let botcomms = "834104385016561724";

client.on('guildMemberAdd', (member) =>{
  
  const channel = member.guild.channels.cache.find(channel => channel.id === welcomeID);
  
  if(!channel) return;

  let joinEmbed = new Discord.MessageEmbed()
      .setColor('#ce1126')
      .setAuthor(`Salut ${member.user.username}#${member.user.discriminator}, bine ai venit la Consiliul Judetean al Elevilor Cluj!`)
      .setTimestamp()
      .setFooter('Consiliul Judetean al Elevilor Cluj Automoderator','https://i.gyazo.com/daac4d608d4142f1f9175be13c8309a7.jpg');

  channel.send(joinEmbed);

});

client.on('guildMemberRemove', (member) => {


    const channel = member.guild.channels.cache.find(channel => channel.id === welcomeID);
  
    if(!channel) return;

    let leaveEmbed = new Discord.MessageEmbed()
      .setColor('#0729f6')
      .setAuthor(`${member.user.username}#${member.user.discriminator} a iesit!`)
      .setTimestamp()
      .setFooter('Consiliul Judetean al Elevilor Cluj Welcome','https://i.gyazo.com/daac4d608d4142f1f9175be13c8309a7.jpg');


    channel.send(leaveEmbed);

});


client.once('ready', () => {
    console.log('Connected!');
    client.user.setActivity(`Developer: Rares#8823`, {type: "PLAYING"});
});

client.on('message', msg =>{

  let wordArray = msg.content.split(" ")

  let filterWords = ["muie","pula","pizda","sugeo","sugi","milsugi","milbei","milspeli","catel","mil sugi","mi-l sugi","pzda","pla","pl","pzdm","suge-o","suge o"]
  for(var i = 0; i<filterWords.length; i++)
  {
      if(wordArray.includes(filterWords[i])){
        

        msg.delete()
        const automodEmbed = new Discord.MessageEmbed()
              .setColor('#ffe400')
              .setAuthor(`Mesajul trimis de ${msg.author.username} pe canalul ${msg.channel.name} a fost sters deoarece contine cuvinte interzise!`)
              .setTimestamp()
              .addFields(
                { name: 'Cuvant:', value: filterWords[i]}
              )
              .setFooter('Consiliul Judetean al Elevilor Cluj Automoderator','https://i.gyazo.com/daac4d608d4142f1f9175be13c8309a7.jpg');
        
        client.channels.cache.get(autoModLogs).send(automodEmbed);
        
        break;
      }
  }
});


client.on('message', async message => {
  if (message.content.startsWith(`${prefix}clear `)){
    if (message.member.hasPermission("ADMINISTRATOR")){
    const args = message.content.split(' ').slice(1); 
    const amount = args.join(' '); 

    if (!amount) return message.reply('Trebuie sa introduci o valoare valida!'); 
    if (isNaN(amount)) return message.reply('Numarul introdus este invalid'); 

    if (amount > 100) return message.reply('Nu poti sterge mai mult de 100 de mesaje in acelasi timp!');
    if (amount < 1) return message.reply('Trebuie sa stergi cel putin un mesaj!'); 

    message.channel.messages.fetch({ limit: amount }).then(messages => {
        message.channel.bulkDelete(messages
    )});} 
    else message.reply('Ai nevoie de permisiune pentru a face acest lucru!');
  }
});


client.on('message', async message =>{

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const serverQueue = queue.get(message.guild.id);

    if(message.content.startsWith(`${prefix}generator`)){
      if (message.member.hasPermission('ADMINISTRATOR')){
          let echipe = message.content.split(" ");
          if (getBaseLog(2,echipe.length - 1) % 1 == 0){
              var meciuri = new Discord.MessageEmbed()
                  .setColor('RANDOM')
                  .setAuthor('Zilele Elevului Clujean Bracket Generator')
                  .setThumbnail('https://i.imgur.com/9gBpxKi.png')
                  .setTitle('ZEC CHARITY 2021 Bracket')
                  .setFooter('Prezentele echipe s-au inscris in cadrul turneului ZEC CHARITY 2021. Acesta este bracket-ul oficial, toate echipele sunt rugate sa confirme prezenta la meci pe platforma Faceit. Succes!');

              for (x=1;x<echipe.length;x++){
                  meciuri.addFields({
                      name:`Echipa ${x}`,
                      value:`${echipe[x]}`
              });
              }
              let ok=0;
              let marcaje = Array(echipe.length);
              marcaje.fill(0);
              var meci=1;
              for (let indice=1;indice<echipe.length;indice++){
                  if (marcaje[indice]==0){
                      let y=Math.floor(Math.random() * (echipe.length-(indice+1)) + (indice+1));
                      while (marcaje[y]==1)
                          y=Math.floor(Math.random() * (echipe.length-(indice+1)) + (indice+1));
                      meciuri.addFields({
                          name:`Meciul ${meci}`,
                          value:` ${echipe[indice]} VS ${echipe[y]}`
                      });
                  meci++;
                  marcaje[indice]=1;
                  marcaje[y]=1;
                  }
              }
              message.channel.send(meciuri);
          }
          else{
              var echipeinvalid=new Discord.MessageEmbed()
              .setColor('RANDOM')
              .setThumbnail('https://i.imgur.com/9gBpxKi.png')
              .setTitle('Eroare');

              echipeinvalid.addFields({
                  name:`Numar de echipe invalid!`,
                  value:`Pentru a genera un bracket, numarul de echipe trebuie sa apartina multimii de numere formata din puterile lui 2`
              })
              message.channel.send(echipeinvalid);
          }
      }
  else{
      var nuarepermisiune = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail('https://i.imgur.com/9gBpxKi.png')
      .setTitle('Eroare');
      nuarepermisiune.addFields({
          name:`Nu ai permisiune!`,
          value:`Doar un Administrator al serverului poate folosi aceasta comanda. Daca crezi ca aceasta este o greseala, contacteaza dezvoltatorul acestei aplicatii (Rares#8823)`
      })
      message.channel.send(nuarepermisiune);
  }
  }
    if (message.content.startsWith(`${prefix}gameagents`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Game Agents");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}udp`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "UDP");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}dacia`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Dacia");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}seraphim`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Seraphim Family");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}bullet`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Bullet");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}urban`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Urban Gruv");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}kmfu`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "KMFU");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}morlaca`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Morlaca");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}bembem`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "BemBem");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}gherla`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Gherla Power");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}somes`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "S0MES-N4P0C4");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}progaming`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "XxXProGamingXxX");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}redpack`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "REDPACK");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}cartel`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "El Loco Cartel");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}samurai`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "SAMURAI");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}silver`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Silver Smurfers");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}ascend`)){
      let role = message.member.guild.roles.cache.find(role => role.name === "Ascend");
      message.guild.members.cache.get(message.author.id).roles.add(role);
      client.channels.cache.get(botcomms).send(`Rolul ${role} a fost adaugat lui ${message.author}`);
    }
    if (message.content.startsWith(`${prefix}play `) || message.content.startsWith(`${prefix}p `)) {      
       execute(message, serverQueue);
       message.channel.send(`Melodia a fost adaugata de ${message.author}`);
    return;
    }
    else if (message.content.startsWith(`${prefix}skip`) || message.content.startsWith(`${prefix}next`)) {
      message.channel.send(`${message.author} vrea sa treaca la urmatoarea melodie`);
      skip(message, serverQueue);
    return;
    } 
    else if (message.content.startsWith(`${prefix}stop`) || message.content.startsWith(`${prefix}leave`) || message.content.startsWith(`${prefix}l`)) {
      message.channel.send(`Muzica a fost oprita de ${message.author}`);
      stop(message, serverQueue);
    return;
    } 
    else if(message.content.startsWith(`${prefix}discord`))
    { 
      message.channel.send ('**DISCORD:  https://discord.gg/cKr4hprZ **');
      return;
    }
    else if(message.content.startsWith(`${prefix}site`))
    { 
      message.channel.send ('https://www.cjecluj.ro');
      return;
    }
    else if(message.content.startsWith(`${prefix}facebook`))
    { 
      message.channel.send ('https://www.facebook.com/ConsiliulJudeteanAlElevilorCluj');
      return;
    }
    else if(message.content.startsWith(`${prefix}insta`))
    { 
      message.channel.send ('https://www.instagram.com/cjecluj/');
      return;
    }
    else if(message.content.startsWith(`${prefix}instagram`))
    { 
      message.channel.send ('https://www.instagram.com/cjecluj/');
      return;
    }
    else if(message.content.startsWith(`${prefix}zec`))
    { 
      message.channel.send ('Facebook: https://www.facebook.com/ZileleElevuluiClujean \nInsta: https://www.instagram.com/zec_cje/');
      return;
    }
    else if(message.content.startsWith(`${prefix}histrio`))
    { 
      message.channel.send ('Facebook: https://www.facebook.com/histrioniada \nInsta: https://www.instagram.com/histrioniadaliceenilor/');
      return;
    }
    else if(message.content.startsWith(`${prefix}viatadeliceu` || `${prefix}vdl`))
    { 
      message.channel.send ('Facebook: https://www.facebook.com/VLCluj \nInsta: https://www.instagram.com/viatadeliceu/');
      return;
    }
    else if(message.content.startsWith(`${prefix}comenzi`))
    { 
      message.channel.send ('Comenzi: !play, !skip, !stop, !discord, !bex, !bdp, !site, !facebook, !instagram (sau !insta), !zec, !histrio, !viatadeliceu');
      return;
    }
    else if(message.content.startsWith(`${prefix}regulament`)){
      message.channel.send(' ```Participanții din cadrul ZEC Charity își asumă următoarele: \n\nDonația minimă pentru participare este 75 RON, careia i se poate adăuga o sumă de bani opțional; \nFaptul că au luat la cunoștință că toți banii strânși din taxa de intrare vor fi donați unei cauze sociale; \nConectarea la timp în cadrul platformei “Faceit”, platforma oficială prin care se va desfășura turneul, în caz contrat echipa în cauză mai are o ocazie pentru a se conecta, iar dacă nici atunci nu reușesc, sunt descalificați prin neprezentare; \nPosibilitatea de a avea o rezervă pentru unul dintre jucători;  \nUtilizarea serverului de Discord destinat comunicării echipelor individual, pe parcursul evenimentului; \nEste interzisă utilizarea oricărei metodă de distorsionare a cursului normal al meciului; \nJucătorul ce a folosit diferite metode a a-și avantaja echipa în orice mod neaprobat de organizatori este descalificat, împreună cu echipa din care face parte; ``` ')
      return;
    }
});


async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 3,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
    
  if (!serverQueue)
    return message.channel.send("There is no song that I could stop!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.log(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

client.login(token);

