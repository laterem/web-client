<template>
  <div id="header">
    <div style="grid-column: 1">
      <span style="font-size: larger; margin-left: 5px"
        >Все пользователи сайта</span
      >
    </div>
    <div style="grid-column: 2">
      <button onclick="disp_dialog($('#import-users')[0])">
        <ImportFromFileIcon /> <span>Импорт</span>
      </button>
    </div>
    <div style="grid-column: 3">
      <button class="highlighted" onclick="disp_dialog($('#add-user')[0])">
        <AddUserIcon /> <span>Добавить</span>
      </button>
    </div>
  </div>

  <table id="content-table">
    <!-- Here goes iteration for users in all users, needs Django API -->
    <tr v-for="user in allUsers" :key="user.id">
      <td class="col1">
        <input
          :value="user.first_name"
          class="edit-user-{{user.id}}"
          disabled="true"
          name="user_name"
        />
        <input
          :value="user.last_name"
          class="edit-user-{{user.id}}"
          disabled="true"
          name="user_lastname"
        />
      </td>
      <td class="col2">
        <input
          :value="user.email"
          class="edit-user-{{user.id}}"
          disabled="true"
          name="user_email"
        />
        <input
          class="edit-user-{{user.id}}"
          disabled="true"
          name="user_password"
        />
        <button style="visibility: hidden" name="edit:{{user.email}}"></button>
      </td>
      <td class="col3">
        <button
          id="edit_button"
          type="submit"
          name="edit:{{user.email}}"
          class="edit-user-{{user.id}}-confirm button-icon"
          onclick="data_edit(this)"
          style="display: none"
        >
          <PencilIcon />
          <span>Редактировать</span>
        </button>
        <button
          id="edit_button"
          type="button"
          name="edit:{{user.email}}"
          class="edit-user-{{user.id}}-undo button-icon"
          onclick="data_edit(this)"
          style="display: none"
        >
          <div style="width: 1.5em">{% include "icons/undo-icon.html" %}</div>
        </button>
        <button
          id="edit_button"
          type="button"
          name="edit:{{user.email}}"
          class="edit-user-{{user.id}}-edit button-icon"
          onclick="data_edit(this)"
        >
          <PencilIcon />
          <span>Редактировать</span>
        </button>
        <button
          title="Удалить пользователя"
          name="delete:{{user.email}}"
          type="button"
          class="button-icon"
          onclick="delete_signal_to_send=this.name; $('#confirm-user-deleting-massage')[0].innerHTML = 'Вы уверены что хотите удалить пользователя ' + this.name.slice(this.name.indexOf(':') + 1) + '?'; $('#confirm-user-deleting-button')[0].name = this.name; disp_dialog($('#delete-user-confirm'))"
        >
          <DeleteIcon />
          <span>Удалить</span>
        </button>
      </td>
    </tr>
  </table>
  <!-- Code above includes modals, it needs to be totaly reworked -->
  <!-- <button id="blackout" style="display: none;" onclick="disp_dialog([$('#add-user'), $('#import-users')])"></button>
  {% include "./add_user.html" %}
  {% include "./import_users.html" %}
  <form method="post">
      {% csrf_token %}
      <table id="delete-user-confirm" class="dialog-table" style="display: none;">
          <tr><td colspan="2" id="confirm-user-deleting-massage">Вы уверены что хотите удалить пользователя?</td></tr>
          <tr>
              <td style="display: grid; justify-items: end;"><button id="confirm-user-deleting-button" type="submit" class="wrong">Подтвердить</button></td>
              <td><button type="button" onclick="disp_dialog($('#delete-user-confirm'))">Отменить</button></td>
          </tr>
      </table>
  </form> -->
</template>

<script>
import axios from "axios";
import AddUserIcon from "@/assets/icons/add-user-icon.vue";
import ImportFromFileIcon from "@/assets/icons/import-from-file-icon.vue";
import PencilIcon from "@/assets/icons/pencil-icon.vue";
import DeleteIcon from "@/assets/icons/delete-icon.vue";

export default {
  data() {
    return {
      allUsers: [],
    };
  },
  components: {
    AddUserIcon,
    ImportFromFileIcon,
    PencilIcon,
    DeleteIcon,
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
    async getAllUsers(user_id = this.user_id) {
      const { data: allUsers } = await axios.post(
        "http://0.0.0.0:8179/get_all_users",
        {
          id: user_id,
        }
      );
      this.allUsers = allUsers;
      return allUsers;
    },
  },
  created() {
    this.getAllUsers(this.getUser());
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: var(--body-font-color);
}

button {
  background-color: var(--button-icon-background-color);
  padding: 0.5em;
  text-align: center;
  align-items: center;
  text-decoration: none;
  display: inline-flex;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 20px;
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
  border-radius: 0 0 12px 12px;
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
  width: 30em;
  justify-items: right;
  display: grid;
  grid-template-columns: auto min-content;
  margin-right: 4px;
}

tr:hover button.button-icon {
  opacity: 1;
}

.button-icon {
  width: 2.5em;
  height: 2.5em;
  align-items: baseline;
  white-space: nowrap;
  overflow: hidden;
  justify-items: center;
  display: inline-grid;
  grid-template-columns: 1.5em auto;
  transition: width 1.5s ease-in-out 0.5s;
  /* transition: opacity 0.5s ease-in-out; */
  justify-self: end;
  opacity: 0;
}

.button-icon > span {
  opacity: 0;
  transform: translateX(12em);
  transition: all 1s ease-in-out 0.75s;
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
