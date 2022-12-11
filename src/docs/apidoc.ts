/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-11 05:30:29
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:37:36
 */

import path from "path";
import { createDoc } from "apidoc";
import { log } from "../logger/logger";

export function generateDocs() {
  const doc = createDoc({
    // Necessary Source location for files
    src: path.resolve("./src/api"),
    // Can be omitted if dryRun is true
    dest: path.resolve("./src/docs/static_files/docs"),
    // Template for Docs
    template: path.resolve("./src/docs/template"),
    // Configuration file
    config: path.resolve("./src/docs/apidocconfig.ts"),
    // Include Private APIs
    apiprivate: false,
    // Disable output files:
    dryRun: false,
    // Disable any log output:
    silent: false,
  });

  const privatedoc = createDoc({
    // Necessary Source location for files
    src: path.resolve("./src/api"),
    // Can be omitted if dryRun is true
    dest: path.resolve("./src/docs/static_files/private"),
    // Template for Docs
    template: path.resolve("./src/docs/template"),
    // Configuration file
    config: path.resolve("./src/docs/apidocconfig.ts"),
    // Include Private APIs
    apiprivate: true,
    // Disable output files:
    dryRun: false,
    // Disable any log output:
    silent: false,
  });

  if (typeof doc !== "boolean") {
    // Documentation was generated!
    log.info("ApiDoc: Docs Generated/Updated");
    //log.info(doc.data); // the parsed api documentation object
    //log.info(doc.project); // the project information
  }

  if (typeof privatedoc !== "boolean") {
    // Documentation was generated!
    log.info("ApiDoc: Private Docs Generated/Updated");
    //log.info(doc.data); // the parsed api documentation object
    //log.info(doc.project); // the project information
  }
}
