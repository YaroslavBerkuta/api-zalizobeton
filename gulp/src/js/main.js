import { initSelectors, reloderCounter } from './modules/select.js'
import { slider } from './modules/sliders.js'
import { authModule } from './modules/auth/auth.js'
import { accountModule } from './modules/account/account.js'
import { bucketModule } from './modules/bucket/index.js'
import { checkoutModule } from './modules/checkout/index.js'
import { favoritiesModule } from './modules/favorities/index.js'
import { sidebarModule } from './modules/sidebar/index.js'
import { AutocompleteNPCity, AutocompleteNPWarehouse } from './modules/autocomplete/index.js'
import { checkoutConfirmationModule } from './modules/checkout/checkout-confirmation.js'
import { employerForm } from './modules/forms/index.js'
import { tabsModule } from './modules/tabs.js'
import { initTogglePlugin } from './modules/toggle.js'

document.addEventListener('DOMContentLoaded', () => {
	document.body.className = document.body.className.replace('preload', '')
})

$(document).ready(function () {
	slider()
	bucketModule.init()
	authModule.init()
	instModule.init()
	accountModule.init()
	searchModule.init()
	priceRangeModule.init()
	favoritiesModule.init()
	initSelectors()
	sidebarModule.init()
	employerForm.init()

	checkoutModule.init(bucketModule, reloderCounter)
	checkoutConfirmationModule.init(bucketModule)

	lightbox.option({
		resizeDuration: 0,
		wrapAround: true,
		fadeDuration: 200,
		imageFadeDuration: 200,
	})

	new AutocompleteNPCity($('#js-autocomplete-np-city'))
	new AutocompleteNPWarehouse($('#js-autocomplete-np-warehouse'), $('#js-autocomplete-np-city'))

	$('.js-tabs').each(function () {
		tabsModule($(this)).init()
	})

	initTogglePlugin()
})

$(document).on('resize', function () {
	// slider()
})

$(window).on('resize', function () {
	instModule.reload()
})

var instModule = (function () {
	var items = []
	const burger = document.querySelector('.burger')

	burger.addEventListener('click', () => {
		document.querySelector('.nav__mobil').classList.toggle('active')
	})
	var header = null
	var globalWrapper = null

	function init() {
		if ($(window).width() <= 768) {
			setMobilMenu()
		}
		fixedHeaderInit()

		items = []
		$('.inst__row a').each(function () {
			items.push($(this))
		})
		setHeight()
	}

	function fixHeader() {
		var height = header.height()
		globalWrapper.css('padding-top', height)
	}

	function fixedHeaderInit() {
		header = $('#header')
		globalWrapper = $('#globalWrapper')
		fixHeader()

		$(window).on('resize', function () {
			fixHeader()
		})
	}

	function setMobilMenu() {
		const mobilMenu = document.querySelector('.nav__mobil')
		const navList = document.querySelector('.nav__list')
		const navAccount = document.querySelector('.nav__account')
		const subnav = document.querySelector('.subnav')

		subnav.remove()
		navList.remove()
		navAccount.remove()
		mobilMenu.append(subnav, navList, navAccount)
	}

	function setHeight() {
		items.map(function (item) {
			const width = item.width()
			item.height(width)
		})
	}

	function reload() {
		setHeight()
	}

	return {
		init,
		reload,
	}
})()

var searchModule = (function () {
	var $search = null
	var $sortList = null
	var $sortListItems = []
	var params = []

	function getParam(name) {
		return params.find(function (item) {
			return item.key === name
		})
	}
	function init() {
		initParams()

		$search = $('#search')

		$search.blur(submit)
		$search.on('keypress', function (e) {
			if (e.which === 13) submit()
		})

		initSort()
	}

	function initParams() {
		params = []
		var url = new URL(location.href)
		var keys = [...url.searchParams.keys()]
		keys.map(key => {
			params.push({ key, value: url.searchParams.get(key) })
		})
	}

	function initSort() {
		$sortList = $('#product-sort-list')

		$sortListItems = []
		$sortList.find('.checkbox-item').each(function () {
			try {
				var element = $(this)
				$sortListItems.push(element)
				element.click(onClickSortItem.bind(this, element))

				var sortFieldEquile =
					element.attr('data-sort-field') === getParam('sortField').value
				var sort = element.attr('data-sort') === getParam('sort').value
				if (sort && sortFieldEquile) {
					element.addClass('active')
				}
			} catch (e) {
				console.log(e)
			}
		})
	}

	function onClickSortItem(element) {
		$sortListItems.map(element => element.removeClass('active'))
		element.addClass('active')
		params.push({
			key: 'sortField',
			value: element.attr('data-sort-field'),
		})
		params.push({
			key: 'sort',
			value: element.attr('data-sort'),
		})
		find()
	}

	function submit() {
		var val = $search.val()
		console.log('val', val)
		find([
			{
				key: 'searchString',
				value: val,
			},
			{
				key: 'page',
				value: 1,
			},
		])
	}

	function find(newParams) {
		if (newParams) params.push(...newParams)
		var url = new URL(location.href)
		params.map(it => {
			url.searchParams.set(it.key, it.value)
		})

		if (location.pathname.includes('products') && !location.pathname.includes('single')) {
			location.assign(`${location.origin}${location.pathname}${url.search}`)
		} else {
			location.assign(`${location.origin}/products${url.search}`)
		}
	}

	return {
		init,
		find,
	}
})()

var priceRangeModule = (function () {
	var timmer = null
	function onFinish(e) {
		const toFind = []
		console.log(e)
		if (e.from >= e.min)
			toFind.push({
				key: 'priceFrom',
				value: e.from,
			})
		if (e.to <= e.max)
			toFind.push({
				key: 'priceTo',
				value: e.to,
			})

		if (toFind.length) searchModule.find(toFind)
	}

	function handleFinish(e) {
		console.log(e)
		if (timmer) clearTimeout(timmer)
		setTimeout(function () {
			onFinish(e)
		}, 500)
	}
	function init() {
		$('.js-range-slider').ionRangeSlider({
			type: 'double',
			min: '0',
			max: 20000,
			grid: false,
			hide_from_to: true,
			hide_min_max: true,
			onChange: function (e) {
				$('.price-range-top .first').text(`Від ${e.from_pretty} грн`)
				$('.price-range-top .second').text(`До ${e.to_pretty} грн`)
			},
			onFinish: function (e) {
				handleFinish(e)
			},
		})
	}

	return {
		init,
	}
})()
