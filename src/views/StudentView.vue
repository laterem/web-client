Here must be NavTree but it needs users
<template>
  <aside id="menu">
    <NavTree :work-tree="workTree" />
  </aside>
  <aside id="content">
    <h2>Это базовая страница</h2>
    <h3>Перейдите на нужную работу по ссылке слева</h3>
  </aside>
</template>

<script>
import axios from "axios";
import NavTree from "../components/NavTree.vue";

export default {
  data() {
    return {
      workTree: {}
    }
  },
  components: {
    NavTree,
  },
  methods: {
    getUser() {
      if (!this.$session.exists) {
        this.$session.start();
      }
      const user_id = this.$session.get("user_id");
      if (typeof user_id != "undefined") {
        return user_id;
      }
      return -1;
    },
    async getWorkTree(user_id = this.user_id) {
      if (user_id == -1) {
        return "Not Logged in";
      }
      const { data: work_tree } = await axios.post("http://0.0.0.0:8179/get_student_worktree", {
        id: user_id,
      });
      this.workTree = work_tree;
      return work_tree;
    },
  },
  created() {
    this.getWorkTree(this.getUser());
  },
};
</script>
