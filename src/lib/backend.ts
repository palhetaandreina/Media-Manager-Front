import { MediaDTO } from '@/type/media-dto.type';
import { Media } from '@/type/media.type';
import { User } from '@/type/user.type';
import { Category } from '../type/category.type';
import { Http } from './http';

export class Backend {
	public readonly http: Http;

	constructor() {
		this.http = new Http(`http://localhost:8000`);
	}

	public login(login: Record<string, any>) {
		return this.http.request('/auth/login', {
			method: 'POST',
			data: JSON.stringify(login),
		});
	}

	public async getUser(): Promise<User> {
		return this.http.request('/user').then(({ data }) => data);
	}

	public async getMedias(from?: Date, to?: Date): Promise<Media[]> {
		return this.http.request('/media', { params: { from, to } }).then(({ data }) => data);
	}

	public async getCategories(): Promise<Category[]> {
		return this.http.request('/category').then(({ data }) => data);
	}

	public async deleteMedia(id: number) {
		return this.http.request('/media/' + id, { method: 'DELETE' }).then(({ data }) => data);
	}

	public async updateMedia(media: MediaDTO) {
		const method = media.id != undefined ? 'PATCH' : 'POST';

		return this.http.request('/media', { method, data: JSON.stringify(media) }).then(({ data }) => data);
	}

	public async updateUser(user: Record<string, unknown>) {
		const method = user.id != undefined ? 'PATCH' : 'POST';

		return this.http.request('/user', { method, data: JSON.stringify(user) }).then(({ data }) => data);
	}

	public async getHoursStats(by: string, from: Date, to: Date) {
		const method = 'GET';

		return this.http.request('/media/stats/hours', { method, params: { by, from, to } }).then(({ data }) => data);
	}

	public async getCategoriesStats() {
		const method = 'GET';

		return this.http.request('/media/stats/category', { method }).then(({ data }) => data);
	}

	public async sendResetPasswordEmail(email: string) {
		const method = 'POST';

		return this.http
			.request('/user/send-reset-password-email', { method, data: JSON.stringify({ email }) })
			.then(({ data }) => data);
	}

	public async updatePassword(token: string, password: string) {
		const method = 'PATCH';

		return this.http
			.request('/user/reset-password', { method, data: JSON.stringify({ password, token }) })
			.then(({ data }) => data);
	}

	public async downloadPDF() {
		const method = 'POST';

		return this.http.request('/analytics/pdf', {
			method,
			transformResponse: (data) => data,
			responseType: 'blob',
		});
	}
}
