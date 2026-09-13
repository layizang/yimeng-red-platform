// 统一请求封装（基于 fetch，无第三方依赖）
const BASE = import.meta.env.VITE_API_BASE || '/api'

export async function request(url, options = {}) {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const resp = await fetch(BASE + url, { ...options, headers })
  const json = await resp.json().catch(() => ({}))

  if (json.code !== 200) {
    const err = new Error(json.message || '请求失败')
    err.code = json.code
    throw err
  }
  return json.data
}

export const get = (url) => request(url)
export const post = (url, body) => request(url, { method: 'POST', body: JSON.stringify(body) })
