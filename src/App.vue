<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo" @click="goHero">
          <span class="logo-icon">📚</span>
          <div class="logo-text">
            <span class="logo-kicker">Language lab</span>
            <h1>Linguade</h1>
          </div>
        </div>

        <div class="theme-buttons">
          <router-link
            v-for="theme in themes"
            :key="theme.id"
            :to="theme.theme === 'Hero' ? '/' : theme.route"
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
    };
  },
  created() {
    this.themes = loadAllThemes();
  },
  methods: {
    goHero() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
#app {
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background:
    radial-gradient(circle at top left, rgba(123, 156, 255, 0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(255, 202, 107, 0.12), transparent 28%),
    #f4f7ff;
  color: #15224d;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 20;
  background: linear-gradient(135deg, rgba(23, 35, 91, 0.92), rgba(37, 56, 152, 0.9));
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 10px 30px rgba(11, 18, 48, 0.14);
}

.nav-container {
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.85rem;
  cursor: pointer;
  user-select: none;
}

.logo-icon {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #ffe7a1, #ffbf69);
  box-shadow: 0 10px 18px rgba(255, 190, 90, 0.35);
  font-size: 1.4rem;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-kicker {
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(220, 233, 255, 0.7);
  margin-bottom: 0.2rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: white;
}

.theme-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.6rem;
}

.theme-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.72rem 1.1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.theme-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  color: white;
  transform: translateY(-2px);
}

.theme-btn.active {
  background: linear-gradient(135deg, #ffd76a, #f9c74f);
  color: #1d2b6d;
  border-color: transparent;
  box-shadow: 0 8px 18px rgba(255, 205, 97, 0.3);
}

.content {
  width: 100%;
  margin: 0;
  padding: 2rem;
}

@media (max-width: 768px) {
  .navbar {
    position: sticky;
    top: 0;
  }

  .nav-container {
    flex-direction: row;
    align-items: center;
    padding: 0.7rem 0.9rem;
    gap: 0.75rem;
  }

  .logo {
    flex-shrink: 0;
  }

  .logo-kicker {
    display: none;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .theme-buttons {
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding-bottom: 0.2rem;
  }

  .theme-buttons::-webkit-scrollbar {
    display: none;
  }

  .theme-btn {
    flex: 0 0 auto;
    font-size: 0.72rem;
    padding: 0.45rem 0.75rem;
    white-space: nowrap;
  }

  .content {
    padding: 1rem;
  }
}
</style>

