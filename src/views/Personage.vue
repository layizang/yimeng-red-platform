<template>
  <div class="page-container">
    <h1 class="page-title">英烈人物</h1>
    <p class="page-subtitle">指挥员与支前群众群像，点击卡片查看生平与人物关系</p>

    <el-row :gutter="16">
      <el-col v-for="p in persons" :key="p.id" :xs="12" :sm="6">
        <el-card shadow="hover" class="person-card" @click="activePerson = p">
          <div class="avatar" :class="p.faction">{{ p.name.charAt(0) }}</div>
          <div class="p-name">{{ p.name }}</div>
          <div class="p-role">{{ p.role }}</div>
          <el-tag :type="p.faction === 'red' ? 'danger' : 'info'" size="small">
            {{ p.faction === 'red' ? '我方' : '敌方' }}
          </el-tag>
        </el-card>
      </el-col>
    </el-row>

    <!-- 人物详情 -->
    <el-dialog v-model="dialogVisible" :title="activePerson?.name" width="460px">
      <template v-if="activePerson">
        <p class="detail-role">{{ activePerson.role }}</p>
        <p class="detail-bio">{{ activePerson.bio }}</p>

        <h4 class="rel-title">关联人物</h4>
        <div v-for="r in activeRelations" :key="r.target" class="rel-item">
          <span class="rel-type">{{ r.type }}</span>
          <span class="rel-name">{{ personName(r.target) }}</span>
        </div>
      </template>
    </el-dialog>

    <!-- 关系图谱 -->
    <el-card shadow="never" class="graph-card">
      <div class="graph-head">人物关系图谱（点击节点查看详情）</div>
      <div ref="graphRef" class="graph-body"></div>
    </el-card>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { computed, nextTick, onMounted, ref } from 'vue'
import { getPersons, getRelations } from '../api/personage'

const persons = ref([])
const relations = ref([])
const activePerson = ref(null)
const graphRef = ref(null)
let chart = null

onMounted(async () => {
  const [p, r] = await Promise.all([getPersons(), getRelations()])
  persons.value = p || []
  relations.value = r || []
  await nextTick()
  renderGraph()
})

function renderGraph() {
  if (!graphRef.value || !persons.value.length) return
  if (!chart) {
    chart = echarts.init(graphRef.value)
    chart.on('click', (params) => {
      if (params.dataType === 'node') {
        activePerson.value = persons.value.find((p) => p.id === params.data.id) || null
      }
    })
  }
  chart.setOption({
    tooltip: {
      formatter: (p) => (p.dataType === 'node' ? p.name : `${p.data.sourceName} —${p.data.type}→ ${p.data.targetName}`)
    },
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      label: { show: true, position: 'bottom', fontSize: 13, color: '#444' },
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: 8,
      lineStyle: { color: '#bbb', width: 1.5 },
      data: persons.value.map((p) => ({
        id: p.id,
        name: p.name,
        symbolSize: 58,
        itemStyle: { color: p.faction === 'red' ? '#c0392b' : '#2b5ba8' },
        label: { show: true }
      })),
      links: relations.value.map((r) => ({
        source: r.source,
        target: r.target,
        label: { show: true, formatter: r.type, fontSize: 11, color: '#888' },
        lineStyle: { color: r.type === '敌对' ? '#999' : '#d4a017' }
      })),
      force: { repulsion: 260, edgeLength: [80, 140] }
    }]
  })
}
const dialogVisible = computed({
  get: () => activePerson.value !== null,
  set: (v) => {
    if (!v) activePerson.value = null
  }
})

function personName(id) {
  return persons.value.find((p) => p.id === id)?.name || id
}

const activeRelations = computed(() => {
  if (!activePerson.value) return []
  return relations.value.filter((r) => r.source === activePerson.value.id)
})
</script>

<style scoped>
.person-card {
  text-align: center;
  cursor: pointer;
  margin-bottom: 16px;
  border: 1px solid #eee;
}

.person-card:hover {
  border-color: #e0b0a8;
}

.avatar {
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  margin: 0 auto 12px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
}

.avatar.red {
  background: var(--brand-red);
}

.avatar.blue {
  background: #2b5ba8;
}

.p-name {
  font-size: 17px;
  font-weight: 700;
  color: #333;
}

.p-role {
  font-size: 13px;
  color: #999;
  margin: 4px 0 10px;
}

.detail-role {
  color: #888;
  font-size: 13px;
  margin: 0 0 12px;
}

.detail-bio {
  color: #444;
  line-height: 1.7;
}

.rel-title {
  margin: 18px 0 10px;
  color: var(--brand-red);
}

.rel-item {
  padding: 6px 0;
  border-bottom: 1px dashed #eee;
}

.rel-type {
  display: inline-block;
  background: #f0e6e6;
  color: var(--brand-red);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 8px;
}

.graph-card {
  margin-top: 24px;
}

.graph-head {
  font-weight: 700;
  color: var(--brand-red);
  margin-bottom: 14px;
}

.graph-body {
  width: 100%;
  height: 380px;
}
</style>
