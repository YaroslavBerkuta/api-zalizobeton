import { MenuLocations, MenuParent } from 'src/domain/menu/typing'
import { Lang } from 'src/shared'

export const MENU_SEED_DATA = [
	{
		key: 'primary_menu',
		name: 'Головне меню',
		location: MenuLocations.Primary,
		children: [
			{
				key: 'products-news',
				parentColumn: MenuParent.Menu,
				url: '/products/news',
				translations: [
					{
						lang: Lang.uk,
						name: 'Новинки',
					},
				],
			},
			{
				key: 'products-discount',
				parentColumn: MenuParent.Menu,
				url: '/products/discounts',
				translations: [
					{
						lang: Lang.uk,
						name: 'Акції',
					},
				],
			},
			{
				key: 'about-us',
				parentColumn: MenuParent.Menu,
				url: '/products/about-us',
				translations: [
					{
						lang: Lang.uk,
						name: 'Про нас',
					},
				],
			},
			{
				key: 'contacts',
				parentColumn: MenuParent.Menu,
				url: '/products/contacts',
				translations: [
					{
						lang: Lang.uk,
						name: 'Контакти',
					},
				],
			},
		],
	},
	// {
	// 	key: 'footer_menu',
	// 	name: 'Footer menu',
	// 	location: MenuLocations.Footer,
	// 	children: [
	// 		{
	// 			key: 'page_home',
	// 			parentColumn: MenuParent.Menu,
	// 			url: '',
	// 			translations: [
	// 				{
	// 					lang: Lang.en,
	// 					name: 'Home',
	// 				},
	// 				{
	// 					lang: Lang.uk,
	// 					name: 'Головна',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			key: 'page_sale',
	// 			parentColumn: MenuParent.Menu,
	// 			url: 'sale',
	// 			translations: [
	// 				{
	// 					lang: Lang.en,
	// 					name: 'Sale',
	// 				},
	// 				{
	// 					lang: Lang.uk,
	// 					name: 'Акції',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			key: 'page_about_us',
	// 			parentColumn: MenuParent.Menu,
	// 			url: 'about-us',
	// 			translations: [
	// 				{
	// 					lang: Lang.en,
	// 					name: 'About us',
	// 				},
	// 				{
	// 					lang: Lang.uk,
	// 					name: 'Про нас',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			key: 'page_news',
	// 			parentColumn: MenuParent.Menu,
	// 			url: 'news',
	// 			translations: [
	// 				{
	// 					lang: Lang.en,
	// 					name: 'News',
	// 				},
	// 				{
	// 					lang: Lang.uk,
	// 					name: 'Новинки',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			key: 'page_contacts',
	// 			parentColumn: MenuParent.Menu,
	// 			url: 'contacts',
	// 			translations: [
	// 				{
	// 					lang: Lang.en,
	// 					name: 'Contacts',
	// 				},
	// 				{
	// 					lang: Lang.uk,
	// 					name: 'Контакти',
	// 				},
	// 			],
	// 		},
	// 		{
	// 			key: 'page_account',
	// 			parentColumn: MenuParent.Menu,
	// 			url: 'account',
	// 			translations: [
	// 				{
	// 					lang: Lang.en,
	// 					name: 'Account',
	// 				},
	// 				{
	// 					lang: Lang.uk,
	// 					name: 'ОСОБИСТИЙ КАБІНЕТ',
	// 				},
	// 			],
	// 		},
	// 	],
	// },
]
