export enum Mode {
  Local = "local",
  Dev = "development",
  Stg = "staging",
  Prd = "production",
}

export const MODE: Mode = (process.env.MODE as Mode) || Mode.Dev

export const _LOCAL_ = MODE === Mode.Local
export const _DEV_ = MODE === Mode.Dev
export const _STG_ = MODE === Mode.Stg
export const _PRD_ = MODE === Mode.Prd
