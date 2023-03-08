/* eslint-disable import/no-anonymous-default-export */
import { Controller, Get, loadService, Query } from "chumi";
import home from "../services/home";

@Controller()
export default class {
  home = loadService(home);

  @Get("/chumi")
  async index(@Query("name") name: string) {
    return `hello ${name || "world"}` + (await this.home.index());
  }
}
