-- 导航网站数据库初始化脚本

-- 创建分类表
CREATE TABLE IF NOT EXISTS navigation_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER
);

-- 创建链接表
CREATE TABLE IF NOT EXISTS navigation_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  icon_name TEXT,
  category_id TEXT NOT NULL,
  tags TEXT,  -- JSON 格式存储
  domain TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER,
  FOREIGN KEY (category_id) REFERENCES navigation_categories(id) ON DELETE CASCADE
);

-- 创建索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_navigation_links_category_id ON navigation_links(category_id);
CREATE INDEX IF NOT EXISTS idx_navigation_links_is_active ON navigation_links(is_active);
CREATE INDEX IF NOT EXISTS idx_navigation_links_sort_order ON navigation_links(sort_order);
CREATE INDEX IF NOT EXISTS idx_navigation_links_created_at ON navigation_links(created_at);
CREATE INDEX IF NOT EXISTS idx_navigation_links_domain ON navigation_links(domain);

CREATE INDEX IF NOT EXISTS idx_navigation_categories_is_active ON navigation_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_navigation_categories_sort_order ON navigation_categories(sort_order);

-- 插入默认分类数据
INSERT OR IGNORE INTO navigation_categories (id, name, description, icon, sort_order, is_active, created_at) VALUES
('dev', '开发工具', '编程开发相关的工具和资源', 'i-heroicons-code-bracket', 1, 1, strftime('%s', 'now')),
('design', '设计资源', 'UI/UX设计相关资源和工具', 'i-heroicons-palette', 2, 1, strftime('%s', 'now')),
('productivity', '效率工具', '提高工作效率的工具和应用', 'i-heroicons-rocket-launch', 3, 1, strftime('%s', 'now')),
('learning', '学习资源', '在线学习平台和教育资源', 'i-heroicons-academic-cap', 4, 1, strftime('%s', 'now')),
('entertainment', '娱乐休闲', '娱乐、视频、音乐等休闲网站', 'i-heroicons-tv', 5, 1, strftime('%s', 'now')),
('news', '新闻资讯', '科技、行业新闻和资讯网站', 'i-heroicons-newspaper', 6, 1, strftime('%s', 'now')),
('social', '社交媒体', '社交网络和社区平台', 'i-heroicons-users', 7, 1, strftime('%s', 'now')),
('tools', '实用工具', '各种实用的在线工具和网站', 'i-heroicons-wrench-screwdriver', 8, 1, strftime('%s', 'now'));

-- 插入示例链接数据
INSERT OR IGNORE INTO navigation_links (name, url, description, icon, category_id, tags, domain, sort_order, is_active, created_at) VALUES
-- 开发工具
('GitHub', 'https://github.com', '全球最大的代码托管平台和开源社区', 'https://github.com/favicon.ico', 'dev', '["代码托管", "开源", "版本控制"]', 'github.com', 1, 1, strftime('%s', 'now')),
('Stack Overflow', 'https://stackoverflow.com', '程序员问答社区，解决编程问题的最佳平台', 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico', 'dev', '["问答", "编程", "技术"]', 'stackoverflow.com', 2, 1, strftime('%s', 'now')),
('MDN Web Docs', 'https://developer.mozilla.org', 'Web 技术文档，包括 HTML、CSS、JavaScript 等', 'https://developer.mozilla.org/favicon-48x48.png', 'dev', '["文档", "Web技术", "学习"]', 'developer.mozilla.org', 3, 1, strftime('%s', 'now')),
('CodePen', 'https://codepen.io', '在线代码编辑器，前端开发者的 playground', 'https://cpwebassets.codepen.io/assets/favicon/favicon-touch-de50acbf5d634ec6791894eba4ba9cf490f709b3d742597c6fc4b734e6492a5a.png', 'dev', '["在线编辑", "前端", "展示"]', 'codepen.io', 4, 1, strftime('%s', 'now')),
('VS Code', 'https://code.visualstudio.com', '微软开发的免费代码编辑器', 'https://code.visualstudio.com/favicon.ico', 'dev', '["编辑器", "IDE", "微软"]', 'code.visualstudio.com', 5, 1, strftime('%s', 'now')),

-- 设计资源
('Figma', 'https://www.figma.com', '协作式界面设计工具，支持实时协作', 'https://static.figma.com/app/icon/1/favicon.ico', 'design', '["UI设计", "协作", "原型"]', 'figma.com', 1, 1, strftime('%s', 'now')),
('Unsplash', 'https://unsplash.com', '免费高质量图片素材库', 'https://unsplash.com/favicon.ico', 'design', '["图片", "免费", "素材"]', 'unsplash.com', 2, 1, strftime('%s', 'now')),
('Dribbble', 'https://dribbble.com', '设计师作品展示和交流平台', 'https://cdn.dribbble.com/assets/dribbble-ball-icon-1e8c7a47e43585e5a858b639a78659aa090694a78e7491defe21451775c81e65.png', 'design', '["设计", "作品", "灵感"]', 'dribbble.com', 3, 1, strftime('%s', 'now')),
('Canva', 'https://www.canva.com', '在线平面设计工具，简单易用', 'https://www.canva.com/favicon.ico', 'design', '["平面设计", "在线工具", "模板"]', 'canva.com', 4, 1, strftime('%s', 'now')),

-- 效率工具
('Notion', 'https://www.notion.so', 'All-in-one 工作空间，笔记、项目管理、知识库', 'https://www.notion.so/images/favicon.ico', 'productivity', '["笔记", "项目管理", "协作"]', 'notion.so', 1, 1, strftime('%s', 'now')),
('Trello', 'https://trello.com', '可视化项目管理工具，基于看板方法', 'https://trello.com/favicon.ico', 'productivity', '["项目管理", "看板", "协作"]', 'trello.com', 2, 1, strftime('%s', 'now')),
('Slack', 'https://slack.com', '团队协作和沟通平台', 'https://slack.com/favicon.ico', 'productivity', '["团队协作", "沟通", "办公"]', 'slack.com', 3, 1, strftime('%s', 'now')),

-- 学习资源
('Coursera', 'https://www.coursera.org', '在线课程平台，与顶级大学合作提供课程', 'https://www.coursera.org/favicon.ico', 'learning', '["在线课程", "大学", "证书"]', 'coursera.org', 1, 1, strftime('%s', 'now')),
('Khan Academy', 'https://www.khanacademy.org', '免费在线教育平台，涵盖各种学科', 'https://cdn.kastatic.org/images/favicon.ico', 'learning', '["免费教育", "数学", "科学"]', 'khanacademy.org', 2, 1, strftime('%s', 'now')),
('edX', 'https://www.edx.org', '来自顶尖大学和机构的在线课程', 'https://www.edx.org/favicon.ico', 'learning', '["在线课程", "大学", "MOOC"]', 'edx.org', 3, 1, strftime('%s', 'now')),

-- 娱乐休闲
('YouTube', 'https://www.youtube.com', '全球最大的视频分享平台', 'https://www.youtube.com/favicon.ico', 'entertainment', '["视频", "娱乐", "学习"]', 'youtube.com', 1, 1, strftime('%s', 'now')),
('Netflix', 'https://www.netflix.com', '流媒体视频服务平台', 'https://www.netflix.com/favicon.ico', 'entertainment', '["流媒体", "电影", "电视剧"]', 'netflix.com', 2, 1, strftime('%s', 'now')),
('Spotify', 'https://www.spotify.com', '音乐流媒体服务平台', 'https://www.scdn.co/favicons/favicon.ico', 'entertainment', '["音乐", "流媒体", "播客"]', 'spotify.com', 3, 1, strftime('%s', 'now')),

-- 新闻资讯
('Hacker News', 'https://news.ycombinator.com', '技术新闻和讨论社区', null, 'news', '["技术新闻", "讨论", "创业"]', 'news.ycombinator.com', 1, 1, strftime('%s', 'now')),
('TechCrunch', 'https://techcrunch.com', '科技新闻和创业资讯', 'https://techcrunch.com/favicon.ico', 'news', '["科技新闻", "创业", "投资"]', 'techcrunch.com', 2, 1, strftime('%s', 'now')),
('Reddit', 'https://www.reddit.com', '社交新闻聚合网站', 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png', 'news', '["社交新闻", "讨论", "社区"]', 'reddit.com', 3, 1, strftime('%s', 'now')),

-- 社交媒体
('Twitter', 'https://twitter.com', '实时信息和社交网络平台', 'https://abs.twimg.com/favicons/twitter.ico', 'social', '["社交", "实时信息", "微博"]', 'twitter.com', 1, 1, strftime('%s', 'now')),
('LinkedIn', 'https://www.linkedin.com', '职业社交网络平台', 'https://static.linkedin.com/sc/h/2a0gkob6q8g2iq0a9xhq5i7oy', 'social', '["职业社交", "招聘", "商务"]', 'linkedin.com', 2, 1, strftime('%s', 'now')),
('Instagram', 'https://www.instagram.com', '图片和视频分享社交平台', 'https://static.cdninstagram.com/rsrc.php/v3/yt/r/30CzF7r7hA1.png', 'social', '["图片分享", "视频", "社交"]', 'instagram.com', 3, 1, strftime('%s', 'now')),

-- 实用工具
('Google', 'https://www.google.com', '全球最大的搜索引擎', 'https://www.google.com/favicon.ico', 'tools', '["搜索", "工具", "生活服务"]', 'google.com', 1, 1, strftime('%s', 'now')),
('ChatGPT', 'https://chat.openai.com', 'OpenAI 开发的 AI 聊天助手', 'https://openai.com/favicon.ico', 'tools', '["AI", "聊天", "助手"]', 'openai.com', 2, 1, strftime('%s', 'now')),
('GitHub Copilot', 'https://github.com/features/copilot', 'AI 代码助手', 'https://github.com/favicon.ico', 'tools', '["AI", "代码助手", "编程"]', 'github.com', 3, 1, strftime('%s', 'now'));