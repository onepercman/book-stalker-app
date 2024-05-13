import { MODE, Mode } from "./mode.config"

const API_URLS = <const>{
  [Mode.Local]: "http://192.168.1.12:4000",
  [Mode.Dev]: "http://3.144.216.183:4000",
  [Mode.Stg]: "http://3.144.216.183:4000",
  [Mode.Prd]: "http://3.144.216.183:4000",
}

export const API_URL = API_URLS[MODE]
