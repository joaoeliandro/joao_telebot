import 'dotenv/config';

import express from 'express';
import { Telegraf } from 'telegraf';

const app = express();

const bot = new Telegraf(process.env.TELEBOT_TOKEN);

const chat_ids: Array<number> = [];

bot.use(async (_, next) => {
  await next()
});

bot.on('text', async (ctx) => {
  if (!chat_ids.some(chat_id => chat_id === ctx.chat.id)) {
    chat_ids.push(ctx.chat.id);
  }

  await ctx.telegram.sendMessage(
    ctx.chat.id,
    `Olá, ${ctx.message.from.first_name}. Ouça meu audio!`
  );

  await ctx.telegram.sendAudio(
    ctx.chat.id,
    'https://res.cloudinary.com/dy7l1wk3y/video/upload/v1635313010/Joao%20Bot%20Resposta.mp3',
    {
      reply_to_message_id: ctx.message.message_id,
      title: 'Joao Telebot resposta',
    }
  );
});

app.get('/send-message', async (request, response) => {
  try {
    chat_ids.forEach(chat_id => {
      bot.telegram.sendMessage(chat_id, 'Por enquanto, não estou totalmente disponivel!');
    });

    return response.status(200).json({ message: 'sent!' });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export { app, bot };
