<template>
  <div>
    <div v-if="getOptionSelected == 'one'">
      <table>
        <tr>
          <th>Details</th>
          <th @click="sortList('id')">ID &#8597;</th>
          <th @click="sortList('title')">Title &#8597;</th>
          <th>Description</th>
          <th @click="sortList('price')">Price &#8597;</th>
          <th @click="sortList('discountPercentage')">
            Discount Percentage &#8597;
          </th>
          <th @click="sortList('rating')">Rating &#8597;</th>
          <th @click="sortList('stock')">stock &#8597;</th>
          <th @click="sortList('brand')">Brand &#8597;</th>
          <th @click="sortList('category')">Category &#8597;</th>
          <th>Photo &#8597;</th>
        </tr>
        <tr v-for="data in getResult" :key="data.id">
          <td>
            <router-link :to="{ path: `/detail/${data.id}` }">
              <button class="button-85" role="button">Detail</button>
            </router-link>
          </td>
          <td>{{ data.id }}</td>
          <td>{{ data.title }}</td>
          <td>{{ data.description }}</td>
          <td>{{ data.price }}</td>
          <td>{{ data.discountPercentage }}</td>
          <td>{{ data.rating }}</td>
          <td>{{ data.stock }}</td>
          <td>{{ data.brand }}</td>
          <td>{{ data.category }}</td>
          <td>
            <img
              :src="data.thumbnail"
              :alt="data.title"
              :width="120"
              :height="120"
            />
          </td>
        </tr>
      </table>
    </div>
    <div v-else>
      <div>
        <sort-data />
      </div>
      <div class="container">
        <div class="card" v-for="data in getResult" :key="data.id">
          <div class="card__header">
            <img
              :src="data.thumbnail"
              :alt="data.title"
              :width="120"
              :height="120"
            />
            <span class="tag tag-blue">{{ data.category }}</span>
            <div class="card__footer">
              <div class="user">
                <div class="user__info">
                  <p>
                    <span>
                      <star-rating
                        :rating="data.rating"
                        :read-only="true"
                        :star-size="20"
                        :round-start-rating="false"
                      ></star-rating>
                    </span>
                  </p>
                  <span>
                    Price: <strong>$ {{ data.price }}</strong>
                  </span>

                  <p>
                    <span>
                      stock : <strong>{{ data.stock }}</strong>
                    </span>
                  </p>

                  <p>
                    <span>
                      Discount : <strong>{{ data.discountPercentage }}</strong>
                    </span>
                  </p>

                  <p>
                    <span>
                      Brand : <strong>{{ data.brand }}</strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="card__body">
            <h4>{{ data.title }}</h4>
            <p>{{ data.description }}</p>
            <router-link :to="{ path: `/detail/${data.id}` }">
              <button class="button-85" role="button">Detail</button>
              <!-- <button>Details</button> -->
            </router-link>
            <!-- For Practice pupose use  -->
            <!-- <button @click="routeMe(data.id)">Details Me</button> -->
          </div>
          <div class="card__footer" v-show="none">
            <div v-for="(data, index) in data.images" :key="index">
              <div class="image-div">
                <img
                  :src="data"
                  :alt="data"
                  :width="100"
                  :height="100"
                  class="user__image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import StarRating from "vue-star-rating";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import SortData from "./SortData.vue";
import StarRating from "vue-star-rating";
// declare the store variable

export default {
  components: { SortData, StarRating },
  setup() {
    const store = useStore();
    let sortedbyASC = ref(true);

    onMounted(() => {
      // dispatch the fetchUsers action which commits a mutation to update the state
      store.dispatch("fetchAllProducts");
    });

    const getOptionSelected = computed(() => {
      return store.getters.getSelectedView;
    });

    const getResult = computed(() => {
      return store.state.products;
    });

    const sortList = function (sortBy) {
      //   this.$refs.post.toggleDetails();
      if (sortedbyASC.value) {
        console.log("productData-->", store.state.products);
        store.state.products.sort((x, y) => (x[sortBy] > y[sortBy] ? -1 : 1));
        sortedbyASC.value = false;
      } else {
        store.state.products.sort((x, y) => (x[sortBy] < y[sortBy] ? -1 : 1));
        sortedbyASC.value = true;
      }
    };

    const routeMe = (prodId) => {
      this.$router.push({ name: "Details", params: { id: prodId } });
    };

    return {
      routeMe,
      sortList,
      getOptionSelected,
      getResult,
    };
  },
};
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
body {
  font-family: "Raleway", sans-serif;
}

.custom-text {
  font-weight: bold;
  font-size: 1.9em;
  border: 1px solid #cfcfcf;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 5px;
  color: #999;
  background: #fff;
}

.row {
  display: flex;
}
.image-div {
  float: left;
  margin-right: 10px;
  max-width: 20%;
  max-height: 20%;
}
/* Create three equal columns that sits next to each other */
.column {
  flex: 33.33%;
  padding: 5px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200px;
  margin-block: 2rem;
  gap: 2rem;
}

img {
  /* max-width: 100%; */
  display: block;
  object-fit: cover;
  float: left;
}

.card {
  display: flex;
  flex-direction: column;
  width: clamp(20rem, calc(20rem + 2vw), 22rem);
  overflow: hidden;
  box-shadow: 0 0.1rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1em;
  background: #ece9e6;
  background: linear-gradient(to right, #ffffff, #ece9e6);
}

.card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.tag {
  align-self: flex-start;
  padding: 0.25em 0.75em;
  border-radius: 1em;
  font-size: 0.75rem;
}

.tag + .tag {
  margin-left: 0.5em;
}

.tag-blue {
  background: #56ccf2;
  background: linear-gradient(to bottom, #2f80ed, #56ccf2);
  color: #fafafa;
  float: right;
  margin-right: 5px;
}

.card__footer {
  display: flex;
  padding: 1rem;
}

/* CSS */
.button-85 {
  padding: 0.6em 2em;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-85:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 20s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #222;
  left: 0;
  top: 0;
  border-radius: 10px;
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
  background-color: #07f1d121;
}

</style>
