<template>
  <div class="page-container">
    <h1 class="page-title">红色课堂</h1>
    <p class="page-subtitle">学 — 测 — 评 学习闭环，完成课程领取电子证书</p>

    <div class="course-grid">
      <div v-for="c in courses" :key="c.id" class="course-card">
        <div class="course-cover">
          <span>{{ c.type }}</span>
        </div>
        <div class="course-body">
          <div class="course-title">{{ c.title }}</div>
          <div class="course-desc">{{ c.desc }}</div>
          <div class="course-meta">
            <el-tag size="small" type="danger">{{ c.type }}</el-tag>
            <span class="duration">⏱ {{ c.duration }}</span>
          </div>
          <el-button type="primary" round size="small" @click="startCourse(c)">
            开始学习
          </el-button>
        </div>
      </div>
    </div>

    <div class="cert-banner">
      <div class="cert-text">
        <div class="cert-title">完成答题闯关，领取学习证书</div>
        <div class="cert-desc">答对 80% 以上题目即可生成专属电子证书（Demo 展示）</div>
      </div>
      <el-button type="warning" round @click="quizVisible = true">进入答题闯关</el-button>
    </div>

    <!-- 答题闯关（Mock） -->
    <el-dialog v-model="quizVisible" title="知识闯关 · 示例题" width="520px">
      <el-form label-position="top">
        <el-form-item label="孟良崮战役发生于哪一年？">
          <el-radio-group v-model="quizAnswer">
            <el-radio value="1947">1947 年</el-radio>
            <el-radio value="1948">1948 年</el-radio>
            <el-radio value="1949">1949 年</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="quizVisible = false">取消</el-button>
        <el-button type="primary" @click="submitQuiz">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { courses } from '../data/mock'

const quizVisible = ref(false)
const quizAnswer = ref('')

function startCourse(c) {
  ElMessage.info(`开始学习：《${c.title}》（Demo 展示）`)
}

function submitQuiz() {
  if (quizAnswer.value === '1947') {
    ElMessage.success('回答正确！')
  } else {
    ElMessage.error('答错了，正确答案是 1947 年')
  }
  quizVisible.value = false
}
</script>

<style scoped>
.course-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.course-card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(160, 30, 20, 0.15);
}

.course-cover {
  height: 100px;
  background: linear-gradient(135deg, #7a0000, #c0392b);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 2px;
}

.course-body {
  padding: 14px;
}

.course-title {
  font-size: 15px;
  font-weight: 700;
  color: #333;
  margin-bottom: 6px;
}

.course-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
  margin-bottom: 10px;
  min-height: 40px;
}

.course-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.duration {
  font-size: 12px;
  color: #aaa;
}

.cert-banner {
  margin-top: 28px;
  background: linear-gradient(90deg, #7a0000, #a11a1a);
  border-radius: 10px;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}

.cert-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.cert-desc {
  font-size: 13px;
  color: #f0dcdc;
}

@media (max-width: 768px) {
  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
