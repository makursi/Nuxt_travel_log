# Session 登录验证全过程（极简版）
用户输入账号密码 / GitHub 授权
后端验证成功，创建一条session（会话）
后端把sessionId 存入 Cookie 发给浏览器
浏览器以后每次请求自动带上 Cookie
后端通过 Cookie 里的 sessionId 查到对应的用户
知道 “你是谁”，判断你已登录
退出登录 → 销毁 session + 清除 Cookie

1. 未登录时的event机构(JSON)

    {
      "context": {
        "user": null,  // 没有登录 → user 是 null
        "params": {},
        "query": {}
      },
      "path": "/api/locations",
      "method": "POST",
      "headers": {
        "host": "localhost:3000",
        "cookie": "session=abc123..."
      },
      "_handler": "[Function]",
      "request": {
        "url": "/api/locations",
        "method": "POST"
      }
    }

2.  登录后的 event 结构（JSON)

defineAuthenticatedEventHandler 里拿到

    {
      "context": {
        // 核心！！！Better Auth 自动放进来的
        "user": {
          "id": "user_123",
          "name": "张三",
          "email": "test@example.com",
          "image": "https://github.com/xxx.png"
        },
        "params": {},
        "query": {}
      },
      "path": "/api/locations",
      "method": "POST",
      "headers": {
        "host": "localhost:3000",
        "cookie": "better-auth.session=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      },
      "request": {
        "url": "/api/locations",
        "method": "POST"
      }
    }
