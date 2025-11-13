import { navigationService } from '../../../utils/navigation'
import type { UpdateLinkRequest } from '~/types/navigation'

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(getRouterParam(event, 'id') || '')
    if (isNaN(id) || id <= 0) {
      throw createError({
        statusCode: 400,
        statusMessage: '无效的链接ID'
      })
    }

    const body = await readBody(event) as UpdateLinkRequest
    body.id = id

    // 检查链接是否存在
    const existingLink = await navigationService.getLinkById(id)
    if (!existingLink) {
      throw createError({
        statusCode: 404,
        statusMessage: '导航链接不存在'
      })
    }

    // 如果更新了category_id，验证分类是否存在
    if (body.category_id) {
      const category = await navigationService.getCategoryById(body.category_id)
      if (!category) {
        throw createError({
          statusCode: 404,
          statusMessage: '指定的分类不存在'
        })
      }
    }

    // 如果更新了URL，验证URL格式
    if (body.url) {
      try {
        new URL(body.url)
      } catch {
        throw createError({
          statusCode: 400,
          statusMessage: '网站URL格式不正确'
        })
      }
    }

    // 更新链接
    const success = await navigationService.updateLink(body)

    if (!success) {
      throw createError({
        statusCode: 500,
        statusMessage: '更新导航链接失败'
      })
    }

    // 获取更新后的数据
    const updatedLink = await navigationService.getLinkById(id)

    return {
      success: true,
      data: updatedLink,
      message: '导航链接更新成功'
    }
  } catch (error) {
    console.error('更新导航链接失败:', error)

    // 如果是我们手动抛出的错误，直接传递
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '更新导航链接失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})