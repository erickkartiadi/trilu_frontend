<template>
  <div id="app">
    <my-header>

    </my-header>
    <router-view>

    </router-view>
  </div>
</template>

<script>
  import Header from './components/shared/Header.vue';
  export default {
    components: {
      'my-header': Header
    }
  }
</script>

<style>
  body {
    margin: 0;
  }
</style>