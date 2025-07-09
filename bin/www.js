#!/usr/bin/env node

import http from "http";
import debug0 from "debug";
import app from "../app";
import { Telegraf } from "telegraf";
import bodyParser from "body-parser";
const { Server } = require("socket.io");

import dotenv from "dotenv";
import scoreSocket from "../sockets/scoreSocket";
import { startRedisScoreSync } from "../services/redis/startRedisScoreSync";
app.use(bodyParser.json());
dotenv.config();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://interview-sh-costume-nursery.trycloudflare.com', // или твой порт фронта
    methods: ["GET", "POST"]
  }
});



const debug = debug0("casino-back:server");
const port = normalizePort(process.env.PORT || 3001);
app.set("port", port);

const bot = new Telegraf(process.env.BOT_TOKEN);

const WEBHOOK_PATH = `/bot${process.env.BOT_TOKEN}`;
const SERVER_URL = process.env.SERVER_URL

if (!SERVER_URL) {
  console.error("SERVER_URL не указан в .env!");
  process.exit(1);
}

// (async () => {
//   try {
//     await bot.telegram.deleteWebhook();
//     await bot.telegram.setWebhook(`${SERVER_URL}${WEBHOOK_PATH}`);
//     console.log("Webhook установлен:", `${SERVER_URL}${WEBHOOK_PATH}`);
//   } catch (error) {
//     console.error("Ошибка установки webhook:", error);
//   }
// })();

bot.on("web_app_data", (ctx) => {
  console.dir(ctx, { depth: 3 });  // Смотрим структуру ctx, можно увеличить depth при необходимости
  ctx.reply(`Спасибо! Ты отправил: ${{data:"dsd"}}`);
});

bot.on("web_app_data", (data) => {
  ctx.reply(`Спасибо! Ты отправил: ${{data:"dsd"}}`);
});

// В вашем server.js или app.js
bot.command('play', (ctx) => {
  ctx.reply('Запускаем игру!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Играть', callback_game: {} }],
      ],
    },
  });
});

app.use(bot.webhookCallback(WEBHOOK_PATH));

io.on("connection", (socket) => {
  console.log("Client connected", socket.id);
  scoreSocket(socket)
});

startRedisScoreSync(io)

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " требует повышенных прав");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " уже используется");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Сервер слушает на " + bind);
  console.log(`Webhook путь: ${SERVER_URL}${WEBHOOK_PATH}`);
}
