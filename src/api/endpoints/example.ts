/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-11 02:49:34
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 04:37:00
 */

import { NextFunction, Response, Request } from "express";
import {
  checkBodyNotEmpty,
  checkBodyHasTestKey,
} from "../../middleware/requestChecker";

export const handlers = [checkBodyNotEmpty, checkBodyHasTestKey];
export const get = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: "workedGet" });
};

export const post = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: "workedPost" });
};
