import { navigationService } from '../../utils/navigation'

export default defineEventHandler(async (event) => {
  try {
    const stats = await navigationService.getStats()

    return {
      success: true,
      data: stats,
      message: '获取导航统计信息成功'
    }
  } catch (error) {
    console.error('获取导航统计信息失败:', error)

    throw createError({
      statusCode: 500,
      statusMessage: '获取导航统计信息失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})