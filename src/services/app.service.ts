import { BookService } from "./book.service";
import { UserService } from "./user.service";

export const Service = Object.freeze({
	user: new UserService(),
	book: new BookService(),
});
