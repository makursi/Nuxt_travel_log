import { createAuthClient } from "better-auth/vue";
import { defineStore } from "pinia";

const authClient = createAuthClient();
//   定义和auth 有关的全局状态管理
export const useAuthStore = defineStore("useAuthStore", () => {
  const session = authClient.useSession();
  const user = computed(() => {
    //  安全访问 session.value.data.user，避免 data 为 undefined 时出错
    return session.value.data?.user;
  });
  const loading = computed(
    () => session.value.isPending || session.value.isRefetching,
  );
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
    loading,
    signIn,
    signOut,
    user,
  };
});
