import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the presentation shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Designing the AI-Native Organisation<\/title>/i);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("presentation contains the full 14-slide executive story and controls", async () => {
  const source = await readFile(new URL("../app/presentation.tsx", import.meta.url), "utf8");
  const slideCount = [...source.matchAll(/notes:\s*makeNotes\(/g)].length;

  assert.equal(slideCount, 14);
  assert.match(source, /AI does not just make the work faster/);
  assert.match(source, /This was not a prototype\. It became an operating product/);
  assert.match(source, /AI removed waiting\. It did not remove responsibility/);
  assert.match(source, /AI is changing every part of the design practice/);
  assert.match(source, /Not specialist expertise\. Specialist leverage/);
  assert.match(source, /The risk is not speed\. It is unclear accountability/);
  assert.match(source, /The future of design is not AI/);
  assert.match(source, /setBlackout/);
  assert.match(source, /setShowNotes/);
  assert.match(source, /searchParams\.set\("slide"/);
  assert.doesNotMatch(source, /4\.6×|7\.8×|96% accessibility|31% business impact/);
});

test("responsive CSS defines safe title and viewport-height rules", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(css, /font-size:\s*clamp\(2\.4rem,\s*5\.2vw,\s*5\.8rem\)/);
  assert.match(css, /font-size:\s*clamp\(2\.1rem,\s*4\.4vw,\s*4\.8rem\)/);
  assert.match(css, /line-height:\s*1\.0[13]/);
  assert.match(css, /--safe-bottom:\s*38px/);
  assert.match(css, /@media \(max-height:\s*850px\)/);
  assert.match(css, /@media \(max-height:\s*760px\)/);
  assert.doesNotMatch(css, /cursor:\s*none/);
});
