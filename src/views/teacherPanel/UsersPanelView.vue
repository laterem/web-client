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

  <div id="content-table">
    <!-- Here goes iteration for users in all users, needs Django API -->
    <template v-for="user in allUsers" :key="user.id">
      <div style="grid-column: 1; border-left: none" class="user-table-element">
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
      </div>
      <div style="grid-column: 2" class="user-table-element">
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
      </div>
      <div style="grid-column: 3; padding: 0" class="user-table-element">
        <form method="post">
          <button
            id="edit_button"
            type="submit"
            name="edit:{{user.email}}"
            class="edit-user-{{user.id}}-confirm button-icon"
            onclick="data_edit(this)"
            style="display: none"
          >
            <div style="width: 1.5em">
              <PencilIcon />
            </div>
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
            style="display: inline-flex"
          >
            <div style="width: 1.5em">
              <PencilIcon />
            </div>
          </button>
        </form>
      </div>
      <div
        style="grid-column: 4; padding: 0; border-left: none"
        class="user-table-element"
      >
        <form method="post">
          <button
            title="Удалить пользователя"
            name="delete:{{user.email}}"
            type="button"
            class="button-icon"
            onclick="delete_signal_to_send=this.name; $('#confirm-user-deleting-massage')[0].innerHTML = 'Вы уверены что хотите удалить пользователя ' + this.name.slice(this.name.indexOf(':') + 1) + '?'; $('#confirm-user-deleting-button')[0].name = this.name; disp_dialog($('#delete-user-confirm'))"
          >
            <div style="width: 1.5em; padding: 0">
              <DeleteIcon />
            </div>
          </button>
        </form>
      </div>
    </template>
  </div>
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
div#content-table {
  display: grid;
  position: absolute;
  left: 0;
  right: 0;

  overflow: hidden;

  border: none;
}

div#content-table {
  grid-template-columns: auto auto max-content 40px;
  top: 52px;
  border-radius: 0 0 12px 12px;
}

div#header {
  grid-template-columns: auto max-content max-content;
  top: 0;
}

#header > *,
#header span {
  display: inline-flex;
  align-items: center;
  padding: 4px;
}

#content-table > * {
  display: flex;
  padding: 4px;
  border-collapse: collapse;
}

#content-table > *:nth-of-type(8n + 4),
#content-table > *:nth-of-type(8n + 1),
#content-table > *:nth-of-type(8n + 2),
#content-table > *:nth-of-type(8n + 3) {
  background-color: var(--content-hover-color);
}
</style>
