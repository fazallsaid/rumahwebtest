<template>
  <div class="detail-user">
    <h2>User Details</h2>
    <div v-if="user">
      <h3>{{ user.name }}</h3>
      <p>Email: <a :href="'mailto:' + user.email">{{ user.email }}</a></p>
      <p>Address: {{ user.address.street }}, {{ user.address.city }}</p>
      <p>Phone: {{ user.phone }}</p>
      <p>Website: <a :href="'http://' + user.website" target="_blank">{{ user.website }}</a></p>
    </div>
    <div v-else>
      <p>Loading user details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(null)

onMounted(async () => {
  const userId = route.params.id // Ambil ID dari parameter rute
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    user.value = await response.json()
  } catch (error) {
    console.error('Error fetching user details:', error)
  }
})
</script>

<style scoped>
.detail-user {
  padding: 20px;
}
</style>
