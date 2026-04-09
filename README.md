
# ⚠️提醒: 
# 项目使用Turso Cloud 时使用Mac/Linux/WSL安装Turso CLI 工具
# 2.由于Nuxt社区依赖Vee-Validate 与 better auth 具有依赖冲突, 且目前Vee-Validate v.4.15 不支持 Zod 4 版本, 故按照Vee-Validate 官方版本迁移指南进行迁移, 个人测试 Vee-validate beta版本现阶段可以搭配Zod , yup , vailbot 最新版使用.


## Nuxt Travel Log
一个基于 Nuxt 4 构建的现代化旅行日志应用，用于记录和管理您的旅行足迹。

## 项目简介

这是一个功能丰富的旅行日志应用，支持 GitHub OAuth 登录、交互式地图、旅行地点管理、深色/浅色主题切换等功能。项目采用了现代前端技术栈，包括 Nuxt 4、Pinia 状态管理、Drizzle ORM、SQLite 数据库、Tailwind CSS 和 DaisyUI。




### 核心框架

- **Nuxt 4.3.1** - Vue 全栈框架，提供 SSR、自动导入、文件路由等功能
- **Vue 3.5.28** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的 JavaScript 超集

### 数据库

- **SQLite** - 轻量级关系型数据库
- **Drizzle ORM** - 类型安全的 TypeScript ORM
- **Drizzle Kit** - 数据库迁移和管理工具

### 状态管理与表单

- **Pinia 3.0.4** - Vue 官方推荐的状态管理库
- **Vee-Validate 5 beta** - 表单验证库
- **Zod 4.3.6** - TypeScript 优先的模式声明和验证库

### 样式与 UI

- **Tailwind CSS 4.2.0** - 实用优先的 CSS 框架
- **DaisyUI 5.5.19** - 基于 Tailwind CSS 的 UI 组件库
- **@nuxtjs/color-mode** - 深色/浅色主题切换

### 认证与安全

- **Better Auth** - 现代化的身份认证库
- **GitHub OAuth** - 第三方登录
- **nuxt-csurf** - CSRF 防护

### 地图功能

- **nuxt-maplibre** - MapLibre GL 的 Nuxt 集成

### 开发工具

- **ESLint** - 代码质量检查工具
- **Husky** - Git hooks 工具
- **lint-staged** - 暂存文件的 lint 工具
- **@nuxt/icon** - 图标组件

## 项目结构

```
Nuxt_travel_log/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # 全局样式
│   ├── components/                # Vue 组件
│   │   ├── app/
│   │   │   ├── form.field.vue    # 表单字段组件
│   │   │   ├── map.client.vue    # 地图组件
│   │   │   ├── nav-bar.vue       # 导航栏组件
│   │   │   └── theme-toggle.vue  # 主题切换组件
│   │   ├── auth-button.vue       # 认证按钮
│   │   └── sidebar-button.vue    # 侧边栏按钮
│   ├── layouts/
│   │   └── default.vue            # 默认布局
│   ├── lib/
│   │   ├── db/
│   │   │   ├── queries/           # 数据库查询
│   │   │   │   └── location.ts
│   │   │   ├── schema/            # 数据库表结构
│   │   │   │   ├── auth.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── location-log-image.ts
│   │   │   │   ├── location-log.ts
│   │   │   │   └── location.ts
│   │   │   └── index.ts           # 数据库连接
│   │   ├── migrations/            # 数据库迁移文件
│   │   ├── auth.ts                # 认证配置
│   │   ├── constant.ts            # 常量定义
│   │   ├── env.ts                 # 环境变量配置
│   │   ├── try-parse-env.ts       # 环境变量解析
│   │   └── type.ts                # TypeScript 类型定义
│   ├── pages/                     # 页面路由
│   │   ├── dashboard/
│   │   │   ├── add.vue            # 添加地点页面
│   │   │   └── index.vue          # 仪表盘首页
│   │   ├── dashboard.vue          # 仪表盘布局
│   │   ├── error.vue              # 错误页面
│   │   ├── index.vue              # 首页
│   │   └── sign-out.vue           # 登出页面
│   ├── stores/                    # Pinia 状态管理
│   │   ├── auth.ts                # 认证状态
│   │   ├── locations.ts           # 地点状态
│   │   ├── map.ts                 # 地图状态
│   │   └── sidebar.ts             # 侧边栏状态
│   ├── utils/
│   │   └── define-authenticated-evet-handler.ts  # 认证事件处理器
│   └── app.vue                    # 根组件
├── server/
│   ├── api/                       # API 路由
│   │   ├── [...auth].ts           # 认证 API
│   │   ├── locations.get.ts       # 获取地点列表
│   │   └── locations.post.ts      # 创建地点
│   ├── middleware/
│   │   └── auth.ts                # 认证中间件
│   └── server.md
├── public/                        # 静态资源
│   ├── favicon.ico
│   └── robots.txt
├── .gitignore
├── drizzle.config.ts              # Drizzle 配置
├── eslint.config.mjs              # ESLint 配置
├── nuxt.config.ts                 # Nuxt 配置
├── package.json                   # 项目依赖
├── tsconfig.json                  # TypeScript 配置
└── travel_log_database            # SQLite 数据库文件
```

## 主要功能

### 1. 用户认证

- GitHub OAuth 登录
- 会话管理
- 安全登出

### 2. 旅行地点管理

- 添加新的旅行地点（名称、描述、经纬度）
- 查看所有地点列表
- 地点数据验证
- 自动生成唯一标识（slug）

### 3. 地图交互

- 交互式地图展示
- 地图客户端渲染优化
- 地点在地图上的标记

### 4. UI/UX 特性

- 深色/浅色主题切换
- 响应式设计
- 优雅的加载状态
- 侧边栏导航

## 环境变量

项目需要配置以下环境变量（创建 `.env` 文件）：

```env
# 数据库配置
DB_FILE_NAME=./travel_log_database

# GitHub OAuth 配置
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## 安装说明

### 前置要求

- Node.js >= 18.x
- npm 或其他包管理器

### 安装依赖

```bash
# 使用 npm
npm install
```

### 配置环境变量

1. 复制 `.env.example` 为 `.env`（如果有）或创建新的 `.env` 文件
2. 配置必要的环境变量

### 数据库初始化

```bash
# 生成数据库迁移
npm run db:generate

# 执行数据库迁移
npm run db:migrate

# 或直接推送 schema 到数据库
npm run db:push
```

## 使用说明

### 开发模式

启动开发服务器：

```bash
npm run dev
```

访问 `http://localhost:3000` 查看应用。

### 生产构建

构建生产版本：

```bash
npm run build
```

预览生产构建：

```bash
npm run preview
```

### 数据库管理

```bash
# 打开 Drizzle Studio 进行可视化数据库管理
npm run db:studio

# 生成新的迁移
npm run db:generate

# 应用迁移
npm run db:migrate
```

### 代码质量检查

```bash
# 运行 ESLint 检查
npm run lint

# 自动修复代码问题
npm run lint:fix
```

## 开发命令说明

| 命令                  | 说明                 |
| --------------------- | -------------------- |
| `npm run dev`         | 启动开发服务器       |
| `npm run build`       | 构建生产版本         |
| `npm run generate`    | 生成静态站点         |
| `npm run preview`     | 预览生产构建         |
| `npm run lint`        | 运行 ESLint 检查     |
| `npm run lint:fix`    | 自动修复 ESLint 问题 |
| `npm run db:generate` | 生成数据库迁移       |
| `npm run db:push`     | 推送 schema 到数据库 |
| `npm run db:migrate`  | 执行数据库迁移       |
| `npm run db:studio`   | 打开 Drizzle Studio  |

---
