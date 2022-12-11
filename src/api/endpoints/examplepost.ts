/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-11 02:49:34
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:53:59
 */

/**
 * @api {POST} /examplepost Test POST API
 * @apiVersion 0.1.0
 * @apiName PostApi
 * @apiGroup All
 * @apiParam {String} example	Example of a param, can be sent as body but params should also work for POST requests.
 */

import { NextFunction, Response, Request } from "express";
import {
  checkBodyNotEmpty,
} from "../../middleware/requestChecker";

export const handlers = [checkBodyNotEmpty];

export const post = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: "workedPost" });
};
