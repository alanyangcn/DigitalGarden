import { navigationService } from '../../../utils/navigation'
import type { CreateLinkRequest } from '~/types/navigation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) as CreateLinkRequest

    // 基本验证
    if (!body.name?.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: '网站名称不能为空'
      })
    }

    if (!body.url?.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: '网站URL不能为空'
      })
    }

    // URL格式验证
    try {
      new URL(body.url)
    } catch {
      throw createError({
        statusCode: 400,
        statusMessage: '网站URL格式不正确'
      })
    }

    if (!body.description?.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: '网站描述不能为空'
      })
    }

    if (!body.category_id?.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: '分类ID不能为空'
      })
    }

    // 验证分类是否存在
    const category = await navigationService.getCategoryById(body.category_id)
    if (!category) {
      throw createError({
        statusCode: 404,
        statusMessage: '指定的分类不存在'
      })
    }

    // 创建链接
    const newLink = await navigationService.createLink(body)

    return {
      success: true,
      data: newLink,
      message: '导航链接创建成功'
    }
  } catch (error) {
    console.error('创建导航链接失败:', error)

    // 如果是我们手动抛出的错误，直接传递
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '创建导航链接失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})