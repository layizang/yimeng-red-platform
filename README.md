# 沂蒙红色基地信息平台 · 前端

基于 Vue 3 + Vite + Element Plus + ECharts 的红色文化信息平台前端，数据为本地 mock，可直接静态部署。

## 技术栈

- Vue 3 + Vue Router
- Element Plus + @element-plus/icons-vue
- ECharts
- Vite 5

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # 产物输出到 dist/
npm run preview
```

## 部署

推送到 `main` 分支后，GitHub Actions 自动构建并发布到 GitHub Pages。
