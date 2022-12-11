/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-11 04:35:29
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:49:42
 */

import { Request, Response, NextFunction } from "express";

export function checkBodyNotEmpty(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Object.keys(req.body).length !== 0) {
    next();
    return;
  } else {
    res.status(400).send();
  }
}