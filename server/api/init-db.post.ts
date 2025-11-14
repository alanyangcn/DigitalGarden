import { navigationService } from '../utils/navigation'
import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const db = hubDatabase()

    // 读取并执行迁移脚本
    const migrationPath = join(process.cwd(), 'server', 'migrations', '001_initial_navigation.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf-8')

    // D1兼容的SQL解析：将多行语句转换为单行
    function parseSQL(sql: string): string[] {
      // 移除注释 - 更简单直接的方法
      let cleanSQL = sql

      // 按行处理，更精确地移除注释
      const lines = cleanSQL.split('\n')
      const processedLines: string[] = []

      for (const line of lines) {
        const trimmedLine = line.trim()

        // 跳过整行注释
        if (trimmedLine.startsWith('--')) {
          continue
        }

        // 处理行内注释
        let processedLine = line
        const commentIndex = line.indexOf('--')
        if (commentIndex > 0) {
          const beforeComment = line.substring(0, commentIndex)
          // 简单检查：如果前面的文本没有未闭合的引号，则认为这是注释
          const singleQuotes = beforeComment.match(/'/g) || []
          const doubleQuotes = beforeComment.match(/"/g) || []

          if (singleQuotes.length % 2 === 0 && doubleQuotes.length % 2 === 0) {
            // 注释不在字符串中，移除它
            processedLine = beforeComment
          }
        }

        // 保留非空行
        if (processedLine.trim()) {
          processedLines.push(processedLine.trim())
        }
      }

      cleanSQL = processedLines.join(' ')

      // 分割SQL语句
      const statements: string[] = []
      let currentStatement = ''
      let parenCount = 0
      let inString = false
      let stringChar = ''

      for (let i = 0; i < cleanSQL.length; i++) {
        const char = cleanSQL[i]

        if (!inString) {
          if (char === "'" || char === '"') {
            inString = true
            stringChar = char
            currentStatement += char
          } else if (char === '(') {
            parenCount++
            currentStatement += char
          } else if (char === ')') {
            parenCount--
            currentStatement += char
          } else if (char === ';' && parenCount === 0) {
            // 语句结束
            const statement = currentStatement.trim()
            if (statement) {
              // 将多行语句转换为单行（D1兼容）
              const singleLineStatement = statement.replace(/\s+/g, ' ').trim()
              statements.push(singleLineStatement)
            }
            currentStatement = ''
          } else if (char !== '\n' && char !== '\r') {
            currentStatement += char
          }
        } else {
          if (char === stringChar) {
            inString = false
            stringChar = ''
          }
          currentStatement += char
        }
      }

      // 处理最后一个语句
      const finalStatement = currentStatement.trim()
      if (finalStatement) {
        const singleLineStatement = finalStatement.replace(/\s+/g, ' ').trim()
        statements.push(singleLineStatement)
      }

      return statements
    }

    // 解析并执行SQL脚本
    const statements = parseSQL(migrationSQL)

    // 逐个执行SQL语句
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]

      if (!statement.trim()) continue

      try {
        await db.exec(statement)
      } catch (error) {
        console.error('执行SQL语句失败:', statement)
        throw error
      }
    }

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