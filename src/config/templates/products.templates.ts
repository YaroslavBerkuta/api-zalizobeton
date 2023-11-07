import { ContentFieldType } from 'src/domain/content/typing/enums'

export const baseProductTemplate = [
	{
		type: ContentFieldType.Text,
		label: 'Склад',
		key: 'warehouse',
		disabledTranslates: true,
	},
	{
		type: ContentFieldType.Text,
		label: 'Код',
		key: 'code',
		disabledTranslates: true,
	},
	{
		type: ContentFieldType.Text,
		label: 'Країна',
		key: 'country',
		disabledTranslates: true,
		defaultValue: 'Україна',
	},
	{
		type: ContentFieldType.Image,
		label: 'Розмірна сітка',
		key: 'sizeGridImg',
	},
	{
		type: ContentFieldType.Reapeter,
		label: 'Додаткові параметри',
		key: 'additionalsParams',
		reapeterTemplate: [
			{
				type: ContentFieldType.Text,
				label: 'Параметр',
				disabledTranslates: true,
				key: 'key',
			},
			{
				type: ContentFieldType.Text,
				label: 'Значення',
				disabledTranslates: true,
				key: 'value',
			},
		],
	},
]
export const productsTemplates = {}
