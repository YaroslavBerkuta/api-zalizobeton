import { ContentFieldType } from 'src/domain/content/typing/enums'

export const homeTemplate = [
	{
		type: ContentFieldType.Reapeter,
		label: 'Слайдер',
		reapeterTemplate: [
			{
				type: ContentFieldType.Image,
				label: 'Зображення',
				key: 'image',
				disabledTranslates: true,
			},
			{
				type: ContentFieldType.Text,
				label: 'Заголовок',
				key: 'title',
				disabledTranslates: true,
			},
			{
				type: ContentFieldType.Textarea,
				label: 'Текст',
				key: 'text',
				disabledTranslates: true,
			},
			{
				type: ContentFieldType.Textarea,
				label: 'Додатковий html',
				key: 'html',
				disabledTranslates: true,
			},
		],
		key: 'homeSlider',
	},
	{
		type: ContentFieldType.Reapeter,
		label: 'Партнери',
		reapeterTemplate: [
			{
				type: ContentFieldType.Image,
				label: 'Зображення',
				key: 'image',
				disabledTranslates: true,
			},
			{
				type: ContentFieldType.ProductCategory,
				label: 'Категорія',
				key: 'category',
				disabledTranslates: true,
			},
		],
		key: 'categories',
	},
	{
		type: ContentFieldType.Reapeter,
		label: 'Переваги',
		reapeterTemplate: [
			{
				type: ContentFieldType.Textarea,
				label: 'Іконка',
				key: 'svg',
				disabledTranslates: true,
			},

			{
				type: ContentFieldType.Text,
				label: 'Назва',
				key: 'name',
				disabledTranslates: true,
			},
			{
				type: ContentFieldType.Text,
				label: 'Опис',
				key: 'description',
				disabledTranslates: true,
			},
		],
		key: 'features',
	},
	{
		type: ContentFieldType.Reapeter,
		label: 'Instagram',
		key: 'instagramPhotos',
		reapeterTemplate: [
			{
				type: ContentFieldType.Image,
				label: 'Зображення',
				key: 'image',
				disabledTranslates: true,
			},
			{
				type: ContentFieldType.Text,
				label: 'Посилання',
				key: 'link',
				disabledTranslates: true,
			},
		],
	},
]
