/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-10 22:42:29
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:43:05
 */

import * as dotenv from "dotenv";
dotenv.config();

export const EnvVariables = process.env;

export const projectConfigs = {
  apiName: "Example API Project",
  apiDescription: "apiDoc basic example",
  baseURL: "http://localhost:5000",
  port: Number(EnvVariables.PORT) || 5000,
};
