fs = require("fs-extra");
const axios = require("axios");
const path = require("path"); 
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "🧸🩸『𝐁𝐋𝐀𝐙𝐄𝐑』ホ"; 

module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "ArYan",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "View command usage and list all commands directly",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },

  onStart: async function ({ message, args, event, threadsData, role }) {
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      const categories = {};
      let msg = "╭───────🎯";

      msg += `\n│🌡️✨𝐄𝐆𝐆𝐌𝐀𝐍 𝐂𝐌𝐃𝐒 ✨🌡️ \n╰────────────🎯`; 
    msg += `\n━━━━━━━━━━━━━━━` ;
      for (const [name, value] of commands) {
        if (value.config.role > 1 && role < value.config.role) continue;

        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories).forEach((category) => {
        if (category !== "info") {
          msg += `\n╭──シ 🌡️🩺${category.toUpperCase()} 🩺🌡️ `;


          const names = categories[category].commands.sort();
          for (let i = 0; i < names.length; i += 3) {
            const cmds = names.slice(i, i + 2).map((item) => `\n│ 🧬✘.${item}–シ🧬`);
            msg += `\n│${cmds.join(" ".repeat(Math.max(1, 5 - cmds.join("").length)))}`;
          }

          msg += `\n╰────────────シ`;
        }
      });

      const totalCommands = commands.size;
      msg += `\n𝐀𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝘀𝗵𝗮𝗱𝗼𝘄 𝐝𝐢𝐬𝐩𝐨𝐬𝐞 𝐝𝐞 🍁${totalCommands}🍁 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 !\n`;
      msg += `𝐒𝐚𝐢𝐬𝐢𝐬 🎶${prefix}𝐡𝐞𝐥𝐩🎶  𝐬𝐮𝐢𝐯𝐢 𝐝𝐮 𝐧𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐩𝐨𝐮𝐫 𝐜𝐨𝐧𝐧𝐚𝐢𝐭𝐫𝐞 𝐩𝐥𝐮𝐬 𝐝𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬 𝐬𝐮𝐫 𝐥𝐚 𝐜𝐦𝐝 !`;
      msg +=`━━━━━━━━━━━━━━━`;

      msg +=  `\n ✨🎶 𝐒𝐚𝐢𝐬𝐢𝐬 ${prefix}shadowgc 𝐩𝐨𝐮𝐫  𝐫𝐞𝐣𝐨𝐢𝐧𝐝𝐫𝐞 𝐧𝐨𝐭𝐫𝐞  𝐦𝐚𝐠𝐧𝐢𝐟𝐢𝐪𝐮𝐞 𝐠𝐫𝐨𝐮𝐩𝐞, 𝐥𝐚̀ 𝐨𝐮̀  𝐫𝐞𝐠𝐧𝐞𝐧𝐭 𝐥𝐞𝐬 𝐦𝐞𝐢𝐥𝐥𝐞𝐮𝐫𝐬 𝐝𝐢𝐯𝐞𝐫𝐭𝐢𝐬𝐬𝐞𝐦𝐞𝐧𝐭 𝐞𝐭 𝐝𝐞 𝐛𝐞𝐥𝐥𝐞𝐬 𝐦𝐨𝐦𝐞𝐧𝐭 🎁🎉  `; 

      msg +=`━━━━━━━━━━━━━━━`;

 				const helpListImages = [

"https://i.imgur.com/GSxUIa4.gif",
"https://i.imgur.com/shoaM4J.mp4',",
"https://i.imgur.com/KHAlJw5.mp4" 

];


      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];

      await message.reply({
        body: msg,
        attachment: await global.utils.getStreamFromURL(helpListImage)
      });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";

        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";

        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);

        const response = `
  ╭───⸙
  │ 🔶 ${configCommand.name}
  ├── INFO
  │ 📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻: ${longDescription}
  │ 👑 𝗔𝘂𝘁𝗵𝗼𝗿: ${author}
  │ ⚙ 𝗚𝘂𝗶𝗱𝗲: ${usage}
  ├── USAGE
  │ 🔯 𝗩𝗲𝗿𝘀𝗶𝗼𝗻: ${configCommand.version || "1.0"}
  │ ♻𝗥𝗼𝗹𝗲: ${roleText}
  ╰────────────ツ`;

        await message.reply(response);
      }
    }
  },
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
	  }
