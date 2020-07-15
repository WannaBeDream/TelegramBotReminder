// Получаю переменные окружения из файла .env , заранее подключив пакет dotenv
require('dotenv').config();
// Подключаем библиотеку для работы с Telegram API в переменную
let TelegramBot = require('node-telegram-bot-api');

let token = process.env.TELEGRAM_BOT_APIKEY;
let bot = new TelegramBot(token, {polling: true});

let notes = [];

bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    let userId = msg.from.id;
    let text = match[1];
    let time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну :)');
});

setInterval(function(){
    for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
      notes.splice(i, 1);
    }
  }
}, 1000);