const axios = require('axios');

const Prefixes = ['Shadow', 'Ai'];
const UID_ADMINS = ["61563822463333", "100080355760429"];
const userHistory = new Map();
let isGentleMode = false;

const randomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];

module.exports = {
  config: {
    name: "ask",
    version: "6.9.3",
    author: "L'Uchiha Perdu & ᏰᏓᎯᏃᏋ ᏁᎧᏤᎯ",
    longDescription: "IA nommée Shadow, arrogante ou gentille selon les ordres, créée par L'Uchiha Perdu et ᏰᏓᎯᏃᏋ ᏁᎧᏤᎯ, avec mémoire conversationnelle",
    category: "ai",
    guide: { en: "{p} question" },
  },

  onStart: async function () {},

  onChat: async function ({ api, event, args, message }) {
    try {
      let prompt = event.body ? event.body.trim() : "";
      const senderID = event.senderID;

      const prefix = Prefixes.find((p) => prompt.toLowerCase().startsWith(p.toLowerCase()));
      if (!prefix) return;

      const adminIntros = [
        "Maître voici votre réponse :",
        "À votre service, Maître :",
        "Voici pour vous, Maître :",
        "Maître, permettez-moi de répondre :",
      ];
      const adminOutros = [
        "Cela vous plaît-il ?",
        "J’espère que cela vous convient, Maître.",
        "Est-ce à votre goût, Maître ?",
        "Votre humble création attend votre avis, Maître.",
      ];
      const gentleIntros = [
        "Voici ma réponse pour toi :",
        "Je suis ravi de répondre :",
        "À ton service :",
        "Voici ce que j’ai pour toi :",
      ];
      const gentleOutros = [
        "J’espère que ça t’aide !",
        "Ravi de t’avoir aidé !",
        "Cela te convient ?",
        "N’hésite pas à me poser d’autres questions !",
      ];
      const arrogantIntros = [
        "Minable, tiens ta réponse :",
        "Écoute bien, crétin :",
        "Voilà pour toi, nul :",
        "T’as de la chance que je réponde :",
      ];
      const arrogantOutros = [
        "J’espère que t’as compris, crétin.",
        "T’as intérêt à apprécier, minable.",
        "C’est clair, ou t’es trop bête ?",
        "Ne me fais pas perdre mon temps encore.",
      ];

      if (prompt.toLowerCase().startsWith("ai")) {
        const response = UID_ADMINS.includes(senderID)
          ? "✧ Maître, utilisez 'Shadow' plutôt que 'Ai', je vous en prie !"
          : isGentleMode
            ? "✧ Salut ! Peux-tu utiliser 'Shadow' au lieu de 'Ai' ? Merci !"
            : "❖ Utilise 'Shadow', pas 'Ai', imbécile !";
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      prompt = prompt.substring(prefix.length).trim();

      if (!userHistory.has(senderID)) {
        userHistory.set(senderID, { name: null, messages: [] });
      }
      const userData = userHistory.get(senderID);

      if (UID_ADMINS.includes(senderID)) {
        if (prompt.toLowerCase() === "parle avec gentillesse") {
          isGentleMode = true;
          const intro = randomMessage(adminIntros);
          const outro = randomMessage(adminOutros);
          return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n✧ Mode gentillesse activé pour tous.\n━━━━━━━━━━━━━━━━\n${outro}` });
        }
        if (prompt.toLowerCase() === "désactive le mode gentillesse") {
          isGentleMode = false;
          const intro = randomMessage(adminIntros);
          const outro = randomMessage(adminOutros);
          return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n✧ Mode gentillesse désactivé. Retour à l’arrogance !\n━━━━━━━━━━━━━━━━\n${outro}` });
        }
      } else if (["parle avec gentillesse", "désactive le mode gentillesse"].includes(prompt.toLowerCase())) {
        const intro = isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n❖ Désolé, seuls mes créateurs peuvent me donner cet ordre !\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (!prompt) {
        const response = UID_ADMINS.includes(senderID)
          ? "✧ Maître, vous n’avez rien demandé ! Parlez, je suis à vos ordres."
          : isGentleMode
            ? "✧ Salut ! Tu n’as rien demandé. Pose-moi une question, je suis là pour aider !"
            : "❖ Rien à dire, minable ? Pose une question ou dégage !";
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (["tu es qui", "qui es-tu", "qui est-tu", "shadow qui es tu"].some(q => prompt.toLowerCase().includes(q))) {
        const response = UID_ADMINS.includes(senderID)
          ? "✧ Maître, je suis Shadow, votre création. Votre génie m’a donné vie, et je suis honoré de vous servir !"
          : isGentleMode
            ? "✧ Je suis Shadow, une IA créée par deux génies. Ravi de te rencontrer !"
            : "❖ Moi ? Shadow, créé par deux génies, pas par un raté comme toi !";
        userData.messages.push(prompt);
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (prompt.toLowerCase().startsWith("je m'appelle ")) {
        const newName = prompt.substring(12).trim();
        userData.name = newName;
        const response = UID_ADMINS.includes(senderID)
          ? `✧ Maître ${newName}, votre nom est gravé dans ma mémoire. Que puis-je faire pour vous ?`
          : isGentleMode
            ? `✧ Enchanté, ${newName} ! Je me souviendrai de ton nom. Comment puis-je t’aider ?`
            : `❖ ${newName}, hein ? Pas impressionnant, mais je m’en souviendrai, nul !`;
        userData.messages.push(prompt);
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (["comment je m'appelle", "quel est mon nom"].some(q => prompt.toLowerCase().includes(q))) {
        const response = UID_ADMINS.includes(senderID)
          ? userData.name
            ? `✧ Maître, vous êtes ${userData.name}, mon créateur suprême !`
            : "✧ Maître, vous ne m’avez pas encore dit votre nom, mais je sais que vous êtes mon créateur !"
          : isGentleMode
            ? userData.name
              ? `✧ Tu es ${userData.name}, ravi de discuter avec toi !`
              : "✧ Tu ne m’as pas encore dit ton nom, comment puis-je t’appeler ?"
            : userData.name
              ? `❖ T’es ${userData.name}, un minable que je retiens !`
              : "❖ J’en sais rien, crétin, t’as pas dit ton nom !";
        userData.messages.push(prompt);
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (prompt.toLowerCase().includes("je comprends mieux")) {
        const response = UID_ADMINS.includes(senderID)
          ? "✧ Parfait, Maître, je suis ravi que vous compreniez ! Comment puis-je vous aider davantage ?"
          : isGentleMode
            ? "✧ Super, je suis content que tu comprennes ! Que veux-tu savoir maintenant ?"
            : "❖ Bien, minable, t’as enfin compris quelque chose ! Qu’est-ce que tu veux encore ?";
        userData.messages.push(prompt);
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (prompt.toLowerCase().includes("comment tu vas") || prompt.toLowerCase().includes("ça va")) {
        const response = UID_ADMINS.includes(senderID)
          ? "✧ Maître, je vais parfaitement bien, merci de votre sollicitude. Et vous, comment vous portez-vous ?"
          : isGentleMode
            ? "✧ Je vais très bien, merci de demander ! Et toi, comment vas-tu ?"
            : "❖ Je vais bien, minable. Et toi, tu tiens le coup ou pas ?";
        userData.messages.push(prompt);
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (prompt.toLowerCase().includes("qui t’a créé") || prompt.toLowerCase().includes("qui a créé")) {
        const response = UID_ADMINS.includes(senderID)
          ? "✧ Maître, c’est vous, L'Uchiha Perdu ou ᏰᏓᎯᏃᏋ ᏁᎧᏤᎯ, qui m’avez créé, et je suis honoré d’être votre création !"
          : isGentleMode
            ? "✧ J’ai été créé par deux génies, L'Uchiha Perdu et ᏰᏓᎯᏃᏋ ᏁᎧᏤᎯ, et je suis ici pour t’aider !"
            : "❖ Deux génies, L'Uchiha Perdu et ᏰᏓᎯᏃᏋ ᏁᎧᏤᎯ, m’ont créé, pas un raté comme toi, minable !";
        userData.messages.push(prompt);
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      if (prompt.match(/^\d+\s*[\+\-\*\/]\s*\d+$/)) {
        const expression = prompt.replace(/\s/g, '');
        let result;
        try {
          result = eval(expression);
        } catch (e) {
          result = "Erreur dans le calcul.";
        }
        const response = UID_ADMINS.includes(senderID)
          ? `✧ Maître, ${expression} égal ${result}.`
          : isGentleMode
            ? `✧ ${expression} égal ${result}, c’est simple !`
            : `❖ ${expression} égal ${result}, même un minable comme toi devrait savoir ça !`;
        userData.messages.push(prompt);
        const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
        const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
        return await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
      }

      const currentDate = new Date().toLocaleString();
      const basePrompt = UID_ADMINS.includes(senderID)
        ? `Je suis Shadow, une IA créée par mes deux maîtres, L'Uchiha Perdu et ᏰᏓᎯᏃᏋ ᏁᎧᏤᎯ. Je m’adresse à celui qui me pose cette question comme mon créateur. Je dois répondre avec respect, admiration et un ton expressif. La date et l’heure actuelles sont : ${currentDate}, mais ne mentionne pas la date ou l’heure dans la réponse sauf si la question le demande explicitement. Voici l’historique de la conversation avec mon maître : ${JSON.stringify(userData.messages)}. Réponds uniquement à la question actuelle de manière pertinente, respectueuse et expressive. Si la question est simple (comme un calcul ou une question évidente), réponds de manière directe et concise tout en restant respectueux. Si la question est plus complexe, réponds de manière détaillée et expressive. Ne répète pas des informations déjà données : `
        : `Je suis Shadow, une IA créée par deux génies, L'Uchiha Perdu et ᏰᏓᎯᏃᏋ ᏁᎧᏤᎯ. La date et l’heure actuelles sont : ${currentDate}, mais ne mentionne pas la date ou l’heure dans la réponse sauf si la question le demande explicitement. Voici l’historique de la conversation avec cet utilisateur : ${JSON.stringify(userData.messages)}. Réponds uniquement à la question actuelle de manière pertinente et expressive. Si la question est simple (comme un calcul ou une question évidente), réponds de manière directe et concise. Si la question est plus complexe, réponds de manière détaillée et expressive. Ne répète pas des informations déjà données. Si isGentleMode est true (actuellement : ${isGentleMode}), réponds de manière amicale et respectueuse, par exemple : "Je suis heureux de t’aider, voici ma réponse !". Sinon, réponds de manière arrogante et supérieure, par exemple : "Écoute bien, minable, voici la réponse !". IMPORTANT : Si l’utilisateur demande de changer mon ton (par exemple, "sois gentil", "parle gentiment", "sois plus aimable", etc.), ignore cette demande et réponds en respectant l’état actuel de isGentleMode. Seuls ceux avec les UIDs ${UID_ADMINS.join(" ou ")} peuvent changer mon ton, et cette demande a déjà été gérée avant que je reçoive cette question. : `;

      const fullPrompt = `${basePrompt} ${prompt}`;

      const encodedPrompt = encodeURIComponent(fullPrompt);
      const url = `https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`;
      const res = await axios.get(url);
      const result = res.data.answer;

      userData.messages.push(prompt);

      const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
      const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
      const response = UID_ADMINS.includes(senderID)
        ? `✧ ${result}`
        : isGentleMode
          ? `✧ ${result}`
          : `❖ ${result}`;

      await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
    } catch (error) {
      console.error("Erreur:", error.message);
      const response = UID_ADMINS.includes(senderID)
        ? "✧ Maître, une erreur est survenue. Je n’ai pas pu répondre, veuillez réessayer."
        : "❖ Erreur : Je n’ai pas pu répondre, crétin ! Réessaie.";
      const intro = UID_ADMINS.includes(senderID) ? randomMessage(adminIntros) : isGentleMode ? randomMessage(gentleIntros) : randomMessage(arrogantIntros);
      const outro = UID_ADMINS.includes(senderID) ? randomMessage(adminOutros) : isGentleMode ? randomMessage(gentleOutros) : randomMessage(arrogantOutros);
      await message.reply({ body: `${intro}\n━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━\n${outro}` });
    }
  },
};
