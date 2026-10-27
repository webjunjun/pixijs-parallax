import { Game } from './game/Game'
import './style.css'

// 入口：创建 Game 实例，挂载到 #app；资源预载进度 → HTML loading 百分比
const container = document.getElementById('app')!
const loadingNum = document.querySelector('#loading .loading-num')!
void new Game(container, (pct) => {
  loadingNum.textContent = `${pct}%`
  if (pct >= 100) {
    const loading = document.getElementById('loading')!
    loading.classList.add('hide')
  }
})
