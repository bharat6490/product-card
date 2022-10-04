<template>
  <div>
    Sort By :
    <span @click="sortList('price')" style="cursor: pointer"
      >Price &#8597;
    </span>
    <span @click="sortList('rating')" style="cursor: pointer"
      >Rating &#8597;
    </span>
    <span @click="sortList('id')" style="cursor: pointer">ID &#8597; </span>
    <span @click="sortList('category')" style="cursor: pointer"
      >Category &#8597;
    </span>
  </div>
</template>
<script>
    import { ref} from "vue";
    import { useStore } from "vuex";
export default {
    
  setup() {
    const store = useStore();
    // const store = useStore();
    let sortedbyASC = ref(true);

    const sortList = function (sortBy) {
        
    //   this.$refs.post.toggleDetails();
      if (sortedbyASC.value) {
        console.log('productData-->',store.state.products);
        store.state.products.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        sortedbyASC.value = false;
      } else {
        store.state.products.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        sortedbyASC.value = true;
      }
    };
    return {
      sortList,
    };
  },
};
</script>

<style scoped></style>
