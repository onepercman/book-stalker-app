import { api } from "@/libs/axios";
import { getAuth } from "@/utils/api";

export class BookService {
	userBooks() {
		return api.request<Book[]>({
			method: "GET",
			url: "/books/user-books",
			headers: { Authorization: getAuth() },
		});
	}
}
