import { expect, test } from "vitest";
import { IntegrationHarness } from "../utils/integration";

test("GET /links/metatags", async (ctx) => {
  const h = new IntegrationHarness(ctx);
  const { http } = await h.init();

  const { status, data: metatags } = await http.get({
    path: "/links/metatags",
    query: {
      url: "https://universallinks.co",
    },
  });

  expect(status).toEqual(200);
  expect(metatags).toStrictEqual({
    title: "Universal Links - The Modern Link Attribution Platform",
    description:
      "Universal Links is the modern link attribution platform for short links, conversion tracking, and affiliate programs.",
    image: "https://assets.universallinks.co/thumbnail.jpg",
    poweredBy: "Universal Links - The Modern Link Attribution Platform",
  });
});
