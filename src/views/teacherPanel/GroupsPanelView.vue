<template>
  <div id="header">
    <div style="grid-column: 1">
      <span style="font-size: larger; margin-left: 4px">Все группы</span>
    </div>
    <div style="grid-column: 2">
      <button class="highlighted">
        <AddGroupIcon />
        <span>Добавить</span>
      </button>
    </div>
  </div>
  <table id="content-table">
    <tr v-for="group in allGroups" :key="group.id">
      <td>
        <RouterLink :to="group.id">{{ group.name }}</RouterLink>
      </td>
    </tr>
  </table>
</template>

<script>
import AddGroupIcon from "@/assets/icons/add-group-icon.vue";
import axios from "axios";

export default {
  data() {
    return {
      allGroups: [],
    };
  },
  components: {
    AddGroupIcon,
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
    async getAllGroups(user_id = this.user_id) {
      const { data: allGroups } = await axios.post(
        "http://0.0.0.0:8179/get_all_groups",
        {
          id: user_id,
        }
      );
      this.allGroups = allGroups;
      return allGroups;
    },
  },
  created() {
    this.getAllGroups(this.getUser());
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--body-font-color);
}

h2 {
  margin: 12px;
}

h5 {
  margin: 4px;
}

button {
  background-color: var(--button-icon-background-color);
  padding: 0.5em 1em 0.5em 1em;
  text-align: center;
  align-items: center;
  text-decoration: none;
  display: inline-flex;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
  height: fit-content;
}

button.highlighted {
  background-color: var(--button-background-color);
}

div#header,
table#content-table {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;

  overflow: hidden;

  border: none;
}

table#content-table {
  top: 52px;
  border-radius: 0 0 16px 16px;
  border-spacing: 0;
}

#content-table > tr {
  width: 100%;
}

div#header {
  display: grid;
  grid-template-columns: auto max-content max-content;
  top: 0;
}

#header > *,
#header span {
  display: inline-flex;
  align-items: center;
  padding: 4px;
}

#content-table > *,
#content-table span {
  display: flex;
  padding: 4px;
  border-collapse: collapse;
}

#content-table span {
  display: inline-flex;
}

#content-table > *:nth-child(odd) {
  background-color: var(--content-hover-color);
}

.col1,
.col2 {
  width: calc(100% - 5em);
}

.col3 {
  white-space: nowrap;
  width: 37em;
  justify-items: right;
  display: grid;
  grid-template-columns: auto min-content min-content;
  margin-right: 4px;
}

tr:hover button.button-icon {
  opacity: 1;
}

.button-icon {
  width: 3.5em;
  height: 2.5em;
  align-items: baseline;
  white-space: nowrap;
  overflow: hidden;
  justify-items: center;
  display: inline-grid;
  grid-template-columns: 1.5em auto;
  transition: width 80ms ease-in-out 360ms;
}

tr .button-icon {
  justify-self: end;
  opacity: 0;
}

.button-icon > span {
  opacity: 0;
  transform: translateX(12em);
  transition: all 40ms ease-in-out 380ms;
}

.button-icon:hover {
  width: 12em;
  background-color: var(--button-background-color);
}

.button-icon:hover > span {
  opacity: 1;
  transform: translateX(0);
}
</style>
