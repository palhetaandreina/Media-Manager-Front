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
		return this.http.request('/user');
	}

	public async getMedias(from?: Date, to?: Date): Promise<Media[]> {
		return this.http.request('/media', { params: { from, to } });
	}

	public async getCategories(): Promise<Category[]> {
		return this.http.request('/category');
	}

	public async deleteMedia(id: number) {
		return this.http.request('/media/' + id, { method: 'DELETE' });
	}

	public async updateMedia(media: Record<string, unknown>) {
		const method = media.id != undefined ? 'PATCH' : 'POST';

		return this.http.request('/media', { method, data: JSON.stringify(media) });
	}

	public async updateUser(user: Record<string, unknown>) {
		const method = user.id != undefined ? 'PATCH' : 'POST';

		return this.http.request('/user', { method, data: JSON.stringify(user) });
	}

	public async getHoursStats(by: string, from: Date, to: Date) {
		const method = 'GET';

		return this.http.request('/media/stats/hours', { method, params: { by, from, to } });
	}

	public async getCategoriesStats() {
		const method = 'GET';

		return this.http.request('/media/stats/category', { method });
	}
}
