# grammY with tests

This repository's purpose is to demonstrate how Telegram bots, developed with the help of [grammY](https://grammy.dev/) framework could be tested.

## Explanation
It's assumed, that you configure complete bot logic in the [bot.ts](bot.ts) file end then export it.
So your bot can be imported in the [\_\_tests\_\_/bot.test.ts](__tests__/bot.test.ts) and tested.

During the tests we do not want our bot to interact with Telegram servers in any way. We can use [transformer function](https://grammy.dev/advanced/transformers.html#installing-a-transformer-function) which catches the outgoing requests. In our [example](__tests__/bot.test.ts#L47), we record these outgoing requests, so later we can [assert](__tests__/bot.test.ts#L80) them.

## How to run it
```sh
npm i
# run tests
npm test
# run bot
BOT_TOKEN=%YOUR_TOKEN% npx ts-node start.ts
```