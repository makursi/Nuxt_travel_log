Nuxt 官方提供了一套约定式目录结构，你只需要把文件放在对的地方，它就自动生效：
API 路由 (Controllers)
位置: server/api/<path>.ts
映射: server/api/users/list.ts -> GET /api/users/list
// server/api/users/list.ts

    export default defineEventHandler(() => {
    return [{ id: 1, name: 'Alice' }]; // 自动转为 JSON 响应
    });
