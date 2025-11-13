import { navigationService } from '../utils/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const db = hubDatabase()

    // 读取并执行迁移脚本
    const migrationPath = join(process.cwd(), 'server', 'migrations', '001_initial_navigation.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    // 执行SQL语句
    await db.exec(migrationSQL)

    // 验证数据是否成功插入
    const categories = await navigationService.getCategories()
    const links = await navigationService.getLinks({ limit: 10 })
    const stats = await navigationService.getStats()

    return {
      success: true,
      data: {
        migrationExecuted: true,
        categoriesCount: categories.length,
        linksCount: stats.totalLinks,
        sampleCategories: categories.slice(0, 3),
        sampleLinks: links.slice(0, 3),
        stats
      },
      message: '数据库初始化成功'
    }
  } catch (error) {
    console.error('数据库初始化失败:', error)

    throw createError({
      statusCode: 500,
      statusMessage: '数据库初始化失败',
      data: {
        success: false,
        error: error instanceof Error ? error.message : '未知错误'
      }
    })
  }
})