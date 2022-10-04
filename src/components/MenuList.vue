<template>
  <div>
    <ul>
      <li>
        <router-link to="/HelloWorld">Hello World</router-link>
      </li>
      <li>
        <router-link to="/ProductList">Product List</router-link>
      </li>
      <li v-if="currentRouteName=='ProductList'">
        <input
          type="radio"
          value="one"
          id="one"
          v-model="redio"
          @change="onListChange($event)"
        />
        <label for="one">Tabular View</label>
        <input
          type="radio"
          value="two"
          id="two"
          v-model="redio"
          @change="onListChange($event)"
        />
        <label for="two">List View</label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul li {
  display: inline-block;
  list-style: none;
  font-size: 18px;
  padding: 10px 0;
  margin: 0 20px;
}
</style>
<script>

export default {
  name: "AppHeader",

  data() {
    return {
      redio: this.$store.state.selectedView,
      routePath: this.$router.currentRoute.path,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  created() {
    console.log(this.$router.currentRoute.path); // path is /post
  },
  methods: {
    onListChange(event) {
      const optionText = event.target.value;
      // alert(this.$route.params);
      this.$store.dispatch("addToSelectedView", optionText);
    },
  },
};
</script>
