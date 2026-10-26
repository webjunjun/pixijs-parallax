import { Application } from 'pixi.js'
import { DESIGN_HEIGHT, DESIGN_WIDTH, MOUSE_LERP } from '../config'
import { ParallaxScene } from './ParallaxScene'

/**
 * PixiJS 应用封装
 *
 * 职责：
 *   1. 创建 PixiJS Application（WebGL 渲染 + 设计尺寸 1920×1080 基准）
 *   2. 挂载 ParallaxScene，管理主循环 update
 *   3. 监听鼠标/触摸，驱动相机目标位置
 *   4. resize 时保持画布等比缩放居中
 */
export class Game {
  private readonly app: Application
  private scene!: ParallaxScene

  constructor(container: HTMLElement) {
    this.app = new Application()

    this.app
      .init({
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        background: 0x000000,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
      })
      .then(() => {
        container.appendChild(this.app.canvas as HTMLCanvasElement)

        // 构建视差场景
        this.scene = new ParallaxScene(MOUSE_LERP)
        this.app.stage.addChild(this.scene)

        // 交互监听
        this.bindPointer()
        this.resize()

        // 主循环（dt 未使用，PixiJS 8 Ticker.add 不传参数）
        this.app.ticker.add(() => this.scene.update(0))
      })
      .catch((err) => {
        console.error('[Game] PixiJS init failed:', err)
        container.innerHTML = '<pre style="color:#f66;padding:16px">PixiJS 初始化失败，请查看控制台</pre>'
      })
  }

  /** 鼠标 → 归一化目标位置 [-1, 1] */
  private bindPointer(): void {
    const canvas = this.app.canvas as HTMLCanvasElement
    canvas.style.cursor = 'grab'

    const onMove = (clientX: number): void => {
      const rect = canvas.getBoundingClientRect()
      const centerX = rect.width / 2
      const normalized = Math.max(-1, Math.min(1, (clientX - rect.left - centerX) / centerX))
      this.scene.setMouseTarget(normalized)
    }

    canvas.addEventListener('pointermove', (e: globalThis.PointerEvent) => {
      onMove(e.clientX)
    })

    // 离开或松开 → 回中
    const onLeave = (): void => this.scene.setMouseTarget(0)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerup', onLeave)
  }

  /**
   * 等比缩放适配
   * 保持 1920×1080 画布比例，黑边填充
   */
  resize(): void {
    if (!this.app?.renderer) return
    const w = window.innerWidth
    const h = window.innerHeight

    const scale = Math.min(w / DESIGN_WIDTH, h / DESIGN_HEIGHT)
    const renderW = DESIGN_WIDTH * scale
    const renderH = DESIGN_HEIGHT * scale

    this.app.renderer.resize(renderW, renderH)
    this.app.canvas.style.marginLeft = `${(w - renderW) / 2}px`
    this.app.canvas.style.marginTop = `${(h - renderH) / 2}px`
  }

  /** 暴露 scene，后续替换真实贴图用 */
  getParallaxScene(): ParallaxScene {
    return this.scene
  }
}
