# grammY with tests

This repository's purpose is to demonstrate how Telegram bots, developed with the help of [grammY](https://grammy.dev/) framework could be tested.

## Explanation
It's assumed, that you configure complete bot logic in the [bot.js](bot.js) file end then export it.
So your bot can be imported in the [\_\_tests\_\_/bot.test.js](__tests__/bot.test.js) and tested.

During the tests we do not want our bot to interact with Telegram servers in any way. We can use [transformer function](https://grammy.dev/advanced/transformers.html#installing-a-transformer-function) which catches the outgoing requests. In our [example](__tests__/bot.test.js#L29), we record these outgoing requests, so later we can [assert](__tests__/bot.test.js#L58) them.

## How to run it
```sh
npm i
# run tests
npm test
# run bot
BOT_TOKEN=%YOUR_TOKEN% node start.js
```