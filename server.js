const Aoijs = require("aoi.js")

const bot = new Aoijs.Bot({
fetchInvites: true,
token: "TOKEN", //Discord Bot Token
prefix: "$getServerVar[prefix]", //Customizable
fetchInvites: true,
mobile: false
})
bot.onMessage() //Allows to run Commands

bot.command({
name: "ping", //Trigger name (command name)
code: `$ping Pong!` //Code
})


bot.readyCommand({
    channel: "", //You can use this or not.
    code: `$log[ $userTag[$clientID] is online now 🟢]` //Enter the code / message.
})

bot.status({
  text: "help",
  type:"PLAYING",
  time: 10
}) 

//VARIABLES
bot.variables({
ban:"",
modlogs:"",
prefix:"",
warn:"",
snipe_author:"",
snipe_msg:"",
snipe_channel:"",
snipe_channel:"",
snipe_msg:"",
Bank:"",
Wallet:"",
NetWorth:"",
})
  
  

//COMMANDS-

//MODERATION-
bot.command({
    name: "ban",
    code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Ban}{field:Moderator:$username}{field:User:$username[$findUser[$message[1]]]#$discriminator[$findUser[$message[1]]]\n(\`$findUser[$message[1]]\`)}{thumbnail:$userAvatar[$findUser[$message[1]]]}{color:RANDOM}]
$endif

 $color[RANDOM] 
$author[🌈 Banned successfully]
$addField[About:;
Reason:
> $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]
Date:
> $day $month $year
]
$addField[User information;
$userTag[$findUser[$message[1]]] - $findUser[$message[1]]]
$addField[Moderator;
$userTag - $authorID]
$thumbnail[$userAvatar[$findUser[$message[1]]]]

$ban[$findUser[$message[1]];$userTag: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]];7]
$if[$memberExists[$findUser[$message[1]]]==true]
$onlyIf[$rolePosition[$highestRole[$findUser[$message[1]]]]>$rolePosition[$highestRole];⛔ - To use this you need to have a higher rank than the mentioned user.]
$onlyIf[$findUser[$message[1]]!=$authorID;**⛔ - You can't ban yourself (Or else, I couldn't find that user)**]
$onlyIf[$findUser[$message[1]]!=$clientID;**⛔ - I can't ban myself, that's illegal**]
$onlyIf[$findUser[$message[1]]!=$ownerID;**⛔ - I can't ban the owner of the server**]
$elseIf[$memberExists[$findUser[$message[1]]]==false]
$onlyIf[$findUser[$message[1]]!=$authorID;**⛔ - You can't ban yourself (Or else, I couldn't find that user)**]
$endelseIf
$endif
$onlyIf[$isBanned[$findUser[$message[1]]]==false;**⛔ - This user has already been banned on this server**]
$onlyIf[$message!=;**⛔ - Please specify the user you want to ban. Correct usage:** \`$getServerVar[prefix]ban <@User> [Reason\\]\`]
$onlyPerms[ban;**⛔ - To use this you require the \`BAN_MEMBERS\` permission**]
 $onlyBotPerms[ban;**⛔ - I don't have enough perms to execute this command. Permissions missing:** \`BAN_MEMBERS\`]`
})

bot.command({
    name: "unban",
    code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Unban}{field:Moderator:$username}{field:User:$username[$findUser[$message[1]]]#$discriminator[$findUser[$message[1]]]\n(\`$findUser[$message[1]]\`)}{thumbnail:$userAvatar[$findUser[$message[1]]]}{color:RANDOM}]
$endif
$unban[$findUser[$message[1]];$userTag: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]];7]
$username[$findUser[$message[1]]] **has been unbanned ✅**
$onlyBotPerms[ban;**⛔ I don't have ban perms]
$argsCheck[>1;**⛔ Please Provide User ID To Unban**]
$onlyPerms[ban;**⛔ You need ban permission**]
$suppressErrors[**⛔ I can't find that user**]`
})

bot.command({
    name: "kick",
    code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Kick}{field:Moderator:$username}{field:User:$username[$findUser[$message[1]]]#$discriminator[$findUser[$message[1]]]\n(\`$findUser[$message[1]]\`)}{thumbnail:$userAvatar[$findUser[$message[1]]]}{color:RANDOM}]
$endif
 $kick[$findUser[$message[1]]]
 $title[Kick]
 $description[
 Successfully kicked the user
 **Tag:** $userTag[$findUser[$message[1]]]
 **Mention:** <@$findUser[$message[1]]>
 **ID:** $findUser[$message[1]]]
 $footer[Kicked by $username[$authorID]]
 $addTimestamp
 $color[RANDOM]
$onlyIf[$findUser[$message[1]]!=$clientID;**❌ I can't kick my self**]
$onlyIf[$findUser[$message[1]]!=$authorID;**❌ You can't kick yourself**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];**❌ You can't kick someone with higher or the same roles as you**]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$findUser[$message[1]]]];**❌ I can't kick someone with higher or the same roles as me**]
$onlyIf[$memberExists[$findUser[$message[1]]]==true;**❌ Couldn't find a member with this ID/name/mention in the server**]
$onlyIf[$findUser[$message[1]]!=$ownerID;**❌ I can't modify the server owner**]
$onlyIf[$message[1]!=;**❌ Please mention someone to kick**]
$onlyBotPerms[kick;**❌ The bot doesn't have enough permissions**]
$onlyPerms[kick;**❌ You don't have enough permission**]`
})

bot.command({
    name: "clear",
    aliases: ['purge'],
    code: `
$author[Cleaning;https://thumbs.gfycat.com/AltruisticDistinctAoudad-size_restricted.gif]
$deleteIn[3s]
$description[**Done** \`$noMentionMessage $replaceText[$replaceText[&$mentioned[1]&;&&;messages\` **were cleared**;1];&$mentioned[1]&;**of last messages of**;1] $replaceText[$replaceText[&$mentioned[1]&;&&;;1];&$mentioned[1]&;<@$mentioned[1]>;1]]
$clear[$message]
$color[RANDOM]
$cooldown[10s;<@$authorID> **You need to wait %time% to use this command again**]
$footer[Cleared By: $username[$authorID]#$discriminator[$authorID]]
$suppressErrors[**Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyIf[$noMentionMessage<=500; **You can eliminate 2-500 messages per command**]
$onlyIf[$noMentionMessage>=2;**You can eliminate 2-500 messages per command**]
$onlyIf[$noMentionMessage!=;** Add a number to delete the messages**, **Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyIf[$isNumber[$noMentionMessage]==true;Choose the number of messages to delete! **Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyIf[$message[1]!=;**Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyBotPerms[managemessages;**I don't have \`MANAGE_MESSAGES\` permissions to use this command**]
$onlyPerms[managemessages;**You dont have this perm to delete messages:** __**Manage Messages**__]`
})

bot.command({
    name: "warn",
    code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Warn}{field:Moderator:$username}{field:User:$username[$findUser[$message[1]]]#$discriminator[$findUser[$message[1]]]\n(\`$findUser[$message[1]]\`)}{thumbnail:$userAvatar[$findUser[$message[1]]]}{color:RANDOM}]
$endif

$color[RANDOM]
$title[Warned $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has warned **$username[$mentioned[1;yes]]** for \`$noMentionMessage\`
he now has \`$getUserVar[warn;$findUser[$message]]\` Warnings
]
$setUserVar[reason;$getUserVar[reason;$mentioned[1]]/**$date+:$hour:$minute:$second**+> $noMentionMessage+;$mentioned[1]]
$setUserVar[warn;$sum[$getUserVar[warn;$mentioned[1]];1];$mentioned[1]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$message[2]!=;**⛔ Provide a reason**]
$onlyIf[$mentioned[1]!=;**⛔ Mention the user you want to warn and provide a reason**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't warn yourself**]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;**⛔ You can't warn a bot**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})

bot.command({
    name: "unwarn",
    code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Unwarn}{field:Moderator:$username}{field:User:$username[$findUser[$message[1]]]#$discriminator[$findUser[$message[1]]]\n(\`$findUser[$message[1]]\`)}{thumbnail:$userAvatar[$findUser[$message[1]]]}{color:RANDOM}]
$endif
$color[RANDOM]
$title[Removed Warn from $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has removed a warn from **$username[$mentioned[1;yes]]** 
he now has \`$getUserVar[warn;$findUser[$message]]\` Warnings]
$setUserVar[warn;$sub[$getUserVar[warn;$findUser[$message]];1];$findUser[$message]]
$removeSplitTextElement[$getTextSplitLength]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$getUserVar[warn;$findUser[$message]]>0;**⛔ The Warnings of this User is already at 0**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't unwarn yourself**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**, Correct usage: \`$getServerVar[prefix]unwarn <@user>\`]
$onlyPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms**]`
})

bot.command({
    name: "removerole",
    code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Role Removed <@&$mentionedRoles[1]>}{field:Moderator:$username}{field:User:$username[$findUser[$message[1]]]#$discriminator[$findUser[$message[1]]]\n(\`$findUser[$message[1]]\`)}{thumbnail:$userAvatar[$findUser[$message[1]]]}{color:RANDOM}]
$endif
$color[RANDOM]
$takeRoles[$mentioned[1];$mentionedRoles[1]]
$title[Removed role to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has taken <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})

bot.command({
    name: "giverole",
    code: `$if[$serverChannelExists[$getServerVar[modlogs]]==true]
$channelSendMessage[$getServerVar[modlogs];<@$authorID>{title:Mod Logs}{field:Action:Role Added <@&$mentionedRoles[1]>}{field:Moderator:$username}{field:User:$username[$findUser[$message[1]]]#$discriminator[$findUser[$message[1]]]\n(\`$findUser[$message[1]]\`)}{thumbnail:$userAvatar[$findUser[$message[1]]]}{color:RANDOM}]
$endif
$color[RANDOM]
$giveRoles[$mentioned[1];$mentionedRoles[1]]
$title[Role given to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has given <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})

bot.command({
    name: "poll",
    code: `$title[Poll Time!]
$addReactions[👍;👎;❔]
$description[$message] 
$footer[👍 Yes - 👎 Not - ❔ Maybe]
$color[$random[0;999999]]
$argsCheck[>1;**Use:** \`$getServerVar[prefix]poll <PollMessage>\`]
$onlyPerms[admin;❌ **You need Administrator Permissions!**]`
})

bot.command({
  name: "snipe",
  code: `
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]
$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;Theres nothing to snipe in <#$mentionedChannels[1;yes]>]
 `
});






//INFO COMMANDS

bot.command({
    name: "userinfo",
    aliases: ['userinformation', 'whois'],
    code: `$color[RANDOM]
    $thumbnail[$userAvatar[$findMember[$message]]]
    $author[$userTag[$findMember[$message]];$userAvatar[$findMember[$message]]]
    $title[User Information]
    $addField[Bot; $replaceText[$replaceText[$checkCondition[$isBot[$findMember[$message]]==true];true;Yes];false;No]]
    $addField[Roles;
    $replaceText[$replaceText[$checkCondition[$charCount[$userRoles[$findMember[$message];mentions;/]]>1850];true;User has too many roles to be displayed];false;$userRoles[$findMember[$message];mentions; ]]]
    $addField[Highest Role; <@&$highestRole[$findMember[$message]]>;yes]
    $addField[ID; $findMember[$message];yes]
    $addField[Platform; $replaceText[$replaceText[$replaceText[$replaceText[$platform[$findMember[$message]];none;None];web;Website];mobile;Phone];desktop;PC];yes]
    $addField[State; $replaceText[$replaceText[$checkCondition[$checkContains[$getCustomStatus[$findMember[$message];state];https;discord.gg;.gg;.com;.xyz;.app;.net;.org;.info;.co;.edu;.gov;.tv;.club]==true];true;Hidden];false;$replaceText[$getCustomStatus[$findMember[$message];emoji];none;] $replaceText[$replaceText[$checkContains[$getCustomStatus[$findMember[$message];state];none];true;None];false;$getCustomStatus[$findMember[$message];state]]];yes]
    $addField[Status; $replaceText[$replaceText[$replaceText[$replaceText[$status[$findMember[$message]];offline;Offline];online;Online];dnd;Do not disturb];idle;Idle];yes]
    $addField[Creation Date; $creationDate[$findMember[$message]];yes]
    $addField[Join Date; $memberJoinedDate[$findMember[$message]];yes]
    $addTimestamp
    $footer[Requested by $userTag;$authorAvatar]
    $onlyIf[$checkContains[$channelType;text;news]==true;]
    `
})

bot.command({
name: "role-info",

aliases: ["roleinfo", "r-info"] ,

code: `

$title[$roleName[$findRole[$message]] Info]

$description[
**Name:**
<@&$findRole[$message]>

**Color:**
\`$getRoleColor[$findRole[$message]]\`

**Creation Date:**
\`$creationDate[$findRole[$message];date]\`

**You have this role?**
\`$toLocaleUpperCase[$hasRole[$authorID;$findRole[$message];$guildID]]\`

**Members:**
\`$djsEval[message.guild.roles.cache.get('role id').members.map(m=>m.id).length;yes]\`

**permissions:**
\`$rolePerms[$findRole[$message];,]\`]

$color[$getRoleColor[$findRole[$message]]]



$argsCheck[1;{title:incorrect usage}{description:**Correct Usage:**

roleinfo <mention/ID>}

$suppressErrors[{description:please mention or give a valid ID of the role}]`

})

bot.command({
        name: "channelinfo",
        aliases: ["ci"],
        code: `
$reply[$messageID;
{title:Channel Information}
{field:Name:<#$channel[$findChannel[$message];id]> **\`$channel[$findChannel[$message];name]\`**}
{field:ID:$channel[$findChannel[$message];id]}
{field:Topic:$replaceText[$channel[$findChannel[$message];topic];null;No topic.]}
{field:Channel Type:$replaceText[$replaceText[$replaceText[$replaceText[$channel[$findChannel[$message];type];text;Text Channel];voice;Voice Channel];category;Category Channel];news;News Channel]}
{field:Category:<#$channel[$findChannel[$message];parentid]>}
{field:Position:$channel[$findChannel[$message];position]}
{field:Created At:$channel[$findChannel[$message];created]}
{timestamp:ms}
{color:RANDOM}]
`
});

bot.command({
name:"stats",
aliases:['i','botstats','info','botinfo','bot-stats','bot-info'],
code:`
$author[Bot Stats;$userAvatar[$clientID]]
$description[
$addField[Version;

 Node.JS Version: $nodeVersion

$addField[General;
\`🏓\` Ping: $pingms
\`⏱️\` Uptime: $client[readytimestamp]

\`⚙️\` Commands Count: $commandsCount
\`👥\` All Members Count: $allMembersCount

\`🏅\` All Channels Count: $allChannelsCount

All Text Channels : $allChannelsCount[text]
All Voice Channels: $allChannelsCount[voice]

\`🚦\` Ram Usage: $ram MB/$replaceText[$abbreviate[$maxRam];K; GB;-1]]

$color[RANDOM]
$thumbnail[$userAvatar[$clientid]]
$footer[$userTag[$clientID];$userAvatar[$clientID]]
$addTimestamp
`
})

bot.command({
  name: "serverinfo",
  aliases: ["si"],
  code: `$addfield[👥 Members(Without Bots) ($membersCount);ㅤ]

$color[#FFFFFF]

$addfield[📆 Server Created;$guild[$guildID;created] ( \`$guild[$guildID;timestamp]\` )]

$addfield[💬 Channel Count ($channelCount[text;voice]);
Text Channels  $channelCount[text]
Voice Channels $channelCount[voice]]

$addfield[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$serverRegion;brazil;🇧🇷];europe;🇪🇺];hong kong;🇨🇳];eua;🇺🇸];india;🇮🇳];japan;🇯🇵] Server Region; $replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$replaceText[$serverRegion;brazil;Brazil];europe;Europe];hong kong;Hong Kong];eua;Eua];india;India];japan;Japan]]

$addfield[Server Owner;\`$userTag[$ownerID]\` ($ownerID)]

$addfield[Server ID;$guildID]

$title[$serverName]
$thumbnail[$serverIcon]`
});

//Image Commands
bot.command({
  name: "slap",
  code: `
 $image[https://vacefron.nl/api/batmanslap?text1=AAAA!&text2=LUUUU&batman=$userAvatar&robin=$userAvatar[$mentioned[1]]] $color[RANDOM]`
});

bot.command({
 name: "meme",
 code:`
 $author[$jsonRequest[https://bloxapi.soudblox.repl.co/meme;sub]]
 $title[$jsonRequest[https://bloxapi.soudblox.repl.co/meme;title];$jsonRequest[https://bloxapi.soudblox.repl.co/meme;url]
 $image[$jsonRequest[https://bloxapi.soudblox.repl.co/meme;link]
 $color[RANDOM]
 $footer[$jsonRequest[https://bloxapi.soudblox.repl.co/meme;ups] ⬆ | $jsonRequest[https://bloxapi.soudblox.repl.co/meme;comments] 🎈]`
})
bot.command({
 name: "rip",
 code: `
 $image[https://vacefron.nl/api/grave?user=$userAvatar[$mentioned[1]][&]
 $color[RANDOM]`
})
bot.command({
  name: "stonks",
  code: `
 $image[https://vacefron.nl/api/stonks?user=$userAvatar[$mentioned[1]][&notstonks=BOOL]]
 $color[RANDOM]`
});
bot.command({
  name: "car",
  code: ` $image[$jsonRequest[https://no-api-key.com/api/v1/car;image]]
`
});

//Economy Commands

bot.command({
  name: "deposit",
  aliases: "dep",
  code: `$setGlobalUserVar[Bank;$sum[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$title[Deposited]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you deposited $$numberSeparator[$message] into your bank!]
$footer[💵 $$numberSeparator[$sub[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sum[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Wallet;$authorID];Cannot deposit more than what's in your wallet!]
$argsCheck[>1;How much are you depositing? Try this: \`$getServerVar[prefix]dep <amount>\`]
$onlyIf[$getGlobalUserVar[Wallet;$authorID]>0;There's nothing to deposit!]`
});

bot.command({
  name: "withdraw",
  aliases: "with",
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$message];$authorID]
$setGlobalUserVar[Bank;$sub[$getGlobalUserVar[Bank;$authorID];$message];$authorID]
$title[Withdrew]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[
$username, you withdrew $$numberSeparator[$message] from your bank!]
$footer[💵 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$message]] | 🏦 $$numberSeparator[$sub[$getGlobalUserVar[Bank;$authorID];$message]] | 📊 $$numberSeparator[$sum[$getGlobalUserVar[Wallet;$authorID];$getGlobalUserVar[Bank;$authorID]]]]
$onlyIf[$isNumber[$message[1]]==true;That's not a number!]
$onlyIf[$message<=$getGlobalUserVar[Bank;$authorID];Cannot withdraw more than what's in your bank!]
$argsCheck[>1;How much are you withdrawing?]
$onlyIf[$getGlobalUserVar[Bank;$authorID]>0;There's nothing to withdraw!]`
});

bot.command({
  name: "beg",
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[0;25]];$authorID]
$title[Beg]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$description[$username, $randomText[Begging is for the weak so here;Here, take this and go;Here, don't let this be a habit;I take you for a well put together human being, why are you begging?;Why can't you just get a job?]
]
$footer[💵 +$$random[0;25]]
$globalCooldown[30s;Quit being a begger and try again in %time%]`
});

bot.command({
  name: "bal",
  code: `$onlyIf[$isBot[$mentioned[1;yes]]!=true;Discord bots dont have a balance]
$thumbnail[$userAvatar[$mentioned[1;yes]]]
$color[RANDOM]
$title[$username[$mentioned[1;yes]]'s Balance]
$description[
$addField[💳Wallet;
$$numberSeparator[$getGlobalUserVar[Wallet;$mentioned[1;yes]]]
]
$addField[🏦 Bank;
$$numberSeparator[$getGlobalUserVar[Bank;$mentioned[1;yes]]]
]
$addField[📊 Net Worth;
$$numberSeparator[$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$getGlobalUserVar[Bank;$mentioned[1;yes]]]]
]]`
});

bot.command({
name: "slots",
aliases: ["slot"],
code: `
$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet];$replaceText[$replaceText[$checkCondition[won==$randomText[won;lost]];true;$message[1]];false;-$message[1]]]]

$thumbnail[$authorAvatar]
$color[$replaceText[$replaceText[$checkCondition[$randomText[won;lost]==won];true;07ff00;1];false;E64338;1]]
$title[$username's Slot Game] 
$description[>>> **$randomText[🔵;🟠;🍏;🔴;🍇] | $randomText[🟠;🔴;🍇;🍏;🔵] | $randomText[🔴;🔵;🟠;🍇;🍏]
$replaceText[$replaceText[$checkCondition[$randomText[won;lost]==won];true;$randomText[🟠 | 🟠 | 🟠 ;🍇 | 🍇 | 🍇;🔴 | 🔴 | 🔴;🍏 | 🍏 | 🍏;🔵 | 🔵 | 🔵]];false;$randomText[🔴 | 🟠 | 🟠;🍇 | 🍏 | 🔴;🍇 | 🍒 | 🟠;🍏 | 🟠 | 🍒;🍏 | 🍇 | 🟠;🔵 | 🟠 | 🍒;🍒 | 🔵 | 🟠;🍏| 🔵 | 🍇;🍇 | 🔵 | 🍒;🍏 | 🟠 | 🔵]]
$randomText[🍇;🟠;🔵;🍏;🔴] | $randomText[🔴;🍏;🍇;🔵;🟠] | $randomText[🔴;🍇;🔵;🍏;🟠]**]
$footer[You $randomText[won;lost] $message[1] 💰]

$argsCheck[1;Please type amount.]

$onlyIf[$isNumber[$message[>]]==true;Wrong syntax! that's not an amount.]

$onlyIf[$message[>]>=10;Minimum bet amount is 10.]

$onlyIf[$message[>]<=100000;Maximum bet amount is 100000.]

$onlyIf[$getGlobalUserVar[Wallet]>=$message[>];You don't have enough coins in your wallet.]
`})

bot.command({
  name: "weekly",
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[2000;3000]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Weekly]
$description[You have claimed your weekly cash]
$footer[💵 +$$random[2000;3000] ]
$globalCooldown[7d;Try again in %time%]`
});
bot.command({
  name: "daily",
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$authorID];$random[1000;2000]];$authorID]
$thumbnail[$userAvatar[$authorID]]
$color[RANDOM]
$title[Daily]
$description[You have claimed your daily cash]
$footer[💵 +$$random[1000;2000] ]
$globalCooldown[1d;Try again in %time%]`
});

bot.command({
  name: "givemoney",
  aliases:'give',
  code: `$setGlobalUserVar[Wallet;$sum[$getGlobalUserVar[Wallet;$mentioned[1;yes]];$noMentionMessage];$mentioned[1;yes]]
$setGlobalUserVar[Wallet;$sub[$getGlobalUserVar[Wallet;$authorID];$noMentionMessage];$authorID]
$color[RANDOM]
$thumbnail[$userAvatar[$authorID]]
$title[$username gave $username[$mentioned[1]] money]
$description[
$username gave $username[$mentioned[1]] **$noMentionMessage** :dollar:!
$username[$mentioned[1]] is now holding **$sum[$getGlobalUserVar[Wallet;$mentioned[1]];$noMentionMessage]** :dollar: in his wallet!
]
$onlyIf[$noMentionMessage<=$getGlobalUserVar[Wallet;$authorID];**⛔ You don't have enough in your wallet**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't give money to yourself**]
$onlyIf[$mentioned[1]!=;**⛔ Mention someone to give money to and then the amount, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
$onlyIf[$isBot[$mentioned[1]]!=true;**⛔ You can't give money to a Discord bot**]
$onlyIf[$isNumber[$noMentionMessage]==true;**⛔ That is not a number, try using this format**: \`$getServerVar[prefix]givemoney <@user> <amount>\`]
$suppressErrors[Usage: **$getServerVar[prefix]givemoney <@user> <amount>**]`
});
