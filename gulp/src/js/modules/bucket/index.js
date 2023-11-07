import axios from 'axios'

const fetchBucketReq = async items => {
	const response = await axios.post('/api/bucket/preview', { items })
	return response.data
}

export const bucketModule = (function () {
	const toast = new Toasty()
	const LOCAL_STORAGE_KEY = 'bucketItems'
	const elements = {
		bucketBtn: null,
		addToBucketBtns: null,
		bucketList: null,
		bucketCount: null,
	}
	const bucket = {
		previewItems: [],
		total: {
			brutoAmount: 0,
			nettoAmount: 0,
			discountAmount: 0,
		},
	}
	const hooks = []

	let bucketItems = []
	let reloadTimmer = null

	function saveItems(items) {
		if (reloadTimmer) clearTimeout(reloadTimmer)

		bucketItems = items
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bucketItems))
		reloadTimmer = setTimeout(function () {
			loadBucket()
		}, 500)
	}

	function compareExistInBucket(payload1, payload2) {
		if (payload1.productId !== payload2.productId) return false
		if (payload1.variant !== payload2.variant) return false
		return true
	}

	function addToBucket(productId, count, variant) {
		let isExist = false

		const items = bucketItems.map(it => {
			if (!compareExistInBucket(it, { productId, count, variant })) return it

			isExist = true
			return {
				...it,
				count: Number(it.count) + Number(count),
			}
		})

		if (!isExist) items.push({ productId, count, variant })
		saveItems(items)

		toast.info('Додано у корзину!')
	}

	function removeFromBucket(productId, variant) {
		const items = bucketItems.filter(it => {
			console.log(
				productId,
				variant,
				it,
				it.productId !== productId || it.variant !== variant,
			)
			if (Number(it.productId) !== Number(productId)) return true
			console.log('!variant && !it.variant', variant, it.variant)
			if (!variant && !it.variant) return false
			if (Number(it.variant) === Number(it.variant)) return false
			return true
		})
		saveItems(items)
	}

	function initElements() {
		elements.bucketBtn = $('#js-bucket-btn')
		elements.bucketList = $('#bucket-list')
		elements.bucketCount = $('#js-bucket-count')
	}

	function initHandleAdd() {
		$('.js-add-to-bucket').on('click', function () {
			const element = $(this)
			const productId = element.attr('data-product-id')
			const count = element.attr('data-product-count')
			const variant = $('#js-product-variant').attr('data-value')
			addToBucket(productId, count, variant)
		})
	}
	function initBucket() {
		try {
			const dataJson = localStorage.getItem(LOCAL_STORAGE_KEY)
			const data = JSON.parse(dataJson)
			if (Array.isArray(data)) bucketItems = data
		} catch (e) {}
	}

	async function loadBucket() {
		const data = await fetchBucketReq(bucketItems)
		bucket.previewItems = data.products
		bucket.total = {
			brutoAmount: data.brutoAmount,
			nettoAmount: data.nettoAmount,
			discountAmount: data.discountAmount,
		}

		callHooks()
		render()
	}

	function initDeleteHandlers() {
		$('.js-remove-product').on('click', function () {
			const productId = $(this).attr('data-product-id')
			const variantId = $(this).attr('data-variant-id')
			removeFromBucket(productId, variantId === 'undefined' ? undefined : variantId)
		})
	}

	function getVariant(variant) {
		if (!variant) return ''
		return `(${variant.name})`
	}

	function renderBucketItems() {
		let html = ''
		if (!bucket.previewItems.length) {
			html = '<p class="bucket-empty">Кошик пустий</p>'
		} else {
			bucket.previewItems.map(it => {
				const item = `
                    <div class="item">
                        <img src="${it.previewMedia.path}" />

                        <div>
                            <p class="title">${it.translate.name} ${getVariant(it.variant)}</p>
                            <p class="price">${it.price?.toLocaleString()} грн.</p>
                            <p class="count">Кількість: ${it.count}</p>
                        </div>

                        <p class="total">${it.nettoAmount?.toLocaleString()} грн.</p>

                        <button class="btn-remove js-remove-product" data-product-id="${
							it.id
						}" data-variant-id="${it.variant?.id}" />
                    </div>
                `

				html = `${html} ${item}`
			})
		}

		elements.bucketList.html(html)
	}

	function renderCount() {
		const isEmty = !Boolean(bucket.previewItems.length)
		if (isEmty) elements.bucketBtn.addClass('js-empty')
		else elements.bucketBtn.removeClass('js-empty')

		elements.bucketCount.text(bucket.previewItems.length)
	}

	function callHooks() {
		hooks.map(hook => {
			try {
				if (typeof hook === 'function') hook()
			} catch (e) {
				console.log(e)
			}
		})
	}

	function render() {
		renderBucketItems()
		renderCount()

		setTimeout(() => {
			initDeleteHandlers()
		}, 100)
	}

	function changeCount(productId, newCount) {
		const items = bucketItems.map(it => {
			if (it.productId === productId) {
				it.count = newCount
			}

			return it
		})
		saveItems(items)
	}

	function initHandlerChangeCount() {
		window.onCountChange = function (productId, newCount) {
			console.log('oncount change', productId, newCount)
			changeCount(productId, newCount)
		}
	}

	function init() {
		initElements()
		initHandleAdd()
		initBucket()
		loadBucket()
		initHandlerChangeCount()
	}

	function subscribe(handleFunc) {
		hooks.push(handleFunc)
	}

	function clear() {
		saveItems([])
	}

	return {
		init,
		subscribe,
		getItems: () => bucket.previewItems,
		getTotal: () => bucket.total,
		clear,
	}
})()
