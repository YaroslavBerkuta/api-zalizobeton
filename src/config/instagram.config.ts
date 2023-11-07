import { IInstagramModuleOptions } from 'src/libs/instagram/typing'
import { getEnv } from 'src/shared'

export const getIntagramConfig = (): IInstagramModuleOptions => {
	return {
		accessToken: getEnv('INSTAGRAM_ACCESS_TOKEN'),
		pageId: getEnv('INSTAGRAM_PAGE_ID'),
		apiVersion:getEnv('INSTAGRAM_API_VERSION')
	}
}
