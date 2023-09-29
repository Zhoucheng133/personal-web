<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#FFA600',
      },
    }"
  >
    <router-view></router-view>
  </a-config-provider>
</template>

<style>
::selection {
  color: white;
  background-color: rgb(255, 200, 0);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin: 0;
}
body{
  margin: 0;
}
</style>
