<template>
  <nav class="navbar bg-primary">
    <a href="" class="navbar-brand text-white">
      <img
        src="@/assets/logo.png"
        alt="Vue Logo"
        height="24"
        class="d-inline-block align-text-top mx-2"
        srcset=""
      />
      {{ username }}
    </a>
    <div class="d-flex">
      <button @click="onLogOut" class="btn btn-outline-info mx-2">
        <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";
import useAuth from "@/modules/auth/composables/useAuth";
export default {
  setup() {
    const router = useRouter();
    const { username, logout } = useAuth();

    return {
      username,
      onLogOut: () => {
        router.push({ name: "login" });
        logout();
      },
    };
  },
};
</script>
