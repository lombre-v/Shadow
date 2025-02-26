module.exports = {
  config: {
    name: "emoji_insultes",
    version: "1.0",
    author: "Blåzė Nøvã",
    countDown: 5,
    role: 0,
    shortDescription: "Réponses sarcastiques et insultantes aux emojis",
    longDescription: "Réponses sarcastiques et insultantes aux emojis envoyés",
    category: "reply",
  },

  onStart: async function() {},

  onChat: async function({ event, message }) {
    const emoji = event.body.trim();

    // Réponses pour l'emoji 🤔
    if (emoji === "🤔") {
      const responses = [
        "Alors, tu réfléchis à la meilleure manière de me faire perdre encore plus de temps ?",
        "C’est mignon, tu tentes de paraître intelligent mais on sait tous que c’est juste pour impressionner.",
        "Tu réfléchis à quoi là ? À comment paraître plus bête encore ?",
        "T'es en train de réfléchir à ta prochaine erreur ? Ça va être épique.",
        "T’as vraiment besoin de réfléchir ou tu veux juste faire semblant d’être plus malin que tu ne l'es ?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 🤫
    if (emoji === "🤫") {
      const responses = [
        "Ah, c’est marrant, on dirait que tu veux nous faire croire que ton silence est important.",
        "Chut, on dirait que tu essayes de cacher à quel point t'es ennuyeux.",
        "Wow, tu veux vraiment qu'on soit impressionnés par ton silence ? Tu veux qu’on te donne un prix ?",
        "Tiens, voilà un autre moment où tu te tais pour éviter de dire une bêtise.",
        "T’as enfin trouvé ton super pouvoir : rendre les gens heureux en te taisant."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 🫢
    if (emoji === "🫢") {
      const responses = [
        "Oh non, c'est trop choquant ! Oh wait, en fait non, pas du tout.",
        "Vraiment ? Tu te forces à avoir cette réaction ? C'est pathétique.",
        "Je suis sûr que t’es tellement choqué, tu vas encore me sortir une autre phrase stupide.",
        "Si ça te choque, t’es vraiment plus naïf que je le pensais.",
        "Tu fais cette tête comme si t'avais découvert quelque chose d'extraordinaire, mais c'est juste ridicule."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }

    // Réponses pour l'emoji 🤭
    if (emoji === "🤭") {
      const responses = [
        "Tu rigoles pour ça ? Franchement, ça aurait mieux marché avec un public plus idiot.",
        "Ton rire nerveux ne cache même pas le fait que tu es gêné par ta propre stupidité.",
        "C’est ça, continue de rire comme si ça rendait ta bêtise plus acceptable.",
        "Si c’est ça ton rire de satisfaction, je vais pleurer… mais de rire.",
        "Sérieusement, tu penses qu'on va croire que ce petit rire est sincère ?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return message.reply(randomResponse);
    }
  }
}
