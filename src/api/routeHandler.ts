/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-10 23:24:50
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:17:39
 */

import * as fs from "fs";
import * as path from "path";
import { log } from "../logger/logger";
import { ExpressAPIApp } from "./express";

// Declare Defaults for this Handler
const defaultFileType = path.extname(__filename);
const defaultFolderDir = path.join(__dirname, "endpoints").replace(/\\/g, "/");

/**
 * @description This function will setup all the endpoints localized in the /endpoints folder.
 */
export function setupRoutes(): void {
  log.info("Initializing API");
  log.info("• Loading Routes:");

  // Retireves a list from the correct folder of all files in there.
  const fileList = getFileListFromFolder();

  /**
   * Goes through each one reading its contents, if it contains
   * a http method it will extract and register in express.
   * if it contains a method with called handlers,
   * it will go through each handler and add it to the call
   */
  for (const file of fileList) {
    const url = file.replace(defaultFolderDir.toString(), "");
    let endpoint = require(file);

    if (endpoint && typeof endpoint.get === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.get(url, ...endpoint.handlers, endpoint.get)
        : ExpressAPIApp.get(url, endpoint.get);
      log.info(`	• Loaded Endpoint: ${url} (get)`);
    }
    if (endpoint && typeof endpoint.post === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.post(url, ...endpoint.handlers, endpoint.post)
        : ExpressAPIApp.post(url, endpoint.post);
      log.info(`	• Loaded Endpoint: ${url} (post)`);
    }
    if (endpoint && typeof endpoint.put === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.put(url, ...endpoint.handlers, endpoint.put)
        : ExpressAPIApp.put(url, endpoint.put);
      log.info(`	• Loaded Endpoint: ${url} (put)`);
    }
    if (endpoint && typeof endpoint.delete === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.delete(url, ...endpoint.handlers, endpoint.delete)
        : ExpressAPIApp.delete(url, endpoint.delete);
      log.info(`	• Loaded Endpoint: ${url} (delete)`);
    }
    if (endpoint && typeof endpoint.head === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.head(url, ...endpoint.handlers, endpoint.head)
        : ExpressAPIApp.head(url, endpoint.head);
      log.info(`	• Loaded Endpoint: ${url} (head)`);
    }
    if (endpoint && typeof endpoint.connect === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.connect(url, ...endpoint.handlers, endpoint.connect)
        : ExpressAPIApp.connect(url, endpoint.connect);
      log.info(`	• Loaded Endpoint: ${url} (connect)`);
    }
    if (endpoint && typeof endpoint.options === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.options(url, ...endpoint.handlers, endpoint.options)
        : ExpressAPIApp.options(url, endpoint.options);
      log.info(`	• Loaded Endpoint: ${url} (options)`);
    }
    if (endpoint && typeof endpoint.trace === "function") {
      typeof endpoint.handlers !== "undefined"
        ? ExpressAPIApp.trace(url, ...endpoint.handlers, endpoint.trace)
        : ExpressAPIApp.trace(url, endpoint.trace);
      log.info(`	• Loaded Endpoint: ${url} (trace)`);
    }
  }
}

/**
 * @param folderDir Directory of the folder to be checked.
 * @param fileType What type of files to be found.
 * @returns An array containing all the paths to all files in the folder and the folders within it.
 */
export function getFileListFromFolder(
  folderDir: string = defaultFolderDir,
  fileType: string = defaultFileType
): string[] {
  const fileList: string[] = [];

  const FolderPath = path.resolve(folderDir);
  const files = fs.readdirSync(FolderPath, { withFileTypes: true });

  // Goes through each file in the folder and build a list
  for (const file of files) {
    if (file.isDirectory()) {
      const newFolder = file.name;
      // If there is a folder in, run this recursively and get the file list for that folder too.
      fileList.push(...getFileListFromFolder(`${folderDir}/${newFolder}`));
    } else if (file.name.endsWith(fileType)) {
      let filePath = `${FolderPath}/${file.name}`;
      filePath = filePath.replace(/\\/g, "/");
      filePath = filePath.replace(fileType, "");

      fileList.push(filePath);
    }
  }
  return fileList;
}
