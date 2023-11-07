import axios from 'axios'
import { objectifyForm } from '../helpers/index.js'

export class EditAccount {
	formElementName = '#edit-account-form'
	isEnabled = false
	toast = new Toasty()

	$form = null

	constructor() {
		this.initElements()
		this.initHandlers()
	}

	initElements() {
		this.$form = $(this.formElementName)
		if (this.$form) {
			this.isEnabled = true
		}
	}

	initHandlers() {
		if (!this.isEnabled) return
		this.$form.on('submit', this.onSubmit.bind(this))
	}

	getValues() {
		const valuesArray = this.$form.serializeArray()
		const values = objectifyForm(valuesArray)
		return values
	}

	async onSubmit(e) {
		e.preventDefault()
		const values = this.getValues()
		await this.update(values)
	}

	async update(values) {
		try {
			await axios.patch('/account/edit', { ...values })
			this.toast.info('Аккаунт оновленно!')
		} catch (e) {
			this.toast.error('Виникла помилка, спробуйте пізніше!')
		}
	}
}

export const editAccount = new EditAccount()
