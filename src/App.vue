<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo" @click="goHome">
          <span class="logo-icon">📚</span>
          <h1>Linguade</h1>
        </div>
        <div class="theme-buttons">
          <router-link
            v-for="theme in themes"
            :key="theme.id"
            :to="theme.theme === 'Home' ? '/' : theme.route"
            class="theme-btn"
            active-class="active"
          >
            {{ theme.theme }}
          </router-link>
        </div>
      </div>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { loadAllThemes } from './services/dataService';

export default {
  name: 'App',
  data() {
    return {
      themes: []
    }
  },
  created() {
    this.themes = loadAllThemes();
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  background: #f0f2f5;
}

.navbar {
  background: #1a237e;
  color: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  margin-bottom: 1rem;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.theme-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.theme-btn {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-decoration: none;
  font-weight: 500;
}

.theme-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.theme-btn.active {
  background: #ffd54f;
  color: #1a237e;
  border-color: #ffd54f;
}

.content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0.8rem 1rem;
  }
  
  .logo h1 {
    font-size: 1.2rem;
  }
  
  .theme-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .content {
    padding: 1rem;
  }
}
</style>
