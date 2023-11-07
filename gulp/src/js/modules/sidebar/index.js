const windowSize = document.body.clientWidth

export const sidebarModule = (function () {
	function initSidebarButton(width) {
		console.log('sidebar', width)
		const filter = document.querySelector('.sidebar__filter button')
		if (!filter) return
		const filterItems = document.querySelector('.sidebar__filter-items')
		if (width <= 768) {
			const priceSelect = document.querySelector('.price-range')
			const sortCheack = document.querySelector('.checkbox-list')
			filterItems.append(sortCheack, priceSelect)
		}
		filter.addEventListener('click', () => {
			filterItems.classList.toggle('active')
		})
	}

	function initCheackBoxSlider(width) {
		if (width <= 768) {
			$('.sidebar > .checkbox-list').slick({
				dots: false,
				arrows: false,
				slidesToShow: 3,
				infinite: true,
				responsive: [
					{
						breakpoint: 500,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
						},
					},
				],
			})
		}
	}

	function init() {
		initSidebarButton(windowSize)
		initCheackBoxSlider(windowSize)
	}

	return {
		init,
	}
})()
