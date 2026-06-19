<template>
  <v-container class="product-container">
    <v-dialog v-model="dialog" max-width="420">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title">
          <v-icon start color="primary">mdi-cart</v-icon>
          เลือกจำนวนสินค้า
        </v-card-title>

        <v-card-text v-if="selectedProduct">
          <div class="dialog-product-name">
            {{ selectedProduct.productname }}
          </div>
          <div class="dialog-total">
            รวมทั้งหมด: ฿ {{ formatPrice(selectedProduct.price * quantity) }}
          </div>
          <div class="quantity-box">
            <v-btn class="qty-btn" @click="decreaseQty" icon>
              <v-icon>mdi-minus</v-icon>
            </v-btn>

            <span class="qty-number">{{ quantity }}</span>

            <v-btn class="qty-btn" @click="increaseQty" icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>

          <div
            class="stock mt-4"
            :class="{ 'out-text': selectedProduct.stock === 0 }"
          >
            คงเหลือ {{ selectedProduct.stock }} ชิ้น
          </div>
        </v-card-text>

        <v-card-actions class="dialog-actions">
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">ยกเลิก</v-btn>
          <v-btn class="confirm-btn" @click="confirmAddToCart">
            <v-icon start>mdi-cart-check</v-icon>
            เพิ่มลงตะกร้า
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="12" md="3" class="filter-sidebar">
        <h2 class="filter-title">ค้นหา / กรอง</h2>

        <v-btn
          color="grey-darken-1"
          variant="outlined"
          block
          class="mb-4"
          @click="resetFilter"
        >
          Reset
        </v-btn>

        <v-text-field
          v-model="search"
          label="ค้นหาชื่อสินค้า"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          density="comfortable"
          class="mb-4"
        />

        <v-text-field
          v-model.number="minPrice"
          label="ราคาต่ำสุด"
          type="number"
          min="0"
          variant="outlined"
          density="comfortable"
          class="mb-4"
        />

        <v-text-field
          v-model.number="maxPrice"
          label="ราคาสูงสุด"
          type="number"
          min="0"
          variant="outlined"
          density="comfortable"
        />
      </v-col>

      <v-col cols="12" md="9">
        <div class="product-header">
          <h2>PRODUCT</h2>
        </div>

        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="item in filteredProducts"
            :key="item._id"
            class="product-col"
          >
            <v-card
              class="product-card"
              :class="{ 'out-of-stock-card': item.stock === 0 }"
              @click="goToDetail(item)"
              style="cursor: pointer"
            >
              <v-img
                :src="getImageUrl(item.productphoto)"
                height="220"
                contain
                class="product-image"
              >
                <div v-if="item.stock === 0" class="sold-out-badge">
                  สินค้าหมด
                </div>
              </v-img>

              <v-card-title class="product-title">
                {{ item.productname }}
              </v-card-title>

              <v-card-text class="product-content">
                <!-- <div class="description">{{ item.description }}</div> -->
                <div class="price">฿ {{ formatPrice(item.price) }}</div>
                <div
                  class="stock"
                  :class="{ 'out-text': getRemainingStock(item) <= 0 }"
                >
                  {{
                    getRemainingStock(item) <= 0
                      ? "สินค้าหมด"
                      : "คงเหลือ: " + getRemainingStock(item)
                  }}
                </div>
              </v-card-text>

              <v-card-actions class="product-actions">
                <v-btn
                  class="add-btn"
                  :disabled="getRemainingStock(item) <= 0"
                  @click.stop="openDialog(item)"
                >
                  <v-icon start>
                    {{
                      getRemainingStock(item) <= 0
                        ? "mdi-close-circle"
                        : "mdi-cart"
                    }}
                  </v-icon>
                  {{ getRemainingStock(item) <= 0 ? "สินค้าหมด" : "ใส่ตะกร้า" }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn
      fab
      color="pink"
      dark
      class="cart-fab"
      :class="{ 'cart-bounce': bounce }"
      @click="$router.push('/cart')"
    >
      <v-badge v-if="cartCount > 0" :content="cartCount" color="red" overlap>
        <v-icon>mdi-cart</v-icon>
      </v-badge>

      <v-icon v-else>mdi-cart</v-icon>
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      timeout="2000"
      location="bottom right"
      color="success"
    >
      <v-icon start>mdi-check-circle</v-icon>
      เพิ่มสินค้าเข้าตะกร้าแล้ว!
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [],
      cartCount: 0,
      bounce: false,

      dialog: false,
      selectedProduct: null,
      quantity: 1,

      search: "",
      minPrice: 0,
      maxPrice: 1000000,

      snackbar: false,
    };
  },

  created() {
    this.getProducts();
    this.updateCartCount();
  },

  computed: {
    filteredProducts() {
      return this.products.filter((item) => {
        const matchName = item.productname
          .toLowerCase()
          .includes(this.search.toLowerCase());

        const matchPrice =
          item.price >= this.minPrice && item.price <= this.maxPrice;

        return matchName && matchPrice;
      });
    },
  },

  methods: {
    async getProducts() {
      const { data } = await axios.get("http://localhost:3000/products");
      this.products = data;
    },

    openDialog(product) {
      this.selectedProduct = product;
      this.quantity = 1;
      this.dialog = true;
    },

    increaseQty() {
      if (this.quantity < this.getRemainingStock(this.selectedProduct)) {
        this.quantity++;
      }
    },

    decreaseQty() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    confirmAddToCart() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(
        (item) => item.productcode === this.selectedProduct.productcode,
      );

      if (existing) {
        existing.quantity += this.quantity;
      } else {
        cart.push({
          productcode: this.selectedProduct.productcode,
          productname: this.selectedProduct.productname,
          price: this.selectedProduct.price,
          quantity: this.quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      this.updateCartCount();

      this.dialog = false;
      this.snackbar = true;

      this.bounce = false;
      setTimeout(() => (this.bounce = true), 10);
      setTimeout(() => (this.bounce = false), 400);
    },
    getRemainingStock(product) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find(
        (item) => item.productcode === product.productcode,
      );

      const qtyInCart = existing ? existing.quantity : 0;

      return product.stock - qtyInCart;
    },

    updateCartCount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    getImageUrl(filename) {
      return `http://localhost:3000/images/${filename}`;
    },
    formatPrice(price) {
      return new Intl.NumberFormat("th-TH").format(price);
    },
    resetFilter() {
      this.search = "";
      this.minPrice = 0;
      this.maxPrice = 1000000;
    },
    goToDetail(product) {
      this.$router.push(`/productdetail/${product._id}`);
    },
  },
};
</script>

<style scoped>
.product-container {
  padding-top: 50px;
  padding-bottom: 80px;
  background: #ffffff;
}

.product-col {
  display: flex;
  justify-content: center;
}

.product-card {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.35s ease;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.product-image {
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-title {
  font-weight: 600;
  font-size: 18px;
  padding-bottom: 0;
}

.product-content {
  padding-top: 0;
}

.description {
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
  min-height: 40px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #e53935;
  margin-bottom: 6px;
}

.stock {
  font-size: 13px;
  color: #555;
}

.product-actions {
  padding: 16px;
}

.add-btn {
  width: 100%;
  border-radius: 12px;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: 0.3s;
}

.add-btn:hover {
  opacity: 0.9;
}

@keyframes bounceCart {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(0.9);
  }
  70% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.cart-bounce {
  animation: bounceCart 0.4s ease;
}

.cart-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
}

.cart-fab:hover {
  transform: scale(1.1);
}

.out-of-stock-card {
  opacity: 0.6;
  pointer-events: none;
}

.sold-out-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #e53935;
  color: white;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: bold;
  border-radius: 8px;
  z-index: 10;
}

.out-text {
  color: #e53935;
  font-weight: bold;
}

.quantity-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  background: #f9fafc;
  padding: 10px;
  border-radius: 14px;
}

.qty-number {
  font-weight: bold;
  font-size: 22px;
  min-width: 30px;
  text-align: center;
}

/* Dialog style */
.dialog-card {
  border-radius: 22px;
  padding: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.dialog-title {
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dialog-product-name {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
}

.qty-btn {
  background: #f5f5f5;
  border-radius: 12px;
  transition: 0.2s;
}

.qty-btn:hover {
  background: #e0f7fa;
}

.confirm-btn {
  border-radius: 12px;
  background: linear-gradient(45deg, #4facfe, #00f2fe);
  color: white;
  font-weight: 600;
}

.confirm-btn:hover {
  opacity: 0.9;
}

.dialog-actions {
  padding: 16px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
}

.section-subtitle {
  color: #777;
  font-size: 15px;
}

.dialog-total {
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
  text-align: center;
}

.filter-sidebar {
  padding-right: 30px;
  border-right: 1px solid #e0e0e0;
}

.filter-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.product-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
}

.product-header h2 {
  font-size: 28px;
  font-weight: 700;
  border-bottom: 3px solid #1976d2;
  padding-bottom: 6px;
}
</style>
