<template>
  <div class="page-container">
    <h1 class="page-title">红色记忆</h1>
    <p class="page-subtitle">口述史、回忆录与历史文献，从第一视角读懂沂蒙精神</p>

    <div class="memory-list">
      <div v-for="m in memories" :key="m.id" class="memory-item">
        <div class="memory-type">
          <span class="type-badge">{{ m.type }}</span>
        </div>
        <div class="memory-body">
          <h3 class="memory-title">{{ m.title }}</h3>
          <p class="memory-excerpt">"{{ m.excerpt }}"</p>
          <div class="memory-source">📖 出处：{{ m.source }}</div>
        </div>
        <div class="memory-quote ph ph-light">
          <div class="ph-inner">
            <span class="ph-icon">📜</span>
            <span class="ph-text">{{ m.type }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { memories } from '../data/content'
</script>

<style scoped>
.memory-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.memory-item {
  display: grid;
  grid-template-columns: 96px 1fr 140px;
  gap: 20px;
  align-items: stretch;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 20px;
  transition: all 0.2s;
}

.memory-item:hover {
  box-shadow: 0 8px 20px rgba(139, 0, 0, 0.1);
  border-color: #e0b0a8;
}

.memory-type {
  display: flex;
  align-items: flex-start;
}

.type-badge {
  display: inline-block;
  background: var(--brand-red);
  color: #fff;
  font-size: 13px;
  padding: 5px 12px;
  border-radius: 14px;
  font-weight: 600;
  letter-spacing: 1px;
}

.memory-body {
  display: flex;
  flex-direction: column;
}

.memory-title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px;
}

.memory-excerpt {
  font-size: 14px;
  line-height: 1.9;
  color: #555;
  margin: 0 0 12px;
  flex: 1;
}

.memory-source {
  font-size: 12px;
  color: #999;
}

.memory-quote {
  border-radius: 8px;
  min-height: 100%;
}

.memory-quote .ph-text {
  font-size: 13px;
}

@media (max-width: 700px) {
  .memory-item {
    grid-template-columns: 1fr;
  }
  .memory-quote {
    display: none;
  }
}
</style>
