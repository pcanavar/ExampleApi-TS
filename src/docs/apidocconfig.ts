/*
 * @Author: Philippe Canavarro 
 * @Date: 2022-12-11 05:30:36 
 * @Last Modified by: Phil
 * @Last Modified time: 2022-12-11 05:44:42
 */

import { projectConfigs } from "../config";

module.exports = {
	name: projectConfigs.apiName,
	version: "0.1.0",
	description: projectConfigs.apiDescription,
	title: `Example API`,
	url: projectConfigs.baseURL,
	sampleUrl: true,
	header: {
		title: "",
		filename:"",
	},
	footer: {
		title: "",
		filename:"",
	},
	order: [],
	template: {
		showRequiredLabels: true,
		withCompare: true,
		withGenerator: false,
		aloneDisplay: false
	}
};