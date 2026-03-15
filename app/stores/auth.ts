import { createAuthClient } from "better-auth/client";
import { defineStore } from "pinia";

const authClient = createAuthClient();
//   定义和auth 有关的全局状态管理
export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);
  const signIn = async () => {
    loading.value = true;
    await authClient.signIn.social({
      provider: "github",
      //  前端设置重定向页面
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
    loading.value = false;
  };

  return {
    loading,
    signIn,
  };
});
