<template>
  <div>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Dashboard</router-link>
      <router-link to="/manager-user" class="nav-link">Manager User</router-link>
      <router-link to="/manager-product" class="nav-link">Manager Product</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around; 
  background-color: #090a0a; 
  padding: 10px 0; 
}

.nav-link {
  color: white; 
  text-decoration: none; 
  font-weight: bold; 
  padding: 10px 15px; 
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #090909; 
  border-radius: 4px; 
}
</style>
