import { MODE, Mode } from "./mode.config";

const API_URLS = <const>{
  [Mode.Local]: "http://localhost:4000",
  [Mode.Dev]: "http://localhost:4000",
  [Mode.Stg]: "http://localhost:4000",
  [Mode.Prd]: "http://localhost:4000",
};

export const API_URL = API_URLS[MODE];
