<template>
  <div class="page-container">
    <h1 class="page-title">AI 讲解员</h1>
    <p class="page-subtitle">基于孟良崮战役党史知识库的检索增强问答（Demo 用本地规则回复，正式版对接大模型 RAG）</p>

    <div class="chat-panel">
      <div class="chat-header">
        <el-avatar :size="36" class="ai-avatar">AI</el-avatar>
        <div>
          <div class="ai-name">沂蒙 AI 讲解员</div>
          <div class="ai-status">在线 · 知识库已就绪</div>
        </div>
      </div>

      <div class="chat-body" ref="bodyRef">
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="msg-row"
          :class="msg.role"
        >
          <div class="msg-bubble">{{ msg.content }}</div>
          <div v-if="msg.source" class="msg-source">📖 {{ msg.source }}</div>
        </div>
        <div v-if="typing" class="msg-row ai">
          <div class="msg-bubble typing">正在思考…</div>
        </div>
      </div>

      <div class="chat-input">
        <el-input
          v-model="input"
          placeholder="例如：孟良崮战役是哪一天胜利的？"
          @keyup.enter="send"
        >
          <template #append>
            <el-button type="primary" @click="send">发送</el-button>
          </template>
        </el-input>
        <div class="quick-questions">
          <el-tag
            v-for="q in quickQuestions"
            :key="q"
            class="quick-tag"
            @click="ask(q)"
          >
            {{ q }}
          </el-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { chat } from '../api/ai'

const route = useRoute()
const input = ref('')
const typing = ref(false)
const bodyRef = ref(null)

// 从顶部搜索框跳转过来时，自动发起提问
onMounted(() => {
  const q = route.query.q
  if (q) {
    input.value = String(q)
    send()
  }
})

const messages = ref([
  { role: 'ai', content: '您好！我是沂蒙 AI 讲解员。可以问我关于孟良崮战役的任何问题，例如战役时间、主要指挥员、关键决策或沂蒙精神。', source: '' }
])

const quickQuestions = [
  '孟良崮战役发生在哪一年？',
  '主要指挥员是谁？',
  '为什么说孟良崮战役扭转了华东战局？'
]

function ask(q) {
  input.value = q
  send()
}

async function send() {
  const text = input.value.trim()
  if (!text) return
  messages.value.push({ role: 'user', content: text })
  input.value = ''
  typing.value = true
  scrollToBottom()

  try {
    const reply = await chat(text)
    messages.value.push({ role: 'ai', content: reply.answer, source: reply.source })
  } catch (e) {
    messages.value.push({ role: 'ai', content: '抱歉，讲解服务暂时不可用，请稍后再试。', source: '' })
    ElMessage.error(e.message || '请求失败')
  } finally {
    typing.value = false
    scrollToBottom()
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
  })
}
</script>

<style scoped>
.chat-panel {
  max-width: 760px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 600px;
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--brand-red);
  color: #fff;
}

.ai-avatar {
  background: var(--brand-gold);
  color: #5a0000;
  font-weight: 700;
}

.ai-name {
  font-weight: 700;
}

.ai-status {
  font-size: 12px;
  color: #f0dcdc;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #faf8f6;
}

.msg-row {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
}

.msg-row.user {
  align-items: flex-end;
}

.msg-row.ai {
  align-items: flex-start;
}

.msg-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 10px;
  line-height: 1.6;
  font-size: 14px;
}

.user .msg-bubble {
  background: var(--brand-red);
  color: #fff;
  border-bottom-right-radius: 2px;
}

.ai .msg-bubble {
  background: #fff;
  color: #333;
  border: 1px solid #eee;
  border-bottom-left-radius: 2px;
}

.typing {
  color: #999;
}

.msg-source {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  padding-left: 4px;
}

.chat-input {
  padding: 14px 18px;
  border-top: 1px solid #eee;
  background: #fff;
}

.quick-questions {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.quick-tag {
  cursor: pointer;
}
</style>
