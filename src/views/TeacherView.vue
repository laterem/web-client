<template>
  <aside id="menu">
    <ul>
      <li>
        <RouterLink to="/teacher/users/">Все пользователи</RouterLink>
      </li>
      <li>
        <RouterLink to="/teacher/groups/">Группы</RouterLink>
      </li>
      <li>
        <RouterLink to="/teacher/works/">Работы</RouterLink>
      </li>
      <li>
        <RouterLink to="/teacher/tasks/">Шаблоны задач</RouterLink>
      </li>
    </ul>
  </aside>
  <aside id="content">
    <RouterView />
  </aside>
</template>

<style scoped>
aside#menu,
aside#content {
  position: absolute;

  overflow: scroll;
}

aside#menu {
  display: flex;
  top: 60px;
  bottom: 0px;
  left: 0px;

  width: calc(20% - 10px);

  justify-content: center;
  padding: 0px;
  border-radius: 0px 20px 20px 0px;

  background: var(--content-background-color);
  box-shadow: 4px 4px 4px var(--content-shadow-color);

  overflow-x: scroll;
}

#menu a {
  display: block;

  text-decoration: none;
  color: var(--body-font-color);
}

#menu ul {
  padding: 0px;
}

aside#content {
  top: 65px;
  bottom: 10px;
  left: 20%;
  right: 10px;

  border-radius: 20px;
  box-shadow: 4px 4px 4px var(--content-shadow-color);
  background: var(--content-background-color);
}

div#user-table,
div#all-groups-table,
div#task-table,
div#task-field-table {
  display: grid;
  grid-template-columns: auto auto 40px 40px;

  border-radius: 0 0 10px 10px;
  overflow: hidden;
  border-width: 1px;
  border-color: var(--dark-font-color);
  border-style: solid;
  width: 100%;
}

div#user-table {
  grid-template-columns: auto auto max-content 40px;
}

div#all-groups-table {
  grid-template-columns: 100%;
}

div#task-table {
  grid-template-columns: auto 40px;
}

.group-table-element,
.user-table-element,
.all-groups-table-element,
.work-table-element,
.task-table-element,
#work-stats-table *,
#task-field-table *,
#groups-in-work-table * {
  display: flex;
  padding: 5px;
  border-collapse: collapse;
}

.group-table-element:nth-of-type(8n + 3),
.group-table-element:nth-of-type(8n + 1),
.group-table-element:nth-of-type(8n + 2),
.user-table-element:nth-of-type(8n + 4),
.user-table-element:nth-of-type(8n + 1),
.user-table-element:nth-of-type(8n + 2),
.user-table-element:nth-of-type(8n + 3),
.all-groups-table-element:nth-of-type(2n + 1),
.work-table-element:nth-of-type(6n + 1),
.work-table-element:nth-of-type(6n + 2),
.work-table-element:nth-of-type(6n + 3),
#groups-in-work-table *:nth-of-type(2n + 1),
#work-stats-table *:nth-of-type(10n + 1),
#work-stats-table *:nth-of-type(10n + 2),
#work-stats-table *:nth-of-type(10n + 3),
#work-stats-table *:nth-of-type(10n + 4),
#work-stats-table *:nth-of-type(10n + 5),
#task-field-table *:nth-of-type(4n + 1),
#task-field-table *:nth-of-type(4n + 2),
.task-table-element:nth-of-type(4n + 1),
.task-table-element:nth-of-type(4n + 2) {
  background-color: var(--content-hover-color);
}

.user-table-element a,
.all-groups-table-element a,
.task-table-element a,
#task-field-table a,
#work-table a {
  text-decoration: none;
  color: var(--body-font-color);
}

div#user-table-header,
div#group-table-header,
div#all-groups-table-header,
div#work-table-header,
div#task-table-header,
div#work-stats-table-header,
div#task-field-table-header,
div#groups-in-work-table-header {
  display: grid;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  border-width: 1px;
  border-color: var(--dark-font-color);
  border-style: solid;
  width: calc(100% - 22px);
  margin-left: 10px;
  grid-template-columns: auto max-content max-content;
  border-bottom: 0;
}

div#work-stats-table-header {
  grid-template-columns: repeat(2, auto) min-content;
}

div#work-stats-table-header.detached {
  border-radius: 10px;
  border-bottom: 1px solid var(--dark-font-color);
  margin-bottom: 10px;
}

div#user-table-header,
div#user-table,
div#all-groups-table,
div#all-groups-table-header,
div#task-table,
div#task-table-header,
div#task-field-table,
div#task-field-table-header {
  border: none;
  width: 100%;
  margin-left: 0;
}

#user-table-header *,
#all-groups-table-header *,
#task-table-header * {
  display: inline-flex;
  align-items: center;
  padding: 4px;
}

div#group-table,
div#work-table,
div#work-stats-table,
div#groups-in-work-table {
  display: grid;
  grid-template-columns: auto auto 40px 40px;

  border-radius: 0 0 10px 10px;
  overflow: hidden;
  border-width: 1px;
  border-color: var(--dark-font-color);
  border-style: solid;
  width: calc(100% - 22px);

  margin-bottom: 10px;
  margin-left: 10px;
}

div#work-table,
div#group-table {
  grid-template-columns: auto auto 40px;
}

div#work-stats-table {
  grid-template-columns: repeat(5, auto);
}

div#task-field-table {
  grid-template-columns: repeat(2, auto);
}

div#groups-in-work-table {
  grid-template-columns: auto;
}

div#task-manage-table {
  display: grid;
  grid-template-columns: calc(50% - 5px) 10px calc(50% - 5px);
  align-items: baseline;
  overflow: hidden;

  border-radius: 10px;
  border-width: 1px;
  border-color: var(--dark-font-color);
  border-style: solid;
  width: calc(100% - 20px);

  top: 115px;
  bottom: 10px;
}

#task-manage-table *::-webkit-scrollbar-track {
  margin: 0;
}

#task-manage-table-column-header p {
  padding: 0px;
}

#task-manage-table div.highlighted {
  border-radius: 10px;
  padding: 5px;
  height: calc(100% - 10px);

  background-color: var(--content-hover-color);
}

#task-manage-table div:nth-of-type(2n + 1) div {
  overflow: hidden;
  padding: 0px;
  border-radius: 0px;
  height: fit-content;
}

div#task-manage-table-column-header {
  position: sticky;
  display: grid;
  grid-template-columns: auto max-content min-content;

  overflow: hidden;

  width: 100%;
  height: 36px;
  padding: 0px;
  top: 0px;
  left: 0px;

  font-size: large;
}

div#task-manage-table-column-header * {
  margin: 0 0 0 10px;
}

div#task-manage-table-column-header * * {
  margin: 0;
}

#group-table-header *,
#work-table-header *,
#work-stats-table-header *,
#task-field-table-header *,
#groups-in-work-table-header * {
  display: flex;
  align-items: center;
  padding: 4px;
  margin: 1px;
}

#group-manage-header,
#task-manage-header,
#work-manage-header {
  display: grid;
  grid-template-columns: auto max-content;
  align-items: center;
}

.group-info:disabled,
.user-table-element input:disabled,
input:disabled {
  border: none;
  color: currentColor;
  background-color: transparent !important;
}

#group-manage-header div:nth-of-type(2n),
#task-manage-header div:nth-of-type(2n),
#work-manage-header div:nth-of-type(2n) {
  justify-items: end;
  justify-self: end;
}
</style>
