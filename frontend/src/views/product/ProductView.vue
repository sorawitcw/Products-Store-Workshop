<template>
  <v-container class="storefront-container">
    <!-- Hero Banner Section -->
    <div class="storefront-hero">
      <div class="hero-content">
        <h1 class="hero-title">🌟 CAPYSHOP 🌟</h1>
        <p class="hero-subtitle">ค้นพบสินค้าสุดพิเศษที่คัดสรรมาเพื่อคุณโดยเฉพาะ</p>
      </div>
      <!-- Cart Shortcut Button -->
      <v-btn
        color="white"
        class="cart-shortcut-btn elevation-4"
        @click="$router.push('/cart')"
      >
        <v-icon left color="primary">mdi-cart</v-icon>
        ตะกร้าของฉัน
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </v-btn>
    </div>

    <!-- Search and Filter Controls -->
    <v-row class="controls-row mb-6 align-center">
      <v-col cols="12" sm="6" md="8">
        <v-text-field
          v-model="searchQuery"
          label="ค้นหาสินค้า..."
          prepend-inner-icon="mdi-magnify"
          outlined
          dense
          hide-details
          class="search-bar"
        />
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="sortBy"
          :items="sortOptions"
          label="เรียงลำดับตาม"
          outlined
          dense
          hide-details
          class="sort-dropdown"
        />
      </v-col>
    </v-row>

    <!-- Product Grid -->
    <v-row v-if="filteredProducts.length > 0">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="item in filteredProducts"
        :key="item._id"
      >
        <v-card class="product-card">
          <div class="product-image-container">
            <v-img
              :src="getImageUrl(item.productphoto)"
              height="220"
              contain
              class="product-image"
            />
            <div v-if="item.stock === 0" class="out-of-stock-overlay">
              <span>สินค้าหมด</span>
            </div>
          </div>

          <v-card-title class="product-title text-truncate">
            {{ item.productname }}
          </v-card-title>

          <v-card-text class="product-content">
            <div class="description text-truncate-2">
              {{ item.description || 'ไม่มีรายละเอียดสินค้า' }}
            </div>

            <div class="price">
              ฿ {{ new Intl.NumberFormat("th-TH").format(item.price) }}
            </div>

            <div class="stock-status">
              <v-chip
                small
                :color="item.stock > 0 ? 'success' : 'error'"
                text-color="white"
                class="font-weight-medium"
              >
                {{ item.stock > 0 ? `มีสินค้า (คงเหลือ ${item.stock})` : 'สินค้าหมด' }}
              </v-chip>
            </div>
          </v-card-text>

          <v-card-actions class="product-actions">
            <!-- View Details Button -->
            <v-btn
              outlined
              color="primary"
              class="details-btn"
              @click="$router.push(`/productdetail/${item._id}`)"
            >
              รายละเอียด
            </v-btn>

            <!-- Add to Cart Button -->
            <v-btn
              class="add-to-cart-btn"
              :disabled="item.stock === 0"
              @click="addToCart(item)"
            >
              <v-icon left>mdi-cart-plus</v-icon>
              ใส่ตะกร้า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <v-icon size="64" color="grey lighten-1">mdi-package-variant-closed</v-icon>
      <h3>ไม่พบสินค้าที่ตรงกับการค้นหา</h3>
      <p>ลองค้นหาด้วยคำอื่นหรือล้างตัวกรองการค้นหา</p>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      products: [],
      searchQuery: "",
      sortBy: "default",
      sortOptions: [
        { text: "เริ่มต้น", value: "default" },
        { text: "ราคา: ต่ำ -> สูง", value: "priceAsc" },
        { text: "ราคา: สูง -> ต่ำ", value: "priceDesc" },
        { text: "ชื่อสินค้า: A-Z", value: "nameAsc" }
      ]
    };
  },

  computed: {
    cartCount() {
      // Get total item count in Vuex cart state
      return this.$store.state.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    filteredProducts() {
      let result = [...this.products];

      // Filter by Search Query
      if (this.searchQuery.trim() !== "") {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.productname.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query))
        );
      }

      // Sorting
      if (this.sortBy === "priceAsc") {
        result.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === "priceDesc") {
        result.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === "nameAsc") {
        result.sort((a, b) => a.productname.localeCompare(b.productname));
      }

      return result;
    }
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      try {
        const { data } = await axios.get("http://localhost:3000/products");
        this.products = data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    getImageUrl(filename) {
      return `http://localhost:3000/images/${filename}?v=${filename}`;
    },

    addToCart(item) {
      // Commit mutation to Vuex store
      this.$store.commit("addToCart", item);

      // Show beautiful success Toast notification
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `เพิ่ม ${item.productname} ลงในตะกร้าแล้ว`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#2C3E50",
        iconColor: "#4A90E2",
      });
    }
  }
};
</script>

<style scoped>
.storefront-container {
  max-width: 1300px;
  margin: 20px auto 60px;
}

/* Hero Section Styling */
.storefront-hero {
  position: relative;
  background: linear-gradient(135deg, #4A90E2, #82B1FF, #9b51e0);
  border-radius: 24px;
  padding: 50px 30px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(74, 144, 226, 0.25);
  color: #ffffff;
  overflow: hidden;
}

.storefront-hero::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -20%;
  width: 60%;
  height: 200%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(30deg);
  pointer-events: none;
}

.hero-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.hero-subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.cart-shortcut-btn {
  text-transform: none;
  font-weight: 700;
  border-radius: 14px;
  padding: 12px 24px !important;
  color: #4A90E2 !important;
  position: relative;
}

.cart-badge {
  background-color: #ff5252;
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: 8px;
  display: inline-block;
  min-width: 20px;
  text-align: center;
}

/* Controls layout */
.controls-row {
  background: #ffffff;
  padding: 15px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
}

.search-bar, .sort-dropdown {
  border-radius: 12px;
}

/* Product Card Styling */
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: #ffffff;
  border: 1px solid #f1f5f9;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  background: #f8fafc;
  overflow: hidden;
}

.product-image {
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.06);
}

.out-of-stock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.out-of-stock-overlay span {
  color: white;
  font-weight: 700;
  font-size: 18px;
  background: rgba(239, 83, 80, 0.9);
  padding: 8px 20px;
  border-radius: 30px;
  letter-spacing: 1px;
}

.product-title {
  font-weight: 700;
  font-size: 17px;
  color: #1e293b;
  padding: 16px 16px 8px;
}

.product-content {
  padding: 0 16px 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.description {
  font-size: 13px;
  color: #64748b;
  min-height: 38px;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price {
  font-size: 22px;
  font-weight: 800;
  color: #4A90E2;
}

.stock-status {
  margin-top: auto;
}

.product-actions {
  padding: 12px 16px 16px;
  display: flex;
  gap: 10px;
  border-top: 1px solid #f1f5f9;
}

.details-btn {
  flex: 1;
  border-radius: 12px !important;
  text-transform: none;
  font-weight: 600;
  border-width: 1.5px;
}

.add-to-cart-btn {
  flex: 1.2;
  border-radius: 12px !important;
  background: linear-gradient(135deg, #4A90E2, #82B1FF) !important;
  color: #ffffff !important;
  font-weight: 700;
  text-transform: none;
}

.add-to-cart-btn:hover {
  opacity: 0.95;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.35);
}

.add-to-cart-btn:disabled {
  background: #cbd5e1 !important;
  color: #94a3b8 !important;
  box-shadow: none;
}

/* Empty State Styling */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
}

.empty-state h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 16px 0 8px;
}

.empty-state p {
  font-size: 14px;
}
</style>

