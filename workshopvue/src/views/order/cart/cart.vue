<template>
  <div class="cart-wrapper">
    <div class="cart-header">
      <h1>🛒 ตะกร้าสินค้า</h1>
      <span v-if="cart.length > 0" class="item-count">
        {{ totalQuantity }} รายการ
      </span>
    </div>

    <div v-if="cart.length === 0" class="empty-cart">
      <div class="empty-icon">🛍️</div>
      <h2>ไม่มีสินค้าในตะกร้า</h2>
      <button
        class="action-btn continue-btn"
        @click="$router.push('/productview')"
      >
        เลือกซื้อสินค้า
      </button>
    </div>

    <div v-else class="cart-grid">
      <div class="cart-items">
        <div
          v-for="(item, index) in cart"
          :key="item.productcode"
          class="cart-card"
        >
          <div class="cart-info">
            <h3>{{ item.productname }}</h3>
            <p>฿ {{ formatNumber(item.price) }}</p>
          </div>

          <div class="qty-section">
            <button @click="decreaseQty(index)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQty(index)">+</button>
          </div>

          <div class="subtotal">
            ฿ {{ formatNumber(item.price * item.quantity) }}
          </div>

          <button class="delete-btn" @click="removeItem(index)">✕</button>
        </div>
      </div>
      <div class="summary-box">
        <h3>สรุปคำสั่งซื้อ</h3>

        <div class="summary-row">
          <span>จำนวนสินค้า</span>
          <span>{{ totalQuantity }} ชิ้น</span>
        </div>

        <div class="summary-row total">
          <span>ยอดรวมทั้งหมด</span>
          <span>฿ {{ formatNumber(totalAmount) }}</span>
        </div>

        <button class="action-btn checkout-btn" @click="checkout">
          ชำระเงิน
        </button>

        <button
          class="action-btn back-btn"
          @click="$router.push('/productview')"
        >
          ← กลับไปเลือกสินค้า
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      cart: [],
    };
  },

  computed: {
    totalAmount() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },

    totalQuantity() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
  },

  methods: {
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    formatNumber(value) {
      return Number(value).toLocaleString("th-TH");
    },

    increaseQty(index) {
      this.cart[index].quantity++;
      this.saveCart();
    },

    decreaseQty(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.saveCart();
      }
    },

    async removeItem(index) {
      const result = await Swal.fire({
        title: "ยืนยันการลบ?",
        text: "คุณต้องการลบสินค้านี้ออกจากตะกร้าใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ลบสินค้า",
        cancelButtonText: "ยกเลิก",
        confirmButtonColor: "#e74c3c",
        cancelButtonColor: "#bdc3c7",
      });

      if (result.isConfirmed) {
        this.cart.splice(index, 1);
        this.saveCart();

        Swal.fire({
          title: "ลบแล้ว",
          text: "สินค้าถูกลบออกจากตะกร้าแล้ว",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    },

    async checkout() {
      if (this.cart.length === 0) return;

      const token = localStorage.getItem("token");

      try {
        await axios.post(
          "http://localhost:3000/orders",
          { item: this.cart },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        Swal.fire({
          title: "สำเร็จ",
          text: "ชำระเงินเรียบร้อย",
          icon: "success",
        });

        this.cart = [];
        localStorage.removeItem("cart");
        this.$router.push("/productview");
      } catch (error) {
        console.log(error.response?.data);
        Swal.fire({
          title: "ผิดพลาด",
          text: error.response?.data?.message || "ไม่สามารถทำรายการได้",
          icon: "error",
        });
      }
    },
  },

  mounted() {
    const savedCart = localStorage.getItem("cart");
    this.cart = savedCart ? JSON.parse(savedCart) : [];
  },
};
</script>

<style scoped>
.cart-wrapper {
  max-width: 1100px;
  margin: 60px auto;
  padding: 20px;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.cart-header h1 {
  font-size: 28px;
  font-weight: 600;
}

.item-count {
  background: #f1f3f6;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
}

.cart-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-card {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  border-radius: 14px;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: 0.2s;
}

.cart-card:hover {
  transform: translateY(-3px);
}

.cart-info h3 {
  margin: 0;
  font-size: 16px;
}

.cart-info p {
  margin: 4px 0 0;
  color: #888;
}

.qty-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-section button {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.qty-section button:hover {
  background: #2980b9;
}

.subtotal {
  font-weight: 600;
}

.delete-btn {
  background: transparent;
  border: none;
  font-size: 18px;
  color: #e74c3c;
  cursor: pointer;
}

.summary-box {
  background: #ffffff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  height: fit-content;
}

.summary-box h3 {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.summary-row.total {
  font-weight: 600;
  font-size: 18px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  color: white;
  border: none;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.25s ease;
}

.checkout-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(39, 174, 96, 0.4);
}

.back-btn {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: #f1f3f6;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.back-btn:hover {
  transform: translateY(-2px);
}

.empty-cart {
  text-align: center;
  padding: 60px 0;
}

.empty-icon {
  font-size: 60px;
}

.continue-btn {
  background: #2980b9;
  color: #f5f5f5;
  border: 1px solid #1f6694;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.continue-btn:hover {
  background: #f5f5f5;
  color: #2980b9;
  border: 1px solid #2980b9;
}

.delete-card {
  border-radius: 18px;
  padding: 10px;
}

.delete-title {
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.swal-popup {
  border-radius: 20px !important;
  padding: 25px !important;
  animation: fadeInScale 0.3s ease;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.swal-confirm {
  background: linear-gradient(135deg, #2ecc71, #27ae60) !important;
  border-radius: 10px !important;
  padding: 10px 20px !important;
  font-weight: 600 !important;
}

.swal-confirm:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(39, 174, 96, 0.4);
}

.swal-cancel {
  border-radius: 10px !important;
}

.swal2-confirm.swal-confirm {
  background: linear-gradient(135deg, #2ecc71, #27ae60) !important;
  color: white !important;
  border: none !important;
  box-shadow: 0 6px 18px rgba(39, 174, 96, 0.4) !important;
}

.swal2-confirm.swal-confirm:hover {
  transform: translateY(-2px);
}
</style>
