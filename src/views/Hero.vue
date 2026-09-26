<template>
  <div class="hero">
    <div class="hero-shell">
      <div class="hero-copy">
        <span class="eyebrow">Learn German naturally</span>
        <h1>Turn everyday moments into language wins.</h1>
        <p>
          Explore practical themes, build confidence with real vocabulary, and make
          German feel part of your daily life.
        </p>

        <div class="hero-actions">
          <button class="primary-btn" @click="navigateToTheme(themes[0]?.route || '/')">
            Start learning
          </button>
          <button class="secondary-btn" @click="scrollToThemes">
            Explore themes
          </button>
        </div>

        <div class="hero-stats">
          <div>
            <strong>{{ themes.length }}</strong>
            <span>Topics</span>
          </div>
          <div>
            <strong>Daily</strong>
            <span>Practice</span>
          </div>
          <div>
            <strong>Fast</strong>
            <span>Progress</span>
          </div>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <div class="orbit orbit-one"></div>
        <div class="orbit orbit-two"></div>
        <div class="floating-card card-top">
          <span>👋</span>
          <small>Hallo!</small>
        </div>
        <div class="floating-card card-bottom">
          <span>🚀</span>
          <small>Level up</small>
        </div>
        <div class="main-badge">
          <span>Deutsch</span>
          <strong>Fluency path</strong>
        </div>
      </div>
    </div>

    <div class="theme-grid" id="theme-grid">
      <div
        v-for="theme in themes"
        :key="theme.id"
        class="theme-card"
        @click="navigateToTheme(theme.route)"
      >
        <div class="theme-icon-wrap">
          <div class="theme-icon">{{ getThemeIcon(theme.theme) }}</div>
          <h3>{{ theme.theme }}</h3>
        </div>

        <div class="theme-meta">
          <span>{{ getWordCount(theme) }} words</span>
          <span>{{ theme.sentences?.length || 0 }} phrases</span>
        </div>

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
    };
  },
  created() {
    this.themes = loadAllThemes();
  },
  methods: {
    navigateToTheme(route) {
      this.$router.push(route);
    },
    scrollToThemes() {
      const el = document.getElementById('theme-grid');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
};
</script>

<style scoped>
.hero {
  max-width: 1400px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-shell {
  position: relative;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  padding: 3rem 2.5rem;
  border-radius: 30px;
  margin-bottom: 2.5rem;
  background: linear-gradient(135deg, #1d2b6d 0%, #312e81 35%, #1b4d8c 100%);
  color: #f5f8ff;
  overflow: hidden;
  box-shadow: 0 24px 50px rgba(25, 31, 90, 0.28);
}

.hero-shell::before,
.hero-shell::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(8px);
  opacity: 0.7;
}

.hero-shell::before {
  width: 260px;
  height: 260px;
  top: -70px;
  right: -40px;
  background: rgba(255, 212, 79, 0.2);
}

.hero-shell::after {
  width: 220px;
  height: 220px;
  bottom: -70px;
  left: -40px;
  background: rgba(77, 180, 255, 0.18);
}

.hero-copy,
.hero-visual {
  position: relative;
  z-index: 1;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #dfeaff;
  font-size: 0.76rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
}

.hero-copy h1 {
  margin: 1rem 0 0.9rem;
  font-size: clamp(2.5rem, 4vw, 4.5rem);
  line-height: 1.05;
  letter-spacing: -0.06em;
  max-width: 620px;
}

.hero-copy p {
  max-width: 560px;
  font-size: 1.08rem;
  line-height: 1.7;
  color: rgba(235, 240, 255, 0.86);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-btn,
.secondary-btn {
  border: none;
  border-radius: 999px;
  padding: 0.95rem 1.6rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-btn {
  color: #1d2b6d;
  background: linear-gradient(135deg, #ffd76a 0%, #ffc93d 100%);
  box-shadow: 0 12px 24px rgba(255, 201, 61, 0.28);
}

.secondary-btn {
  color: #edf4ff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.primary-btn:hover,
.secondary-btn:hover,
.explore-btn:hover {
  transform: translateY(-2px);
}

.hero-stats {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.hero-stats div {
  min-width: 110px;
  padding: 1rem 1.2rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
}

.hero-stats strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.hero-stats span {
  color: rgba(235, 240, 255, 0.85);
  font-size: 0.8rem;
}

.hero-visual {
  min-height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.orbit {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.orbit-one {
  width: 280px;
  height: 280px;
  animation: spin 16s linear infinite;
}

.orbit-two {
  width: 200px;
  height: 200px;
  border-style: dashed;
  animation: spin 11s linear infinite reverse;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.main-badge {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 220px;
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 20px 35px rgba(10, 15, 52, 0.35);
}

.main-badge span {
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(226, 235, 255, 0.9);
}

.main-badge strong {
  margin-top: 1rem;
  font-size: 2rem;
  line-height: 1.1;
  text-align: center;
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: 16px;
  background: rgba(14, 18, 38, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 12px 24px rgba(12, 15, 36, 0.25);
  backdrop-filter: blur(10px);
  color: white;
}

.floating-card span {
  font-size: 1.4rem;
}

.floating-card small {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.88);
}

.card-top {
  top: 32px;
  right: 24px;
}

.card-bottom {
  left: 22px;
  bottom: 46px;
}

.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.theme-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1.3rem;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(243, 246, 255, 0.92));
  border: 1px solid rgba(116, 136, 206, 0.18);
  box-shadow: 0 12px 28px rgba(44, 58, 127, 0.08);
  cursor: pointer;
  transition: all 0.25s ease;
  overflow: hidden;
}

.theme-card::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #ffbf6b, #7ecbff, #8c7ef8);
}

.theme-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 36px rgba(38, 50, 110, 0.14);
}

.theme-icon-wrap {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.2rem;
}

.theme-icon {
  display: grid;
  place-items: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #eef5ff, #f9f1ff);
  font-size: 2rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.theme-card h3 {
  margin: 0;
  color: #1e2b6a;
  font-size: 1.18rem;
  font-weight: 700;
}

.theme-meta {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  font-size: 0.75rem;
  color: #586aaf;
  letter-spacing: 0.02em;
}

.explore-btn {
  width: 100%;
  border: none;
  border-radius: 12px;
  padding: 0.8rem 1rem;
  background: linear-gradient(135deg, #253b8f 0%, #2a4db7 100%);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (max-width: 900px) {
  .hero-shell {
    grid-template-columns: 1fr;
    padding: 2.2rem 1.3rem;
  }

  .hero-visual {
    min-height: 260px;
  }
}

@media (max-width: 768px) {
  .hero-shell {
    border-radius: 22px;
  }

  .hero-copy h1 {
    font-size: 2.6rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn,
  .secondary-btn {
    width: 100%;
  }

  .theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>
