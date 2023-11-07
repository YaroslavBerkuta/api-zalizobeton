import $ from 'jquery'

export const selectPlugin = (function () {
	var selectorName = '.js-select'

	function init() {
		console.log('select plugin')
		$(selectorName).each(function () {
			var element = $(this)
			initContent(element)
		})
	}

	function initHandler() {
		$(`${selectorName} .js-item`).on('click', function () {
			const element = $(this)
			const value = element.attr('data-value')
			const label = element.text()
			console.log(value, label, element.parent(selectorName))

			element.closest(selectorName).attr('data-value', value).find('p').text(label)
		})
	}

	function initContent(element) {
		var options = []

		element.find('p').each(function () {
			options.push({
				key: $(this).attr('data-value'),
				label: $(this).text(),
			})
		})
		var optionsContent = ''
		options.map(it => {
			optionsContent += `<div data-value="${it.key}" class="js-item">${it.label}</div>`
		})

		element.empty().append(`
				<div class="value-row">
					<p>Value</p>
					<img src="/images/arr-down.png" />
				</div>
				<div class="list">${optionsContent}</div>
			`)

		setTimeout(() => {
			initHandler()
		}, 100)
	}

	return {
		init,
	}
})()

export const counterPlugin = function ($container, $targetObject) {
	var currentValue = 1
	var $value = null
	var $addBtn = null
	var $removeBtn = null
	var productId = null

	function getCurrentValue() {
		currentValue = Number($value.text())
	}

	function initElements() {
		$value = $container.find('.value')
		$addBtn = $container.find('.js-increase')
		$removeBtn = $container.find('.js-decrease')
		productId = $value.attr('data-product-id')
		console.log(productId)
	}

	function setValue(newValue) {
		currentValue = newValue < 1 ? 1 : Number(newValue)
		console.log(productId, window.onCountChange)
		if (productId && window.onCountChange) {
			window.onCountChange(productId, currentValue)
		}
		$value.text(currentValue)
		if ($targetObject) $targetObject.attr('data-product-count', currentValue)
	}

	function initEventHandlers() {
		$addBtn.click(function () {
			setValue(Number(currentValue) + 1)
		})
		$removeBtn.click(function () {
			setValue(Number(currentValue) - 1)
		})
	}

	function init() {
		initElements()
		getCurrentValue()
		initEventHandlers()

		console.log($value)
		console.log($addBtn)
	}

	return {
		init,
	}
}

export const initSelectors = () => {
	selectPlugin.init()

	$('.js-counter').each(function () {
		counterPlugin($(this)).init()
	})

	$('.js-counter-product').each(function () {
		counterPlugin($(this), $('#js-product-counter-target')).init()
	})
}

export const reloderCounter = () => {
	$('.js-counter').each(function () {
		counterPlugin($(this)).init()
	})
}
