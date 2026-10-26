import { Game } from './game/Game'
import './style.css'

// 入口：创建 Game 实例，挂载到 #app
const container = document.getElementById('app')!
const game = new Game(container)

// 窗口自适应
window.addEventListener('resize', () => game.resize())
