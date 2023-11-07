import Cookies from 'js-cookie'
import { api } from '../api/http.js'

export const authModule = (function () {
	const authBtn = document.querySelector('.nav__account__btn')
	const openSignUpBtns = document.querySelectorAll('.js-open-sign-up')
	const loginForm = document.querySelector('.login')
	const registerForm = document.querySelector('.register')
	const closes = document.querySelectorAll('.popup__close')
	const savePaswordLogin = loginForm.querySelector('.checkbox-login')
	const savePaswordRegister = registerForm.querySelectorAll('.checkbox-login')

	function initLoginForm() {
		savePaswordLogin.addEventListener('click', () => {
			savePaswordLogin.classList.toggle('active')
		})

		savePaswordRegister.forEach(el =>
			el.addEventListener('click', () => {
				el.classList.toggle('active')
			}),
		)

		registerForm.querySelector('[data-referal] p').addEventListener('click', () => {
			registerForm.querySelector('[data-referal]').classList.toggle('active')
			registerForm.querySelector('.referal__code').disabled =
				!registerForm.querySelector('.referal__code').disabled
		})

		authBtn.addEventListener('click', () => {
			Cookies.get('accessToken')
				? location.replace('/account')
				: loginForm.classList.add('active')
		})

		openSignUpBtns.forEach(el =>
			el.addEventListener('click', () => {
				registerForm.classList.add('active')
			}),
		)

		loginForm
			.querySelector('.form__inputs .login__btns .btn-link')
			.addEventListener('click', e => {
				e.preventDefault()
				loginForm.classList.remove('active')
				registerForm.classList.add('active')
			})

		registerForm.querySelector('.login__header h4 svg').addEventListener('click', () => {
			registerForm.classList.remove('active')
			loginForm.classList.add('active')
		})

		registerForm.querySelector('form').onsubmit = register

		closes.forEach(close =>
			close.addEventListener('click', () => {
				document.querySelectorAll('.popup').forEach(it => it.classList.remove('active'))
			}),
		)

		document.querySelectorAll('#hide-password').forEach(close => {
			close.addEventListener('click', () => {
				close.parentElement.querySelector('input[type=password]').type = 'text'
				close.classList.remove('active')
				close.parentElement.querySelector('#view-password').classList.add('active')
			})
		})

		document.querySelectorAll('#view-password').forEach(close => {
			close.addEventListener('click', () => {
				;(close.parentElement.querySelector('input[type=text]').type = 'password'),
					close.classList.remove('active')
				close.parentElement.querySelector('#hide-password').classList.add('active')
			})
		})
	}

	function login() {
		const inputs = loginForm.querySelectorAll('form input')
		let formData = {
			email: '',
			password: '',
			deviceName: navigator.userAgent,
		}
		loginForm.querySelector('form').onsubmit = async e => {
			e.preventDefault()
			let longSave = e.target
				.querySelector('[data-password-save]')
				.classList.contains('active')
			inputs.forEach(it => (formData[it.name] = it.value))

			try {
				const res = await api.post('publick/auth', { ...formData, longSave })
				if (res.status === 201) {
					location.replace('/account')
				}
			} catch (error) {
				console.log(error)
			}
		}
	}

	async function register(e) {
		e.preventDefault()

		const longSave = e.target.querySelector('[data-password-save]').classList.contains('active')
		const isPartnet = e.target.querySelector('[data-opt]').classList.contains('active')
		console.log('isPartnet', isPartnet)

		const initReferal = e.target.querySelector('.referal__code').disabled

		const valuesArray = $('#js-sign-up').serializeArray()
		const values = objectifyForm(valuesArray)

		try {
			const res = await api.post('publick/auth/sign-up', {
				...values,
				deviceName: navigator.userAgent,
				remembeMe: longSave,
				referalCode: initReferal ? null : e.target.querySelector('.referal__code').value,
				isPartnet,
			})
			if (res.status === 201) {
				location.replace('/account')
			}
		} catch (error) {
			console.log(error)
		}
	}

	function logout() {
		const logout = document.querySelector('#logout')

		logout?.addEventListener('click', async () => {
			try {
				await api.get('publick/auth/logout')
				location.replace('/')
			} catch (error) {
				console.log(error)
			}
		})
	}

	function init() {
		try {
			initLoginForm()
			login()
			logout()
		} catch (e) {}
	}

	return {
		init,
	}
})()

function objectifyForm(formArray) {
	//serialize data function
	var returnArray = {}
	for (var i = 0; i < formArray.length; i++) {
		returnArray[formArray[i]['name']] = formArray[i]['value']
	}
	return returnArray
}
