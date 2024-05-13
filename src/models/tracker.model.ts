import { Service } from "@/services/app.service"

export class TrackerModel {
  data: Partial<Tracker> | undefined

  track(data: Partial<Tracker>) {
    if (!data) this.data = data
    const currentPage =
      Number(data.currentPage) > Number(this.data?.currentPage) ? data.currentPage : this.data?.currentPage
    this.data = {
      ...this.data,
      ...data,
      currentPage: currentPage || 0,
      totalPage: data.totalPage || 0,
    }
  }

  async updateTracker() {
    await Service.tracker.update(this.data)
    this.data = undefined
  }
}
