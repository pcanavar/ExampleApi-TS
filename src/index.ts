/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-10 22:42:55
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:32:41
 */

import { ExpressAPIApp } from "./api/express";
import { generateDocs } from "./docs/apidoc";

generateDocs()
ExpressAPIApp.initialize();
