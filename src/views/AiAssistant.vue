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
import { nextTick, ref } from 'vue'

const input = ref('')
const typing = ref(false)
const bodyRef = ref(null)

const messages = ref([
  { role: 'ai', content: '您好！我是沂蒙 AI 讲解员。可以问我关于孟良崮战役的任何问题，例如战役时间、主要指挥员、关键决策或沂蒙精神。', source: '' }
])

const quickQuestions = [
  '孟良崮战役发生在哪一年？',
  '主要指挥员是谁？',
  '为什么说孟良崮战役扭转了华东战局？'
]

// 本地规则回复（Mock），正式版替换为后端 RAG 接口
const knowledge = [
  { keywords: ['哪一年', '时间', '什么时候', '日期'], answer: '孟良崮战役发生于 1947 年 5 月 13 日至 16 日，是解放战争时期华东战场上的一次关键战役。', source: '《华东解放战争纪实》' },
  { keywords: ['指挥', '谁', '粟裕', '陈毅'], answer: '战役由华东野战军司令员兼政委陈毅、副司令员粟裕指挥。陈毅、粟裕当机立断，定下围歼整编 74 师的决心。', source: '《粟裕战争回忆录》' },
  { keywords: ['扭转', '意义', '为什么', '战局'], answer: '孟良崮战役全歼国民党军五大主力之一的整编第七十四师，击毙师长张灵甫，沉重打击了国民党军对山东解放区的重点进攻，极大鼓舞了士气，扭转了华东战局。', source: '中国共产党新闻网' },
  { keywords: ['精神', '沂蒙'], answer: '沂蒙精神的核心是"水乳交融、生死与共"。战役中，沂蒙人民踊跃支前，是人民战争的生动写照。', source: '学习强国专题' }
]

function ask(q) {
  input.value = q
  send()
}

function send() {
  const text = input.value.trim()
  if (!text) return
  messages.value.push({ role: 'user', content: text })
  input.value = ''
  typing.value = true
  scrollToBottom()

  setTimeout(() => {
    typing.value = false
    const hit = knowledge.find((k) => k.keywords.some((kw) => text.includes(kw)))
    const reply = hit
      ? hit
      : {
          answer: '这个问题我还在学习中。您可以换个问法，比如问战役时间、指挥员或战役意义。',
          source: ''
        }
    messages.value.push({ role: 'ai', content: reply.answer, source: reply.source })
    scrollToBottom()
  }, 600)
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
