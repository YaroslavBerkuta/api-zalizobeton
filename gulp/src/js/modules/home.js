const homeModule = (() => {
	let formElement = null

	const send = data => {
		axios({
			method: 'post',
			url: '/public/api/forms-requests',
			data: {
				...data,
				pageUrl: location.href,
			},
		})
	}

	const onSubmit = e => {
		e.preventDefault()
		const formData = new FormData(e.target)
		send(Object.fromEntries(formData))
	}

	const init = () => {
		formElement = document.getElementById('contactUsForm')
		formElement.addEventListener('submit', onSubmit)
	}

	return {
		init,
	}
})()

document.addEventListener('DOMContentLoaded', () => {
	document.body.className = document.body.className.replace('preload', '')
	homeModule.init()
})
