<script>
  import axios from 'axios';

  import RegisterPage from './views/RegisterPage.vue'
  import LoginPage from './views/LoginPage.vue'
  import HomePage from './views/HomePage.vue'
  import ProductPage from './views/ProductPage.vue'
  import CreateProductPage from './views/CreateProductPage.vue';
  import EditProductPage from './views/EditProductPage.vue';
  import CategoryPage from './views/CategoryPage.vue'
  import CreateCategoryPage from './views/CreateCategoryPage.vue';
  import EditCategoryPage from './views/EditCategoryPage.vue';
  import HistoryPage from './views/HistoryPage.vue'

  import Navbar from './components/Navbar.vue'

  export default {
    components: {
      RegisterPage,
      LoginPage,
      HomePage,
      ProductPage,
      CreateProductPage,
      EditProductPage,
      CategoryPage,
      CreateCategoryPage,
      EditCategoryPage,
      HistoryPage,
      Navbar,
    },
    data() {
      return {
        baseUrl: import.meta.env.VITE_BASE_URL,
        currentPage: 'login',
        products: [],
        categories: [],
        histories: [],
        totalProducts: 0,
        totalCategories: 0,
        productId: null,
        categoryId: null,
      }
    },
    created() {
      if (localStorage.getItem('access_token')) {
        this.fetchProducts();
        this.fetchCategories();
        this.fetchHistories();
        this.changePage('home');
      }
    },
    methods: {
      changePage(page) {
        this.currentPage = page
      },

      changeProductId(id) {
        this.productId = id
      },

      changeCategoryId(id) {
        this.categoryId = id
      },

      handleRegister(object) {
        axios.post(`${this.baseUrl}/register`, object)
          .then(({ data: response }) => {
            this.$swal.fire(`${response.message}`, "success");
            this.changePage('login')
          })
          .catch(({ response: { data }}) => {
            this.$swal.fire("Error!", `${data.message}`, "error");
          });
      },

      handleLogin(object) {
        axios.post(`${this.baseUrl}/login`, object)
          .then(({ data: response }) => {
            const token = response.data.access_token;
            const username = response.data.username;
            const role = response.data.role;
            localStorage.setItem("access_token", token);
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);
            this.$swal.fire(`${response.message}`, "success");
            this.fetchProducts();
            this.fetchCategories();
            this.fetchHistories();
            this.changePage('home');
          })
          .catch(({ response: { data }}) => {
            this.$swal.fire("Error!", `${data.message}`, "error");
          });
      },

      handleGoogleLogin(obj) {
        axios.post(`${this.baseUrl}/login-google-token`, obj)
        .then(({ data: response }) => {
          const token = response.data.access_token;
          const { username, role } = response.data;

          localStorage.setItem("access_token", token);
          localStorage.setItem("username", username);
          localStorage.setItem("role", role);
          this.$swal.fire(`${response.message}`, "success");
          this.fetchCategories();
          this.fetchProducts();
          this.fetchHistories();
          this.changePage("home");
        })
        .catch(({ response: { data }}) => {
          this.$swal.fire("Error!", `${data.message}`, "error");
        });
      },

      fetchProducts() {
        axios.get(`${this.baseUrl}/products`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
          .then(({ data: response }) => {
            this.totalProducts = response.count
            this.products = response.data
          })
          .catch(({ response: { data }}) => {
            this.$swal.fire("Error!", `${data.message}`, "error");
          });
      },

      fetchCategories() {
        axios.get(`${this.baseUrl}/categories`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
          .then(({ data: response }) => {
            this.totalCategories = response.count
            this.categories = response.data
          })
          .catch(({ response: { data }}) => {
            this.$swal.fire("Error!", `${data.message}`, "error");
          });
      },

      fetchHistories() {
        axios.get(`${this.baseUrl}/products/histories`, {
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        })
        .then(({ data: response }) => {
          this.histories=response.data
        })
        .catch(({ response: { data }}) => {
          this.$swal.fire("Error!", `${data.message}`, "error");
        })
      },

      handleCreateProduct(obj) {
        axios.post(`${this.baseUrl}/products`, obj, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data: response }) => {
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
          this.products.push(response.data)
          this.totalProducts++
          this.fetchHistories()
          this.changePage('products')
        })
        .catch(({ response: { data }}) => {
          this.$swal.fire("Error!", `${data.message}`, "error");
        });
      },
      
      handleEditStatusProduct(id, obj) {
        axios.patch(`${this.baseUrl}/products/${id}`, obj, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data: response }) => {
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
          this.products = this.products.map(product => {
            if (product.id === id) {
              product.status = obj.status
              return product
            }
            return product
          })
          this.fetchHistories();
        })
        .catch(({ response: { data }}) => {
          this.$swal.fire("Error!", `${data.message}`, "error");
        });
      },

      handleEditProduct(id, obj) {
        axios.put(`${this.baseUrl}/products/${id}`, obj, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data: response }) => {
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
          this.products = this.products.map(product => {
            if (product.id === id) {
              product.name = obj.name
              product.description = obj.description
              product.price = obj.price
              product.stock = obj.stock
              product.imgUrl = obj.imgUrl
              product.categoryId = obj.categoryId
              return product
            }
            return product
          })
          this.fetchHistories();
          this.changeProductId(null)
          this.changePage('products')
        })
        .catch(({ response: { data }}) => {
          this.$swal.fire("Error!", `${data.message}`, "error");
        });
      },

      handleCreateCategory(obj) {
        axios.post(`${this.baseUrl}/categories`, obj, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data: response }) => {
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
          this.categories.push(response.data)
          this.totalCategories++
          this.changePage('categories')
        })
        .catch(({ response: { data }}) => {
          this.$swal.fire("Error!", `${data.message}`, "error");
        });
      },

      handleEditCategory(id, obj) {
        axios.put(`${this.baseUrl}/categories/${id}`, obj, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        })
        .then(({ data: response }) => {
          this.$swal.fire({ title: `${response.message}`, icon: "success" });
          this.categories = this.categories.map(category => {
            if (category.id === id) {
              category.name = obj.name
              return category
            }
            return category
          })
          this.changeCategoryId(null)
          this.changePage('categories')
        })
        .catch(({ response: { data }}) => {
          this.$swal.fire("Error!", `${data.message}`, "error");
        });
      },
      
      handleDeleteCategory(id) {
        this.$swal.fire({
          title: "Are you sure?",
          text: "You want to delete this product!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, confirm!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${this.baseUrl}/categories/${id}`, {
              headers: {
                access_token: localStorage.getItem("access_token"),
              },
            })
            .then(({ data: response }) => {
              this.$swal.fire({ title: `${response.message}`, icon: "success" });
              this.fetchCategories()
              this.fetchProducts()
              this.changePage('categories')
            })
            .catch(({ response: { data }}) => {
              this.$swal.fire("Error!", `${data.message}`, "error");
            });
          }
        });
      },

      handleLogout() {
        this.$swal.fire({
          title: "Are you sure?",
          text: "You need to relogin!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, confirm!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            localStorage.removeItem("access_token");
            this.$swal.fire("Logout!", "Your already logout.", "success");
            this.changePage("login");
          }
        });
      },
    }
  }
</script>

<template>
  <div>
    <Navbar @change-page="changePage" />
    
    <RegisterPage 
      class="pt-16"
      v-if="currentPage==='register'" 
      @change-page="changePage" 
      @handle-submit="handleRegister"
    />
  
    <LoginPage 
      v-else-if="currentPage==='login'" 
      @change-page="changePage" 
      @handle-submit="handleLogin"
      @google-login="handleGoogleLogin"
    />

    <HomePage
      v-else-if="currentPage==='home'"
      :totalProducts="totalProducts"
      :totalCategories="totalCategories"
      @changePage="changePage"
      @logout="handleLogout"
    />

    <ProductPage
      v-else-if="currentPage==='products'"
      :products="products"
      @logout="handleLogout"
      @handleSelect="handleEditStatusProduct"
      @changePage="changePage"
      @changeProductId="changeProductId"
    />

    <CreateProductPage
      v-else-if="currentPage==='createProduct'"
      :categories="categories"
      :baseUrl="baseUrl"
      @changePage="changePage"
      @logout="handleLogout"
      @handle-submit="handleCreateProduct"
    />

    <EditProductPage
      v-else-if="currentPage==='editProduct'"
      :id="productId"
      :categories="categories"
      :baseUrl="baseUrl"
      @changePage="changePage"
      @logout="handleLogout"
      @handle-submit="handleEditProduct"
    />

    <CategoryPage
      v-else-if="currentPage==='categories'"
      :categories="categories"
      @changePage="changePage"
      @logout="handleLogout"
      @changeCategoryId="changeCategoryId"
      @clickDelete="handleDeleteCategory"
    />

    <CreateCategoryPage
      v-else-if="currentPage==='createCategory'"
      :baseUrl="baseUrl"
      @changePage="changePage"
      @logout="handleLogout"
      @handle-submit="handleCreateCategory"
    />

    <EditCategoryPage
      v-else-if="currentPage==='editCategory'"
      :baseUrl="baseUrl"
      :id="categoryId"
      :categories="categories"
      @changePage="changePage"
      @logout="handleLogout"
      @handle-submit="handleEditCategory"
    />

    <HistoryPage
      v-else-if="currentPage==='histories'"
      :histories="histories"
      @changePage="changePage"
      @logout="handleLogout"
    />
  </div>
  
</template>