import axios from 'axios'

export const employerForm = (function () {
	const toast = new Toasty()
	const local = {
		form: null,
	}

	function init() {
		local.form = $('#employer-form')

		local.form.on('submit', onSubmit)
	}

	async function onSubmit(e) {
		e.preventDefault()

		const valuesArray = local.form.serializeArray()
		const values = objectifyForm(valuesArray)
		console.log(values)

		await axios({
			method: 'post',
			url: '/public/api/forms-requests',
			data: {
				form: 'Заявка на гуртового покупця',
				content: '-',
				userName: values.name,
				userPhoneNumber: values.phoneNumber,
				pageUrl: location.href,
			},
		})

		toast.info("Заявка відправленна, менеджер зв'яжеться з вами в найближчий час!")
		local.form.trigger('reset')
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
