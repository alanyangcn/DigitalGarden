import { navigationService } from '../../../utils/navigation'
import type { GetLinksParams } from '~/types/navigation'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as GetLinksParams

    // 参数验证和默认值
    const params: GetLinksParams = {
      category: query.category || 'all',
      search: query.search || undefined,
      limit: query.limit ? parseInt(query.limit as string) : undefined,
      offset: query.offset ? parseInt(query.offset as string) : undefined,
      sort: (query.sort as any) || 'sort_order',
      order: (query.order as any) || 'asc',
      is_active: query.is_active !== undefined ? query.is_active === 'true' : true
    }

    const links = await navigationService.getLinks(params)

    return {
      success: true,
      data: links,
      message: `成功获取 ${links.length} 个链接`
    }
  } catch (error) {
    console.error('获取导航链接失败:', error)

    throw createError({
      statusCode: 500,
      statusMessage: '获取导航链接失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})