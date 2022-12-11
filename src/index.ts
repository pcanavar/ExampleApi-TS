/*
 * @Author: Philippe Canavarro
 * @Date: 2022-12-10 22:42:55
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 06:09:47
 */

import { ExpressAPIApp } from "./api/express";
import { generateApiDocs } from "./docs/apidoc";

generateApiDocs()
ExpressAPIApp.initialize();
