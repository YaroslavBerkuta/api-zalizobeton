function saveTocken(accessToken, refreshToken) {
	localStorage.setItem('accessToken', accessToken)
	localStorage.setItem('refreshToken', refreshToken)
}



export { saveTocken }
