import axios from 'axios'

export class Autocomplete {
	options = []
	element = null
	input = null
	optionsContainer = null
	searchString = ''
	timmer = null
	hooks = {
		onSearchStringChange: [],
	}

	constructor(element) {
		this.element = element
		this.input = this.element.find('input')
		this.optionsContainer = this.element.find('.options')

		this.ini()
	}

	ini() {
		const setSearchString = this.setSearchString.bind(this)
		this.input.on('keyup', function (e) {
			setSearchString(e.target.value)
		})
		this.searchString = this.input.val()
	}

	setSearchString(searchstring) {
		if (searchstring !== this.searchString) {
			this.searchString = searchstring
			this.hooks.onSearchStringChange.map(it => {
				if (typeof it === 'function') it()
			})
		}
		this.input.val(searchstring)
	}

	selectValue(searchstring, value) {
		this.searchString = searchstring
		this.input.val(searchstring)
		this.element.attr('data-value', value)
		this.setOptions([])
	}

	setOptions(options) {
		this.options = options
		this.render()
	}

	render() {
		const elements = this.createOptionsElements()
		if (elements.length) {
			this.optionsContainer.html(elements)
			this.initOptionsHandles()
			this.optionsContainer.addClass('active')
		} else {
			this.optionsContainer.removeClass('active')
		}
	}

	createOptionsElements() {
		const res = this.options.map(it => {
			return `
                <div class="js-option" data-value="${it.value}">
                    <p>${it.label}</p>
                </div>
            `
		})
		return res
	}

	initOptionsHandles() {
		const selectValue = this.selectValue.bind(this)
		this.optionsContainer.find('.js-option').on('click', function (e) {
			const el = $(this)
			const text = el.text().trim()
			const val = el.attr('data-value')
			selectValue(text, val)
		})
	}

	runFind(fn) {
		if (this.timmer) clearTimeout(this.timmer)
		this.timmer = setTimeout(() => {
			fn()
		}, 500)
	}
}

export class AutocompleteNPCity extends Autocomplete {
	constructor(element) {
		super(element)
		this.hooks.onSearchStringChange.push(() => {
			this.onSearchStringChange()
		})
	}

	onSearchStringChange() {
		this.runFind(this.find.bind(this))
	}

	async find() {
		const { data } = await axios.get('/api/nova-poshta', {
			params: {
				searchString: this.searchString,
			},
		})
		this.setOptions(
			data.slice(0, 20).map(it => {
				return {
					label: `${it.name}, ${it.region}, ${it.area}`,
					value: it.id,
				}
			}),
		)
	}
}

export class AutocompleteNPWarehouse extends Autocomplete {
	cityAutocomplete = null
	constructor(element, cityAutocomplete) {
		super(element)

		this.cityAutocomplete = cityAutocomplete
		this.hooks.onSearchStringChange.push(() => {
			this.onSearchStringChange()
		})
	}

	onSearchStringChange() {
		this.runFind(this.find.bind(this))
	}

	async find() {
		const cityRef = this.cityAutocomplete.attr('data-value')

		const { data } = await axios.get('/api/nova-poshta/warehouses', {
			params: {
				searchString: this.searchString,
				cityRef,
			},
		})
		this.setOptions(
			data.slice(0, 20).map(it => {
				return {
					label: `${it.name}`,
					value: it.id,
				}
			}),
		)
	}
}
