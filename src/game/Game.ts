import { Application, Assets, Container, Sprite, Texture } from 'pixi.js'
import { DESIGN_HEIGHT, DESIGN_WIDTH, PARTS, TOTAL_SCROLL } from '../utils/constant'
import { scrollNumClamped } from '../utils/utils'
import type { AnimKey, ElementConfig } from '../utils/type'

const ASSET_ROOT = '/assets/tonghua'

/** 运行时实例：原始 config + Sprite 实例 + 动画数组 */
interface LayerInstance {
  cfg: ElementConfig
  sprite: Sprite
  anims: AnimKey[]
}

/** 简单滚动控制器：手指 → scrollY 纯累加，无惯性无弹性 */
export class ScrollController {
  scrollY = 0
  maxScroll: number
  startY = 0
  isDragging = false

  constructor(maxScroll: number) {
    this.maxScroll = maxScroll
  }

  onTouchStart(y: number) {
    this.isDragging = true
    this.startY = y
  }

  onTouchMove(y: number) {
    if (!this.isDragging) return
    const deltaY = this.startY - y // 手指上滑为正 → scrollY 增大
    this.startY = y
    this.scrollY = Math.max(0, Math.min(this.maxScroll, this.scrollY + deltaY))
  }

  onTouchEnd() {
    this.isDragging = false
  }
}

export class Game {
  private readonly app: Application
  private readonly content = new Container()
  private readonly layers: LayerInstance[] = []
  private readonly scroll: ScrollController
  private readonly container: HTMLElement
  private readonly onProgress?: (pct: number) => void

  constructor(container: HTMLElement, onProgress?: (pct: number) => void) {
    this.app = new Application()
    this.scroll = new ScrollController(TOTAL_SCROLL)
    this.container = container
    this.onProgress = onProgress

    this.app
      .init({
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        background: 0xffffff,
        antialias: true,
        preference: 'webgl',
      })
      .then(async () => {
        container.appendChild(this.app.canvas as HTMLCanvasElement)
        this.resize()
        window.addEventListener('resize', () => this.resize())
        await this.preloadImages()
        this.buildContent()
        this.bindTouch()
        this.startLoop()
      })
      .catch(() => {
        console.error('PixiJS 初始化失败')
        container.innerHTML =
          '<pre style="color:#f66;padding:16px">PixiJS 初始化失败，请查看控制台</pre>'
      })
  }

  /** 横竖屏适配：CSS rotate(90°) + canvas resize 宽高对调 */
  private resize(): void {
    const ww = window.innerWidth
    const wh = window.innerHeight
    const isLandscape = ww >= wh

    if (isLandscape) {
      // 横屏：直接铺满
      this.container.style.cssText = `
        position: fixed; left: 0; top: 0;
        width: ${ww}px; height: ${wh}px;
        transform: translate3d(0,0,0);
      `
      this.app.renderer.resize(ww, wh)
    } else {
      // 竖屏：wrap 容器宽高对调 + CSS rotate(90deg)
      this.container.style.cssText = `
        position: fixed;
        left: 50%; top: 50%;
        width: ${wh}px; height: ${ww}px;
        transform: translate3d(-50%, -50%, 0) rotate(90deg);
      `
      this.app.renderer.resize(wh, ww)
    }
  }

  /** 预加载所有 PARTS 中声明的素材，用 Assets 内置 onProgress 回调百分比 0~100 */
  private async preloadImages(): Promise<void> {
    const urls = PARTS.flatMap((part) =>
      part.layers.map((layer) => `${ASSET_ROOT}/${layer.texture}`),
    )
    await Assets.load<Record<string, Texture>>(urls, (progress) => {
      // 将资源加载进度转换为百分比回传给页面
      this.onProgress?.(Math.round(progress * 100))
    })
  }

  /** 用 Assets.get 拿到已加载的 Texture，组装 Sprite 进 content 容器 */
  private buildContent(): void {
    for (const part of PARTS) {
      for (const cfg of part.layers) {
        const texture = Assets.get<Texture>(`${ASSET_ROOT}/${cfg.texture}`)
        const sprite = new Sprite(texture)
        sprite.position.set(cfg.x, cfg.y) // 设置精灵图的初始位置
        // 设置锚点(改变精灵图默认的原点(0, 0)，图片的左上角位置)和 pivot(改变精灵图的旋转中心点，默认在(0, 0),图片的左上角)
        if (cfg.anchor) sprite.anchor.set(cfg.anchor[0], cfg.anchor[1])
        if (cfg.pivot) sprite.pivot.set(cfg.pivot[0], cfg.pivot[1])
        this.content.addChild(sprite)
        this.layers.push({ cfg, sprite, anims: cfg.anims ?? [] })
      }
    }
    this.app.stage.addChild(this.content)
  }

  /** 触摸事件 → ScrollController（用 canvas 内坐标，避免 CSS rotate 搞混方向） */
  private bindTouch(): void {
    const canvas = this.app.canvas as HTMLCanvasElement

    canvas.addEventListener('touchstart', (e) => {
      const pt = this.toLocalY(e.touches[0].clientY)
      this.scroll.onTouchStart(pt)
    }, { passive: true })

    canvas.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault()
        const pt = this.toLocalY(e.touches[0].clientY)
        this.scroll.onTouchMove(pt)
      },
      { passive: false },
    )

    canvas.addEventListener('touchend', () => this.scroll.onTouchEnd(), { passive: true })
  }

  /** 把屏幕 clientY 转换为 canvas 内部坐标系的"纵向"值
   *  - 横屏：clientY 直接用
   *  - 竖屏：整个 canvas CSS rotate 90°，clientY 对应 canvas 内的 x 轴方向
   *    → 用 clientX（视觉上的"上下滑动"）映射到 canvas 内的 y
   */
  private toLocalY(clientY: number): number {
    const ww = window.innerWidth
    const wh = window.innerHeight
    const isLandscape = ww >= wh
    if (isLandscape) return clientY
    // 竖屏时：手指在屏幕上上下滑 → clientY 变化 → 映射到 canvas 内的"纵向"
    // 这里先保持 clientY 直接用，跑起来看方向再调符号
    return clientY
  }

  /** 主循环：每帧更新 scrollPro → 长条左移 → 所有 anim 插值 */
  private startLoop(): void {
    this.app.ticker.add(() => {
      const scrollPro = this.scroll.scrollY
      // 长条整体左移 = 用户向上滚
      this.content.x = -scrollPro
      // 逐条动画插值赋值
      for (const layer of this.layers) {
        for (const anim of layer.anims) {
          const val = scrollNumClamped(
            anim.range[0],
            anim.range[1],
            scrollPro,
            anim.from,
            anim.to,
          )
          applyProp(layer.sprite, anim.prop, val)
        }
      }
    })
  }
}

/** 类型安全地把数值写进 Sprite 的动画属性 */
function applyProp(sprite: Sprite, prop: AnimKey['prop'], value: number): void {
  switch (prop) {
    case 'x':
      sprite.x = value
      break
    case 'y':
      sprite.y = value
      break
    case 'rotation':
      sprite.rotation = value
      break
    case 'scaleX':
      sprite.scale.x = value
      break
    case 'scaleY':
      sprite.scale.y = value
      break
    case 'alpha':
      sprite.alpha = value
      break
  }
}
