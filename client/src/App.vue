<template>
  <div id="app">
    <header>
      <span><img src="https://vitta.com.br/wp-content/themes/odin/assets/images/logo-vitta.svg"></span>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/users">Pacientes</router-link> |
        <router-link to="/doctors">Médicos</router-link> |
        <router-link to="/medicines">Medicamentos</router-link> |
        <router-link to="/drugs">Princípio Ativo</router-link> |
        <router-link to="/integrations">Integrações Medicamentosas</router-link> |
        <router-link to="/prescriptions">Prescrições</router-link>
      </nav>
    </header>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 60px;
  padding: 10px 20px;
  background-color: #edf1f3;
  color: #ffffff;
}

header span {
  display: block;
  float: left;
  position: relative;
  box-sizing: border-box;
  height: 50px;
  width: 130px
}

nav {
  color: rgba(0,0,0,.125);
  float: left;
  height: 50px;
  line-height: 50px;
  margin-left: 20px
}
</style>
