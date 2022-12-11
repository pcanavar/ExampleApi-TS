/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-11 04:35:29
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 04:37:04
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
    res.status(500).send();
  }
}

export function checkBodyHasTestKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (Object.keys(req.body).includes("test")) {
    next();
    return;
  } else {
    res.status(500).send();
  }
}
