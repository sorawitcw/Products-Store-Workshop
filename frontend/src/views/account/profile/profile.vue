<template>
  <div class="profile-page">
    <div class="profile-container">
      <aside class="profile-sidebar">
        <div class="user-info">
          <div class="avatar-wrapper">
            <img
              src="https://ui-avatars.com/api/?name=User&background=4A90E2&color=fff&size=128"
              alt="Avatar"
              class="avatar"
            />
            <button class="edit-avatar">
              <i class="fas fa-camera"></i>
            </button>
          </div>
          <h3>{{ user.firstname }} {{ user.lastname }}</h3>
          <p class="user-role">User</p>
        </div>

        <nav class="sidebar-nav">
          <a href="#" class="active">
            <i class="fas fa-user"></i> Personal Info
          </a>

          <router-link to="/myorder">
            <i class="fas fa-shopping-bag"></i> My Orders
          </router-link>

          <button @click="handleLogout" class="logout-link">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </nav>
      </aside>

      <main class="profile-main">
        <header class="main-header">
          <h2>Account Settings</h2>
          <p>Manage your profile information and account preferences.</p>
        </header>

        <section class="info-grid">
          <div class="info-card">
            <div class="card-header">
              <h3>Personal Information</h3>
              <button class="btn-edit" @click="$router.push('/editprofile')">
                Edit
              </button>
            </div>

            <div class="card-body">
              <div class="detail-item">
                <label>Username</label>
                <span>{{ user.username }}</span>
              </div>
              <div class="detail-item">
                <label>Full Name</label>
                <span>{{ user.firstname }} {{ user.lastname }}</span>
              </div>
              <div class="detail-item">
                <label>Email Address</label>
                <span>{{ user.email }}</span>
              </div>
              <div class="detail-row">
                <div class="detail-item">
                  <label>Gender</label>
                  <span>{{ user.gender || "Not specified" }}</span>
                </div>
                <div class="detail-item">
                  <label>Age</label>
                  <span>{{ user.age || "-" }} years old</span>
                </div>
              </div>
            </div>
          </div>

          <div class="info-card">
            <div class="card-header">
              <h3>Security</h3>
            </div>
            <div class="card-body">
              <div class="detail-item">
                <label>Password</label>
                <span>••••••••••••</span>
                <button class="text-link">Change Password</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // จำลองข้อมูล (ในหน้างานจริงควรดึงจาก API หรือ Vuex)
      user: {
        username: "loading...",
        firstname: "Guest",
        lastname: "User",
        email: "example@store.com",
        gender: "",
        age: "",
      },
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      try {
        let userId = "";
        const userDataStr = localStorage.getItem("user");
        if (userDataStr) {
          try {
            const userData = JSON.parse(userDataStr);
            userId = userData._id;
          } catch (e) {
            console.error("Error parsing user data:", e);
          }
        }

        if (!userId) {
          userId = localStorage.getItem("userId");
        }

        if (!userId) {
          console.log("No user in localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );

        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #FFFFFF;
  padding: 40px 20px;
  font-family: "Inter", sans-serif;
}

.profile-container {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
}

/* SIDEBAR */
.profile-sidebar {
  width: 280px;
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.user-info {
  text-align: center;
  margin-bottom: 30px;
}

.avatar-wrapper {
  position: relative;
  width: 100px;
  margin: 0 auto 15px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #FFFFFF;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.edit-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #4A90E2;
  color: #FFFFFF;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
}

.user-info h3 {
  font-size: 1.25rem;
  margin-bottom: 5px;
  color: #4A90E2;
}

.user-role {
  font-size: 0.875rem;
  color: #82B1FF;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  color: #4A90E2;
  font-weight: 500;
  transition: all 0.2s;
}

.sidebar-nav a.active {
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
}

.sidebar-nav a:hover:not(.active) {
  background: #F8FAFC;
  color: #4A90E2;
}

.logout-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  margin-top: 20px;
  border: none;
  background: none;
  width: 100%;
  cursor: pointer;
  color: #EF5350;
}

.logout-link:hover {
  background: rgba(239, 83, 80, 0.1);
}

/* MAIN CONTENT */
.profile-main {
  flex: 1;
}

.main-header {
  margin-bottom: 30px;
}

.main-header h2 {
  font-size: 1.875rem;
  color: #4A90E2;
  margin-bottom: 8px;
}

.main-header p {
  color: #82B1FF;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.info-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #F8FAFC;
}

.btn-edit {
  padding: 6px 16px;
  border: 1px solid #F8FAFC;
  border-radius: 6px;
  background: #F8FAFC;
  color: #4A90E2;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #4A90E2;
  color: #FFFFFF;
}

.detail-item {
  margin-bottom: 20px;
}

.detail-row {
  display: flex;
  gap: 40px;
}

.detail-item label {
  display: block;
  font-size: 0.875rem;
  color: #82B1FF;
  margin-bottom: 4px;
}

.detail-item span {
  font-size: 1rem;
  font-weight: 500;
  color: #4A90E2;
}

.text-link {
  background: none;
  border: none;
  color: #4A90E2;
  padding: 0;
  margin-left: 15px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
  }
  .profile-sidebar {
    width: 100%;
  }
}
</style>
