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
    <tr v-for="user in allUsers" :key="user.id">
      <td class="col1">
        <input :value="user.first_name" :disabled="!user.isEditing" />
        <input :value="user.last_name" :disabled="!user.isEditing" />
      </td>
      <td class="col2">
        <input :value="user.email" :disabled="!user.isEditing" />
        <input :disabled="!user.isEditing" />
      </td>
      <td class="col3">
        <button type="submit" class="button-icon" v-if="user.isEditing">
          <!-- It must send post request to server to edit user data -->
          <PencilIcon />
          <span>Подтвердить</span>
        </button>
        <button
          type="button"
          class="button-icon"
          @click="editUser(user.id)"
          v-if="user.isEditing"
        >
          <UndoIcon />
          <span>Отменить</span>
        </button>
        <button
          type="button"
          class="button-icon"
          @click="editUser(user.id)"
          v-if="!user.isEditing"
        >
          <PencilIcon />
          <span>Редактировать</span>
        </button>
        <button
          title="Удалить пользователя"
          type="button"
          class="button-icon"
          @click="
            isDeleting = true;
            isBlackout = true;
            iteractionalUser = user;
          "
        >
          <DeleteIcon />
          <span>Удалить</span>
        </button>
      </td>
    </tr>
  </table>
  <!-- Code above includes modals, it needs to be totaly reworked -->
  <button
    id="blackout"
    v-show="isBlackout"
    @click="
      isBlackout = false;
      isDeleting = false;
    "
  ></button>
  <div v-show="isDeleting" class="dialog-table">
    <h2>
      Вы уверены что хотите удалить пользователя
      {{ iteractionalUser.first_name }} {{ iteractionalUser.last_name }}?
    </h2>
    <button class="button-icon" style="background-color: var(--wrong-color)">
      <DeleteIcon /><span>Удалить</span>
    </button>
    <button class="button-icon"><UndoIcon /><span>Отменить</span></button>
  </div>
</template>

<script>
import axios from "axios";
import AddUserIcon from "@/assets/icons/add-user-icon.vue";
import ImportFromFileIcon from "@/assets/icons/import-from-file-icon.vue";
import PencilIcon from "@/assets/icons/pencil-icon.vue";
import DeleteIcon from "@/assets/icons/delete-icon.vue";
import UndoIcon from "@/assets/icons/undo-icon.vue";

export default {
  data() {
    return {
      allUsers: [],
      isBlackout: false,
      isDeleting: false,
      iteractionalUser: {},
    };
  },
  components: {
    AddUserIcon,
    ImportFromFileIcon,
    PencilIcon,
    DeleteIcon,
    UndoIcon,
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
    editUser(user_id = this.user_id) {
      console.log(user_id);
      this.allUsers[user_id].isEditing = !this.allUsers[user_id].isEditing;
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
  width: 2.5em;
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
