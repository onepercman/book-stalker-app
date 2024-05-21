import { BookService } from "./book.service"
import { CategoryService } from "./category.service"
import { ReactionService } from "./reaction.service"
import { ReadTimeService } from "./read-time.service"
import { ScheduleService } from "./schedule.service"
import { TrackerService } from "./tracker.service"
import { UserService } from "./user.service"

export const Service = {
  user: new UserService(),
  book: new BookService(),
  tracker: new TrackerService(),
  category: new CategoryService(),
  readTime: new ReadTimeService(),
  reaction: new ReactionService(),
  schedule: new ScheduleService(),
}
