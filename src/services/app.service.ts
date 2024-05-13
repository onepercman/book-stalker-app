import { BookService } from "./book.service"
import { TrackerService } from "./tracker.service"
import { UserService } from "./user.service"

export const Service = {
  user: new UserService(),
  book: new BookService(),
  tracker: new TrackerService(),
}
