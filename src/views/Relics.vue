<template>
  <div class="page-container">
    <h1 class="page-title">遗址文物</h1>
    <p class="page-subtitle">孟良崮战役纪念场馆、战场遗址与馆藏文物</p>

    <div class="relic-grid">
      <div v-for="r in relics" :key="r.id" class="relic-card">
        <div class="relic-media ph ph-light">
          <div class="ph-inner">
            <span class="ph-icon">{{ iconOf(r.category) }}</span>
            <span class="ph-text">{{ r.title }} · 图片占位</span>
          </div>
        </div>
        <div class="relic-body">
          <div class="relic-top">
            <span class="tag-badge">{{ r.category }}</span>
          </div>
          <h3 class="relic-title">{{ r.title }}</h3>
          <p class="relic-desc">{{ r.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { relics } from '../data/content'

const iconMap = {
  '纪念场馆': '🏛️',
  '战场遗址': '🏔️',
  '纪念设施': '🗼',
  '馆藏文物': '🏺'
}

function iconOf(category) {
  return iconMap[category] || '🏛️'
}
</script>

<style scoped>
.relic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.relic-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s;
}

.relic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(139, 0, 0, 0.12);
  border-color: #e0b0a8;
}

.relic-media {
  height: 180px;
}

.relic-body {
  padding: 16px 18px 20px;
}

.relic-top {
  margin-bottom: 8px;
}

.relic-title {
  font-size: 17px;
  font-weight: 700;
  color: #333;
  margin: 0 0 10px;
}

.relic-desc {
  font-size: 13px;
  line-height: 1.8;
  color: #777;
  margin: 0;
}

@media (max-width: 900px) {
  .relic-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .relic-grid {
    grid-template-columns: 1fr;
  }
}
</style>
