<template>
  <div class="login-page">
    <div class="login-left">
      <div class="login-container">
        <header class="login-header">
          <h1>Welcome Back</h1>
          <p class="subtitle">
            Please enter your details to sign in to your account.
          </p>
        </header>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="username" v-model="username" required />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" required />
          </div>

          <!-- <div class="login-options">
            <label class="remember-me">
              <input type="checkbox" />
              <span>Remember for 30 days</span>
            </label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div> -->

          <div class="actions">
            <button class="signin-btn" type="submit">Sign in</button>
            <!-- <button class="google-btn" type="button">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                width="18"
              />
              Sign in with Google
            </button> -->
          </div>

          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>
        </form>

        <footer class="login-footer">
          <p>
            Don't have an account?
            <router-link to="/register">Sign up for free</router-link>
          </p>
        </footer>
      </div>
    </div>

    <div class="login-right">
      <div class="overlay"></div>
      <div class="content-text">
        <h2>Your Premium Store Experience</h2>
        <p>
          Discover curated collections and exclusive deals designed just for
          you.
        </p>
      </div>
      <img
        src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070"
        alt="Sport background"
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
      username: "", // เดี๋ยวค่าจะมาทับตรงนี้
      password: "",
      errorMessage: "",
    };
  },
  mounted() {
    const usernameFromRegister = this.$route.query.registeredUser;
    if (usernameFromRegister) {
      this.username = usernameFromRegister;
      console.log("Welcome! Your username is pre-filled.");
    }
    const passwordFromRegister = this.$route.query.registeredPass;
    if (passwordFromRegister) {
      this.password = passwordFromRegister;
    }

    if (usernameFromRegister || passwordFromRegister) {
      console.log("Credentials pre-filled from registration.");
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });

        // เก็บ token
        localStorage.setItem("userId", res.data.user._id);
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
/* Base Styles */
.login-page {
  display: flex;
  height: 100vh;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1a1a1a;
  background-color: #f9fafb;
}

/* LEFT SIDE */
.login-left {
  width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 40px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-header h1 {
  font-size: 2.2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  margin-bottom: 32px;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 6px;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #ff4d4f;
  box-shadow: 0 0 0 4px rgba(255, 77, 79, 0.1);
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 24px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4b5563;
}

.remember-me input {
  margin-right: 8px;
  accent-color: #ff4d4f;
}

.forgot-link {
  color: #ff4d4f;
  text-decoration: none;
  font-weight: 600;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Buttons */
.actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.signin-btn {
  width: 100%;
  padding: 12px;
  background: #ff4d4f;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.signin-btn:hover {
  background: #e03e3f;
}

.google-btn {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.google-btn:hover {
  background: #f3f4f6;
}

.error-message {
  color: #dc2626;
  background: #fef2f2;
  padding: 10px;
  border-radius: 6px;
  font-size: 0.875rem;
  margin-top: 16px;
  text-align: center;
}

.login-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.login-footer a {
  color: #ff4d4f;
  text-decoration: none;
  font-weight: 600;
}

/* RIGHT SIDE (Visual) */
.login-right {
  position: relative;
  width: 55%;
  background: #111827; /* Dark fallback */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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
  opacity: 0.8;
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
  font-size: 2.5rem;
  margin-bottom: 12px;
  line-height: 1.2;
}

.content-text p {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Responsive */
@media (max-width: 900px) {
  .login-right {
    display: none;
  }
  .login-left {
    width: 100%;
  }
}
</style>
