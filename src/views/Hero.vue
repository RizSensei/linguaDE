<template>
  <div class="hero">
    <!-- <div class="hero">
      <h1>Welcome to Language Learning</h1>
      <p>Select a theme to start learning German vocabulary</p>
      <div class="hero-stats">
        <span>📚 {{ themes.length }} themes available</span>
      </div>
    </div> -->
    
    <div class="theme-grid">
      <div 
        v-for="theme in themes" 
        :key="theme.id"
        class="theme-card"
        @click="navigateToTheme(theme.route)"
      >
        <div class="theme-icon">{{ getThemeIcon(theme.theme) }}<h3>{{ theme.theme }}</h3></div>
        
        <!-- <div class="theme-meta">
          <span class="meta-item">📝 {{ getWordCount(theme) }} words</span>
          <span class="meta-item">💬 {{ theme.sentences?.length || 0 }} sentences</span>
        </div> -->
        <button class="explore-btn">Start Learning →</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadAllThemes } from '../services/dataService';

export default {
  name: 'Hero',
  data() {
    return {
      themes: []
    }
  },
  created() {
    this.themes = loadAllThemes();
  },
  methods: {
    navigateToTheme(route) {
      this.$router.push(route);
    },
    getThemeIcon(themeName) {
      const icons = {
        'Daily Activities': '🌅',
        'Travel': '✈️',
        'Food & Cooking': '🍳',
        'Business': '💼',
        'Health': '🏥',
        'Education': '📚',
        'Technology': '💻',
        'Sports': '⚽'
      };
      return icons[themeName] || '📖';
    },
    getWordCount(theme) {
      const words = theme.words?.length || 0;
      const adjectives = theme.adjectives?.length || 0;
      const adverbs = theme.adverbs?.length || 0;
      return words + adjectives + adverbs;
    }
  }
}
</script>

<style scoped>
.hero {
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
  color: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(26, 35, 126, 0.3);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.hero p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.hero-stats {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-size: 0.95rem;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.theme-card {
  background: white;
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
  border: 1px solid #e8eaf6;
}

.theme-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 25px rgba(26, 35, 126, 0.15);
  border-color: #c5cae9;
}

.theme-icon {
  font-size: 3.5rem;
  /* margin-bottom: 1rem; */
  display: block;
}

.theme-card h3 {
  color: #1a237e;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
}

.theme-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.meta-item {
  background: #f5f6ff;
  color: #5c6bc0;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.explore-btn {
  background: #1a237e;
  color: white;
  border: none;
  padding: 0.6rem 1.8rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-weight: 500;
}

.explore-btn:hover {
  background: #0d1445;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
  }
  
  .hero h1 {
    font-size: 1.8rem;
  }
  
  .theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>