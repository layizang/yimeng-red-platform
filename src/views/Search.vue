<template>
  <div class="page-container">
    <h1 class="page-title">站内检索</h1>
    <p class="page-subtitle">
      关键词「<b class="kw">{{ keyword }}</b>」共命中 {{ results.length }} 条结果
    </p>

    <!-- 结果列表 -->
    <div v-if="results.length" class="result-list">
      <div
        v-for="(r, i) in results"
        :key="i"
        class="result-item"
        @click="router.push(r.path)"
      >
        <span class="r-type" :class="`t-${r.type}`">{{ r.typeLabel }}</span>
        <div class="r-main">
          <div class="r-title" v-html="highlight(r.title)"></div>
          <div class="r-snippet" v-html="highlight(r.snippet)"></div>
        </div>
        <div class="r-go">→</div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty">
      <div class="empty-icon">🔍</div>
      <p>没有找到与「{{ keyword }}」相关的内容</p>
      <p class="empty-hint">可尝试搜索：陈毅、粟裕、74 师、孟良崮、沂蒙精神、纪念馆、支前 等关键词</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEvents } from '../api/battle'
import { getPersons } from '../api/personage'
import { relics, memories, overviewSections } from '../data/content'

const route = useRoute()
const router = useRouter()

const keyword = computed(() => String(route.query.q || '').trim())
const results = ref([])

const typeLabels = {
  personage: '人物',
  event: '战役事件',
  relic: '遗址文物',
  memory: '红色记忆',
  overview: '战役纵览'
}

onMounted(async () => {
  await doSearch()
})

// 监听再次搜索（顶部搜索框再次回车会重新进入本页）
watch(keyword, async (v) => {
  if (v) await doSearch()
})

async function doSearch() {
  const q = keyword.value
  if (!q) {
    results.value = []
    return
  }
  const kw = q.toLowerCase()

  // 并行取后端人物 + 战役事件
  let persons = [], events = []
  try {
    ;[persons, events] = await Promise.all([
      getPersons().catch(() => []),
      getEvents().catch(() => [])
    ])
  } catch (e) {
    persons = []
    events = []
  }

  const hits = []

  // 人物
  for (const p of persons || []) {
    const hay = `${p.name} ${p.role || ''} ${p.bio || ''}`.toLowerCase()
    if (hay.includes(kw)) {
      hits.push({
        type: 'personage', typeLabel: typeLabels.personage,
        title: p.name, snippet: p.role || p.bio || '',
        path: '/personage'
      })
    }
  }

  // 战役事件
  for (const e of events || []) {
    const hay = `${e.name || ''} ${e.desc || ''} ${e.time || ''}`.toLowerCase()
    if (hay.includes(kw)) {
      hits.push({
        type: 'event', typeLabel: typeLabels.event,
        title: e.name, snippet: e.desc || '',
        path: '/sandbox'
      })
    }
  }

  // 遗址文物
  for (const r of relics) {
    const hay = `${r.title} ${r.category} ${r.desc}`.toLowerCase()
    if (hay.includes(kw)) {
      hits.push({
        type: 'relic', typeLabel: typeLabels.relic,
        title: r.title, snippet: r.desc, path: '/relics'
      })
    }
  }

  // 红色记忆
  for (const m of memories) {
    const hay = `${m.title} ${m.type} ${m.excerpt} ${m.source}`.toLowerCase()
    if (hay.includes(kw)) {
      hits.push({
        type: 'memory', typeLabel: typeLabels.memory,
        title: m.title, snippet: m.excerpt, path: '/memory'
      })
    }
  }

  // 战役纵览
  for (const s of overviewSections) {
    const hay = `${s.title} ${s.paragraphs.join(' ')}`.toLowerCase()
    if (hay.includes(kw)) {
      hits.push({
        type: 'overview', typeLabel: typeLabels.overview,
        title: s.title, snippet: s.paragraphs[0], path: '/overview'
      })
    }
  }

  results.value = hits
}

// 高亮关键词（内容为本地可信数据，可安全使用 v-html）
function highlight(text) {
  const q = keyword.value
  if (!q || !text) return text
  const safe = String(text)
  const idx = safe.toLowerCase().indexOf(q.toLowerCase())
  if (idx < 0) return safe
  const before = escapeHtml(safe.slice(0, idx))
  const match = escapeHtml(safe.slice(idx, idx + q.length))
  const after = escapeHtml(safe.slice(idx + q.length))
  return `${before}<mark>${match}</mark>${after}`
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>

<style scoped>
.kw {
  color: var(--brand-red);
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 16px 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.result-item:hover {
  border-color: #e0b0a8;
  box-shadow: 0 6px 16px rgba(139, 0, 0, 0.1);
  transform: translateY(-2px);
}

.r-type {
  flex-shrink: 0;
  min-width: 74px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
}

.t-personage { background: #f6ecec; color: #8b0000; }
.t-event { background: #fdf3e0; color: #9a6b00; }
.t-relic { background: #eef2f7; color: #2b5ba8; }
.t-memory { background: #f0f6ef; color: #2e6b34; }
.t-overview { background: #f4eff7; color: #6b3f8b; }

.r-main {
  flex: 1;
}

.r-title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
}

.r-snippet {
  font-size: 13px;
  color: #888;
  line-height: 1.7;
}

.r-main :deep(mark) {
  background: #ffe08a;
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}

.r-go {
  flex-shrink: 0;
  color: var(--brand-red);
  font-size: 20px;
}

.empty {
  text-align: center;
  padding: 80px 20px;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-hint {
  font-size: 13px;
  color: #bbb;
}
</style>
