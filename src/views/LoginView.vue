<template>
  <aside id="menu"></aside>
  <aside id="content">
    <div id="content">
      <form @submit.prevent="login">
        <input v-model="email" type="text" placeholder="email" />
        <input v-model="password" type="password" placeholder="password" />
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  </aside>
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
      const {
        data: { user },
      } = await axios.post("http://0.0.0.0:8179/login", {
        login: email,
        password: password,
      });
      this.$session.set("user", user);
      router.push("/");
    },
  },
};
</script>
