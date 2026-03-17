import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();
//   定义和auth 有关的全局状态管理
export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(
    null,
  );

  // 初始化时加载 session
  //  init 函数的核心作用是：在应用启动或组件挂载时，主动触发一次对用户当前会话状态的检查，并将结果存入 Pinia Store 的响应式状态中。
  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }
  const user = computed(
    () =>
      //  安全访问 session.value.data.user，避免 data 为 undefined 时出错
      session.value?.data?.user,
  );
  const loading = computed(() => session.value?.isPending);
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      //  前端设置重定向页面
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
  };

  async function signOut() {
    await authClient.signOut();
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
