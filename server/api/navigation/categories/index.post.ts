import { navigationService } from '../../../utils/navigation'
import type { CreateCategoryRequest } from '~/types/navigation'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event) as CreateCategoryRequest

    // 基本验证
    if (!body.name?.trim()) {
      throw createError({
        statusCode: 400,
        statusMessage: '分类名称不能为空'
      })
    }

    // 创建分类
    const newCategory = await navigationService.createCategory(body)

    return {
      success: true,
      data: newCategory,
      message: '导航分类创建成功'
    }
  } catch (error) {
    console.error('创建导航分类失败:', error)

    // 如果是我们手动抛出的错误，直接传递
    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: '创建导航分类失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})