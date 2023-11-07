import axios from 'axios'

export const favoritiesModule = (function () {
	const elements = {
		btns: null,
	}

	async function sendToggleRequest(productId) {
		const { data } = await axios.post('/api/favorities', { productId })
		return data
	}

	function initHandlers() {
		elements.btns.click(async function () {
			const productId = $(this).attr('data-product-id')
			if (!productId) return
			const isFavorite = await sendToggleRequest(productId)

			if (isFavorite) $(this).addClass('active')
			else $(this).removeClass('active')
		})

		$('.js-favorite-btn-account').on('click', async function (e) {
			const productId = $(this).attr('data-product-id')
			if (!productId) return
			const isFavorite = await sendToggleRequest(productId)
			if (isFavorite) $(this).addClass('active')
			else {
				$(this).removeClass('active')
				$(this).closest('tr').remove()
			}
		})
	}

	function init() {
		elements.btns = $('.js-favorite-btn')

		initHandlers()
	}

	return {
		init,
	}
})()
