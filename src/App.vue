<template>
  <div id="app">
    <p class="title">Frontend Test Task</p>
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from "./components/contactForm.vue";

export default {
  name: "App",
  components: {
    ContactForm
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
}
div,
input,
button,
textarea {
  box-sizing: border-box;
}
</style>
