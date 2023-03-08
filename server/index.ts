import Koa from "koa";
import chumi from "chumi";
import next from "next";

import controllers from "./controllers";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();

  // 业务
  server.use(
    chumi(controllers, {
      koaBody: {
        multipart: true,
        parsedMethods: ["GET", "POST", "DELETE", "PUT"],
        formidable: {
          maxFileSize: 20000 * 1024 * 1024 * 10, // 设置上传文件大小最大限制，默认200M
        },
      },
      onFinish: (ctx) => {
        console.log("finish", ctx.path, +new Date() - ctx.startTime + "ms");
      },
      onStart: (ctx) => {
        ctx.startTime = +new Date();
        console.log("start");
      },
      onError: async (ctx, error) => {
        console.error("出错啦", error);
      },
      onSuccess: async () => {
        console.log("成功");
      },
    })
  );

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  // if (import.meta.env.PROD) {
  // 编译后，生产环境运行的服务端口
  server.listen(3000, function () {
    console.log("> http://localhost:3000");
  });
});
