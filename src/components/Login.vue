<template>
  <div>
    <h2>Login</h2>
    <form @submit="login" class="fourth login">
      <input type="email" name="email"  autocomplete="email" class='stack' placeholder="username/email">
      <br>
      <input type="password" name="password" autocomplete="current-password" class='stack' placeholder="password">
      <br>
      <div class="button message error stack" v-if="message != ''">
        <span>{{ message }}</span>
      </div>
      <input type="submit" class='stack icon-paper-plane submit'>
      <br>
    </form>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios"
export default {
  name: "Login",
  data() {
    return {
      message: ''
    }
  },
  methods: {
    login: function(e) {
      let self = this;
      e.preventDefault();
      let email = e.target.elements.email.value; //"user@email.com";
      let password = e.target.elements.password.value; //"password";
      let login = (vue) => {
        let data = {
          email: email,
          password: password
        }
        axios.post("/api/login", data)
          .then((response) => {
            console.log("Logged in");
            router.push("/dashboard");
          })
          .catch((error) => {
            console.log("Cannot login");
            vue.$set(this, "message", error.response.data.info.message);
          });
      }
      login(self);
    },
  }
}
</script>
<style>
.login{
  margin:0 auto;
}
.submit{
  width: 45%;
  text-align: center;
  margin: 0 auto;
}
.message{
  margin-bottom: 1em;
}
</style>
