import './edit-account.js'
import './edit-password.js'

export const accountModule = (function () {
	function calckBonus() {
		try {
			const progress = document.getElementById('progress')
			let currentBonus = progress?.dataset?.bonus
			const maxBonus = 300
			if (currentBonus <= 300) {
				progress ? (progress.style.width = (currentBonus / maxBonus) * 100 + '%') : 0
			} else {
				progress.style.width = '100%'
			}
		} catch (e) {}
	}

	const init = () => {
		calckBonus()
	}

	return {
		init,
	}
})()

/*accountContent.innerHTML =
			data.length > 0
				? `<div class="products-list">${data.map(
						it => `<div class="product">
		<div class="product__image">
			<img src="${it?.previewMedia?.url}" alt="">
		</div>
		<div class="product__content">
			<p class="present">В наявності</p>
			<p class="name">${it?.translate?.name}</p>
			<p class="price">${it?.price} грн</p>
			<div class="product__btns">
				<a class="btn btn-outline btn-small" href="/products/single/${it?.key}">Детальніше</a>
				<button 
					class="btn btn-outline btn-small js-add-to-bucket" 
					data-product-id="${it?.id}" 
					data-product-count="1" 
					data-product-variant=""
				><p>До кошика</p><svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M4.00318 0C6.01247 0 7.7868 1.14529 8.3777 2.82366L8.43979 3H26.8308C28.8955 3 30.493 4.58155 30.2369 6.3721L29.6341 10.5868C29.44 11.9442 28.2197 13.015 26.6672 13.19L11.3983 14.9119C11.2172 15.15 10.9927 15.3664 10.7282 15.5514C10.0411 16.0317 10.4298 17 11.3096 17H27.1346C27.7666 17 28.2789 17.4477 28.2789 18C28.2789 18.5523 27.7666 19 27.1346 19H11.3096C8.26653 19 6.92233 15.651 9.29856 13.9896C9.59689 13.7811 9.71908 13.4343 9.60672 13.1152L6.19044 3.41183C5.89499 2.57264 5.00782 2 4.00318 2H1.96155C1.32961 2 0.817322 1.55228 0.817322 1C0.817322 0.447715 1.32961 0 1.96155 0H4.00318ZM11.8823 12.8407L26.3744 11.2065C26.8918 11.1481 27.2986 10.7912 27.3633 10.3387L27.9662 6.12403C28.0515 5.52718 27.519 5 26.8308 5H9.14393L11.794 12.5271C11.8306 12.6309 11.8599 12.7356 11.8823 12.8407Z" fill="#F7F7F7"/>
				<path d="M7.68271 22C7.68271 20.8954 8.70729 20 9.97117 20C11.2351 20 12.2596 20.8954 12.2596 22C12.2596 23.1046 11.2351 24 9.97117 24C8.70729 24 7.68271 23.1046 7.68271 22Z" fill="#F7F7F7"/>
				<path d="M23.7019 20C22.4381 20 21.4135 20.8954 21.4135 22C21.4135 23.1046 22.4381 24 23.7019 24C24.9658 24 25.9904 23.1046 25.9904 22C25.9904 20.8954 24.9658 20 23.7019 20Z" fill="#F7F7F7"/>
				</svg>
				</button>
				<button 
					class="btn btn-outline btn-small js-favorite-btn ${it?.isFavorite} active ${it?.isFavorite}"
					data-product-id="${it?.id}"
				>
				<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M10.8164 4.10533C8.79907 1.96489 5.55418 1.96489 3.53681 4.10533C1.48773 6.27941 1.48773 9.82744 3.53681 12.0015L13 22.042L22.4632 12.0015C24.5123 9.82744 24.5123 6.27941 22.4632 4.10533C20.4458 1.96489 17.2009 1.96489 15.1836 4.10533L13.7277 5.64999C13.5388 5.85046 13.2755 5.96411 13 5.96411C12.7245 5.96411 12.4612 5.85046 12.2723 5.64999L10.8164 4.10533ZM2.08137 2.73358C4.88824 -0.244526 9.465 -0.244526 12.2719 2.73358L13 3.50612L13.7281 2.73358C16.535 -0.244525 21.1118 -0.244526 23.9186 2.73358C26.6938 5.67804 26.6938 10.4288 23.9186 13.3733L13.7277 24.1859C13.5388 24.3864 13.2755 24.5 13 24.5C12.7245 24.5 12.4612 24.3864 12.2723 24.1859L2.08137 13.3733C-0.69379 10.4288 -0.693792 5.67804 2.08137 2.73358Z" fill="#F7F7F7"/>
				</svg>				
				</button>
			</div>
		</div>
	</div>`,
				  )}</div>`
				: '<div class="list-empty"><p>По заданих параметрах товари відстуні</p></div>'

				*/
