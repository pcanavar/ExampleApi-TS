/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-11 02:49:34
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:52:19
 */

/**
 * @api {get} /exampleget Test Get API
 * @apiVersion 0.1.0
 * @apiName GetApi
 * @apiGroup All
 */

import { NextFunction, Response, Request } from "express";
import {
  checkBodyNotEmpty,
} from "../../middleware/requestChecker";

export const handlers = [];
export const get = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: "workedGet" });
};