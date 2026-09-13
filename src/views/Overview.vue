<template>
  <div class="page-container overview">
    <h1 class="page-title">战役纵览</h1>
    <p class="page-subtitle">孟良崮战役的背景、部署、经过、结果与历史意义</p>

    <div class="overview-layout">
      <!-- 左侧目录 -->
      <aside class="toc">
        <div class="toc-title">本页目录</div>
        <a
          v-for="s in overviewSections"
          :key="s.id"
          class="toc-item"
          :class="{ active: activeId === s.id }"
          @click="scrollTo(s.id)"
        >
          {{ s.anchor }}、{{ s.title }}
        </a>
      </aside>

      <!-- 正文 -->
      <div class="article">
        <!-- 卷首 -->
        <div class="article-lead">
          <div class="lead-media ph">
            <div class="ph-inner">
              <span class="ph-icon">🏔️</span>
              <span class="ph-text">孟良崮战役 · 全景示意</span>
            </div>
          </div>
          <p class="lead-text">{{ overviewIntro.paragraphs[0] }}</p>
        </div>

        <!-- 各小节 -->
        <section
          v-for="s in overviewSections"
          :key="s.id"
          :id="s.id"
          class="article-section"
        >
          <h2 class="a-title"><span class="a-anchor">{{ s.anchor }}</span>{{ s.title }}</h2>
          <p v-for="(p, i) in s.paragraphs" :key="i" class="a-p">{{ p }}</p>
        </section>

        <!-- 关键数据小结 -->
        <section class="article-section">
          <h2 class="a-title"><span class="a-anchor">六</span>关键数据</h2>
          <div class="data-grid">
            <div v-for="f in battleFacts" :key="f.label" class="data-item">
              <div class="data-value">{{ f.value }}</div>
              <div class="data-label">{{ f.label }}</div>
              <div class="data-unit">{{ f.unit }}</div>
            </div>
          </div>
        </section>

        <div class="article-nav">
          <el-button round plain @click="router.push('/sandbox')">→ 进入战役进程（动态沙盘）</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { battleFacts, overviewIntro, overviewSections } from '../data/content'

const router = useRouter()
const activeId = ref('')

function scrollTo(id) {
  activeId.value = id
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.overview-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 32px;
  align-items: start;
}

/* 目录 */
.toc {
  position: sticky;
  top: 76px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 16px;
}

.toc-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--brand-red);
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--line);
}

.toc-item {
  display: block;
  font-size: 13px;
  color: #666;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.toc-item:hover {
  background: #faf3f3;
  color: var(--brand-red);
}

.toc-item.active {
  background: var(--brand-red);
  color: #fff;
  font-weight: 600;
}

/* 正文 */
.article {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 36px 40px;
}

.article-lead {
  margin-bottom: 12px;
}

.lead-media {
  height: 260px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.lead-text {
  font-size: 15px;
  line-height: 2;
  color: #444;
  padding: 16px 20px;
  background: #faf5f5;
  border-left: 4px solid var(--brand-red);
  border-radius: 6px;
  margin: 0;
}

.article-section {
  margin-top: 36px;
}

.a-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--brand-red);
  margin: 0 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0e0de;
}

.a-anchor {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background: var(--brand-red);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 10px;
}

.a-p {
  font-size: 15px;
  line-height: 2.1;
  color: #444;
  margin: 0 0 14px;
  text-indent: 2em;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.data-item {
  text-align: center;
  padding: 20px 12px;
  background: #faf6f2;
  border: 1px solid #f0e6da;
  border-radius: 8px;
}

.data-value {
  font-size: 22px;
  font-weight: 800;
  color: var(--brand-red);
}

.data-label {
  font-size: 14px;
  color: #555;
  font-weight: 600;
  margin: 8px 0 4px;
}

.data-unit {
  font-size: 12px;
  color: #aaa;
}

.article-nav {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  text-align: center;
}

@media (max-width: 860px) {
  .overview-layout {
    grid-template-columns: 1fr;
  }
  .toc {
    position: static;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .toc-title {
    width: 100%;
  }
  .toc-item {
    padding: 6px 10px;
  }
  .article {
    padding: 24px 20px;
  }
  .data-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
