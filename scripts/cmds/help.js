 const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;

module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "Blaze Nova & L'Uchiha Perdu",
    countDown: 5,
    role: 0,
    shortDescription: { en: "View command usage and list all commands" },
    longDescription: { en: "View command usage and list all commands with detailed info" },
    category: "info",
    guide: { en: "{pn} [empty | <command name>]" },
    priority: 1
  },

  onStart: async function ({ message, args, event, role }) {
    const { threadID } = event;
    const prefix = getPrefix(threadID);

    if (args.length === 0) {
      let msg = "✦ 𝐒𝐇𝐀𝐃𝐎𝐖 𝐂𝐌𝐃𝐒 ✦\n══━━━━✥🍀✥━━━━══\n";
      
      const categories = {};
      for (const [name, value] of commands) {
        if (value.config.role > role) continue;
        const category = value.config.category || "Uncategorized";
        categories[category] = categories[category] || { commands: [] };
        categories[category].commands.push(name);
      }

      Object.keys(categories)
        .filter(cat => cat !== "info")
        .forEach(category => {
          msg += `✧ ${category.toUpperCase()} ✧\n`;
          msg += `⊰⊰⊰⊰⊰⊰⊰⊰⊰⊰⊰⊰\n`;
          const names = categories[category].commands.sort();
          names.forEach(cmd => {
            msg += `  ❖ ${cmd.padEnd(15)}\n`;
          });
          msg += `══━━━━✥🍀✥━━━━══\n`;
        });

      msg += ` 𝚂𝙷𝙰𝙳𝙾𝚆 𝐝𝐢𝐬𝐩𝐨𝐬𝐞 𝐚𝐜𝐭𝐮𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐝𝐞 🍂 ${commands.size} 🍂 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐒𝐚𝐢𝐬𝐢𝐬 ${prefix}𝐡𝐞𝐥𝐩 𝐬𝐮𝐢𝐯𝐢 𝐝𝐮 𝐧𝐨𝐦 𝐝𝐞 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐩𝐨𝐮𝐫 𝐩𝐥𝐮𝐬 𝐝𝐞 𝐝𝐞𝐭𝐚𝐢𝐥𝐬 𝐬𝐮𝐫 𝐥𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞`;
      msg += ` ══━━━━✥🍀✥━━━━══\n`;
      await message.reply({ body: msg });
    } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));

      if (!command) {
        await message.reply(`𝗖𝗠𝗗 "『${commandName}』" 𝗻'𝗲𝘅𝗶𝘀𝘁𝗲 𝗽𝗮𝘀`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
        const longDescription = configCommand.longDescription?.en || "No description";
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{pn}/g, prefix + configCommand.name);

        let response = `✦ NAME ✦\n  ${configCommand.name}\n\n`;
        response += `❖ INFO ❖\n`;
        response += `  📜 Description: ${longDescription}\n`;
        response += `  🔗 Alias: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Aucun"}\n`;
        response += `  🏆 Rôle: ${roleText}\n`;
        response += `  ⏳ Temps d'attente: ${configCommand.countDown || 1}s\n`;
        response += `  🛠️ Auteur: ${author}\n\n`;
        response += `❖ USAGE ❖\n  ${usage}\n\n`;
        response += `❖ NOTES ❖\n  🔹 Le contenu entre <XXXXX> peut être modifié\n  🔹 Le contenu entre [a|b|c] signifie a ou b ou c\n`;

        await message.reply(response);
      }
    }
  }
};

function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (Tous les utilisateurs)";
    case 1:
      return "1 (Administrateurs de groupe)";
    case 2:
      return "2 (Admin du bot)";
    default:
      return "Rôle inconnu";
  }
	}
