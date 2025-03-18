  module.exports = {
    config: {
        name: "ai",
        version: "1.0",
        author: "kivv",
        countDown: 5,
        role: 0,
        shortDescription: "No Prefix",
        longDescription: "No Prefix",
        category: "reply",
    },
onStart: async function(){}, 
onChat: async function({
    event,
    message,
    getLang
}) {
    if (event.body && event.body.toLowerCase() == "ai") return message.reply(" ཐིི༏ཋྀ sʜᴀᴅᴏᴡ ぐき\n━━━━━━━━━━━━━━━\n 𝐌𝐞𝐫𝐝𝐞 𝐫𝐞𝐠𝐚𝐫𝐝𝐞 𝐦𝐨𝐢 𝐜𝐞𝐭 𝐞𝐧𝐟𝐚𝐧𝐭 😦... 𝐚𝐩𝐩𝐞𝐥𝐥𝐞 𝐦𝐨𝐢 🔖 shadow🔖  𝐩𝐚𝐬 🎯 Ai 🎯 𝐏𝐨𝐮𝐫 𝐫𝐞𝐣𝐨𝐢𝐧𝐝𝐫𝐞 𝐦𝐨𝐧 𝐠𝐫𝐨𝐮𝐩𝐞 𝐮𝐭𝐢𝐥𝐢𝐬𝐞𝐧𝐭 ✨*blazegc ✨\n ━━━━━━━━━━━━━━━");
}
};