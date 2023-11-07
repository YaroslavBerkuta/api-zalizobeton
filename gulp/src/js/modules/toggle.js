export class TogglePlugin {
	$element = null
	$btn = null
	$content = null
	isOpen = false

	constructor(element) {
		this.$element = element
		this.init()
	}

	init() {
		this.$btn = this.$element.find('.js-toggle-btn')
		this.$content = this.$element.find('.js-toggle-content')
		this.$btn.on('click', () => this.toggle())
	}

	toggle() {
		if (!this.isOpen) {
			this.isOpen = true
			this.$element.addClass('active')
		} else {
			this.isOpen = false
			this.$element.removeClass('active')
		}
	}
}

export function initTogglePlugin() {
	$('.js-toggle').each(function () {
		new TogglePlugin($(this))
	})
}
