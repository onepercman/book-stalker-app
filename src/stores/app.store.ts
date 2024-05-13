import { createStore } from "@/libs/valtio"
import { AppModel } from "@/models/app.model"

export const appStore = createStore(new AppModel())
