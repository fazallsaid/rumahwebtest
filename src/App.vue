<script setup>
import { ref, onMounted, computed } from 'vue'

const users = ref([])
const searchQuery = ref('')


onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
  } catch (error) {
    console.error('Error fetching users:', error)
  }
})

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by name"
        class="search-input"
      />
      <div v-if="filteredUsers.length > 0">
        <div class="card-grid">
          <div v-for="user in filteredUsers" :key="user.id" class="card">
            <router-link :to="'/user/' + user.id" class="card-link">
              <h3>{{ user.name }}</h3>
              <p>Email: <a :href="'mailto:' + user.email">{{ user.email }}</a></p>
              <p>Address: {{ user.address.street }}, {{ user.address.city }}</p>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="loading">
        <p>Loading user data...</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.search-input {
  margin-bottom: 20px; /* Menambahkan margin untuk input pencarian */
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  max-width: 400px; /* Membatasi lebar input pencarian */
}

header {
  line-height: 1.5;
  max-height: 100vh;
  padding: 20px;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.card-grid {
  display: flex;
  flex-direction: row; /* Mengubah arah flex menjadi mendatar */
  gap: 1.5rem;
  justify-content: flex-start;
  overflow-x: auto;
}

.card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  color: #333;
  text-align: center;
  min-width: 300px;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card h3 {
  margin: 0 0 10px;
  font-size: 1.2rem;
}

.card p {
  margin: 5px 0;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>
