import { AdminRestContentModule } from './_admin/content/content.module'
import { RestAdminFormRequestsModule } from './_admin/forms-requests/form-requests.module'
import { RestAdminGalleryModule } from './_admin/gallery/gallery.module'
import { RestAdminMediaModule } from './_admin/media/media.module'
import { RestAdminMenuModule } from './_admin/menus/menu.module'
import { RestAdminOrdersModule } from './_admin/orders/orders.module'
import { AdminRestPagesModule } from './_admin/pages/pages.module'
import { RestAdminPostCategoriesModule } from './_admin/post-categories/post-categories.module'
import { RestAdminPostTypeModule } from './_admin/post-type/post-type.module'
import { RestAdminPostModule } from './_admin/post/post.module'
import { RestAdminProductCategoriesModule } from './_admin/products-categories/products-categories.module'
import { RestAdminProductsModule } from './_admin/products/products.module'
import { RestAdminSettingsModule } from './_admin/settings/settings.module'
import { RestAdminUsersModule } from './_admin/users/admin-users.module'
import { PublicAccountModule } from './_public/account/account.module'
import { PublickAuthModule } from './_public/auth/auth.module'
import { PublicBucketModule } from './_public/bucket/bucket.module'
import { PublicCheckoutModule } from './_public/checkout/checkout.module'
import { PublicFavoritiesModule } from './_public/favorities/favorities.module'
import { RestPublicFormRequestsModule } from './_public/forms-requests/forms-requests.module'
import { RestPublicOrdersModule } from './_public/orders/orders.module'
import { PublicPagesModule } from './_public/pages/pages.module'
import { PublicProductsModule } from './_public/products/products.module'
import { RestSitemapModule } from './_public/sitemap/sitemap.module'
import { AccountModule } from './account/app-account.module'
import { AuthModule } from './auth/auth.module'
import { RestNovaPoshtaModule } from './nova-poshta/nova-poshta.module'

export const REST_MODULES = () => [
	AuthModule.forRoot(),
	AccountModule.forRoot(),
	RestNovaPoshtaModule.forRoot(),

	AdminRestContentModule.forRoot(),
	AdminRestPagesModule.forRoot(),

	RestAdminUsersModule.forRoot(),
	RestAdminMediaModule.forRoot(),
	RestAdminProductCategoriesModule.forRoot(),
	RestAdminProductsModule.forRoot(),
	RestAdminGalleryModule.forRoot(),
	RestAdminFormRequestsModule.forRoot(),
	RestAdminPostModule.forRoot(),
	RestAdminPostCategoriesModule.forRoot(),
	RestAdminPostTypeModule.forRoot(),
	RestAdminOrdersModule.forRoot(),
	RestAdminMenuModule.forFeature(),
	RestAdminSettingsModule.forRoot(),

	RestPublicFormRequestsModule.forRoot(),
	RestPublicOrdersModule.forRoot(),

	RestSitemapModule.forRoot(),
	PublickAuthModule.forRoot(),
	PublicAccountModule.forRoot(),
	PublicFavoritiesModule.forRoot(),
	PublicCheckoutModule.forRoot(),
	PublicProductsModule.forRoot(),
	PublicPagesModule.forRoot(),
	PublicBucketModule.forRoot(),
]
