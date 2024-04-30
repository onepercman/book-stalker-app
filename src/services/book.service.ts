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

	book(id: string) {
		return api.request<Book>({
			method: "GET",
			url: `/books/${id}`,
			headers: { Authorization: getAuth() },
		});
	}

	upload(name: string, file: File) {
		const data = new FormData();
		data.append("name", name);
		data.append("File", file);

		return api.request<Book>({
			method: "POST",
			url: "/books/upload",
			data,
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: getAuth(),
			},
		});
	}
}
