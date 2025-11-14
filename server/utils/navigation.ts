import type {
  NavigationLink,
  NavigationCategory,
  NavigationLinkWithCategory,
  CreateLinkRequest,
  UpdateLinkRequest,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  GetLinksParams,
  GetCategoriesParams
} from '~/types/navigation'

export class NavigationService {
  private get db() {
    return hubDatabase()
  }

  // ========== 分类相关操作 ==========

  /**
   * 获取所有分类
   */
  async getCategories(params?: GetCategoriesParams): Promise<NavigationCategory[]> {
    let query = 'SELECT * FROM navigation_categories'
    const conditions: string[] = []
    const bindings: any[] = []

    if (params?.is_active !== undefined) {
      conditions.push('is_active = ?')
      bindings.push(params.is_active ? 1 : 0)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    // 排序
    const sortField = params?.sort || 'sort_order'
    const sortOrder = params?.order || 'asc'
    query += ` ORDER BY ${sortField} ${sortOrder}`

    const { results } = await this.db.prepare(query).bind(...bindings).all()
    return results as NavigationCategory[]
  }

  /**
   * 根据ID获取分类
   */
  async getCategoryById(id: string): Promise<NavigationCategory | null> {
    const { results } = await this.db.prepare(
      'SELECT * FROM navigation_categories WHERE id = ?'
    ).bind(id).all()

    return results.length > 0 ? results[0] as NavigationCategory : null
  }

  /**
   * 创建分类
   */
  async createCategory(data: CreateCategoryRequest): Promise<NavigationCategory> {
    const now = Date.now()
    const id = generateId()

    await this.db.prepare(`
      INSERT INTO navigation_categories (id, name, description, icon, sort_order, is_active, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      data.name,
      data.description || null,
      data.icon || null,
      data.sort_order || 0,
      1, // 默认激活
      now
    ).run()

    return {
      id,
      name: data.name,
      description: data.description,
      icon: data.icon,
      sort_order: data.sort_order || 0,
      is_active: true,
      created_at: now
    }
  }

  /**
   * 更新分类
   */
  async updateCategory(data: UpdateCategoryRequest): Promise<boolean> {
    const now = Date.now()
    const updates: string[] = []
    const bindings: any[] = []

    if (data.name !== undefined) {
      updates.push('name = ?')
      bindings.push(data.name)
    }
    if (data.description !== undefined) {
      updates.push('description = ?')
      bindings.push(data.description)
    }
    if (data.icon !== undefined) {
      updates.push('icon = ?')
      bindings.push(data.icon)
    }
    if (data.sort_order !== undefined) {
      updates.push('sort_order = ?')
      bindings.push(data.sort_order)
    }
    if (data.is_active !== undefined) {
      updates.push('is_active = ?')
      bindings.push(data.is_active ? 1 : 0)
    }

    if (updates.length === 0) return false

    updates.push('updated_at = ?')
    bindings.push(now)
    bindings.push(data.id)

    const result = await this.db.prepare(`
      UPDATE navigation_categories SET ${updates.join(', ')} WHERE id = ?
    `).bind(...bindings).run()

    return result.changes > 0
  }

  /**
   * 删除分类
   */
  async deleteCategory(id: string): Promise<boolean> {
    const result = await this.db.prepare(
      'DELETE FROM navigation_categories WHERE id = ?'
    ).bind(id).run()

    return result.changes > 0
  }

  // ========== 链接相关操作 ==========

  /**
   * 获取链接列表
   */
  async getLinks(params?: GetLinksParams): Promise<NavigationLinkWithCategory[]> {
    let query = `
      SELECT l.*, c.name as category_name, c.description as category_description,
             c.icon as category_icon, c.sort_order as category_sort_order,
             c.is_active as category_is_active, c.created_at as category_created_at
      FROM navigation_links l
      LEFT JOIN navigation_categories c ON l.category_id = c.id
    `
    const conditions: string[] = []
    const bindings: any[] = []

    if (params?.category && params.category !== 'all') {
      conditions.push('l.category_id = ?')
      bindings.push(params.category)
    }

    if (params?.search) {
      conditions.push('(l.name LIKE ? OR l.description LIKE ? OR l.tags LIKE ? OR l.domain LIKE ?)')
      const searchTerm = `%${params.search}%`
      bindings.push(searchTerm, searchTerm, searchTerm, searchTerm)
    }

    if (params?.is_active !== undefined) {
      conditions.push('l.is_active = ?')
      bindings.push(params.is_active ? 1 : 0)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    // 排序
    const sortField = params?.sort || 'sort_order'
    const sortOrder = params?.order || 'asc'
    query += ` ORDER BY l.${sortField} ${sortOrder}`

    // 分页
    if (params?.limit) {
      query += ' LIMIT ?'
      bindings.push(params.limit)

      if (params?.offset) {
        query += ' OFFSET ?'
        bindings.push(params.offset)
      }
    }

    const { results } = await this.db.prepare(query).bind(...bindings).all()

    // 转换数据格式
    return results.map((row: any) => ({
      id: row.id,
      name: row.name,
      url: row.url,
      description: row.description,
      icon: row.icon,
      icon_name: row.icon_name,
      category_id: row.category_id,
      tags: row.tags ? JSON.parse(row.tags) : [],
      domain: row.domain,
      sort_order: row.sort_order,
      is_active: Boolean(row.is_active),
      created_at: row.created_at,
      updated_at: row.updated_at,
      category: {
        id: row.category_id,
        name: row.category_name,
        description: row.category_description,
        icon: row.category_icon,
        sort_order: row.category_sort_order,
        is_active: Boolean(row.category_is_active),
        created_at: row.category_created_at
      }
    })) as NavigationLinkWithCategory[]
  }

  /**
   * 根据ID获取链接
   */
  async getLinkById(id: number): Promise<NavigationLinkWithCategory | null> {
    const links = await this.getLinks()
    return links.find(link => link.id === id) || null
  }

  /**
   * 创建链接
   */
  async createLink(data: CreateLinkRequest): Promise<NavigationLink> {
    const now = Date.now()

    // 提取域名
    const domain = extractDomain(data.url)

    const result = await this.db.prepare(`
      INSERT INTO navigation_links (name, url, description, icon, icon_name, category_id, tags, domain, sort_order, is_active, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.name,
      data.url,
      data.description,
      data.icon || null,
      data.icon_name || null,
      data.category_id,
      data.tags ? JSON.stringify(data.tags) : null,
      domain,
      data.sort_order || 0,
      1, // 默认激活
      now
    ).run()

    return {
      id: result.meta.last_row_id,
      name: data.name,
      url: data.url,
      description: data.description,
      icon: data.icon,
      icon_name: data.icon_name,
      category_id: data.category_id,
      tags: data.tags,
      domain,
      sort_order: data.sort_order || 0,
      is_active: true,
      created_at: now
    }
  }

  /**
   * 更新链接
   */
  async updateLink(data: UpdateLinkRequest): Promise<boolean> {
    const now = Date.now()
    const updates: string[] = []
    const bindings: any[] = []

    if (data.name !== undefined) {
      updates.push('name = ?')
      bindings.push(data.name)
    }
    if (data.url !== undefined) {
      updates.push('url = ?')
      bindings.push(data.url)
      updates.push('domain = ?')
      bindings.push(extractDomain(data.url))
    }
    if (data.description !== undefined) {
      updates.push('description = ?')
      bindings.push(data.description)
    }
    if (data.icon !== undefined) {
      updates.push('icon = ?')
      bindings.push(data.icon)
    }
    if (data.icon_name !== undefined) {
      updates.push('icon_name = ?')
      bindings.push(data.icon_name)
    }
    if (data.category_id !== undefined) {
      updates.push('category_id = ?')
      bindings.push(data.category_id)
    }
    if (data.tags !== undefined) {
      updates.push('tags = ?')
      bindings.push(data.tags ? JSON.stringify(data.tags) : null)
    }
    if (data.sort_order !== undefined) {
      updates.push('sort_order = ?')
      bindings.push(data.sort_order)
    }
        if (data.is_active !== undefined) {
      updates.push('is_active = ?')
      bindings.push(data.is_active ? 1 : 0)
    }

    if (updates.length === 0) return false

    updates.push('updated_at = ?')
    bindings.push(now)
    bindings.push(data.id)

    const result = await this.db.prepare(`
      UPDATE navigation_links SET ${updates.join(', ')} WHERE id = ?
    `).bind(...bindings).run()

    return result.changes > 0
  }

  /**
   * 删除链接
   */
  async deleteLink(id: number): Promise<boolean> {
    const result = await this.db.prepare(
      'DELETE FROM navigation_links WHERE id = ?'
    ).bind(id).run()

    return result.changes > 0
  }
}

// 工具函数
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return ''
  }
}

// 导出单例实例
export const navigationService = new NavigationService()