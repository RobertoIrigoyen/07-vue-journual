<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Holiwi Munduwi</h1>
    <button @click="goToDaybook" class="btn btn-primary">Daybook</button>
    <button class="btn btn-secondary">Secondary</button>
    <button class="btn btn-success">Success</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>

