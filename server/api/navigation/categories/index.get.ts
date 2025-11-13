import { navigationService } from '../../../utils/navigation'
import type { GetCategoriesParams } from '~/types/navigation'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event) as GetCategoriesParams

    // 参数验证和默认值
    const params: GetCategoriesParams = {
      is_active: query.is_active !== undefined ? query.is_active === 'true' : true,
      sort: (query.sort as any) || 'sort_order',
      order: (query.order as any) || 'asc'
    }

    const categories = await navigationService.getCategories(params)

    return {
      success: true,
      data: categories,
      message: `成功获取 ${categories.length} 个分类`
    }
  } catch (error) {
    console.error('获取导航分类失败:', error)

    throw createError({
      statusCode: 500,
      statusMessage: '获取导航分类失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})