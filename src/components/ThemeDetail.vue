<template>
  <div class="theme-detail">
    <div v-if="theme" class="theme-content">
      <div class="theme-header">
        <h2>{{ theme.theme }}</h2>
        <div class="theme-stats">
          <span class="stat-badge">📝 {{ totalWords }} words</span>
          <span class="stat-badge">📖 {{ totalSentences }} sentences</span>
        </div>
      </div>

      <!-- Words Section -->
      <div v-if="theme.words && theme.words.length" class="section">
        <h3>
          <span class="section-icon">📝</span>
          Vocabulary Words
          <span class="count-badge">{{ theme.words.length }}</span>
        </h3>
        <div class="word-grid">
          <div v-for="(word, index) in theme.words" :key="index" class="word-card">
            <div class="word-pair">
              <span class="de-word">{{ word.de }}</span>
              <span class="arrow">→</span>
              <span class="en-word">{{ word.en }}</span>
            </div>
            <div v-if="word.sentence_de && word.sentence_en" class="word-sentence">
              <p class="sentence-de">"{{ word.sentence_de }}"</p>
              <p class="sentence-en">"{{ word.sentence_en }}"</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Adjectives Section -->
      <div v-if="theme.adjectives && theme.adjectives.length" class="section">
        <h3>
          <span class="section-icon">🎨</span>
          Adjectives
          <span class="count-badge">{{ theme.adjectives.length }}</span>
        </h3>
        <div class="word-grid">
          <div v-for="(adj, index) in theme.adjectives" :key="index" class="word-card">
            <div class="word-pair">
              <span class="de-word">{{ adj.de }}</span>
              <span class="arrow">→</span>
              <span class="en-word">{{ adj.en }}</span>
            </div>
            <div v-if="adj.sentence_de && adj.sentence_en" class="word-sentence">
              <p class="sentence-de">"{{ adj.sentence_de }}"</p>
              <p class="sentence-en">"{{ adj.sentence_en }}"</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Adverbs Section -->
      <div v-if="theme.adverbs && theme.adverbs.length" class="section">
        <h3>
          <span class="section-icon">⚡</span>
          Adverbs
          <span class="count-badge">{{ theme.adverbs.length }}</span>
        </h3>
        <div class="word-grid">
          <div v-for="(adv, index) in theme.adverbs" :key="index" class="word-card">
            <div class="word-pair">
              <span class="de-word">{{ adv.de }}</span>
              <span class="arrow">→</span>
              <span class="en-word">{{ adv.en }}</span>
            </div>
            <div v-if="adv.sentence_de && adv.sentence_en" class="word-sentence">
              <p class="sentence-de">"{{ adv.sentence_de }}"</p>
              <p class="sentence-en">"{{ adv.sentence_en }}"</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sentences Section -->
      <div v-if="theme.sentences && theme.sentences.length" class="section">
        <h3>
          <span class="section-icon">💬</span>
          Example Sentences
          <span class="count-badge">{{ theme.sentences.length }}</span>
        </h3>
        <div class="sentences-grid">
          <div v-for="(sentence, index) in theme.sentences" :key="index" class="sentence-card">
            <div class="sentence-pair">
              <div class="sentence-de">🇩🇪 {{ sentence.de }}</div>
              <div class="sentence-en">🇬🇧 {{ sentence.en }}</div>
            </div>
          </div>
        </div>
      </div>

      <button @click="goBack" class="back-btn">
        <span class="btn-icon">←</span>
        Back to Home
      </button>
    </div>
    <div v-else class="loading">
      <div class="loader"></div>
      <p>Loading theme data...</p>
    </div>
  </div>
</template>

<script>
import { loadThemeByRoute } from '../services/dataService';

export default {
  name: 'ThemeDetail',
  data() {
    return {
      theme: null
    }
  },
  computed: {
    totalWords() {
      if (!this.theme) return 0;
      const words = this.theme.words || [];
      const adjectives = this.theme.adjectives || [];
      const adverbs = this.theme.adverbs || [];
      return words.length + adjectives.length + adverbs.length;
    },
    totalSentences() {
      if (!this.theme) return 0;
      const sentences = this.theme.sentences || [];
      const wordSentences = (this.theme.words || []).filter(w => w.sentence_de && w.sentence_en);
      const adjSentences = (this.theme.adjectives || []).filter(a => a.sentence_de && a.sentence_en);
      const advSentences = (this.theme.adverbs || []).filter(a => a.sentence_de && a.sentence_en);
      return sentences.length + wordSentences.length + adjSentences.length + advSentences.length;
    }
  },
  mounted() {
    this.loadTheme();
  },
  watch: {
    '$route.path'() {
      this.loadTheme();
    }
  },
  methods: {
    loadTheme() {
      this.theme = loadThemeByRoute(this.$route.path);
    },
    goBack() {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.theme-detail {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.theme-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e8eaf6;
}

.theme-header h2 {
  color: #1a237e;
  font-size: 2rem;
  margin: 0;
}

.theme-stats {
  display: flex;
  gap: 0.8rem;
}

.stat-badge {
  background: #e8eaf6;
  color: #1a237e;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.section {
  margin-bottom: 2.5rem;
}

.section h3 {
  color: #1a237e;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 1.4rem;
}

.count-badge {
  background: #ffd54f;
  color: #1a237e;
  padding: 0.1rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.word-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.word-card {
  background: #f8f9ff;
  border: 1px solid #e8eaf6;
  border-radius: 12px;
  padding: 1.2rem;
  transition: all 0.3s ease;
}

.word-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(26, 35, 126, 0.1);
  border-color: #c5cae9;
}

.word-pair {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.de-word {
  color: #1a237e;
  font-weight: 600;
  font-size: 1.1rem;
}

.en-word {
  color: #5c6bc0;
  font-weight: 500;
}

.arrow {
  color: #c5cae9;
}

.word-sentence {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px dashed #e8eaf6;
}

.sentence-de, .sentence-en {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
}

.sentence-de {
  color: #1a237e;
  font-weight: bold;
}

.sentence-en {
  color: #5c6bc0;
  font-weight: 500;
}

.sentences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1rem;
}

.sentence-card {
  background: #f8f9ff;
  border: 1px solid #e8eaf6;
  border-radius: 12px;
  padding: 1.2rem;
  transition: all 0.3s ease;
}

.sentence-card:hover {
  background: #f0f2ff;
  transform: translateX(5px);
}

.sentence-pair {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sentence-de, .sentence-en {
  margin: 0;
  padding: 0.3rem 0;
}

.back-btn {
  background: #1a237e;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-btn:hover {
  background: #0d1445;
  transform: translateX(-3px);
  box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
}

.loading {
  text-align: center;
  padding: 4rem;
  color: #666;
}

.loader {
  border: 4px solid #e8eaf6;
  border-top: 4px solid #1a237e;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .theme-detail {
    padding: 1rem;
  }
  
  .theme-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .theme-header h2 {
    font-size: 1.5rem;
  }
  
  .word-grid {
    grid-template-columns: 1fr;
  }
  
  .sentences-grid {
    grid-template-columns: 1fr;
  }
}
</style>