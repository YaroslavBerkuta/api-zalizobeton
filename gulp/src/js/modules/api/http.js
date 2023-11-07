import axios from 'axios'

const axiosInstance = axios.create({
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'X-Requested-With': 'XMLHttpRequest',
		'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
		'Access-Control-Allow-Headers':
			'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
	},
	timeout: 180000,
})

axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken')
	if (token) {
		config.headers.Authorization = 'Bearer ' + token
	}
	return config
})

const requestAccessToken = async () => {
	const { data } = await axiosInstance.post('/auth/refresh-token', {
		refreshToken: storageService.get('refreshToken'),
	})
	saveTocken(data.accessToken, data.refreshToken)
}

const request = async (func, retryCount = 0) => {
	try {
		let response = await func()
		return response
	} catch (e) {
		if (e.response.status === 401) {
			await requestAccessToken()
			return request(func, retryCount)
		}
		if (!e || !e.response || !e.response.status) {
			if (retryCount <= 2) {
				return request(func, retryCount + 1)
			}
		}

		throw e
	}
}

export const api = {
	get: (url, params) => request(() => axiosInstance.get(url, params)),

	post: (url, data, params) => request(() => axiosInstance.post(url, data, params)),

	put: (url, data, params) => request(() => axiosInstance.put(url, data, params)),

	patch: (url, data, params) => request(() => axiosInstance.patch(url, data, params)),

	delete: (url, params) => request(() => axiosInstance.delete(url, params)),
}
