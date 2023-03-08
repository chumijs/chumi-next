/* eslint-disable import/no-anonymous-default-export */
import { Service } from "chumi";
import { Context } from "koa";

@Service
export default class {
  ctx!: Context;

  async index() {
    return this.ctx.path;
  }
}
