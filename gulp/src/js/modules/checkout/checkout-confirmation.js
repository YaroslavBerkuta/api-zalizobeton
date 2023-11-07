import axios from 'axios'

export const checkoutConfirmationModule = (function () {
	const local = {
		pageUrl: '/checkout/confirmation',
		successPageUrl: '/checkout/success',
		failPageUrl: '/checkout/success',
		bucketModule: null,
		formValues: {},
		deliveryContainer: null,
		productsContainer: null,
	}

	function load() {
		render()
	}

	function init(bucketModule) {
		const isCurrentPage = window.location.pathname.includes(local.pageUrl)
		if (!isCurrentPage) return

		local.bucketModule = bucketModule
		local.bucketModule.subscribe(load)
		local.deliveryContainer = $('#js-checkout-c-delivery')
		local.productsContainer = $('#js-checkout-c-products')

		initFormValues()
		render()
	}

	function initFormValues() {
		const json = JSON.parse(localStorage.getItem('checkoutForm'))
		local.formValues = json
	}

	function render() {
		renderData()
		renderProductsBlock()
	}

	function renderData() {
		const html = `
            ${renderCollRow('Ім’я, прізвище', local.formValues.name)}
            ${renderCollRow('Номер телефону', local.formValues.phoneNumber)}
            ${renderCollRow('Email', local.formValues.email)}
            ${renderCollRow('Доставка', getDelivery())}
            ${renderCollRow('Оплата', getPayment())}
        `

		local.deliveryContainer.html(html)

		setTimeout(() => {
			console.log('init button click')
			$('#js-create-order').off('click', createOrder).on('click', createOrder)
		}, 100)
	}

	function renderCollRow(label, value) {
		return `
            <div class="checkout-coll-row">
                <span>${label}:</span>
                <span>${value}</span>
        </div>
            `
	}

	function getDelivery() {
		if (local.formValues.delivery === 'np') {
			return `Нова Пошта, ${local.formValues.np_town}`
		}
		return `Укрпошта`
	}

	function getPayment() {
		if (local.formValues.paymentMethod === 'online') return 'Безготівковий розрахунок'
		if (local.formValues.paymentMethod === 'offline') return 'Оплата при отриманні'
	}

	function renderProductsBlock() {
		const html = [getProductsListHTML(), getTotalHtml()]
		local.productsContainer.html(html.join(''))
	}

	function getProductsListHTML() {
		const result = local.bucketModule.getItems().map((it, index) => {
			return productTemplate(it, index)
		})
		return productsTableTemplate(result.join(''))
	}

	function getTotalHtml() {
		const total = local.bucketModule.getTotal()
		return footerTemplate(total, local.formValues.usedBonuses)
	}

	async function createOrder() {
		try {
			const form = local.formValues
			const bucket = local.bucketModule.getItems()

			const data = {
				user: {
					email: form.email,
					phoneNumber: form.phoneNumber,
					name: form.name,
				},
				products: bucket,
				currency: 'uah',
				paymentMethod: form.paymentMethod,
				shipping: {
					type: form.delivery,
				},
				usedBonuses: form.usedBonuses,
			}

			if (data.shipping.type === 'np') {
				data.shipping.novaPoshtaData = {
					novaPoshtaDataDepartmentRef: form.np_ref,
					town: form.np_town,
					departmentName: form.np_viddil,
				}
			}

			if (data.shipping.type === 'ukr') {
				data.shipping.ukrPoshtaData = {
					town: form.ukrposhta_city,
					departmentAddress: form.ukrposhta_address,
				}
			}

			await axios.post('/public/api/orders', data)
		} finally {
			clear()
			window.location = local.successPageUrl
		}
	}

	function clear() {
		local.bucketModule.clear()
		localStorage.removeItem('checkoutForm')
	}

	return {
		init,
	}
})()

function productsTableTemplate(rowsHtml) {
	return `
        <div class="checkout__coll-content" style="margin-bottom: 17px">
            <table class="cc-products-tabel">
                ${rowsHtml}
            </table>
        </div>
    `
}

function productTemplate(product, index) {
	return `
        <tr class="checkout-product-row">
            <td><p>${index + 1}.</p></td>
            <td><img src="${product.previewMedia?.path}" alt=""></td>
            <td><p class="title">${product.translate?.name}</p></td>
            <td><p class="count">Кількість: ${product.count}</p></td>
            <td><p class="amount">${product.brutoAmount?.toLocaleString()} <span>грн.</span></p></td>
        </tr>
    `
}

function footerTemplate(total, usedBonuses) {
	return `
        <div class="checkout__total">
            <div class="row">
                <div class="left">
                    <p >Використано бонусів: ${usedBonuses ? usedBonuses : 0}</p>
                </div>
                <div class="right">
                    <p>Сума: ${total.brutoAmount?.toLocaleString()} грн</p>
                    <p>Знижка: ${total.discountAmount?.toLocaleString()} грн</p>

                    <p class="total__summ">
                        <span class="label">До сплати:</span>
                        <span class="value">${total.nettoAmount?.toLocaleString()} грн</span>
                    </p>
                </div>
            </div>
            <button class="btn btn-primary" id="js-create-order">Замовити</button>
        </div>
    `
}
