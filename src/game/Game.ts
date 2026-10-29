import { Application, Assets, Container, Sprite, Texture } from 'pixi.js'
import { DESIGN_HEIGHT, DESIGN_WIDTH, PARTS, TOTAL_SCROLL, ASSET_ROOT } from '../utils/constant'
import type { ElementConfig } from '../utils/type'
import { FEATURES, type LayerInstance } from './features'
import { SoundManager } from './audio'

// 桌面端手机壳：两侧黑边宽度、手机壳与窗口的最小间距（CSS 像素）
const PHONE_BEZEL = 16
const PHONE_MARGIN = 90
// 真机横放屏幕宽高比（19.5:9，iPhone 15 Pro 约 2.17:1）
const PHONE_RATIO = 19.5 / 9
// 手机壳屏幕高度 ≈ 窗口高度的比例，桌面展示区不铺满窗口
const PHONE_SIZE_RATIO = 0.5

/** 简单滚动控制器：手指 → scrollY 纯累加，无惯性无弹性 */
export class ScrollController {
  scrollY = 0
  maxScroll: number // 最大可滚动距离
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
  // 音效管理器
  readonly sound = new SoundManager()
  // 设计稿 → canvas 像素的缩放比，所有内部坐标统一用设计稿坐标系
  private scaleX = 1
  private scaleY = 1
  // 桌面端（有鼠标、无触摸）：限定手机壳区域 + 鼠标拖拽，移动端逻辑不变
  private readonly isDesktop: boolean

  constructor(container: HTMLElement, onProgress?: (pct: number) => void) {
    this.app = new Application()
    this.scroll = new ScrollController(TOTAL_SCROLL)
    this.container = container
    this.onProgress = onProgress
    this.isDesktop =
      !('ontouchstart' in window) && window.matchMedia('(pointer: fine)').matches

    this.app
      .init({
        width: DESIGN_WIDTH,
        height: DESIGN_HEIGHT,
        background: 0xffffff,
        antialias: true,
        preference: 'webgl',
        resolution: window.devicePixelRatio || 1, // 高分屏按 DPR 渲染，避免模糊
        autoDensity: true, // canvas CSS 尺寸自动 = 逻辑像素
        roundPixels: true, // 像素对齐，减少亚像素模糊
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

  // 资源图都是做的横屏，需要适配竖屏
  // 因此 CSS rotate(90°) + canvas resize 宽高对调
  // 屏幕中心点恒为 (DESIGN_WIDTH/2, DESIGN_HEIGHT/2)
  // content 容器按设计稿比例缩放，内部坐标统一用设计稿坐标系
  private resize(): void {
    const ww = window.innerWidth
    const wh = window.innerHeight

    // 桌面：屏幕开孔按真机比例 19.5:9，高度 ≈ 窗口 60%，居中不旋转
    if (this.isDesktop) {
      const maxW = ww - PHONE_MARGIN * 2
      const maxH = wh - PHONE_MARGIN * 2
      let sh = Math.min(maxH, wh * PHONE_SIZE_RATIO)
      let sw = sh * PHONE_RATIO
      if (sw > maxW) {
        sw = maxW
        sh = sw / PHONE_RATIO
      }
      this.container.classList.add('desktop')
      this.container.style.cssText = `
        position: fixed; left: 50%; top: 50%;
        width: ${sw + PHONE_BEZEL * 2}px; height: ${sh + PHONE_BEZEL * 2}px;
        transform: translate(-50%, -50%);
      `
      this.app.renderer.resize(sw, sh)
      this.scaleX = sw / DESIGN_WIDTH
      this.scaleY = sh / DESIGN_HEIGHT
      this.content.scale.set(this.scaleX, this.scaleY)
      return
    }

    const isLandscape = ww >= wh

    if (isLandscape) {
      this.container.style.cssText = `
        position: fixed; left: 0; top: 0;
        width: ${ww}px; height: ${wh}px;
        transform: translate3d(0,0,0);
      `
      this.app.renderer.resize(ww, wh)
      this.scaleX = ww / DESIGN_WIDTH
      this.scaleY = wh / DESIGN_HEIGHT
    } else {
      this.container.style.cssText = `
        position: fixed;
        left: 50%; top: 50%;
        width: ${wh}px; height: ${ww}px;
        transform: translate3d(-50%, -50%, 0) rotate(90deg);
      `
      this.app.renderer.resize(wh, ww)
      this.scaleX = wh / DESIGN_WIDTH
      this.scaleY = ww / DESIGN_HEIGHT
    }
    this.content.scale.set(this.scaleX, this.scaleY)
  }

  // 递归收集所有层级中的 texture 路径
  private collectTextures(configs: ElementConfig[]): string[] {
    const urls: string[] = []
    const walk = (list: ElementConfig[]) => {
      for (const cfg of list) {
        if (cfg.texture) urls.push(`${ASSET_ROOT}/${cfg.texture}`)
        if (cfg.frameSeq) {
          for (let i = 0; i < cfg.frameSeq.frames; i++) {
            urls.push(`${ASSET_ROOT}/${cfg.frameSeq.prefix}${i}.png`)
          }
        }
        if (cfg.children) walk(cfg.children)
      }
    }
    walk(configs)
    return urls
  }

  // 预加载所有素材，用 Assets 内置 onProgress 回调百分比 0~100
  private async preloadImages(): Promise<void> {
    const urls = this.collectTextures(PARTS.flatMap((p) => p.layers))
    await Assets.load<Record<string, Texture>>(urls, (progress) => {
      this.onProgress?.(Math.round(progress * 100))
    })
  }

  /** 递归构建一个 layer：创建显示对象 → 各特性 build → 加入父容器 → 递归子元素 */
  private buildLayer(cfg: ElementConfig, parent: Container): LayerInstance {
    const texPath = cfg.texture ?? (cfg.frameSeq ? `${cfg.frameSeq.prefix}0.png` : undefined)
    const target = texPath
      ? new Sprite(Assets.get<Texture>(`${ASSET_ROOT}/${texPath}`))
      : new Container()
    target.position.set(cfg.x, cfg.y)
    if (cfg.scale) target.scale.set(cfg.scale[0], cfg.scale[1])
    if (cfg.rotation) target.rotation = cfg.rotation

    const layer: LayerInstance = { cfg, target, parent, anims: cfg.anims ?? [] }
    for (const feature of FEATURES) feature.build?.(layer)
    parent.addChild(layer.target) // 特性可能已替换 target（如 rect），以 layer 为准
    this.layers.push(layer)

    // 容器节点递归构建子元素
    if (cfg.children) {
      for (const child of cfg.children) {
        this.buildLayer(child, layer.target as Container)
      }
    }
    return layer
  }

  /** 组装所有 PARTS 到 content 容器 */
  private buildContent(): void {
    const layerMap = new Map<string, LayerInstance>()
    for (const part of PARTS) {
      for (const cfg of part.layers) {
        const layer = this.buildLayer(cfg, this.content)
        layerMap.set(cfg.name, layer)
      }
    }
    // 处理 maskRef：引用其他层的 Graphics 作为遮罩
    for (const layer of this.layers) {
      const ref = layer.cfg.maskRef
      if (!ref) continue
      const refLayer = this.layers.find((l) => l.cfg.name === ref)
      if (refLayer) layer.target.mask = refLayer.target
    }
    this.app.stage.addChild(this.content)
  }

  /** 触摸事件 → ScrollController
   *  - 横屏：内容沿 x 轴铺开且无旋转，用户左右滑动 → 取 clientX
   *  - 竖屏：canvas 整体 rotate(90°)，x 轴对应屏幕垂直方向，用户上下滑动 → 取 clientY
   *  触摸坐标是 canvas 像素，除以 scaleX 转成设计稿像素后再喂给 ScrollController
   */
  private bindTouch(): void {
    const canvas = this.app.canvas as HTMLCanvasElement

    // 桌面：鼠标按住拖拽（无旋转，取 clientX），move/up 绑 window 防止拖出画布丢事件
    if (this.isDesktop) {
      canvas.style.cursor = 'grab'
      canvas.addEventListener('mousedown', (e) => {
        e.preventDefault()
        canvas.style.cursor = 'grabbing'
        this.scroll.onTouchStart(e.clientX / this.scaleX)
      })
      window.addEventListener('mousemove', (e) => {
        this.scroll.onTouchMove(e.clientX / this.scaleX)
      })
      window.addEventListener('mouseup', () => {
        canvas.style.cursor = 'grab'
        this.scroll.onTouchEnd()
      })
      window.addEventListener('blur', () => {
        canvas.style.cursor = 'grab'
        this.scroll.onTouchEnd()
      })
      return
    }

    const getAxis = (t: Touch): number => {
      const isLandscape = window.innerWidth >= window.innerHeight
      return (isLandscape ? t.clientX : t.clientY) / this.scaleX
    }

    canvas.addEventListener('touchstart', (e) => {
      this.scroll.onTouchStart(getAxis(e.touches[0]))
    }, { passive: true })

    canvas.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault()
        this.scroll.onTouchMove(getAxis(e.touches[0]))
      },
      { passive: false },
    )

    canvas.addEventListener('touchend', () => this.scroll.onTouchEnd(), { passive: true })
  }

  /** 主循环：更新 scrollPro → 长条左移 → 各特性 update */
  private startLoop(): void {
    this.app.ticker.add((ticker) => {
      const dt = ticker.deltaMS / 1000 // 帧间隔（秒）
      const scrollPro = this.scroll.scrollY
      this.content.x = -scrollPro * this.scaleX // 设计稿像素 → canvas 像素

      for (const layer of this.layers) {
        for (const feature of FEATURES) {
          feature.update?.(layer, scrollPro, dt)
        }
      }
      this.sound.update(scrollPro)
    })
  }
}
