<template>
  <div class="home">
    <!-- 轮播主视觉 -->
    <el-carousel height="420px" :interval="5000" arrow="hover" class="banner">
      <el-carousel-item v-for="(b, i) in banners" :key="i">
        <div class="banner-slide" @click="router.push(b.path)">
          <div class="banner-bg ph">
            <div class="ph-inner">
              <span class="ph-icon">{{ b.icon }}</span>
              <span class="ph-text">{{ b.placeholder }}</span>
            </div>
          </div>
          <div class="banner-mask"></div>
          <div class="banner-content">
            <p class="banner-eyebrow">水乳交融 · 生死与共</p>
            <h2 class="banner-title">{{ b.title }}</h2>
            <p class="banner-desc">{{ b.desc }}</p>
            <el-button type="primary" round size="large" @click.stop="router.push(b.path)">
              {{ b.action }} →
            </el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 数据卡 -->
    <section class="facts">
      <div class="page-container facts-inner">
        <div v-for="f in battleFacts" :key="f.label" class="fact-card">
          <div class="fact-value">{{ f.value }}</div>
          <div class="fact-label">{{ f.label }}</div>
          <div class="fact-unit">{{ f.unit }}</div>
        </div>
      </div>
    </section>

    <!-- 战役概述 -->
    <section class="page-container">
      <h2 class="section-title">战役概述</h2>
      <div class="intro">
        <div class="intro-media ph">
          <div class="ph-inner">
            <span class="ph-icon">🏔️</span>
            <span class="ph-text">孟良崮主峰 · 示意图</span>
          </div>
        </div>
        <div class="intro-body">
          <h3 class="intro-title">{{ overviewIntro.title }}</h3>
          <div class="intro-subtitle">{{ overviewIntro.subtitle }}</div>
          <p v-for="(p, i) in overviewIntro.paragraphs" :key="i" class="intro-p">{{ p }}</p>
          <div class="intro-actions">
            <el-button type="primary" round @click="router.push('/overview')">了解战役全貌</el-button>
            <el-button round plain @click="router.push('/sandbox')">进入战役沙盘</el-button>
          </div>
        </div>
      </div>
    </section>

    <!-- 分栏目导览 -->
    <section class="page-container">
      <h2 class="section-title">专题导览</h2>
      <div class="section-grid">
        <div
          v-for="m in sections"
          :key="m.path"
          class="section-card"
          @click="router.push(m.path)"
        >
          <div class="sc-head">
            <div class="sc-icon ph">
              <div class="ph-inner"><span class="ph-icon">{{ m.icon }}</span></div>
            </div>
            <div class="sc-title">
              <div class="sc-name">{{ m.name }}</div>
              <div class="sc-desc">{{ m.desc }}</div>
            </div>
          </div>
          <ul class="sc-list">
            <li v-for="it in m.items" :key="it">{{ it }}</li>
          </ul>
          <div class="sc-more">查看详情 →</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getStages } from '../api/battle'
import { battleFacts, overviewIntro } from '../data/content'

const router = useRouter()
const stages = ref([])

onMounted(async () => {
  stages.value = (await getStages()) || []
})

const banners = [
  {
    title: '孟良崮战役',
    desc: '解放战争时期华东战场的关键一战，全歼国民党五大主力之一的整编第七十四师。',
    icon: '🏔️', placeholder: '孟良崮主峰 · 示意图', action: '走进战役', path: '/overview'
  },
  {
    title: '动态沙盘推演',
    desc: '地图与时间轴联动，分阶段还原战役合围、分割、总攻的完整态势。',
    icon: '🗺️', placeholder: '战役态势图 · 示意图', action: '启动推演', path: '/sandbox'
  },
  {
    title: '沂蒙精神',
    desc: '水乳交融、生死与共——数十万支前群众，铸就人民战争的磅礴伟力。',
    icon: '❤️', placeholder: '支前群众 · 示意图', action: '感悟精神', path: '/memory'
  }
]

const sections = [
  {
    name: '战役纵览', desc: '背景、部署、经过与意义', icon: '📖', path: '/overview',
    items: ['战役背景', '双方部署', '战役经过', '历史意义']
  },
  {
    name: '战役进程', desc: '时间轴 + 动态沙盘推演', icon: '🗺️', path: '/sandbox',
    items: ['诱敌深入', '穿插分割', '围歼 74 师', '战后意义']
  },
  {
    name: '英烈人物', desc: '指挥员与支前群众群像', icon: '🕊️', path: '/personage',
    items: ['陈毅', '粟裕', '张灵甫', '沂蒙六姐妹']
  },
  {
    name: '遗址文物', desc: '纪念馆、遗址与馆藏', icon: '🏛️', path: '/relics',
    items: ['孟良崮战役纪念馆', '大崮顶战场遗址', '战役纪念碑', '馆藏文物']
  },
  {
    name: '红色记忆', desc: '口述史、回忆录与文献', icon: '📜', path: '/memory',
    items: ['粟裕回忆录', '沂蒙六姐妹口述', '华东解放战争纪实', '沂蒙精神文献']
  }
]
</script>

<style scoped>
/* 轮播 */
.banner :deep(.el-carousel__item) {
  border-radius: 0;
}

.banner-slide {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.banner-bg {
  position: absolute;
  inset: 0;
}

.banner-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(20, 0, 0, 0.78) 0%, rgba(20, 0, 0, 0.45) 45%, rgba(20, 0, 0, 0.15) 100%);
}

.banner-content {
  position: absolute;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  max-width: 560px;
  color: #fff;
}

.banner-eyebrow {
  letter-spacing: 8px;
  color: var(--brand-gold);
  font-weight: 600;
  margin: 0 0 14px;
}

.banner-title {
  font-size: 40px;
  letter-spacing: 3px;
  margin: 0 0 16px;
}

.banner-desc {
  font-size: 16px;
  line-height: 1.8;
  color: #f0dcdc;
  margin: 0 0 24px;
}

.banner-content :deep(.el-button--primary) {
  --el-button-bg-color: var(--brand-gold);
  --el-button-border-color: var(--brand-gold);
  --el-button-text-color: #5a0000;
  --el-button-hover-bg-color: #e0c088;
  --el-button-hover-border-color: #e0c088;
}

/* 数据卡 */
.facts {
  background: #fff;
  border-bottom: 1px solid var(--line);
}

.facts-inner {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 32px 20px;
}

.fact-card {
  text-align: center;
  padding: 18px 12px;
  border-right: 1px solid #f0f0f0;
}

.fact-card:last-child {
  border-right: none;
}

.fact-value {
  font-size: 26px;
  font-weight: 800;
  color: var(--brand-red);
  letter-spacing: 1px;
}

.fact-label {
  font-size: 15px;
  color: #555;
  font-weight: 600;
  margin: 8px 0 4px;
}

.fact-unit {
  font-size: 12px;
  color: #aaa;
}

/* 概述 */
.intro {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 28px;
  align-items: stretch;
}

.intro-media {
  min-height: 320px;
  border-radius: 10px;
}

.intro-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--brand-red);
  margin: 0 0 4px;
}

.intro-subtitle {
  font-size: 14px;
  color: var(--brand-gold);
  letter-spacing: 2px;
  margin: 0 0 16px;
}

.intro-p {
  font-size: 14px;
  line-height: 1.9;
  color: #555;
  margin: 0 0 12px;
}

.intro-actions {
  margin-top: 18px;
  display: flex;
  gap: 12px;
}

/* 专题导览 */
.section-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.section-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(139, 0, 0, 0.12);
  border-color: #e0b0a8;
}

.sc-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}

.sc-icon {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  flex-shrink: 0;
}

.sc-icon .ph-icon {
  font-size: 24px;
}

.sc-name {
  font-size: 18px;
  font-weight: 700;
  color: #333;
}

.sc-desc {
  font-size: 13px;
  color: #999;
  margin-top: 3px;
}

.sc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 16px;
}

.sc-list li {
  font-size: 13px;
  color: #666;
  padding-left: 14px;
  position: relative;
}

.sc-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand-gold);
}

.sc-more {
  margin-top: 14px;
  font-size: 13px;
  color: var(--brand-red);
  font-weight: 600;
}

@media (max-width: 860px) {
  .facts-inner {
    grid-template-columns: repeat(2, 1fr);
  }
  .intro {
    grid-template-columns: 1fr;
  }
  .section-grid {
    grid-template-columns: 1fr;
  }
  .banner-title {
    font-size: 28px;
  }
}
</style>
