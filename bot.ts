import { Bot } from "grammy";

const BOT_TOKEN = process.env.BOT_TOKEN || "test";

const bot = new Bot(BOT_TOKEN);

let counter = 0;

bot.on(":text", async (ctx) => {
  if (!ctx.message) {
    return;
  }
  switch (ctx.message.text) {
    case "reset":
      counter = 0;
      break;
    case "+":
      counter++;
      break;
    case "-":
      counter--;
      break;
    default:
      break;
  }
  ctx.reply(counter.toString());
});

export { bot };
