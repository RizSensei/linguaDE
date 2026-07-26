<template>
  <div class="not-found">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <div class="suggestions">
        <p>Here are some helpful links instead:</p>
        <div class="action-buttons">
          <router-link to="/" class="btn-primary">
            🏠 Go to Home
          </router-link>
          <router-link to="/daily-activities" class="btn-secondary">
            📚 Browse Themes
          </router-link>
        </div>
      </div>
      <div class="theme-suggestions">
        <p class="suggestion-label">Popular Themes:</p>
        <div class="theme-tags">
          <router-link 
            v-for="theme in popularThemes" 
            :key="theme.route"
            :to="theme.route"
            class="theme-tag"
          >
            {{ theme.name }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadAllThemes } from '../services/dataService';

export default {
  name: 'NotFound',
  data() {
    return {
      popularThemes: []
    }
  },
  created() {
    const themes = loadAllThemes();
    // Show first 5 themes as suggestions
    this.popularThemes = themes.slice(0, 5).map(theme => ({
      name: theme.theme,
      route: theme.route
    }));
  }
}
</script>

<style scoped>
.not-found {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.not-found-content {
  max-width: 600px;
  width: 100%;
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.error-code {
  font-size: 8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #1a237e 0%, #4a148c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.not-found h1 {
  font-size: 2rem;
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.not-found p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.suggestions {
  margin: 2rem 0;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: #1a237e;
  color: white;
}

.btn-primary:hover {
  background: #0d1445;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
}

.btn-secondary {
  background: #e8eaf6;
  color: #1a237e;
}

.btn-secondary:hover {
  background: #c5cae9;
  transform: translateY(-2px);
}

.theme-suggestions {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e8eaf6;
}

.suggestion-label {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
}

.theme-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.theme-tag {
  background: #f5f6ff;
  color: #1a237e;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.theme-tag:hover {
  background: #1a237e;
  color: white;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 5rem;
  }
  
  .not-found h1 {
    font-size: 1.5rem;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    justify-content: center;
  }
}
</style>