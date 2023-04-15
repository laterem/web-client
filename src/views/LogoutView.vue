<template>
  <h1>Вы успешно вышли из аккаунта</h1>
</template>

<script>
import router from "@/router";

export default {
  created() {
    this.$session.destroy();
    this.$store.commit("setUserId", -1);
    router.push("/login");
  },
};
</script>
