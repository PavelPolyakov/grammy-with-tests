const { bot } = require("../bot");

let outgoingRequests = [];

function generateMessage(message) {
  return {
    update_id: 10000,
    message: {
      date: 1441645532,
      chat: {
        last_name: "Test Lastname",
        id: 1111111,
        first_name: "Test",
        username: "Test",
      },
      message_id: 1365,
      from: {
        last_name: "Test Lastname",
        id: 1111111,
        first_name: "Test",
        username: "Test",
      },
      text: message,
    },
  };
}

beforeAll(async () => {
  bot.api.config.use((prev, method, payload, signal) => {
    outgoingRequests.push({ method, payload, signal });
    return { ok: true, result: true };
  });

  bot.botInfo = {
    id: 42,
    first_name: "Test Bot",
    is_bot: true,
    username: "bot",
    can_join_groups: true,
    can_read_all_group_messages: true,
    supports_inline_queries: false,
  };
  await bot.init();
}, 5000);

beforeEach(() => {
  outgoingRequests = [];
});

test("reset; three time plus, two time minus", async () => {
  await bot.handleUpdate(generateMessage("reset"));
  await bot.handleUpdate(generateMessage("+"));
  await bot.handleUpdate(generateMessage("+"));
  await bot.handleUpdate(generateMessage("+"));
  await bot.handleUpdate(generateMessage("-"));
  await bot.handleUpdate(generateMessage("-"));

  expect(outgoingRequests.length).toBe(6);
  expect(outgoingRequests.pop().payload.text).toBe(1);
}, 5000);

test("reset; two times plus, three time minus", async () => {
  await bot.handleUpdate(generateMessage("reset"));
  await bot.handleUpdate(generateMessage("+"));
  await bot.handleUpdate(generateMessage("+"));
  await bot.handleUpdate(generateMessage("-"));
  await bot.handleUpdate(generateMessage("-"));
  await bot.handleUpdate(generateMessage("-"));

  expect(outgoingRequests.length).toBe(6);
  expect(outgoingRequests.pop().payload.text).toBe(-1);
}, 5000);
