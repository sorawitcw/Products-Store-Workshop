<template>
  <div class="login-page">
    <div class="login-left">
      <div class="login-container">
        <!-- Logo / Brand -->
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

        <header class="login-header">
          <h1>ยินดีต้อนรับกลับ</h1>
          <p class="subtitle">เข้าสู่ระบบเพื่อช้อปปิ้งต่อ</p>
        </header>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">ชื่อผู้ใช้</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <input id="username" type="text" v-model="username" placeholder="กรอกชื่อผู้ใช้" required />
            </div>
          </div>

          <div class="form-group">
            <label for="password">รหัสผ่าน</label>
            <div class="input-wrapper">
              <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input id="password" type="password" v-model="password" placeholder="••••••••" required />
            </div>
          </div>

          <div class="actions">
            <button class="signin-btn" type="submit">
              <span>เข้าสู่ระบบ</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <p v-if="errorMessage" class="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {{ errorMessage }}
          </p>
        </form>

        <footer class="login-footer">
          <p>ยังไม่มีบัญชี? <router-link to="/register">สมัครสมาชิกฟรี</router-link></p>
        </footer>
      </div>
    </div>

    <div class="login-right">
      <div class="overlay"></div>
      <img
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070"
        alt="Shopping background"
        class="hero-image"
      />
      <div class="right-content">
        <div class="trust-badges">
          <div class="badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span>จัดส่งฟรีทั่วประเทศ</span>
          </div>
          <div class="badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
            </svg>
            <span>คืนสินค้าภายใน 30 วัน</span>
          </div>
          <div class="badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>ปลอดภัย 100%</span>
          </div>
        </div>
        <div class="content-text">
          <h2>ช้อปปิ้งที่ดีที่สุด<br/>เริ่มต้นที่นี่</h2>
          <p>สินค้าคุณภาพ ราคาโดนใจ ส่งตรงถึงมือคุณ</p>
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
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  mounted() {
    const usernameFromRegister = this.$route.query.registeredUser;
    if (usernameFromRegister) {
      this.username = usernameFromRegister;
    }
    const passwordFromRegister = this.$route.query.registeredPass;
    if (passwordFromRegister) {
      this.password = passwordFromRegister;
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        this.$router.push("/productview");
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login failed";
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

.login-page {
  display: flex;
  height: 100vh;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  background: #FFFFFF;
}

/* ─── LEFT SIDE ─── */
.login-left {
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
  padding: 48px 40px;
}

.login-container {
  width: 100%;
  max-width: 380px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
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
.login-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #4A90E2;
  margin: 0 0 6px;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #4A90E2;
  font-size: 0.95rem;
  margin: 0 0 32px;
}

/* Form */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: #4A90E2;
  margin-bottom: 7px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border-radius: 10px;
  border: 1.5px solid #F8FAFC;
  font-size: 0.95rem;
  color: #4A90E2;
  background: #FFFFFF;
  transition: all 0.2s ease;
}

.input-wrapper input::placeholder {
  color: #82B1FF;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #4A90E2;
  background: #FFFFFF;
  box-shadow: 0 0 0 4px rgba(74, 144, 226, 0.1);
}

/* Button */
.actions {
  margin-top: 8px;
}

.signin-btn {
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

.signin-btn:hover {
  background: linear-gradient(135deg, #4A90E2, #82B1FF);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.5);
  transform: translateY(-1px);
}

.signin-btn:active {
  transform: translateY(0);
}

/* Error */
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
  margin-top: 16px;
}

/* Footer */
.login-footer {
  margin-top: 28px;
  text-align: center;
  font-size: 0.875rem;
  color: #4A90E2;
}

.login-footer a {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 700;
}

.login-footer a:hover {
  text-decoration: underline;
}

/* ─── RIGHT SIDE ─── */
.login-right {
  position: relative;
  width: 55%;
  background: #4A90E2;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #4A90E2, #82B1FF) 0%,
    rgba(74, 144, 226, 0.7) 50%,
    rgba(15, 23, 42, 0.88) 100%
  );
  z-index: 1;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.75;
}

.right-content {
  position: relative;
  z-index: 2;
  padding: 0 56px 56px;
  width: 100%;
}

.trust-badges {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  padding: 10px 18px;
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: 500;
  width: fit-content;
}

.content-text {
  color: #FFFFFF;
}

.content-text h2 {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1.15;
  margin: 0 0 12px;
  letter-spacing: -1px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.content-text p {
  font-size: 1.05rem;
  opacity: 0.85;
  margin: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .login-right { display: none; }
  .login-left { width: 100%; }
}
</style>
