<template>
  <v-container class="detail-container" v-if="product">
    <v-row>
      <!-- รูปสินค้า -->
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-img
            :src="getImageUrl(product.productphoto)"
            height="400"
            contain
          />
        </v-card>
      </v-col>

      <!-- รายละเอียดสินค้า -->
      <v-col cols="12" md="6">
        <v-card class="pa-6">
          <h1 class="mb-4">{{ product.productname }}</h1>

          <div class="description mb-4">
            {{ product.description }}
          </div>

          <div class="price mb-2">
            ราคา: ฿ {{ formatPrice(product.price) }}
          </div>

          <div
            class="stock"
            :class="{ 'text-red': product.stock === 0 }"
          >
            {{ product.stock === 0 ? "สินค้าหมด" : "คงเหลือ: " + product.stock }}
          </div>

          <v-divider class="my-4" />

          <v-btn
            color="primary"
            :disabled="product.stock === 0"
            @click="goBack"
          >
            กลับหน้าสินค้า
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: null,
    };
  },

  async created() {
    const id = this.$route.params.id;
    await this.getProductById(id);
  },

  methods: {
    async getProductById(id) {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        this.product = data;
      } catch (error) {
        console.error(error);
      }
    },

    getImageUrl(filename) {
      return `http://localhost:3000/images/${filename}`;
    },

    formatPrice(price) {
      return new Intl.NumberFormat("th-TH").format(price);
    },

    goBack() {
      this.$router.push("/productview");
    },
  },
};
</script>

<style scoped>
.detail-container {
  margin-top: 40px;
}

.price {
  font-size: 22px;
  font-weight: bold;
  color: #e53935;
}

.description {
  font-size: 16px;
  color: #555;
}

.text-red {
  color: red;
}
</style>