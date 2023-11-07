export const slider = () => {
	$('.home-slider').slick({
		adaptiveHeight: true,
		dots: true,
		arrows: false,
		appendDots: $('.home-slider-controls .slide-m-dots'),
		prevArrow: $('.home-slider-controls .slide-m-prev'),
		nextArrow: $('.home-slider-controls .slide-m-next'),
		speed: 500,
		fade: true,
		cssEase: 'linear',
		infinite: true,
		responsive: [
			{
				breakpoint: 435,
				settings: {
					arrows: false,
				},
			},
		],
	})

	$('.home-news').slick({
		adaptiveHeight: true,
		dots: true,
		arrows: true,
		appendDots: $('.home-news-controls .slide-m-dots'),
		prevArrow: $('.home-news-controls .slide-m-prev'),
		nextArrow: $('.home-news-controls .slide-m-next'),
		speed: 500,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},

			{
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	})
	$('#product-slider-root').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '#product-slider-nav',
	})

	$('#product-slider-nav').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		asNavFor: '#product-slider-root',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		infinite: true,
	})

	$('#sale-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		centerMode: false,
		adaptiveHeight: true,
		arrows: true,
		appendDots: $('.home-slider-controls .slide-m-dots'),
		prevArrow: $('.home-slider-controls .slide-m-prev'),
		nextArrow: $('.home-slider-controls .slide-m-next'),
		responsive: [
			{
				breakpoint: 1445,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 1030,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 770,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: false,
				},
			},
		],
	})
}
