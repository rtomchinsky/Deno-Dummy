import {
  Application,
  Router,
} from "https://deno.land/x/oak/mod.ts";

const app = new Application();

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Error handling
app.use(async (_, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    throw err;
  }
});

const router = new Router();

// Hello World!
router.get("/hello", (ctx) => {
  ctx.response.body = "Hello World!";
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
