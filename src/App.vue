<template>
  <div>
    <div class="header">
      <app-header />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/MenuList.vue";
export default {
  components: { AppHeader },
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th:hover {
  cursor: pointer;
  background: rgb(229, 255, 211);
}

tr:nth-child(even) {
  background-color: #f3f3f3;
}
</style>
