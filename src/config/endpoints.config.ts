import { MODE, Mode } from "./mode.config";

const API_URLS = <const>{
	[Mode.Local]: "http://192.168.1.2:4000",
	[Mode.Dev]: "http://192.168.1.2:4000",
	[Mode.Stg]: "http://192.168.1.2:4000",
	[Mode.Prd]: "http://192.168.1.2:4000",
};

export const API_URL = API_URLS[MODE];
