<template>
  <div class="register-page">
    <div class="register-left">
      <div class="register-container">
        <header class="register-header">
          <h1>Create Account</h1>
          <p class="subtitle">Join our community and start shopping today.</p>
        </header>

        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label>Username</label>
            <input
              v-model="form.username"
              type="text"
              placeholder="johndoe123"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input
                v-model="form.firstname"
                type="text"
                placeholder="John"
                required
              />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input
                v-model="form.lastname"
                type="text"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="name@company.com"
              required
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Gender</label>
              <select v-model="form.gender">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div class="form-group">
              <label>Age</label>
              <input
                v-model="form.age"
                type="number"
                min="0"
                placeholder="25"
              />
            </div>
          </div>

          <div class="actions">
            <button class="signup-btn" type="submit">Create Account</button>
          </div>

          <p v-if="message" class="success-message">{{ message }}</p>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>

        <footer class="register-footer">
          <p>
            Already have an account?
            <router-link to="/login">Sign in</router-link>
          </p>
        </footer>
      </div>
    </div>

    <div class="register-right">
      <div class="overlay"></div>
      <div class="content-text">
        <h2>Start Your Journey With Us</h2>
        <p>
          Get access to exclusive offers and a seamless shopping experience.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070"
        alt="Register background"
        class="hero-image"
      />
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

        this.message = "Register success";
        this.errorMessage = "";

        // ไปหน้า login
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
.register-page {
  display: flex;
  height: 100vh;
  font-family: "Inter", sans-serif;
  background-color: #f9fafb;
}

/* LEFT SIDE */
.register-left {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 40px;
  overflow-y: auto; /* เผื่อกรณีจอเล็กให้ scroll ในฟอร์มได้ */
}

.register-container {
  width: 100%;
  max-width: 450px;
}

.register-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 24px;
}

/* Form Styles */
.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 6px;
  color: #374151;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 0.95rem;
  transition: all 0.2s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #ff4d4f;
  box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.1);
}

/* Button */
.signup-btn {
  width: 100%;
  padding: 12px;
  background: #ff4d4f; /* สีเดียวกับปุ่ม Login */
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

.signup-btn:hover {
  background: #e03e3f;
}

/* Messages */
.error-message {
  color: #dc2626;
  background: #fef2f2;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-top: 16px;
  text-align: center;
}

.success-message {
  color: #059669;
  background: #ecfdf5;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-top: 16px;
  text-align: center;
}

.register-footer {
  margin-top: 24px;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.register-footer a {
  color: #ff4d4f;
  text-decoration: none;
  font-weight: 600;
}

/* RIGHT SIDE (Visual) */
.register-right {
  position: relative;
  width: 50%;
  background: #111827;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 77, 79, 0.4) 0%,
    rgba(17, 24, 39, 0.8) 100%
  );
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-text {
  position: absolute;
  bottom: 60px;
  left: 60px;
  z-index: 2;
  color: white;
  max-width: 400px;
}

.content-text h2 {
  font-size: 2.2rem;
  margin-bottom: 12px;
}

/* Responsive */
@media (max-width: 1024px) {
  .register-right {
    display: none;
  }
  .register-left {
    width: 100%;
  }
}
</style>
