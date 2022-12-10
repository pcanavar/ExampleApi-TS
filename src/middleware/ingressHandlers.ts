/*
 * @Author: Philippe Canavarro 
 * @Date: 2022-12-10 22:42:48 
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-10 23:12:36
 */

import express, { Request, Response, RequestHandler } from 'express';

interface HelloResponse {
  hello: string;
}

type HelloBuilder = (name: string) => HelloResponse;

const helloBuilder: HelloBuilder = name => ({ hello: name });

const rootHandler = (_req: Request, res: Response) => {
  return res.send('API is working 🤓');
};

 const helloHandler = (req: Request, res: Response) => {
  const { params } = req;
  const { name = 'World' } = params;
  const response = helloBuilder(name);

  return res.json(response);
};

// create a middleware function to check for keys in the request body, query, and params
const populateBodyWithParams : RequestHandler = (req, res, next) => {
    // get the keys in the request body, query, and params
    const bodyKeys = Object.keys({ ...req.body })
    const queryKeys = Object.keys(req.query);
    const paramsKeys = Object.keys(req.params);

    // generate a new object with all key-values
    const allvalues = {
        ...req.body,
        ...req.query,
        ...req.params
    }
    const allKeys = Object.keys(allvalues)

    const totalLength = bodyKeys.length + queryKeys.length + paramsKeys.length
  
    const hasDuplicateKeys = allKeys.length !== totalLength

    // if a body key is found in the request query or params, return an error
    if (hasDuplicateKeys) {
      return res.status(400).send({
        error: 'Request body keys cannot be present in query or params'
      });
    }

    req.body = allvalues
  
    // if no body keys are found in the request query or params, continue to the next middleware
    next();
  }

export { rootHandler , helloHandler, populateBodyWithParams }