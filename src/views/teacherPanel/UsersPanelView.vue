<template>
  <div id="header">
    <div style="grid-column: 1">
      <span style="font-size: larger; margin-left: 5px"
        >Все пользователи сайта</span
      >
    </div>
    <div style="grid-column: 2">
      <button
        @click="
          isImporting = true;
          isBlackout = true;
        "
      >
        <ImportFromFileIcon />
        <span>Импорт</span>
      </button>
    </div>
    <div style="grid-column: 3">
      <button
        @click="
          isAdding = true;
          isBlackout = true;
        "
        class="highlighted"
      >
        <AddUserIcon />
        <span>Добавить</span>
      </button>
    </div>
  </div>

  <form @submit.prevent="editUser(iteractionalUserId)">
    <table id="content-table">
      <tr v-for="user in allUsers" :key="user.id">
        <td class="col1">
          <input v-model="user.first_name" :disabled="!user.isEditing" />
          <input v-model="user.last_name" :disabled="!user.isEditing" />
        </td>
        <td class="col2">
          <input v-model="user.email" :disabled="!user.isEditing" />
          <input v-model="user.password" :disabled="!user.isEditing" />
        </td>
        <td class="col3">
          <button
            type="submit"
            class="button-icon"
            v-if="user.isEditing"
            @click="iteractionalUserId = user.id"
          >
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
  </form>
  <!-- Code above includes modals, it needs to be totaly reworked -->
  <button
    id="blackout"
    v-show="isBlackout"
    @click="
      isBlackout = false;
      isDeleting = false;
      isAdding = false;
      isImporting = false;
    "
  ></button>
  <div v-show="isDeleting" class="dialog-table">
    <!-- User Deleting modal -->
    <h2>
      Вы уверены что хотите удалить пользователя
      {{ iteractionalUser.first_name }} {{ iteractionalUser.last_name }}?
    </h2>
    <button
      @click="
        deleteUser(iteractionalUser.id);
        isDeleting = false;
        isBlackout = false;
      "
      class="button-icon"
      style="background-color: var(--wrong-color)"
    >
      <DeleteIcon /><span>Удалить</span>
    </button>
    <button
      @click="
        isDeleting = false;
        isBlackout = false;
      "
      class="button-icon"
    >
      <UndoIcon /><span>Отменить</span>
    </button>
  </div>
  <div v-show="isAdding" class="dialog-table">
    <!-- User Adding modal -->
    <h2>Добавление пользователя</h2>
    <form @submit.prevent="createUser()">
      <h5>Email</h5>
      <input v-model="newUser.email" placeholder="jhon@example.com" />
      <h5>Имя</h5>
      <input v-model="newUser.first_name" placeholder="Jhon" />
      <h5>Фамилия</h5>
      <input v-model="newUser.last_name" placeholder="Doe" />
      <h5>Пароль</h5>
      <input v-model="newUser.password" placeholder="Password123" />
      <br />
      <br />
      <button type="submit" class="button-icon highlighted">
        <AddUserIcon />
        <span>Добавить</span>
      </button>
      <button
        @click="
          isAdding = false;
          isBlackout = false;
        "
        type="button"
        class="button-icon"
      >
        <UndoIcon />
        <span>Отменить</span>
      </button>
    </form>
  </div>
  <div v-show="isImporting" class="dialog-table">
    <h2>Импорт пользователей</h2>
    <h5>Выберите csv файл</h5>
    <input type="file" ref="fileInput" @change="importUsers()" />
    <br />
    <br />
    <button type="submit" class="button-icon highlighted">
      <ImportFromFileIcon />
      <span>Импортировать</span>
    </button>
    <button
      @click="
        isImporting = false;
        isBlackout = false;
      "
      type="button"
      class="button-icon"
    >
      <UndoIcon />
      <span>Отменить</span>
    </button>
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
      isAdding: false,
      isImporting: false,
      iteractionalUser: {},
      iteractionalUserId: -1,
      newUser: {
        email: "",
        first_name: "",
        last_name: "",
        password: "",
      },
      importFile: {
        value: null,
      },
      fileInput: null,
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
    async editUser(user_id = this.user_id) {
      let user_id_in_list = -1;
      for (let i = 0; i < this.allUsers.length; i++) {
        if (this.allUsers[i].id == user_id) {
          user_id_in_list = i;
        }
      }

      if (user_id_in_list != -1) {
        let user = this.allUsers[user_id_in_list];
        if (user.isEditing) {
          const { email, first_name, last_name, password } = user;
          const { data: result } = await axios.post(
            "http://0.0.0.0:8179/edit_user",
            {
              id: this.user_id,
              changing_id: user_id,
              new_data: {
                email: email,
                first_name: first_name,
                last_name: last_name,
                password: password,
              },
            }
          );
          if (!(result === 0)) {
            console.log(result);
          }
        }
        this.allUsers[user_id_in_list].isEditing = !user.isEditing;
      }
    },
    async deleteUser(user_id = this.user_id) {
      const { data: result } = await axios.post(
        "http://0.0.0.0:8179/delete_user",
        {
          id: this.user_id,
          deleting_id: user_id,
        }
      );
      if (!(result === 0)) {
        console.log(result);
      }
    },
    async createUser() {
      const { email, first_name, last_name, password } = this.newUser;
      try {
        const { data: result } = await axios.post(
          "http://0.0.0.0:8179/create_user",
          {
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password,
            id: this.user_id,
          }
        );
        if (!(result === 0)) {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    },
    onFileChange() {
      this.importFile.value = this.fileInput.value.files;
    },
    async importUsers() {
      try {
        const { data: result } = await axios.post(
          "http://0.0.0.0:8179/import_users",
          {
            id: this.user_id,
            file: this.importFile.value,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (!(result === 0)) {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
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
