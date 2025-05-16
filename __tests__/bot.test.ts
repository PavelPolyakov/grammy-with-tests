import { Update } from "@grammyjs/types";
import { ApiCallFn } from "grammy";
import { beforeAll, beforeEach, expect, test } from "vitest";

import { bot } from "../bot";

type Function = ApiCallFn<typeof bot.api.raw>;
type ResultType = Awaited<ReturnType<Function>>;
type Params = Parameters<Function>;
type PayloadType = Params[1];

const isTextPayload = (p: PayloadType): p is { text: string } => "text" in p;

// Outgoing requests from the bot (for logging/debugging)
let outgoingRequests: {
  method: string;
  payload: PayloadType;
}[] = [];

function generateMessage(message: string): Update {
  return {
    update_id: 10000,
    message: {
      date: 1441645532,
      chat: {
        last_name: "Test Lastname",
        id: 1111111,
        first_name: "Test",
        username: "Test",
        type: "private",
      },
      message_id: 1365,
      from: {
        last_name: "Test Lastname",
        id: 1111111,
        first_name: "Test",
        username: "Test",
        is_bot: false,
      },
      text: message,
    },
  };
}

beforeAll(async () => {
  bot.api.config.use(async (prev, method, payload) => {
    outgoingRequests.push({
      method,
      payload,
    });
    return { ok: true, result: true as ResultType };
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
  const payload = outgoingRequests?.pop()?.payload;
  expect(payload).not.toBeNull();

  if (!payload) {
    throw new Error("Payload is null");
  }

  expect(isTextPayload(payload)).toBe(true);

  if (!isTextPayload(payload)) {
    throw new Error("Payload is not a text payload");
  }

  expect(payload.text).toBe("1");
}, 5000);

test("reset; two times plus, three time minus", async () => {
  await bot.handleUpdate(generateMessage("reset"));
  await bot.handleUpdate(generateMessage("+"));
  await bot.handleUpdate(generateMessage("+"));
  await bot.handleUpdate(generateMessage("-"));
  await bot.handleUpdate(generateMessage("-"));
  await bot.handleUpdate(generateMessage("-"));

  expect(outgoingRequests.length).toBe(6);
  const payload = outgoingRequests?.pop()?.payload;
  expect(payload).not.toBeNull();

  if (!payload) {
    throw new Error("Payload is null");
  }

  expect(isTextPayload(payload)).toBe(true);

  if (!isTextPayload(payload)) {
    throw new Error("Payload is not a text payload");
  }

  expect(payload.text).toBe("-1");
}, 5000);
