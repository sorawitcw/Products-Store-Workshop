<template>
  <div class="grade-calculator">
    <h1>Grade Calculator</h1>
    <div>
      <label for="percentage">Enter Percentage:</label>
      <input type="number" id="percentage" v-model.number="percentage" min="0" max="100" />
    </div>
    <p>Your Grade Is: <strong>{{ letterGrade }}</strong></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 0
    };
  },
  computed: {
    letterGrade() {
      if (this.percentage > 100 || this.percentage < 0 || Object.is(this.percentage, -0)) {
        return 'Invalid!';
      } else if (this.percentage >= 80) {
        return 'A';
      } else if (this.percentage >= 70) {
        return 'B';
      } else if (this.percentage >= 60) {
        return 'C';
      } else if (this.percentage >= 50) {
        return 'D';
      } else {
        return 'F';
      }
    }
  }
};
</script>

<style scoped>
.grade-calculator {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px auto;
}
input {
  padding: 8px;
  margin-left: 10px;
  width: 100px;
}
strong {
  color: #41b883;
}
</style>
