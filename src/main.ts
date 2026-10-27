import { Game } from './game/Game'
import './style.css'

// 入口：创建 Game 实例，挂载到 #app
const container = document.getElementById('app')!
void new Game(container)
