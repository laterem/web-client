<template>
  <h1>Вы успешно вышли из аккаунта</h1>
</template>

<script>
import router from "@/router";

export default {
  created() {
    this.$session.destroy();
    router.push("/login");
  },
};
</script>
