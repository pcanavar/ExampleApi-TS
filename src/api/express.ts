/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-10 22:42:40
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:39:03
 */

import express, { NextFunction, Express } from "express";
import path from "path";
import { projectConfigs } from "../config";
import { populateBodyWithParams } from "../middleware/ingressHandlers";
import { setupRoutes } from "./routeHandler";

export class ExpressAPIApp {
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

    this.initializeRequiredAPIs();
    setupRoutes();

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
    this.app.listen(ExpressAPIApp._port, () => {
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
  private static get app() {
    return ExpressAPIApp._app;
  }

  static get port() {
    return ExpressAPIApp._port;
  }

  private static set port(value: number) {
    ExpressAPIApp._port = value;
  }

  /**
   * Methods
   */

  /**
   * @description Initialize Basic Endpoints that are required.
   */
  private static initializeRequiredAPIs(): void {
    /** Documentation serve */
		this.app.use( express.static( path.resolve( "./src/docs/static_files" ) ) );
    ExpressAPIApp.app.get("/", (req, res) => res.redirect("docs/"));
    ExpressAPIApp.app.get("/healthz", (req, res) =>
      res.status(200).send({ status: "ok" })
    );
    ExpressAPIApp.app.get("/robots.txt", (req, res) => {
      res.status(200).send("User-agent: *\nDisallow: /");
    });
  }

  public static get(url: string, ...handlers: any) {
    ExpressAPIApp._app.get(url, ...handlers);
  }
  public static head(url: string, ...handlers: any) {
    ExpressAPIApp._app.head(url, ...handlers);
  }
  public static post(url: string, ...handlers: any) {
    ExpressAPIApp._app.post(url, ...handlers);
  }
  public static put(url: string, ...handlers: any) {
    ExpressAPIApp._app.put(url, ...handlers);
  }
  public static delete(url: string, ...handlers: any) {
    ExpressAPIApp._app.delete(url, ...handlers);
  }
  public static connect(url: string, ...handlers: any) {
    ExpressAPIApp._app.connect(url, ...handlers);
  }
  public static options(url: string, ...handlers: any) {
    ExpressAPIApp._app.options(url, ...handlers);
  }
  public static trace(url: string, ...handlers: any) {
    ExpressAPIApp._app.trace(url, ...handlers);
  }
}
