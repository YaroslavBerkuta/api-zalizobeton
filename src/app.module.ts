import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'

import {
	getDatabaseConfig,
	getFilesStorageConfig,
	getIntagramConfig,
	getJwtConfig,
	getRedisConfig,
} from './config'
import { DatabaseModule } from './libs/database'
import {
	FilesStorageModule,
	InstagramModule,
	JwtModule,
	NovaPoshtaModule,
	RedisModule,
} from './libs'
import { DOMAIN_MODULES } from './domain'
import { REST_MODULES } from './rest'
import { UserMiddleware } from './domain/sessions/middlewares'
import { getNovaPoshtaConfig } from './config/nova-poshta.config'
import { MailerModule } from './libs/mailer/mailer.module'
import { getMailerConfig } from './config/mailer.config'

@Module({
	imports: [
		JwtModule.forRoot(getJwtConfig()),
		DatabaseModule.forRoot(...getDatabaseConfig()),
		FilesStorageModule.forRoot(getFilesStorageConfig()),
		RedisModule.forRoot(getRedisConfig()),
		NovaPoshtaModule.forRoot(getNovaPoshtaConfig()),
		InstagramModule.forRoot(getIntagramConfig()),
		MailerModule.forRoot(getMailerConfig()),
		...DOMAIN_MODULES(),
		...REST_MODULES(),
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UserMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
