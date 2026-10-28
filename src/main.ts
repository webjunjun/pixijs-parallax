import { Game } from './game/Game'
import './style.css'

// 入口：创建 Game 实例，挂载到 #app；资源预载进度 → HTML loading 百分比
const container = document.getElementById('app')!
const loadingNum = document.querySelector('#loading .loading-num')!
const game = new Game(container, (pct) => {
  loadingNum.textContent = `${pct}%`
  if (pct >= 100) {
    const loading = document.getElementById('loading')!
    loading.classList.add('hide')
  }
})

// 音乐开关：对照参考稿 .music 按钮（BGM + 全部区间音效）
const musicBtn = document.getElementById('music')!
musicBtn.addEventListener('click', () => {
  musicBtn.classList.toggle('off', !game.sound.toggle())
})
