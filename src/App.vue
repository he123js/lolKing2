<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-dialog-provider>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  height: 100%;
}
</style>
