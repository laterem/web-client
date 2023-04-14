<template>
  {{ workData }}
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      workData: "",
    };
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
    async getWorkData(
      user_id = this.user_id,
      work_id = this.$route.currentRoute._value.params["id"]
    ) {
      const { data: workData } = await axios.post(
        "http://0.0.0.0:8179/get_work_data",
        {
          id: user_id,
          work_id: work_id,
        }
      );
      this.workData = workData;
      return workData;
    },
  },
  created() {
    // get data from api
    this.getWorkData(
      this.getUser(),
      this.$router.currentRoute.value.params["id"]
    );

    this.$watch(
      () => this.$route.params,
      (toParams) => {
        // react to route changes...
        this.getWorkData(toParams);
      }
    );
  },
};
</script>
