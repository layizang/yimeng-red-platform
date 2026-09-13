<template>
  <div class="layout">
    <!-- 顶部条：logo + 搜索 + AI 入口 -->
    <div class="topbar">
      <div class="topbar-inner">
        <div class="logo" @click="router.push('/home')">
          <span class="logo-badge">孟良崮</span>
          <span class="logo-text">战役红色信息平台</span>
        </div>
        <div class="topbar-right">
          <div class="search-box">
            <el-input
              v-model="keyword"
              placeholder="搜索战役史实、人物、文物…"
              clearable
              @keyup.enter="doSearch"
            >
              <template #append>
                <el-button @click="doSearch">
                  <el-icon><Search /></el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
          <el-button class="ai-entry" round @click="router.push('/ai')">
            <el-icon><ChatDotRound /></el-icon>&nbsp;AI 讲解员
          </el-button>
        </div>
      </div>
    </div>

    <!-- 主导航 -->
    <header class="header">
      <div class="header-inner">
        <el-menu
          mode="horizontal"
          :default-active="activeMenu"
          router
          class="nav-menu"
          :ellipsis="false"
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/overview">战役纵览</el-menu-item>
          <el-menu-item index="/sandbox">战役进程</el-menu-item>
          <el-menu-item index="/personage">英烈人物</el-menu-item>
          <el-menu-item index="/relics">遗址文物</el-menu-item>
          <el-menu-item index="/memory">红色记忆</el-menu-item>
        </el-menu>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>

    <!-- 多栏 footer -->
    <footer class="footer">
      <div class="footer-inner">
        <div class="f-col f-about">
          <div class="f-title">孟良崮战役红色信息平台</div>
          <p class="f-desc">
            以孟良崮战役为主题的党史学习与红色文化信息平台，
            通过动态沙盘、人物图谱与 AI 讲解，讲透沂蒙精神。
          </p>
        </div>
        <div class="f-col">
          <div class="f-title">快速导航</div>
          <div class="f-links">
            <a @click="router.push('/overview')">战役纵览</a>
            <a @click="router.push('/sandbox')">战役进程</a>
            <a @click="router.push('/personage')">英烈人物</a>
            <a @click="router.push('/relics')">遗址文物</a>
          </div>
        </div>
        <div class="f-col">
          <div class="f-title">纪念场馆</div>
          <p class="f-desc">{{ museumInfo.name }}</p>
          <p class="f-desc">{{ museumInfo.address }}</p>
          <p class="f-desc">{{ museumInfo.tips }}</p>
        </div>
        <div class="f-col">
          <div class="f-title">史料来源</div>
          <p class="f-desc">
            孟良崮战役纪念馆史料、《粟裕战争回忆录》、《华东解放战争纪实》、
            中国共产党新闻网、学习强国。
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        孟良崮战役红色信息平台 · 软件工程课程项目 Demo · 内容仅供学习交流，史实以权威史料为准
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { museumInfo } from '../data/content'

const route = useRoute()
const router = useRouter()
const keyword = ref('')

const activeMenu = computed(() => route.path)

function doSearch() {
  const q = keyword.value.trim()
  if (!q) return
  // 站内内容检索：跳转到搜索结果页
  router.push({ path: '/search', query: { q } })
  keyword.value = ''
}
</script>

<style scoped>
.layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* 顶部条 */
.topbar {
  background: #7a0000;
  color: #fff;
}

.topbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.logo-badge {
  background: var(--brand-gold);
  color: #5a0000;
  font-weight: 800;
  font-size: 20px;
  padding: 5px 12px;
  border-radius: 4px;
  letter-spacing: 1px;
}

.logo-text {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  justify-content: flex-end;
}

.search-box {
  width: 300px;
  max-width: 40vw;
}

.search-box :deep(.el-input__wrapper) {
  border-radius: 20px 0 0 20px;
}

.search-box :deep(.el-input-group__append) {
  border-radius: 0 20px 20px 0;
  background: var(--brand-gold);
  border-color: var(--brand-gold);
  color: #5a0000;
}

.ai-entry {
  background: transparent;
  border-color: var(--brand-gold);
  color: var(--brand-gold);
  flex-shrink: 0;
}

.ai-entry:hover {
  background: var(--brand-gold);
  color: #5a0000;
  border-color: var(--brand-gold);
}

/* 主导航 */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  border-bottom: 2px solid var(--brand-red);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-menu {
  background: transparent;
  border-bottom: none;
  --el-menu-hover-bg-color: transparent;
  --el-menu-hover-text-color: var(--brand-red);
}

.nav-menu :deep(.el-menu-item) {
  height: 54px;
  line-height: 54px;
  font-size: 16px;
  color: #444;
  padding: 0 26px;
  border-bottom: 3px solid transparent;
}

.nav-menu :deep(.el-menu-item:hover) {
  color: var(--brand-red);
  background: #faf3f3;
}

.nav-menu :deep(.el-menu-item.is-active) {
  color: var(--brand-red);
  font-weight: 700;
  border-bottom-color: var(--brand-red);
  background: transparent;
}

.main {
  flex: 1;
}

/* footer */
.footer {
  background: #2b2b2b;
  color: #bbb;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 20px 24px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.3fr 1.4fr;
  gap: 32px;
}

.f-title {
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 14px;
  padding-bottom: 8px;
  position: relative;
}

.f-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 28px;
  height: 2px;
  background: var(--brand-gold);
}

.f-desc {
  font-size: 13px;
  line-height: 1.8;
  color: #aaa;
  margin: 0 0 6px;
}

.f-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.f-links a {
  font-size: 13px;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s;
}

.f-links a:hover {
  color: var(--brand-gold);
}

.footer-bottom {
  text-align: center;
  color: #777;
  font-size: 12px;
  padding: 16px 20px;
  border-top: 1px solid #3a3a3a;
}

@media (max-width: 860px) {
  .topbar-inner {
    flex-wrap: wrap;
  }
  .footer-inner {
    grid-template-columns: 1fr 1fr;
  }
  .nav-menu :deep(.el-menu-item) {
    padding: 0 14px;
    font-size: 14px;
  }
}
</style>
