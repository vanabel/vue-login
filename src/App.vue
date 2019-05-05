<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav class="demo">
      <a class="brand" href="#">
        <span>Vue</span>
      </a>
      <!-- responsive -->
      <input id="bmenub" class="show" type="checkbox">
      <label class="burger pseudo button" for="bmenub">MENU</label>

      <div class="menu">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
        <router-link :to="{ name: 'Login' }" class="pseudo buttom icon-picture">Login</router-link>
        <a @click='logout' class="button icon-puzzle" href="#">Logout</a>
      </div>
    </nav>
    <div id='content'>
      <router-view/>
    </div>
  </div>
</template>

<script>
import router from './router'
import axios from 'axios'
export default {
  name: 'App',
  methods: {
    logout: (e) => {
      axios
      .get("/api/logout")
        .then(() => {
          router.push("/")
        })
    }
  }
}
</script>

<style>
@import '../node_modules/picnic/picnic.min.css';
#content {
  padding-top: 53px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
