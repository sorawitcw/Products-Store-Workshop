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
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData._id;

        const res = await axios.get(`http://localhost:3000/users/${userId}`);

        this.user = res.data;

      } catch (err) {
        console.log(err);
      }
    },

    async updateProfile() {
      try {

        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData._id;

        await axios.put(
          `http://localhost:3000/users/${userId}`,
          this.user
        );

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
  background:#f5f5f5;
  display:flex;
  justify-content:center;
  align-items:center;
}

.edit-card{
  width:500px;
  background:white;
  padding:30px;
  border-radius:12px;
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.form-group{
  margin-bottom:16px;
  display:flex;
  flex-direction:column;
}

.form-group label{
  font-size:14px;
  margin-bottom:5px;
}

.form-group input,
.form-group select{
  padding:10px;
  border:1px solid #ddd;
  border-radius:6px;
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
  background:#ff4d4f;
  color:white;
  border:none;
  padding:10px 18px;
  border-radius:6px;
  cursor:pointer;
}

.btn-cancel{
  background:#ddd;
  border:none;
  padding:10px 18px;
  border-radius:6px;
  cursor:pointer;
}

</style>