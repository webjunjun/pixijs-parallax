import { Application } from 'pixi.js'
import { BASE_HEIGHT, BASE_WIDTH } from '../constant'

/**
 * PixiJS 应用封装
 *
 * 职责：
 *   1. 创建 PixiJS Application（WebGL 渲染）
 *   2. 挂载 ParallaxScene，管理主循环 update
 *   3. 监听鼠标/触摸，驱动相机目标位置
 *   4. resize 时保持画布等比缩放居中
 */
export class Game {
  private readonly app: Application

  constructor(container: HTMLElement) {
    this.app = new Application()

    this.app
      .init({
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        background: 0xffffff,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        preference: 'webgl'
      })
      .then(() => {
        container.appendChild(this.app.canvas as HTMLCanvasElement)
      })
      .catch(() => {
        console.error('PixiJS 初始化失败')
        container.innerHTML = '<pre style="color:#f66;padding:16px">PixiJS 初始化失败，请查看控制台</pre>'
      })
  }
}
