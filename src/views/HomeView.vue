<template>
  <div id="content">
    <h2>Добро пожаловать в Laterem!</h2>
    <h3>Laterem это море возможностей!</h3>
    <router-link to="/student" class="button">Я ученик</router-link>
    <router-link to="/teacher" class="button">Я учитель</router-link>
  </div>
</template>

<style scoped>
div#content {
  position: absolute;
  top: 65px;
  bottom: 10px;
  left: 10px;
  right: 10px;

  border-radius: 20px;
  box-shadow: 4px 4px 4px var(--content-shadow-color);
  background: var(--content-background-color);

  overflow: scroll;

  text-align: center;
}
</style>
