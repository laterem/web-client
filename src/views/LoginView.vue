<template>
  <div id="content">
    <form @submit.prevent="login">
      <input v-model="email" type="text" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <br />
      <button type="submit">Log in</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      email: this.$session.exists()
        ? typeof this.$session.get("user") != "undefined"
          ? this.$session.get("user").email
          : ""
        : "",
      password: this.$session.exists()
        ? typeof this.$session.get("user") != "undefined"
          ? this.$session.get("user").password
          : ""
        : "",
    };
  },
  methods: {
    async login() {
      if (!this.$session.exists) {
        this.$session.start();
      }
      const { email, password } = this;
      const { data: id } = await axios.post("http://0.0.0.0:8179/login", {
        login: email,
        password: password,
      });
      this.$session.set("user_id", id);
      this.$store.commit("setUserId", id);
      router.push("/");
    },
  },
};
</script>

<style>
#content {
  position: absolute;
  top: 64px;
  bottom: 12px;
  left: 12px;
  right: 12px;

  padding-top: 12px;

  border-radius: 20px;
  box-shadow: 4px 4px 4px var(--content-shadow-color);
  background: var(--content-background-color);

  text-align: center;
}
</style>
