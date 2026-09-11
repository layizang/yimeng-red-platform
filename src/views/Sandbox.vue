<template>
  <div class="page-container">
    <h1 class="page-title">战役动态沙盘推演</h1>
    <p class="page-subtitle">地图与时间轴联动，分阶段还原孟良崮战役态势（Demo 用模拟底图，正式版接入高德地图）</p>

    <!-- 阶段切换 -->
    <div class="stage-tabs">
      <div
        v-for="s in stages"
        :key="s.id"
        class="stage-tab"
        :class="{ active: currentStage === s.id }"
        @click="selectStage(s.id)"
      >
        <span class="stage-no">{{ s.order }}</span>{{ s.name }}
      </div>
    </div>

    <el-row :gutter="16">
      <!-- 左侧：战役态势图 -->
      <el-col :xs="24" :md="17">
        <div class="map-panel">
          <div class="map-titlebar">
            <div class="map-title">
              <span class="title-dot"></span>
              {{ currentStageName }} · 战役态势
            </div>
            <div class="map-tools">
              <el-button size="small" text @click="zoom = Math.min(zoom + 0.1, 1.5)">
                <el-icon><ZoomIn /></el-icon>
              </el-button>
              <el-button size="small" text @click="zoom = Math.max(zoom - 0.1, 0.7)">
                <el-icon><ZoomOut /></el-icon>
              </el-button>
            </div>
          </div>

          <div class="map" :style="{ transform: `scale(${zoom})` }">
            <!-- 静态地形 -->
            <svg class="terrain" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 6 86 C 20 78, 30 70, 42 62 S 62 50, 74 42 S 86 32, 92 26"
                fill="none" stroke="#9cc0e0" stroke-width="1.4" opacity="0.85" />
              <path d="M 53 100 L 53 70 L 51 52 L 49 32 L 47 0"
                fill="none" stroke="#cdbd9c" stroke-width="1.1" stroke-dasharray="2 1.2" />
              <ellipse cx="50" cy="44" rx="17" ry="12" fill="#d8c8a6" stroke="#bfae88" stroke-width="0.5" />
              <ellipse cx="50" cy="44" rx="12" ry="8" fill="#cdbb92" />
              <ellipse cx="50" cy="43" rx="6.5" ry="4.5" fill="#bfa97e" />
              <ellipse cx="66" cy="33" rx="6" ry="4" fill="#d8c8a6" stroke="#bfae88" stroke-width="0.4" />
              <ellipse cx="35" cy="60" rx="5" ry="3.5" fill="#d8c8a6" stroke="#bfae88" stroke-width="0.4" />
              <ellipse cx="62" cy="64" rx="5" ry="3" fill="#d8c8a6" stroke="#bfae88" stroke-width="0.4" />
            </svg>

            <!-- 动态态势 -->
            <svg class="dynamic" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker id="arr-red" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L5,2.5 L0,5 Z" fill="#c0392b" />
                </marker>
                <marker id="arr-blue" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L5,2.5 L0,5 Z" fill="#2b5ba8" />
                </marker>
              </defs>
              <ellipse v-if="phase.encircle" class="encircle" cx="50" cy="44" rx="16" ry="11.5" />
              <line
                v-for="(a, i) in phase.arrows"
                :key="i"
                class="arrow"
                :x1="a.x1" :y1="a.y1" :x2="a.x2" :y2="a.y2"
                :stroke="a.color"
                :marker-end="a.color === '#c0392b' ? 'url(#arr-red)' : 'url(#arr-blue)'"
              />
            </svg>

            <!-- 地名 -->
            <span class="place place-mountain">孟良崮</span>
            <span class="place place-summit">大崮顶</span>
            <span class="place" style="left:46%;top:12%">坦埠</span>
            <span class="place" style="left:15%;top:19%">蒙阴</span>
            <span class="place" style="left:72%;top:68%">垛庄</span>
            <span class="place" style="left:39%;top:82%">界牌</span>

            <!-- 事件点 -->
            <div
              v-for="e in stageEvents"
              :key="e.id"
              class="event-marker"
              :class="{ lit: stageLitIds.has(e.id), active: e.id === activeEventId }"
              :style="{ left: e.x + '%', top: e.y + '%' }"
              @click="showEvent(e)"
            >
              <span class="marker-dot"></span>
            </div>

            <!-- 部队 marker -->
            <div
              v-for="u in phase.red"
              :key="u.short"
              class="unit-marker red"
              :style="{ left: u.x + '%', top: u.y + '%' }"
              @click="showUnit(u.short)"
            >
              <span class="unit-badge">{{ u.short }}</span>
            </div>
            <div
              v-for="u in phase.blue"
              :key="u.short"
              class="unit-marker blue"
              :style="{ left: u.x + '%', top: u.y + '%' }"
              @click="showUnit(u.short)"
            >
              <span class="unit-badge">{{ u.short }}</span>
              <span v-if="u.eliminated" class="unit-eliminated">✕</span>
            </div>
          </div>

          <!-- 图例 -->
          <div class="legend">
            <span class="legend-item"><i class="lg-red"></i>华野（红方）</span>
            <span class="legend-item"><i class="lg-blue"></i>74 师（蓝方）</span>
            <span class="legend-item"><i class="lg-dot"></i>战役事件</span>
            <span class="legend-item"><i class="lg-arrow"></i>进攻方向</span>
          </div>
        </div>
      </el-col>

      <!-- 右侧：阶段说明 + 兵力对比 -->
      <el-col :xs="24" :md="7">
        <div class="panel">
          <div class="panel-title">阶段说明</div>
          <p class="stage-desc">{{ currentStageData.summary }}</p>

          <div class="panel-title">兵力对比</div>
          <div class="force-row">
            <div class="force red">
              <div class="force-num">{{ phase.red.length }}</div>
              <div class="force-label">华野主攻纵队</div>
            </div>
            <div class="vs">VS</div>
            <div class="force blue">
              <div class="force-num">{{ phase.blue.length }}</div>
              <div class="force-label">整编 74 师</div>
            </div>
          </div>

          <div class="panel-title">当前事件</div>
          <div class="current-event" @click="showEvent(currentEvent)">
            <div class="ce-name">{{ currentEvent.name }}</div>
            <div class="ce-time">{{ currentEvent.time }}</div>
            <div class="ce-desc">{{ currentEvent.desc }}</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 底部：时间轴 -->
    <div class="timeline-bar">
      <div class="tl-scroll">
        <div class="tl-track" ref="trackRef">
          <div
            v-for="(e, i) in events"
            :key="e.id"
            class="tl-node-wrap"
            :class="{ active: i === activeIdx, done: i < activeIdx }"
            @click="jumpTo(i)"
          >
            <div class="tl-stage-tag" :class="`s${e.stageId}`">{{ stageName(e.stageId) }}</div>
            <div class="tl-date">{{ e.time }}</div>
            <div class="tl-node"><span class="tl-dot"></span></div>
            <div class="tl-title">{{ e.name }}</div>
          </div>
        </div>
      </div>
      <div class="tl-controls">
        <el-button type="primary" round :icon="playing ? 'VideoPause' : 'VideoPlay'" @click="togglePlay">
          {{ playing ? '暂停' : '播放推演' }}
        </el-button>
        <el-button round :icon="'RefreshLeft'" @click="reset">重置</el-button>
        <span class="tl-progress">{{ activeIdx + 1 }} / {{ events.length }}</span>
      </div>
    </div>

    <!-- 事件详情弹窗 -->
    <el-dialog v-model="eventVisible" :title="detailEvent?.name" width="480px">
      <template v-if="detailEvent">
        <p class="detail-time">时间：{{ detailEvent.time }}　阶段：{{ stageName(detailEvent.stageId) }}</p>
        <p class="detail-desc">{{ detailEvent.desc }}</p>
      </template>
    </el-dialog>

    <!-- 部队详情弹窗 -->
    <el-dialog v-model="unitVisible" :title="detailUnit?.name" width="460px">
      <template v-if="detailUnit">
        <el-descriptions :column="2" border size="small">
          <el-descriptions-item label="番号">{{ detailUnit.name }}</el-descriptions-item>
          <el-descriptions-item label="阵营">{{ detailUnit.faction === 'red' ? '红方（华野）' : '蓝方（国民党）' }}</el-descriptions-item>
          <el-descriptions-item label="类型">{{ detailUnit.type }}</el-descriptions-item>
          <el-descriptions-item label="指挥官">{{ detailUnit.commander }}</el-descriptions-item>
        </el-descriptions>
        <p class="detail-desc">{{ detailUnit.desc }}</p>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { stages, events, units } from '../data/mock'

const activeIdx = ref(0)
const playing = ref(false)
const zoom = ref(1)
const detailEvent = ref(null)
const detailUnit = ref(null)
const trackRef = ref(null)
let timer = null

// 每个阶段的态势：红蓝部队位置、箭头、是否合围
const phaseData = {
  1: {
    red: [
      { short: '1纵', x: 40, y: 64 }, { short: '4纵', x: 60, y: 74 },
      { short: '6纵', x: 48, y: 82 }, { short: '8纵', x: 30, y: 50 },
      { short: '9纵', x: 50, y: 17 }, { short: '阻援', x: 83, y: 48 }
    ],
    blue: [{ short: '74师', x: 56, y: 56 }],
    arrows: [{ x1: 72, y1: 70, x2: 57, y2: 57, color: '#2b5ba8' }],
    encircle: false
  },
  2: {
    red: [
      { short: '1纵', x: 42, y: 58 }, { short: '4纵', x: 58, y: 66 },
      { short: '6纵', x: 48, y: 74 }, { short: '8纵', x: 36, y: 46 },
      { short: '9纵', x: 50, y: 24 }, { short: '阻援', x: 79, y: 50 }
    ],
    blue: [{ short: '74师', x: 52, y: 50 }],
    arrows: [
      { x1: 42, y1: 58, x2: 52, y2: 50, color: '#c0392b' },
      { x1: 58, y1: 66, x2: 52, y2: 50, color: '#c0392b' },
      { x1: 36, y1: 46, x2: 50, y2: 48, color: '#c0392b' },
      { x1: 50, y1: 24, x2: 51, y2: 46, color: '#c0392b' }
    ],
    encircle: false
  },
  3: {
    red: [
      { short: '1纵', x: 40, y: 50 }, { short: '4纵', x: 58, y: 52 },
      { short: '6纵', x: 50, y: 60 }, { short: '8纵', x: 38, y: 38 },
      { short: '9纵', x: 52, y: 32 }, { short: '阻援', x: 75, y: 48 }
    ],
    blue: [{ short: '74师', x: 50, y: 44 }],
    arrows: [
      { x1: 40, y1: 50, x2: 50, y2: 44, color: '#c0392b' },
      { x1: 58, y1: 52, x2: 51, y2: 45, color: '#c0392b' },
      { x1: 50, y1: 60, x2: 50, y2: 46, color: '#c0392b' },
      { x1: 38, y1: 38, x2: 49, y2: 43, color: '#c0392b' },
      { x1: 52, y1: 32, x2: 50, y2: 42, color: '#c0392b' }
    ],
    encircle: true
  },
  4: {
    red: [
      { short: '1纵', x: 42, y: 46 }, { short: '4纵', x: 56, y: 46 },
      { short: '6纵', x: 50, y: 55 }, { short: '8纵', x: 42, y: 37 },
      { short: '9纵', x: 56, y: 37 }, { short: '阻援', x: 73, y: 46 }
    ],
    blue: [{ short: '74师', x: 50, y: 44, eliminated: true }],
    arrows: [],
    encircle: true
  }
}

const currentStage = computed(() => events[activeIdx.value]?.stageId || 1)
const currentStageData = computed(() => stages.find((s) => s.id === currentStage.value) || stages[0])
const currentStageName = computed(() => currentStageData.value.name)
const phase = computed(() => phaseData[currentStage.value])

const stageEvents = computed(() => events.filter((e) => e.stageId === currentStage.value))
const stageStartIdx = computed(() => events.findIndex((e) => e.stageId === currentStage.value))
const stageActiveIdx = computed(() => activeIdx.value - stageStartIdx.value)
const stageLitIds = computed(() => new Set(stageEvents.value.slice(0, stageActiveIdx.value + 1).map((e) => e.id)))
const currentEvent = computed(() => events[activeIdx.value])
const activeEventId = computed(() => currentEvent.value?.id || null)

const eventVisible = computed({
  get: () => detailEvent.value !== null,
  set: (v) => { if (!v) detailEvent.value = null }
})
const unitVisible = computed({
  get: () => detailUnit.value !== null,
  set: (v) => { if (!v) detailUnit.value = null }
})

function stageName(id) {
  return stages.find((s) => s.id === id)?.name || ''
}

function jumpTo(i) {
  activeIdx.value = Math.max(0, Math.min(events.length - 1, i))
}

function selectStage(id) {
  const idx = events.findIndex((e) => e.stageId === id)
  if (idx >= 0) {
    stop()
    jumpTo(idx)
  }
}

function showEvent(e) {
  detailEvent.value = e
}

function showUnit(short) {
  detailUnit.value = units.find((u) => u.short === short) || null
}

function togglePlay() {
  playing.value ? stop() : start()
}

function start() {
  playing.value = true
  timer = setInterval(() => {
    if (activeIdx.value < events.length - 1) {
      activeIdx.value += 1
    } else {
      stop()
    }
  }, 1500)
}

function stop() {
  playing.value = false
  if (timer) clearInterval(timer)
  timer = null
}

function reset() {
  stop()
  activeIdx.value = 0
}

// 时间轴自动滚动到当前节点
watch(activeIdx, () => {
  const el = trackRef.value?.children[activeIdx.value]
  el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
})

onBeforeUnmount(stop)
</script>

<style scoped>
.stage-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.stage-tab {
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #ddd;
  color: #666;
  transition: all 0.2s;
}

.stage-tab .stage-no {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  border-radius: 50%;
  background: #eee;
  color: #888;
  font-size: 12px;
  margin-right: 6px;
}

.stage-tab.active {
  background: var(--brand-red);
  color: #fff;
  border-color: var(--brand-red);
  font-weight: 600;
}

.stage-tab.active .stage-no {
  background: var(--brand-gold);
  color: #5a0000;
}

.map-panel {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
}

.map-titlebar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.map-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #333;
}

.title-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--brand-red);
  display: inline-block;
}

.map {
  position: relative;
  height: 440px;
  background: linear-gradient(#f3ede0, #efe7d4);
  overflow: hidden;
  transform-origin: center center;
  transition: transform 0.3s;
}

.terrain,
.dynamic {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.arrow {
  stroke-width: 1.3;
  stroke-dasharray: 3 2;
  animation: flow 0.9s linear infinite;
}

@keyframes flow {
  to { stroke-dashoffset: -5; }
}

.encircle {
  fill: none;
  stroke: #c0392b;
  stroke-width: 1.3;
  stroke-dasharray: 5 3;
  animation: flow 1.6s linear infinite;
}

.place {
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: #8a7a5a;
  letter-spacing: 1px;
  pointer-events: none;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.place-mountain {
  left: 50%;
  top: 37%;
  font-weight: 700;
  color: #6b5b3e;
  font-size: 13px;
}

.place-summit {
  left: 50%;
  top: 44%;
  font-size: 11px;
  color: #7a6a4c;
}

.event-marker {
  position: absolute;
  width: 18px;
  height: 18px;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.marker-dot {
  width: 10px;
  height: 10px;
  background: #aaa;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
}

.event-marker.lit .marker-dot {
  background: #c0392b;
}

.event-marker.active .marker-dot {
  background: #e6a817;
  box-shadow: 0 0 0 4px rgba(230, 168, 23, 0.5);
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(230, 168, 23, 0.5); }
  50% { box-shadow: 0 0 0 7px rgba(230, 168, 23, 0.15); }
}

.unit-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  transition: left 0.5s, top 0.5s;
  cursor: pointer;
  z-index: 4;
}

.unit-badge {
  display: inline-block;
  min-width: 30px;
  padding: 4px 6px;
  text-align: center;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

.unit-marker.red .unit-badge { background: #c0392b; }
.unit-marker.blue .unit-badge { background: #2b5ba8; }

.unit-eliminated {
  position: absolute;
  top: -14px;
  right: -10px;
  color: #c0392b;
  font-size: 16px;
  font-weight: 800;
}

.legend {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  padding: 10px 16px;
  border-top: 1px solid #eee;
  color: #666;
  font-size: 12px;
}

.legend-item { display: flex; align-items: center; gap: 5px; }

.lg-red { width: 10px; height: 10px; background: #c0392b; border-radius: 2px; display: inline-block; }
.lg-blue { width: 10px; height: 10px; background: #2b5ba8; border-radius: 2px; display: inline-block; }
.lg-dot { width: 10px; height: 10px; background: #aaa; border-radius: 50%; display: inline-block; }
.lg-arrow { width: 14px; height: 2px; background: #c0392b; display: inline-block; position: relative; }
.lg-arrow::after { content: ''; position: absolute; right: -3px; top: -2px; border: 3px solid transparent; border-left-color: #c0392b; }

.panel {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 18px;
}

.panel-title {
  font-weight: 700;
  color: var(--brand-red);
  margin: 16px 0 10px;
  padding-left: 10px;
  border-left: 3px solid var(--brand-red);
}

.panel-title:first-child { margin-top: 0; }

.stage-desc {
  color: #666;
  line-height: 1.7;
  margin: 0;
  font-size: 14px;
}

.force-row {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 12px 0;
}

.force { text-align: center; }
.force-num { font-size: 28px; font-weight: 800; }
.force.red .force-num { color: #c0392b; }
.force.blue .force-num { color: #2b5ba8; }
.force-label { font-size: 12px; color: #999; }
.vs { font-weight: 800; color: #ccc; }

.current-event {
  background: #faf5f5;
  border: 1px solid #f0e0de;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.current-event:hover { border-color: #e0b0a8; }
.ce-name { font-size: 15px; font-weight: 700; color: #333; }
.ce-time { font-size: 12px; color: #aaa; margin: 4px 0; }
.ce-desc { font-size: 13px; color: #666; line-height: 1.6; }

/* 底部时间轴 */
.timeline-bar {
  margin-top: 16px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px 16px 14px;
}

.tl-scroll { overflow-x: auto; }

.tl-track {
  display: flex;
  align-items: flex-start;
  min-width: 100%;
}

.tl-node-wrap {
  flex: 1;
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  position: relative;
  padding: 0 4px;
}

.tl-node-wrap::before {
  content: '';
  position: absolute;
  top: 60px;
  left: 50%;
  width: 100%;
  height: 3px;
  background: #e5ded2;
  z-index: 0;
}

.tl-node-wrap:last-child::before { display: none; }
.tl-node-wrap.done::before { background: var(--brand-red); }

.tl-stage-tag {
  display: inline-block;
  font-size: 11px;
  padding: 1px 8px;
  border-radius: 10px;
  color: #fff;
  margin-bottom: 4px;
}

.tl-stage-tag.s1 { background: #b08968; }
.tl-stage-tag.s2 { background: #c0392b; }
.tl-stage-tag.s3 { background: #8b0000; }
.tl-stage-tag.s4 { background: #c8a15a; }

.tl-date { font-size: 11px; color: #999; margin-bottom: 6px; }

.tl-node {
  position: relative;
  z-index: 1;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tl-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #d8d0c2;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px #d8d0c2;
  transition: all 0.3s;
}

.tl-node-wrap.done .tl-dot { background: var(--brand-red); box-shadow: 0 0 0 2px var(--brand-red); }

.tl-node-wrap.active .tl-dot {
  background: #e6a817;
  width: 21px;
  height: 21px;
  box-shadow: 0 0 0 3px rgba(230, 168, 23, 0.4);
  animation: pulse 1.2s infinite;
}

.tl-title {
  margin-top: 6px;
  font-size: 13px;
  color: #666;
  font-weight: 600;
  line-height: 1.3;
}

.tl-node-wrap.active .tl-title { color: var(--brand-red); }

.tl-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid #f0f0f0;
}

.tl-progress { color: #999; font-size: 13px; margin-left: auto; }

.detail-time { color: #888; font-size: 13px; margin: 0 0 10px; }
.detail-desc { color: #444; line-height: 1.7; margin: 10px 0 0; }

@media (max-width: 768px) {
  .map { height: 340px; }
}
</style>
