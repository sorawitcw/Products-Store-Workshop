<template>
  <div class="edit-page">
    <div class="edit-card">
      <h2>Edit Profile</h2>

      <form @submit.prevent="updateProfile">

        <div class="form-group">
          <label>Username</label>
          <input v-model="user.username" type="text" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>First Name</label>
            <input v-model="user.firstname" type="text" />
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input v-model="user.lastname" type="text" />
          </div>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="user.email" type="email" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Gender</label>
            <select v-model="user.gender">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>other</option>
            </select>
          </div>

          <div class="form-group">
            <label>Age</label>
            <input v-model="user.age" type="number" />
          </div>
        </div>

        <div class="btn-group">
          <button type="submit" class="btn-save">
            Save Changes
          </button>

          <button type="button" @click="$router.push('/profile')" class="btn-cancel">
            Cancel
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {}
    };
  },

  mounted() {
    this.getUser();
  },

  methods: {

    async getUser() {
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
          console.log("No user ID found in localStorage");
          return;
        }

        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        this.user = res.data;

      } catch (err) {
        console.log(err);
      }
    },

    async updateProfile() {
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
          console.log("No user ID found in localStorage");
          return;
        }

        const updateData = { ...this.user };
        delete updateData._id;
        delete updateData.__v;
        delete updateData.createdAt;
        delete updateData.updatedAt;

        await axios.put(
          `http://localhost:3000/users/${userId}`,
          updateData
        );

        // Also update local storage if user exists
        localStorage.setItem("user", JSON.stringify(this.user));

        alert("Profile updated");
        this.$router.push("/profile");

      } catch (err) {
        console.log(err);
      }
    }

  }
};
</script>

<style scoped>

.edit-page{
  min-height:100vh;
  background:#FFFFFF;
  display:flex;
  justify-content:center;
  align-items:center;
}

.edit-card{
  width:500px;
  background:white;
  padding:30px;
  border-radius:12px;
  border: 1px solid #F8FAFC;
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.edit-card h2 {
  color: #4A90E2;
  margin-bottom: 20px;
}

.form-group{
  margin-bottom:16px;
  display:flex;
  flex-direction:column;
}

.form-group label{
  font-size:14px;
  margin-bottom:5px;
  color: #4A90E2;
  font-weight: 500;
}

.form-group input,
.form-group select{
  padding:10px;
  border:1px solid #F8FAFC;
  border-radius:6px;
  color: #4A90E2;
  background: #FFFFFF;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus{
  outline: none;
  border-color: #4A90E2;
}

.form-row{
  display:flex;
  gap:10px;
}

.btn-group{
  margin-top:20px;
  display:flex;
  gap:10px;
}

.btn-save{
  background: #4A90E2;
  color: #FFFFFF;
  border:none;
  padding:10px 18px;
  border-radius:6px;
  cursor:pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-save:hover {
  background: #82B1FF;
}

.btn-cancel{
  background: #F8FAFC;
  color: #4A90E2;
  border: none;
  padding:10px 18px;
  border-radius:6px;
  cursor:pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #EF5350;
  color: #FFFFFF;
}

</style>