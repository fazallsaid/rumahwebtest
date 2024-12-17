<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <p>Email: <a :href="'mailto:' + user.email">{{ user.email }}</a></p>
    <p>Address: {{ user.address.street }}, {{ user.address.city }}</p>
    <!-- Tambahkan informasi lain yang ingin ditampilkan -->
  </div>
  <div v-else>
    <p>Loading user details...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const user = ref(null)

onMounted(async () => {
  const userId = route.params.id // Mengambil ID dari URL
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    user.value = await response.json()
  } catch (error) {
    console.error('Error fetching user details:', error)
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
