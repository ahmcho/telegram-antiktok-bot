require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const serviceRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:vm\.tiktok\.com))\/(.+)/gm;

bot.start((ctx) => {
    ctx.reply(`Hello, ${ctx.update.message.from.username}`)
});

bot.on('text', async (ctx) => {
    let messageId = ctx.update.message.message_id;
    let chatId = ctx.update.message.chat.id;
    let messageText = ctx.update.message.text;
    const serviceLinkMatches = messageText.match(serviceRegex);
    if(serviceLinkMatches && serviceLinkMatches.length > 0){
        await ctx.telegram.deleteMessage(chatId, messageId);
        await ctx.reply('Unwanted video deleted 🚫');
    }
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))