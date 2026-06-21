<template>
  <v-container class="admin-container">
    <div class="admin-header">
      <h1>📦 จัดการสินค้า</h1>

      <v-btn color="primary" @click="openCreate"> ➕ เพิ่มสินค้า </v-btn>
    </div>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="item in products"
        :key="item._id"
      >
        <v-card class="product-card">
          <v-img
            :src="getImageUrl(item.productphoto)"
            height="220"
            contain
            class="product-image"
          />

          <v-card-title class="product-title">
            {{ item.productname }}
          </v-card-title>

          <v-card-text class="product-content">
            <div class="description">
              {{ item.description }}
            </div>

            <div class="price">
              ฿ {{ new Intl.NumberFormat("th-TH").format(item.price) }}
            </div>

            <div class="stock">คงเหลือ: {{ item.stock }}</div>
          </v-card-text>

          <v-card-actions class="product-actions">
            <v-btn class="edit-btn" @click="openEdit(item)">
              <v-icon start>mdi-pencil</v-icon>
              แก้ไข
            </v-btn>

            <v-btn class="delete-btn" @click="deleteProduct(item._id)">
              <v-icon start>mdi-delete</v-icon>
              ลบ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>แก้ไขสินค้า</v-card-title>
        <div class="image-upload-wrapper">
          <v-img
            v-if="getCurrentImageUrl()"
            :src="getCurrentImageUrl()"
            class="edit-preview"
            contain
          />
          <v-btn
            icon
            color="primary"
            class="upload-btn"
            @click="$refs.editInput.click()"
          >
            <v-icon>mdi-upload</v-icon>
          </v-btn>
          <input
            ref="editInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="(e) => (editFile = e.target.files[0])"
          />
        </div>

        <v-card-text>
          <v-text-field v-model="form.productname" label="ชื่อสินค้า" />
          <v-text-field v-model="form.description" label="รายละเอียด" />
          <v-text-field
            v-model.number="form.price"
            label="ราคา"
            type="number"
          />
          <v-text-field
            v-model.number="form.stock"
            label="สต็อก"
            type="number"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">ยกเลิก</v-btn>
          <v-btn color="primary" @click="updateProduct"> บันทึก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="createDialog" max-width="500">
      <v-card>
        <v-card-title>เพิ่มสินค้าใหม่</v-card-title>

        <v-file-input
          v-model="selectedFile"
          label="อัปโหลดรูปภาพ"
          accept="image/*"
          prepend-icon="mdi-upload"
        />
        <v-card-text>
          <v-text-field v-model="createForm.productname" label="ชื่อสินค้า" />
          <v-text-field v-model="createForm.description" label="รายละเอียด" />
          <v-text-field
            v-model.number="createForm.price"
            label="ราคา"
            type="number"
          />
          <v-text-field
            v-model.number="createForm.stock"
            label="สต็อก"
            type="number"
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="createDialog = false">ยกเลิก</v-btn>
          <v-btn color="primary" @click="createProduct"> บันทึก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      products: [],
      dialog: false,
      editId: null,
      editFile: null,
      form: {
        productname: "",
        description: "",
        price: 0,
        stock: 0,
      },
      createDialog: false,
      createForm: {
        productphoto: "",
        productname: "",
        description: "",
        price: 0,
        stock: 0,
      },
      selectedFile: null,
    };
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      const { data } = await axios.get("http://localhost:3000/products");
      this.products = data;
    },

    getImageUrl(filename) {
      return `http://localhost:3000/images/${filename}?v=${filename}`;
    },

    getCurrentImageUrl() {
      if (this.editFile) {
        return URL.createObjectURL(this.editFile);
      }

      if (this.form.productphoto) {
        return this.getImageUrl(this.form.productphoto);
      }

      return "";
    },

    openEdit(item) {
      this.editId = item._id;
      this.form = { ...item };
      this.editFile = null;
      this.dialog = true;
    },

    async updateProduct() {
      const formData = new FormData();

      formData.append("productname", this.form.productname);
      formData.append("description", this.form.description);
      formData.append("price", this.form.price);
      formData.append("stock", this.form.stock);

      if (this.editFile) {
        formData.append("productphoto", this.editFile);
      }

      await axios.put(
        `http://localhost:3000/products/${this.editId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      Swal.fire({
        title: "สำเร็จ",
        text: "แก้ไขสินค้าสำเร็จ",
        icon: "success",
        confirmButtonColor: "#4A90E2",
        customClass: {
          confirmButton: "swal-ok-btn",
        },
      });

      this.dialog = false;
      this.editFile = null;
      this.getProducts();
    },
    handleEditFileUpload(file) {
      this.editFile = file;
    },

    async deleteProduct(id) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4A90E2",
        cancelButtonColor: "#82B1FF",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/products/${id}`);

        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success",
          confirmButtonColor: "#4A90E2",
        });

        this.getProducts();
      }
    },
    openCreate() {
      this.createForm = {
        productphoto: "",
        productname: "",
        description: "",
        price: 0,
        stock: 0,
      };

      this.selectedFile = null;
      this.createDialog = true;
    },

    async createProduct() {
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append("productphoto", this.selectedFile);
      }

      formData.append("productname", this.createForm.productname);
      formData.append("description", this.createForm.description);
      formData.append("price", this.createForm.price);
      formData.append("stock", this.createForm.stock);

      await axios.post("http://localhost:3000/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "สำเร็จ",
        text: "เพิ่มสินค้าสำเร็จ",
        icon: "success",
        confirmButtonColor: "#4A90E2",
        customClass: {
          confirmButton: "swal-ok-btn",
        },
      });

      this.selectedFile = null;
      this.createDialog = false;
      this.getProducts();
    },
  },
};
</script>

<style>
.admin-container {
  max-width: 1300px;
  margin: 40px auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.admin-header h1 {
  font-weight: 600;
}

.product-card {
  border-radius: 14px;
  transition: 0.25s ease;
  border: 1px solid #F8FAFC;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.product-img {
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.product-title {
  font-weight: 600;
  font-size: 16px;
}

.product-info .desc {
  font-size: 14px;
  color: #4A90E2;
  margin-bottom: 10px;
  min-height: 40px;
}

.product-info .meta {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.image-upload-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.edit-preview {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.upload-btn {
  border-radius: 50%;
}

.swal2-confirm {
  color: #FFFFFF !important;
}
.product-card {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.35s ease;
  background: #FFFFFF;
  border: 1px solid #F8FAFC;
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
  color: #82B1FF;
  margin-bottom: 10px;
  min-height: 40px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #4A90E2;
  margin-bottom: 6px;
}

.stock {
  font-size: 13px;
  color: #82B1FF;
}

.product-actions {
  padding: 16px;
  display: flex;
  gap: 10px;
}

.edit-btn {
  flex: 1;
  border-radius: 12px;
  background: linear-gradient(135deg, #4A90E2, #82B1FF);
  color: #FFFFFF;
  font-weight: 600;
}

.delete-btn {
  flex: 1;
  border-radius: 12px;
  background: linear-gradient(135deg, #EF5350, #FF8A80);
  color: #FFFFFF;
  font-weight: 600;
}
</style>
