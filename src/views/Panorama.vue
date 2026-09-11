<template>
  <div class="page-container">
    <h1 class="page-title">全景云游</h1>
    <p class="page-subtitle">纪念馆与战场遗址 720° 漫游（Demo 占位，正式版接入全景引擎）</p>

    <el-row :gutter="16">
      <el-col :xs="24" :md="16">
        <div class="pano-stage">
          <div class="pano-placeholder">
            <el-icon :size="60"><View /></el-icon>
            <p>全景漫游区域</p>
            <p class="hint">正式版在此加载 720° 全景图 + 语音讲解点位</p>
          </div>
          <div class="pano-controls">
            <el-button round @click="activeSpot = spots[0]">展厅</el-button>
            <el-button round @click="activeSpot = spots[1]">大崮顶</el-button>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :md="8">
        <div class="spot-list">
          <div class="spot-title">讲解点位</div>
          <div
            v-for="s in spots"
            :key="s.id"
            class="spot-item"
            :class="{ active: activeSpot?.id === s.id }"
            @click="activeSpot = s"
          >
            <el-icon><Location /></el-icon>
            <div>
              <div class="spot-name">{{ s.name }}</div>
              <div class="spot-type">{{ s.type }}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { panoramaSpots as spots } from '../data/mock'

const activeSpot = ref(spots[0])
</script>

<style scoped>
.pano-stage {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
}

.pano-placeholder {
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #bbb;
  background: radial-gradient(circle at center, #f0e6e0, #ddd);
}

.pano-placeholder .hint {
  font-size: 13px;
  color: #aaa;
}

.pano-controls {
  padding: 12px 16px;
  display: flex;
  gap: 8px;
}

.spot-list {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 16px;
}

.spot-title {
  font-weight: 700;
  color: var(--brand-red);
  margin-bottom: 12px;
}

.spot-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  color: #555;
}

.spot-item:hover,
.spot-item.active {
  background: #f9ecec;
  color: var(--brand-red);
}

.spot-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.spot-type {
  font-size: 12px;
  color: #999;
}
</style>
