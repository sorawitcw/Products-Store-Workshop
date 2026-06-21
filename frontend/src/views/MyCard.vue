<template>
  <div>
    <section id="home" class="section home">
      <div class="night">
        <div class="shooting_star" v-for="i in 20" :key="i"></div>
      </div>

      <div class="home-container">
        <div class="profile-image">
          <img src="../assets/IMG_0172.jpg" alt="profile" />
        </div>

        <div class="info-container">
          <div class="title-box">
            <h1>My Profile</h1>
          </div>

          <div class="card">
            <h2>Sorawit Taothong</h2>
            <h3>Peanut</h3>
            <br />
            <p>Suranaree University of Technology</p>
            <p>Computer Engineering</p>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section about">
      <div class="night">
        <div class="shooting_star" v-for="i in 20" :key="'about' + i"></div>
      </div>

      <div class="about-container">
        <h2 class="about-title">About Me</h2>

        <div class="card-grid">
          <v-card class="info-card" @click="dialogHobby = true">
            <v-icon size="40" class="card-icon">mdi-heart</v-icon>
            <h3>Hobbies</h3>
            <p>Things I enjoy doing in my free time</p>
          </v-card>

          <v-card class="info-card" @click="dialogSkill = true">
            <v-icon size="40" class="card-icon">mdi-code-tags</v-icon>
            <h3>Skills</h3>
            <p>Technical and professional abilities</p>
          </v-card>

          <v-card class="info-card" @click="dialogFavorites = true">
            <v-icon size="40" class="card-icon">mdi-star-outline</v-icon>
            <h3>Favorites</h3>
            <p>Things and interests I really like</p>
          </v-card>
        </div>
      </div>
    </section>

    <v-dialog v-model="dialogHobby" max-width="400">
      <v-card class="pa-4">
        <v-card-title class="text-h6 font-weight-bold">
          My Hobbies
        </v-card-title>

        <v-card-text>
          <ul>
            <li>Studying Japanese</li>
            <li>Watching anime</li>
            <li>Reading manga</li>
            <li>Jogging</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialogHobby = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSkill" max-width="500">
      <v-card class="pa-4">
        <v-card-title class="text-h6 font-weight-bold"> Skills </v-card-title>

        <v-card-text>
          <h4>Technical Skills</h4>
          <ul>
            <li>
              <strong>Programming:</strong> TypeScript, Go, JavaScript, Python
            </li>
            <li>
              <strong>Web Development:</strong> HTML, CSS, React, Vue.js,
              Node.js
            </li>
            <li><strong>Databases:</strong> MySQL, MongoDB, SQLite</li>
            <li>
              <strong>Networking:</strong> Core Networking (TCP/IP, OSI),
              Network Configuration, Cisco Packet Tracer
            </li>
            <li>
              <strong>Hardware & IoT:</strong> Arduino, Raspberry Pi, Basic IoT
              Concepts
            </li>
            <li><strong>Tools:</strong> Figma, Postman, GitHub, Draw.io</li>
          </ul>

          <h4>Soft Skills</h4>
          <ul>
            <li>Problem Solving</li>
            <li>Adaptability</li>
            <li>Continuous Learning</li>
            <li>Communication</li>
            <li>Time Management</li>
          </ul>

          <h4>Languages</h4>
          <ul>
            <li><strong>Thai:</strong> Native</li>
            <li><strong>English:</strong> Intermediate</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialogSkill = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogFavorites" max-width="500">
      <v-card class="pa-4">
        <v-card-title class="text-h6 font-weight-bold">
          My Favorites
        </v-card-title>

        <v-card-text>
          <h4>Favorite Movie</h4>
          <ul>
            <li>Avengers: Endgame</li>
          </ul>

          <h4 class="mt-4">Favorite Anime</h4>
          <ul>
            <li>My Hero Academia</li>
          </ul>

          <h4 class="mt-4">Favorite Animal</h4>
          <ul>
            <li>Cats</li>
          </ul>

          <h4 class="mt-4">Favorite Football Team</h4>
          <ul>
            <li>Kawasaki Frontale</li>
          </ul>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialogFavorites = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <section id="contact" class="section contact">
      <div class="night">
        <div class="shooting_star" v-for="i in 20" :key="'contact' + i"></div>
      </div>

      <div class="contact-container">
        <h2 class="contact-title">Contact Me</h2>

        <div class="contact-grid">
          <v-card class="contact-card">
            <v-icon size="35" class="contact-icon"> mdi-email-outline </v-icon>
            <h3>Email</h3>
            <a href="sorawit.cw@gmail.com"> sorawit.cw@gmail.com </a>
          </v-card>

          <v-card class="contact-card">
            <v-icon size="35" class="contact-icon"> mdi-phone-outline </v-icon>
            <h3>Phone</h3>
            <a href="tel:0659394156"> 065-939-4156 </a>
          </v-card>

          <v-card class="contact-card">
            <v-icon size="35" class="contact-icon"> mdi-facebook </v-icon>
            <h3>Facebook</h3>
            <a
              href="https://www.facebook.com/sorawit.taothong.3/"
              target="_blank"
            >
              facebook.com/sorawit.taothong
            </a>
          </v-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogHobby: false,
      dialogSkill: false,
      dialogFavorites: false,
    };
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: "Segoe UI", sans-serif;
}

.section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home,
.about,
.contact {
  position: relative;
  background: #FFFFFF;
  color: #FFFFFF;
  overflow: hidden;
}

.night {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
  top: 0;
  left: 0;
  z-index: 0;
}

.shooting_star {
  position: absolute;
  top: 50%;
  left: 50%;
  height: 2px;
  background: linear-gradient(135deg, #4A90E2, #82B1FF);
  border-radius: 999px;
  filter: drop-shadow(0 0 6px #4A90E2);
  animation: tail 3s ease-in-out infinite, shooting 3s ease-in-out infinite;
}

@keyframes tail {
  0% {
    width: 0;
  }
  30% {
    width: 100px;
  }
  100% {
    width: 0;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(300px);
  }
}

.about-container,
.contact-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.about-title,
.contact-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 50px;
  color: #FFFFFF;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.info-card {
  padding: 40px 30px;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.35s ease;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(74, 144, 226, 0.15);
}

.info-card h3 {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #4A90E2;
}

.info-card p {
  margin-top: 10px;
  font-size: 14px;
  color: #82B1FF;
}

.card-icon {
  color: #4A90E2;
}

.info-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(74, 144, 226, 0.15);
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.home-container {
  display: flex;
  align-items: center;
  gap: 80px;
}

.info-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.profile-image img {
  width: 320px;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 4px solid white;
  transition: 0.3s;
}

.profile-image img:hover {
  transform: translateY(-8px);
}

.title-box,
.card {
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  color: #FFFFFF;
  backdrop-filter: blur(10px);
  transition: 0.3s;
}

.title-box:hover,
.card:hover {
  transform: translateY(-8px);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.contact-card {
  padding: 30px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.contact-icon {
  margin-bottom: 15px;
}

.contact-card a {
  color: #4A90E2;
  text-decoration: none;
  font-weight: 500;
}

.contact-card a:hover {
  color: #82B1FF;
  text-decoration: underline;
}

.close-btn {
  color: #4A90E2;
  background: transparent;
  font-weight: 600;
}
</style>
