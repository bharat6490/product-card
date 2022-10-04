<template>
  <div>
    <!-- <span>Back -> Click on Product List !</span> -->
    <div class="custom-text">Detail View</div>
    <div v-if="getDetails">
      <p>
        <img
          :src="getDetails.thumbnail"
          :alt="getDetails.title"
          :width="120"
          :height="120"
        />
      </p>
      <p>{{ getDetails.title }}</p>
      <p>{{ getDetails.description }}</p>
      <p>{{ getDetails.category }}</p>
      <p>{{ getDetails.price }}</p>
      <p>{{ getDetails.discountPercentage }}</p>
      <p>{{ getDetails.rating }}</p>
      <p>{{ getDetails.stock }}</p>
      <p>{{ getDetails.brand }}</p>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const prodDetailId = route.params.id;

    const getDetails = computed(() => {
      return store.getters.getProductsByID(prodDetailId);
    });
    
    return {
      getDetails,
    };
  },
};
</script>
<style scoped>
.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
  width: 30%;
  margin-left: 410px;
}
/* <button class="button-85" role="button">Button 85</button> */


</style>
