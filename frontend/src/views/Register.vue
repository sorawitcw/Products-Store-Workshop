<template>
  <div class="register-page">
    <div class="register-right">
      <div class="overlay"></div>
      <img
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070"
        alt="Register background"
        class="hero-image"
      />
      <div class="right-content">
        <div class="perks">
          <div class="perk-item">
            <div class="perk-icon">✦</div>
            <div>
              <strong>สินค้าหลากหลาย</strong>
              <p>เลือกช้อปสินค้ากว่าหมื่นรายการ</p>
            </div>
          </div>
          <div class="perk-item">
            <div class="perk-icon">✦</div>
            <div>
              <strong>ดีลพิเศษสำหรับสมาชิก</strong>
              <p>รับสิทธิ์ส่วนลดและโปรโมชั่นก่อนใคร</p>
            </div>
          </div>
          <div class="perk-item">
            <div class="perk-icon">✦</div>
            <div>
              <strong>ติดตามออร์เดอร์ได้ทุกที่</strong>
              <p>เช็คสถานะพัสดุแบบเรียลไทม์</p>
            </div>
          </div>
        </div>
        <div class="content-text">
          <h2>เริ่มต้นช้อปปิ้ง<br/>อย่างชาญฉลาด</h2>
          <p>สมัครฟรี ไม่มีค่าใช้จ่ายใดๆ</p>
        </div>
      </div>
    </div>

    <div class="register-left">
      <div class="register-container">
        <!-- Brand -->
        <div class="brand">
          <div class="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <span class="brand-name">ShopHub</span>
        </div>

        <header class="register-header">
          <h1>สร้างบัญชีใหม่</h1>
          <p class="subtitle">กรอกข้อมูลเพื่อเริ่มช้อปปิ้งวันนี้</p>
        </header>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label>ชื่อผู้ใช้</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input v-model="form.username" type="text" placeholder="johndoe123" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>ชื่อจริง</label>
              <input v-model="form.firstname" type="text" placeholder="สมชาย" required />
            </div>
            <div class="form-group">
              <label>นามสกุล</label>
              <input v-model="form.lastname" type="text" placeholder="ใจดี" required />
            </div>
          </div>

          <div class="form-group">
            <label>อีเมล</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input v-model="form.email" type="email" placeholder="name@example.com" required />
            </div>
          </div>

          <div class="form-group">
            <label>รหัสผ่าน</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input v-model="form.password" type="password" placeholder="อย่างน้อย 8 ตัวอักษร" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>เพศ</label>
              <div class="select-wrapper">
                <select v-model="form.gender">
                  <option value="">เลือก</option>
                  <option value="Male">ชาย</option>
                  <option value="Female">หญิง</option>
                  <option value="other">อื่นๆ</option>
                </select>
                <svg class="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>
            <div class="form-group">
              <label>อายุ</label>
              <input v-model="form.age" type="number" min="0" placeholder="25" />
            </div>
          </div>

          <div class="actions">
            <button class="signup-btn" type="submit">
              <span>สมัครสมาชิก</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <p v-if="message" class="success-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {{ message }}
          </p>
          <p v-if="errorMessage" class="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ errorMessage }}
          </p>
        </form>

        <footer class="register-footer">
          <p>มีบัญชีอยู่แล้ว? <router-link to="/login">เข้าสู่ระบบ</router-link></p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
        age: "",
      },
      message: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleRegister() {
      try {
        await axios.post("http://localhost:3000/users", this.form);
        this.message = "สมัครสมาชิกสำเร็จ!";
        this.errorMessage = "";
        this.$router.push({
          path: "/login",
          query: { registeredUser: this.form.username, registeredPass: this.form.password },
        });
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Register failed";
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

.register-page {
  display: flex;
  height: 100vh;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: #FFFFFF;
}

/* ─── LEFT (FORM) ─── */
.register-left {
  width: 52%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 32px 40px;
  overflow-y: auto;
}

.register-container {
  width: 100%;
  max-width: 440px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4A90E2, #82B1FF);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.35);
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: #4A90E2;
  letter-spacing: -0.5px;
}

/* Header */
.register-header h1 {
  font-size: 1.85rem;
  font-weight: 800;
  color: #4A90E2;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #4A90E2;
  font-size: 0.92rem;
  margin: 0 0 24px;
}

/* Form Row */
.form-row {
  display: flex;
  gap: 14px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.78rem;
  font-weight: 600;
  color: #4A90E2;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Inputs */
.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 11px 13px 11px 40px;
  border-radius: 9px;
  border: 1.5px solid #F8FAFC;
  font-size: 0.92rem;
  color: #4A90E2;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.form-group input {
  width: 100%;
  padding: 11px 13px;
  border-radius: 9px;
  border: 1.5px solid #F8FAFC;
  font-size: 0.92rem;
  color: #4A90E2;
  background: #FFFFFF;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-group input::placeholder,
.input-wrapper input::placeholder {
  color: #82B1FF;
}

.form-group input:focus,
.input-wrapper input:focus {
  outline: none;
  border-color: #4A90E2;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.1);
}

/* Select */
.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  padding: 11px 36px 11px 13px;
  border-radius: 9px;
  border: 1.5px solid #F8FAFC;
  font-size: 0.92rem;
  color: #4A90E2;
  background: #FFFFFF;
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.select-wrapper select:focus {
  outline: none;
  border-color: #4A90E2;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.1);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

/* Button */
.actions {
  margin-top: 8px;
}

.signup-btn {
  width: 100%;
  padding: 13px 20px;
  background: linear-gradient(135deg, #4A90E2, #82B1FF);
  border: none;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(74, 144, 226, 0.4);
  letter-spacing: 0.2px;
}

.signup-btn:hover {
  background: linear-gradient(135deg, #4A90E2, #82B1FF);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.5);
  transform: translateY(-1px);
}

.signup-btn:active {
  transform: translateY(0);
}

/* Messages */
.success-message {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #4A90E2;
  background: #FFFFFF;
  border: 1px solid #F8FAFC;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 14px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #4A90E2;
  background: #FFFFFF;
  border: 1px solid #F8FAFC;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-top: 14px;
}

/* Footer */
.register-footer {
  margin-top: 22px;
  text-align: center;
  font-size: 0.875rem;
  color: #4A90E2;
}

.register-footer a {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 700;
}

.register-footer a:hover {
  text-decoration: underline;
}

/* ─── RIGHT (VISUAL) ─── */
.register-right {
  position: relative;
  width: 48%;
  background: #4A90E2;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #4A90E2, #82B1FF) 0%,
    rgba(30, 58, 95, 0.7) 40%,
    rgba(15, 23, 42, 0.9) 100%
  ;
  z-index: 1;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
}

.right-content {
  position: relative;
  z-index: 2;
  padding: 0 48px 52px;
  width: 100%;
}

.perks {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 44px;
}

.perk-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  color: #FFFFFF;
}

.perk-icon {
  font-size: 1rem;
  color: #4A90E2;
  margin-top: 2px;
  flex-shrink: 0;
}

.perk-item strong {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 2px;
}

.perk-item p {
  font-size: 0.82rem;
  opacity: 0.75;
  margin: 0;
}

.content-text {
  color: #FFFFFF;
}

.content-text h2 {
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 10px;
  letter-spacing: -1px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.content-text p {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .register-right { display: none; }
  .register-left { width: 100%; }
}
</style>
