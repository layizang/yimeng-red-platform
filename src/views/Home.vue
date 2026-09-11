<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <p class="hero-eyebrow">水乳交融 · 生死与共</p>
        <h1 class="hero-title">孟良崮战役<br />红色信息平台</h1>
        <p class="hero-desc">
          以动态沙盘推演、AI 讲解员与全景云游，沉浸式还原一场扭转华东战局的关键战役，
          讲透沂蒙精神。
        </p>
        <div class="hero-actions">
          <el-button type="primary" size="large" round @click="router.push('/sandbox')">
            进入战役沙盘
          </el-button>
          <el-button size="large" round plain @click="router.push('/ai')">
            问问 AI 讲解员
          </el-button>
        </div>
      </div>
    </section>

    <!-- 模块入口 -->
    <section class="page-container">
      <h2 class="section-title">平台模块</h2>
      <div class="module-grid">
        <div
          v-for="m in modules"
          :key="m.path"
          class="module-card"
          @click="router.push(m.path)"
        >
          <el-icon :size="34" class="module-icon"><component :is="m.icon" /></el-icon>
          <div class="module-name">{{ m.name }}</div>
          <div class="module-desc">{{ m.desc }}</div>
        </div>
      </div>
    </section>

    <!-- 战役速览 -->
    <section class="page-container">
      <h2 class="section-title">战役速览</h2>
      <el-row :gutter="16">
        <el-col v-for="s in stages" :key="s.id" :xs="12" :sm="6">
          <div class="stage-card">
            <div class="stage-order">{{ s.order }}</div>
            <div class="stage-name">{{ s.name }}</div>
            <div class="stage-summary">{{ s.summary }}</div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { stages } from '../data/mock'

const router = useRouter()

const modules = [
  { name: '战役沙盘', desc: '地图 + 时间轴联动态势推演', icon: 'MapLocation', path: '/sandbox' },
  { name: '人物志', desc: '指挥员与支前群众群像', icon: 'Avatar', path: '/personage' },
  { name: 'AI 讲解员', desc: '基于党史知识库的问答', icon: 'ChatDotRound', path: '/ai' },
  { name: '全景云游', desc: '纪念馆与遗址 720° 漫游', icon: 'View', path: '/panorama' },
  { name: '红色课堂', desc: '学测评闭环，领取证书', icon: 'Reading', path: '/course' }
]
</script>

<style scoped>
.hero {
  position: relative;
  color: #fff;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(122, 0, 0, 0.92), rgba(160, 30, 20, 0.85)),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><rect width="800" height="400" fill="%237a0000"/></svg>') center/cover;
}

.hero-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.hero-eyebrow {
  letter-spacing: 6px;
  color: var(--brand-gold);
  font-weight: 600;
  margin: 0 0 12px;
}

.hero-title {
  font-size: 44px;
  line-height: 1.25;
  margin: 0 0 16px;
  letter-spacing: 2px;
}

.hero-desc {
  max-width: 560px;
  font-size: 16px;
  line-height: 1.8;
  color: #f0dcdc;
  margin: 0 0 28px;
}

.hero-actions :deep(.el-button--primary) {
  --el-button-bg-color: var(--brand-gold);
  --el-button-border-color: var(--brand-gold);
  --el-button-text-color: #5a0000;
  --el-button-hover-bg-color: #d8b36a;
  --el-button-hover-border-color: #d8b36a;
}

.hero-actions :deep(.el-button.is-plain) {
  --el-button-text-color: #fff;
  --el-button-border-color: #fff;
  --el-button-bg-color: transparent;
  --el-button-hover-bg-color: rgba(255, 255, 255, 0.15);
}

.section-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--brand-red);
  margin: 8px 0 20px;
}

.module-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.module-card {
  background: #fff;
  border-radius: 10px;
  padding: 24px 18px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #eee;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(160, 30, 20, 0.15);
  border-color: #e0b0a8;
}

.module-icon {
  color: var(--brand-red);
  margin-bottom: 10px;
}

.module-name {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}

.module-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
}

.stage-card {
  background: #fff;
  border: 1px solid #eee;
  border-top: 3px solid var(--brand-red);
  border-radius: 8px;
  padding: 18px;
  height: 100%;
}

.stage-order {
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background: var(--brand-red);
  color: #fff;
  border-radius: 50%;
  font-weight: 700;
  margin-bottom: 10px;
}

.stage-name {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.stage-summary {
  font-size: 13px;
  color: #888;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .module-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .hero-title {
    font-size: 32px;
  }
}
</style>
