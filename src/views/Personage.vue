<template>
  <div class="page-container">
    <h1 class="page-title">人物志</h1>
    <p class="page-subtitle">指挥员与支前群众群像，点击卡片查看关系</p>

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

    <!-- 关系图谱占位 -->
    <el-card shadow="never" class="graph-card">
      <div class="graph-head">人物关系图谱（正式版使用 ECharts 关系图）</div>
      <div class="graph-body">
        <div v-for="r in relations" :key="r.source + '-' + r.target" class="graph-link">
          <span class="g-node">{{ personName(r.source) }}</span>
          <span class="g-edge">{{ r.type }}</span>
          <span class="g-node">{{ personName(r.target) }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { persons, relations } from '../data/mock'

const activePerson = ref(null)
const dialogVisible = computed({
  get: () => activePerson.value !== null,
  set: (v) => {
    if (!v) activePerson.value = null
  }
})

function personName(id) {
  return persons.find((p) => p.id === id)?.name || id
}

const activeRelations = computed(() => {
  if (!activePerson.value) return []
  return relations.filter((r) => r.source === activePerson.value.id)
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
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.graph-link {
  display: flex;
  align-items: center;
  gap: 10px;
}

.g-node {
  background: var(--brand-red);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
}

.g-edge {
  color: #999;
  font-size: 12px;
}
</style>
