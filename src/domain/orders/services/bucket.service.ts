import { Inject, Injectable } from '@nestjs/common'
import {
	IProductVariant,
	IProductsRepository,
	IProductsVariantsRepository,
	PRODUCTS_REPOSITORY,
	PRODUCTS_VARIANTS_REPOSITORY,
} from 'src/domain/products/typing'
import { SETTINGS_SERVICE } from 'src/domain/settings/typing/consts'
import { ISettingsService } from 'src/domain/settings/typing/interfaces'
import { IBucketPreview, IBucketService, IGetBucketPreviewPayload } from '../typing'
import { Lang, formatPrice, getTranslate } from 'src/shared'
import { transformFileUrl } from 'src/shared/transforms'
import { SettingKey } from 'src/domain/settings/typing/enums'
import { isNumber } from 'lodash'

@Injectable()
export class BucketService implements IBucketService {
	@Inject(PRODUCTS_REPOSITORY)
	private readonly productsRepository: IProductsRepository

	@Inject(SETTINGS_SERVICE)
	private readonly settingsService: ISettingsService

	@Inject(PRODUCTS_VARIANTS_REPOSITORY)
	private readonly productsVariantsRepository: IProductsVariantsRepository

	public async getPreview(dto: IGetBucketPreviewPayload) {
		const discountConfig = await this.getDiscountSettings()

		const result: IBucketPreview = {
			products: [],
			brutoAmount: 0,
			nettoAmount: 0,
			discountAmount: 0,
		}

		for await (const item of dto.items) {
			let brutoAmount = 0
			let nettoAmount = 0
			let discountAmount = 0
			let discountPercent = 0

			const product = await this.productsRepository.findOne({
				where: { id: item.productId },
				relations: ['previewMedia', 'translations'],
			})

			const translate = getTranslate(product.translations, Lang.uk)

			product.translations = null
			product.previewMedia.path = transformFileUrl(product.previewMedia.url)

			brutoAmount = formatPrice(Number(product.price) * Number(item.count))

			if (product.discount > discountConfig.discount) {
				discountAmount = formatPrice((product.discount * brutoAmount) / 100)
				discountPercent = product.discount
			} else if (item.count >= discountConfig.needCount) {
				discountAmount = formatPrice((discountConfig.discount * brutoAmount) / 100)
				discountPercent = discountConfig.discount
			}
			nettoAmount = formatPrice(brutoAmount - discountAmount)

			result.brutoAmount += brutoAmount
			result.nettoAmount += nettoAmount
			result.discountAmount += discountAmount

			let variant: IProductVariant = null

			try {
				if (item.variant) {
					variant = await this.productsVariantsRepository.findOneBy({
						id: item.variant,
					})
				}
			} catch (e) {}

			result.products.push({
				...product,
				count: item.count,
				translate,
				brutoAmount,
				nettoAmount,
				discountAmount,
				discountPercent,
				variant,
				link: `/products/single/${product.key}`,
			})
		}

		return result
	}

	private async getDiscountSettings() {
		const result = {
			needCount: 999999,
			discount: 0,
		}

		try {
			const countToDiscount = await this.settingsService.get(
				SettingKey.CountDiscount_NeedCount,
			)
			const countDiscount = await this.settingsService.get(SettingKey.CountDiscount_Discount)

			if (isNumber(Number(countToDiscount))) result.needCount = Number(countToDiscount)
			if (isNumber(Number(countDiscount))) result.discount = Number(countDiscount)

			return result
		} catch (e) {}
	}
}
