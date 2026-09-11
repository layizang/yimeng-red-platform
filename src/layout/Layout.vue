<template>
  <div class="layout">
    <header class="header">
      <div class="header-inner">
        <div class="logo" @click="router.push('/home')">
          <span class="logo-badge">孟良崮</span>
          <span class="logo-text">红色信息平台</span>
        </div>
        <el-menu
          mode="horizontal"
          :default-active="activeMenu"
          router
          class="nav-menu"
          :ellipsis="false"
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/sandbox">战役沙盘</el-menu-item>
          <el-menu-item index="/personage">人物志</el-menu-item>
          <el-menu-item index="/ai">AI 讲解员</el-menu-item>
          <el-menu-item index="/panorama">全景云游</el-menu-item>
          <el-menu-item index="/course">红色课堂</el-menu-item>
        </el-menu>
        <div class="header-right">
          <el-button type="primary" round @click="router.push('/login')">
            <el-icon><User /></el-icon>&nbsp;登录
          </el-button>
        </div>
      </div>
    </header>

    <main class="main">
      <router-view />
    </main>

    <footer class="footer">
      孟良崮战役红色信息平台 · 软件工程课程项目 Demo
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeMenu = computed(() => route.path)
</script>

<style scoped>
.layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(90deg, #7a0000, #a11a1a);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.header-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
}

.logo-badge {
  background: var(--brand-gold);
  color: #5a0000;
  font-weight: 800;
  font-size: 18px;
  padding: 4px 10px;
  border-radius: 4px;
}

.logo-text {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}

.nav-menu {
  flex: 1;
  background: transparent;
  border-bottom: none;
  --el-menu-hover-bg-color: rgba(255, 255, 255, 0.12);
}

.nav-menu :deep(.el-menu-item) {
  color: #f5e6e6;
  border-bottom: 2px solid transparent;
}

.nav-menu :deep(.el-menu-item:hover) {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

.nav-menu :deep(.el-menu-item.is-active) {
  color: #fff;
  font-weight: 600;
  border-bottom-color: var(--brand-gold);
  background: rgba(255, 255, 255, 0.08);
}

.header-right {
  flex-shrink: 0;
}

.main {
  flex: 1;
}

.footer {
  text-align: center;
  color: #999;
  font-size: 13px;
  padding: 20px 0;
  background: #2b2b2b;
  color: #aaa;
}
</style>
