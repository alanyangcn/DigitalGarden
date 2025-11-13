import { navigationService } from '../../../utils/navigation'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '')
    if (isNaN(id) || id <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '无效的链接ID'
      })
    }

    // 检查链接是否存在
    const existingLink = await navigationService.getLinkById(id)
    if (!existingLink) {
      throw createError({
        statusCode: 404,
        statusMessage: '导航链接不存在'
      })
    }

    // 删除链接
    const success = await navigationService.deleteLink(id)

    if (!success) {
      throw createError({
        statusCode: 500,
        statusMessage: '删除导航链接失败'
      })
    }

    return {
      success: true,
      message: '导航链接删除成功'
    }
  } catch (error) {
    console.error('删除导航链接失败:', error)

    // 如果是我们手动抛出的错误，直接传递
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '删除导航链接失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})