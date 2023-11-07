export const checkoutModule = (function () {
	const local = {
		bucketModule: null,
		contentElement: null,
		reloderCounter: null,
		form: null,
	}

	function initElements() {
		local.contentElement = $('#js-checkout-content')
		local.form = $('#js-checkout-form')
		local.form.on('submit', function (e) {
			e.preventDefault()
			onFormSubmit()
		})
	}

	function onBucketChange() {
		load()
	}

	function init(bucketModule, reloderCounter) {
		local.bucketModule = bucketModule
		local.bucketModule.subscribe(onBucketChange)
		local.reloderCounter = reloderCounter

		initElements()
	}

	function load() {
		render()
		setTimeout(() => local.reloderCounter(), 200)
	}

	function render() {
		const htmlPaths = []
		htmlPaths.push(createProductsHTML())
		htmlPaths.push(createFooterHTML())
		local.contentElement.html(htmlPaths.join())
	}

	function createProductsHTML() {
		const result = local.bucketModule.getItems().map(it => {
			return itemTemplate(it)
		})

		return result.join(' ')
	}

	function createFooterHTML() {
		const total = local.bucketModule.getTotal()
		const bonuses = local.contentElement.attr('data-max-bonuses')
		return footerTemplate(total, Number(bonuses))
	}

	function onFormSubmit() {
		const valuesArray = local.form.serializeArray()
		const values = objectifyForm(valuesArray)

		values.delivery = $('input[name="delivery"]:checked').val()
		values.paymentMethod = $('input[name="payment_method"]:checked').val()
		values.np_ref = $('#js-autocomplete-np-warehouse').attr('data-value')

		localStorage.setItem('checkoutForm', JSON.stringify(values))
		window.location = '/checkout/confirmation'
	}

	return {
		init,
	}
})()

function getVariant(variant) {
	if (!variant) return ''
	return `(${variant.name})`
}

function itemTemplate(product) {
	return `
        <div class="checkout__product">
            <img src="${product.previewMedia?.path}" alt="" class="preview">
            <div class="content">
                <div>
                    <p class="title">${product.translate?.name} ${getVariant(product.variant)}</p>
                    <p class="param">
                        <span>Код:</span>
                        <span class="val">${product.code}</span>
                    </p>
                    <p class="param">
                        <span>Розмір:</span>
                        <span class="val">41</span>
                    </p>
                    <a href="${product.link}" target="__blank" class="link">Перейти до товару</a>
                </div>

                <div class="counter js-counter">
                    <button type="button" class="simbol js-decrease" role="button">${minusSvg()}</button>
                    <p class="value js-checkout-product-count" data-product-id="${product.id}">${
		product.count
	}</p>
                    <button type="button" class="simbol js-increase" role="button">${plusSvg()}</button>
                </div>
                <p class="summ">${product.brutoAmount?.toLocaleString()} <span>грн.</span></p>
                <button type="button" class="js-remove-product btn btn-delete" data-product-id="${
					product.id
				}" data-variant-id="${product.variant?.id}">${deleteSvg()}</button>
            </div>
        </div>
    
    `
}

function footerTemplate(total, bonuses) {
	return `
        <div class="checkout__total">
            <div class="row">
                <div class="left">
                    <p>Бонусів в наявності: ${bonuses}</p>
					<input 
						type="number" 
						name="usedBonuses" 
						class="checkout__input" 
						placeholder="Використати бонуси" 
						max="${bonuses}"
						value="0"
					/>
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
            <button class="btn btn-primary">Замовити</button>
        </div>
    `
}

function minusSvg() {
	return `<svg width="26" height="2" viewBox="0 0 26 2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55229 0.447715 2 1 2C17.3308 2 9.43562 2 25 2C25.5523 2 26 1.55229 26 1C26 0.447715 25.5523 0 25 0C9.38629 0 15.9265 0 1 0Z" fill="#F7F7F7"/>
    </svg>
    `
}

function plusSvg() {
	return `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 1C14 0.447715 13.5523 0 13 0C12.4477 0 12 0.447715 12 1V12H1C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H12V25C12 25.5523 12.4477 26 13 26C13.5523 26 14 25.5523 14 25V14H25C25.5523 14 26 13.5523 26 13C26 12.4477 25.5523 12 25 12H14V1Z" fill="#F7F7F7"/>
    </svg>
    `
}

function deleteSvg() {
	return `<svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 1.5C7 0.947715 7.44772 0.5 8 0.5H14C14.5523 0.5 15 0.947715 15 1.5V3.5H21C21.5523 3.5 22 3.94772 22 4.5C22 5.05228 21.5523 5.5 21 5.5H1C0.447715 5.5 0 5.05228 0 4.5C0 3.94772 0.447715 3.5 1 3.5H7V1.5ZM9 3.5H13V2.5H9V3.5Z" fill="#F7F7F7"/>
    <path d="M9 12.5C9.55229 12.5 10 12.9477 10 13.5V21.5C10 22.0523 9.55229 22.5 9 22.5C8.44771 22.5 8 22.0523 8 21.5V13.5C8 12.9477 8.44771 12.5 9 12.5Z" fill="#F7F7F7"/>
    <path d="M14 13.5C14 12.9477 13.5523 12.5 13 12.5C12.4477 12.5 12 12.9477 12 13.5V21.5C12 22.0523 12.4477 22.5 13 22.5C13.5523 22.5 14 22.0523 14 21.5V13.5Z" fill="#F7F7F7"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.24455 8.8448C2.43448 8.6258 2.71011 8.5 3 8.5H19C19.2899 8.5 19.5655 8.6258 19.7555 8.8448C19.9454 9.0638 20.0309 9.35444 19.99 9.64142L17.9495 23.9243C17.7384 25.4022 16.4726 26.5 14.9797 26.5H7.02031C5.52736 26.5 4.26159 25.4022 4.05046 23.9243L2.01005 9.64142C1.96905 9.35444 2.05461 9.0638 2.24455 8.8448ZM4.15301 10.5L6.03036 23.6414C6.10073 24.1341 6.52266 24.5 7.02031 24.5H14.9797C15.4773 24.5 15.8993 24.1341 15.9696 23.6414L17.847 10.5H4.15301Z" fill="#F7F7F7"/>
</svg>
`
}

function objectifyForm(formArray) {
	//serialize data function
	var returnArray = {}
	for (var i = 0; i < formArray.length; i++) {
		returnArray[formArray[i]['name']] = formArray[i]['value']
	}
	return returnArray
}
