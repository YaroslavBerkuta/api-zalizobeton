export const tabsModule = function (element) {
	const local = {}

	function init() {
		console.log(element)
		element.find('.js-tab-option').on('click', function () {
			const val = $(this).val()
			console.log(val)

			const activeTab = $(element).find(`.js-tab-${val}`)

			$(element).find('.js-tab.active').removeClass('active')
			activeTab.addClass('active')
		})
	}

	return {
		init,
	}
}
