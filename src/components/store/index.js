import { createStore } from "vuex";
// import constant from '../constant/constant'
const store = createStore({
  state: () => ({
    selectedView: "one",
    sortColunByName: "id",
    products: [],
    currentProduct:[]
  }),
  actions: {
    addToSelectedView(context, payload) {
      const newPayload = payload;
      context.commit("UpdateSelectedView", newPayload);
    },
    sortColunByName(context, payload) {
      const newPayload = payload;
      context.commit("UpdateSortColunByName", newPayload);
    },
    async fetchAllProducts(context) {
      try {
        const res = await fetch(`https://dummyjson.com/products`);
        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }
        const data = await res.json();
        const result = {
          status: res.status + "-" + res.statusText,
          headers: {
            "Content-Type": res.headers.get("Content-Type"),
            "Content-Length": res.headers.get("Content-Length"),
          },
          length: res.headers.get("Content-Length"),
          data: data,
        };
        context.commit("SetPoroducts", result.data.products);
      } catch (err) {
        
        alert(err);
        console.log(err);
      }
    },
  },
  mutations: {
    UpdateSelectedView(state, payload) {
      state.selectedView = payload;
    },
    UpdateSortColunByName(state, payload) {
      state.sortColunByName = payload;
    },
    SetPoroducts(state, payload) {
      state.products = payload;
    },
  },
  getters: {
    getSelectedView: function (state) {
      return `${state.selectedView}`;
    },
    getSortColunByName: function (state) {
      return `${state.sortColunByName}`;
    },
    getAllProducts: function (state) {
      return `${state.products}`;
    },
    getProductsByID: (state) => (id) => {
      return state.products.find((item) => item.id == id);
    },
  },
});

export default store;
