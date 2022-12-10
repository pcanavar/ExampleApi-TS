/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-10 22:42:40
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-10 23:20:35
 */

import express, { NextFunction, Express } from "express";
import { projectConfigs } from "../config";
import {
  rootHandler,
  helloHandler,
  populateBodyWithParams,
} from "../middleware/ingressHandlers";

export class ExpressAPI {
  /**
   * Definint the static private properties for this class
   */
  private static _app: Express = express();
  // The port is really being set in the config file, this is just a failover.
  private static _port: number = Number(projectConfigs.port) || 5000;

  /**
   * Initialization with all the settings
   */
  public static initialize() {
    // Parses data if there is JSON inside the request
    this.app.use(express.json());
    // UnEncodes all URL received
    this.app.use(express.urlencoded({ extended: true }));
    // Obfuscate what technology being used, Improves safety
    this.app.disable("x-powered-by");
    /**
     * Parses anything from the Params or query to the body.
     * Making Body a single source of details.
     */
    this.app.use(populateBodyWithParams);

    this.initializeRequiredAPIs()

    //! TODO ADD THE ENDPOINT BUILDER HERE...
    this.app.get("/", rootHandler); //! EXAMPLE
    this.app.get("/hello/:name", helloHandler); //! EXAMPLE

    /**
     * Handles all not found pages.
     * Can be changed here to show a nicer HTML page.
     */
    this.app.use((_req, res, _next) => {
      res.status(404).send("404 - Page not found");
    });

    /**
     * Starts the Express Server
     * Using the defined port or the one from the Env Variable
     */
    this.app.listen(ExpressAPI._port, () => {
      console.log(`

      EEEEEEE                                    lll          AAA   PPPPPP  IIIII 
      EE      xx  xx   aa aa mm mm mmmm  pp pp   lll   eee   AAAAA  PP   PP  III  
      EEEEE     xx    aa aaa mmm  mm  mm ppp  pp lll ee   e AA   AA PPPPPP   III  
      EE        xx   aa  aaa mmm  mm  mm pppppp  lll eeeee  AAAAAAA PP       III  
      EEEEEEE xx  xx  aaa aa mmm  mm  mm pp      lll  eeeee AA   AA PP      IIIII 
                                         pp                                       

                         Example API Project
                        Running on port ${this.port}
    
                    ${projectConfigs.baseURL}/docs/
     
     `);
    });
  }
  
  /**
   * Get & setters
  */
 static get app() {
     return ExpressAPI._app;
    }
    
    static get port() {
        return ExpressAPI._port;
    }
    
    private static set port(value: number) {
        ExpressAPI._port = value;
    }

    private static initializeRequiredAPIs() {
      this.app.get("/", (req, res) => res.redirect("docs/"));
      this.app.get("/healthz", (req, res) => res.status(200).send( { status: "ok" } ));
      this.app.get("/robots.txt", (req, res) => {
        res.status(200).send("User-agent: *\nDisallow: /");
      });
    }
}
