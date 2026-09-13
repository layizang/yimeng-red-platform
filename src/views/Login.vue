<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-logo">孟良崮<br />红色信息平台</div>
      <p class="login-sub">登录后可记录学习进度、答题成绩与学习证书</p>

      <el-form :model="form" label-position="top">
        <el-form-item v-if="isRegister" label="昵称">
          <el-input v-model="form.nickname" placeholder="请输入昵称（选填）">
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="form.username" placeholder="请输入账号">
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-button type="primary" size="large" round style="width: 100%" :loading="loading" @click="submit">
          {{ isRegister ? '注 册' : '登 录' }}
        </el-button>
      </el-form>

      <div class="login-footer">
        <el-link @click="router.push('/home')">← 返回首页</el-link>
        <el-link type="primary" @click="toggleRegister">{{ isRegister ? '已有账号，去登录' : '没有账号，去注册' }}</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '../api/auth'

const router = useRouter()
const isRegister = ref(false)
const loading = ref(false)
const form = reactive({ username: '', password: '', nickname: '' })

function toggleRegister() {
  isRegister.value = !isRegister.value
}

async function submit() {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  loading.value = true
  try {
    const res = isRegister.value
      ? await register(form.username, form.password, form.nickname)
      : await login(form.username, form.password)
    localStorage.setItem('token', res.token)
    localStorage.setItem('nickname', res.nickname || res.username)
    ElMessage.success(isRegister.value ? '注册成功' : '登录成功')
    router.push('/home')
  } catch (e) {
    ElMessage.error(e.message || (isRegister.value ? '注册失败' : '登录失败'))
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6d0000, #a11a1a);
}

.login-box {
  width: 400px;
  background: #fff;
  border-radius: 14px;
  padding: 40px 36px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.login-logo {
  text-align: center;
  font-size: 22px;
  font-weight: 800;
  color: var(--brand-red);
  line-height: 1.4;
  margin-bottom: 10px;
}

.login-sub {
  text-align: center;
  color: #999;
  font-size: 13px;
  margin: 0 0 24px;
}

.login-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
</style>
