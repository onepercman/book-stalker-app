import { createStore } from "@/libs/valtio"
import { TrackerModel } from "@/models/tracker.model"

export const trackerStore = createStore(new TrackerModel())
