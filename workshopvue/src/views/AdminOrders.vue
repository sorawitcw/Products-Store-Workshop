<template>
  <div class="admin-orders">
    <div class="header">
      <h1>📋 รายการคำสั่งซื้อ</h1>
      <span class="count">ทั้งหมด {{ orders.length }} รายการ</span>
    </div>

    <div v-for="order in orders" :key="order._id" class="order-card">
      <div class="order-top">
        <div>
          <strong>Order ID:</strong>
          <span class="order-id">{{ order._id }}</span>
        </div>

        <div class="order-total">฿ {{ order.total }}</div>
      </div>

      <div class="customer">
        👤 ผู้สั่งซื้อ:
        <strong>
          {{ order.customer?.firstname }} {{ order.customer?.lastname }}
        </strong>
      </div>

      <div class="items">
        <div class="item-row header-row">
          <span>รหัสสินค้า</span>
          <span>จำนวน</span>
          <span>รวม</span>
        </div>

        <div
          v-for="item in order.item"
          :key="item.productcode"
          class="item-row"
        >
          <span>{{ item.productcode }}</span>
          <span>{{ item.quantity }}</span>
          <span>฿ {{ item.totalprice }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
    };
  },

  mounted() {
    this.getOrders();
  },

  methods: {
    async getOrders() {
      const { data } = await axios.get("http://localhost:3000/orders");
      this.orders = data;
    },
  },
};
</script>

<style scoped>
.admin-orders {
  max-width: 1100px;
  margin: 50px auto;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header h1 {
  font-weight: 600;
}

.count {
  background: #f1f3f6;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
}

.order-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.order-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  transform: translateY(-3px);
}

.order-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.order-id {
  font-size: 13px;
  color: #666;
  margin-left: 6px;
}

.order-total {
  font-size: 18px;
  font-weight: 600;
  color: #27ae60;
}

.items {
  border-top: 1px solid #eee;
  padding-top: 12px;
}

.item-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 8px 0;
  font-size: 14px;
}

.header-row {
  font-weight: 600;
  color: #888;
}

.customer {
  margin: 10px 0;
  padding: 8px 12px;
  background: #f5f7fa;
  border-radius: 8px;
  font-size: 14px;
}
</style>
