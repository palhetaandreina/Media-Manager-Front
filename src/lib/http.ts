import { Axios, AxiosRequestConfig } from 'axios';

export class Http {
	private readonly axios: Axios;

	constructor(baseURL: string) {
		this.axios = new Axios({
			transformResponse: (data) => {
				try {
					return JSON.parse(data);
				} catch (e) {
					return data;
				}
			},
			baseURL: baseURL,
			validateStatus: (status) => {
				return status < 400;
			},
		});
	}

	private defaultHeaders() {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');

		return {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		};
	}

	public async request(url: string, config: AxiosRequestConfig = {}) {
		let { headers = {} } = config;

		if (!config?.method) {
			config.method = 'GET';
		}

		headers = {
			...headers,
			...this.defaultHeaders(),
		};

		return await this.axios.request({
			...config,
			url,
			headers,
		});
	}
}
