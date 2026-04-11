import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";
//   定义和auth 有关的全局状态管理
//   根据better auth 官方配置

// 连接Better Auth后端接口
const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  // 保存当前登录状态
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(
    null,
  );

  // 初始化时加载 session
  //  init 函数的核心作用是：在应用启动或组件挂载时
  // 主动触发一次对用户当前会话状态的检查
  // 并将结果存入 Pinia Store 的响应式状态中。
  // init()在页面顶层布局中调用,用户一加载首页就检查是否登录
  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }
  const user = computed(
    () =>
      //  安全访问 ，避免 data 为 undefined 时出错
      session.value?.data?.user,
  );
  const loading = computed(() => session.value?.isPending);

  //  使用nuxt-csrf去发送 csrf token,然后发送token
  const signIn = async () => {
    const { csrf } = useCsrf();
    // 请求头上添加csrf-token
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    //
    await authClient.signIn.social({
      provider: "github",
      //  前端设置重定向页面
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  };

  // csrf安全的登出
  async function signOut() {
    const { csrf } = useCsrf();
    const headers = new Headers();
    headers.append("csrf-token", csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });

    // 登出用户后返回home page
    navigateTo("/");
  }
  return {
    init,
    loading,
    signIn,
    signOut,
    user,
  };
});
