// 网址导航相关类型定义

export interface NavigationCategory {
  id: string
  name: string
  description?: string
  icon?: string
  sort_order: number
  is_active: boolean
  created_at: number
  updated_at?: number
}

export interface NavigationLink {
  id: number
  name: string
  url: string
  description: string
  icon?: string
  icon_name?: string
  category_id: string
  tags?: string[]
  domain: string
  sort_order: number
  click_count: number
  is_active: boolean
  created_at: number
  updated_at?: number
}

export interface NavigationLinkWithCategory extends NavigationLink {
  category: NavigationCategory
}

export interface CreateLinkRequest {
  name: string
  url: string
  description: string
  icon?: string
  icon_name?: string
  category_id: string
  tags?: string[]
  sort_order?: number
}

export interface UpdateLinkRequest extends Partial<CreateLinkRequest> {
  id: number
  click_count?: number
  is_active?: boolean
}

export interface CreateCategoryRequest {
  name: string
  description?: string
  icon?: string
  sort_order?: number
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string
  is_active?: boolean
}

export interface NavigationStats {
  totalLinks: number
  totalCategories: number
  totalClicks: number
  lastUpdated: number
}

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 查询参数类型
export interface GetLinksParams {
  category?: string
  search?: string
  limit?: number
  offset?: number
  sort?: 'name' | 'created_at' | 'click_count' | 'sort_order'
  order?: 'asc' | 'desc'
  is_active?: boolean
}

export interface GetCategoriesParams {
  is_active?: boolean
  sort?: 'name' | 'sort_order' | 'created_at'
  order?: 'asc' | 'desc'
}