'use server'

import TelegramBot from 'node-telegram-bot-api'

const telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN as string)

export async function getTelegramBot() {
  return telegramBot
}
