import { Container, Graphics, Sprite, type Texture } from 'pixi.js'
import { DESIGN_HEIGHT, DESIGN_WIDTH, type LayerConfig } from '../config'

/**
 * 视差单层
 *
 * 每个层内部放贴图横向拼合，形成可循环滚动的无缝带：
 *   [ 贴图副本 A ][ 贴图副本 B ]  —— 总宽 = DESIGN_WIDTH * 2 起步
 *
 * 相机向右移动时，本层以 speed 系数跟随右移；
 * 当 x 偏移超过 ±loopWidth 时取模回退，形成无限滚动效果。
 */
export class ParallaxLayer extends Container {
  /** 视差速度系数（0 跟得最慢，1 与相机同步，>1 前景加速） */
  readonly speed: number
  /** 层名称（用于 getLayer 查询 / 替换贴图时识别） */
  readonly layerName: string
  /** 占位色（真实贴图到位后由 setTexture 替换） */
  private readonly placeholderColor: number
  /** 当前循环带的总宽度（用于取模） */
  private loopWidth: number = DESIGN_WIDTH * 2

  constructor(config: LayerConfig) {
    super()
    this.speed = config.speed
    this.layerName = config.name
    this.placeholderColor = config.placeholderColor
    this.y = config.offsetY ?? 0

    this.initPlaceholder()
  }

  /** 用 Graphics 画两块占位矩形拼成一条无限带 */
  private initPlaceholder(): void {
    const g = new Graphics()
    g.rect(0, 0, DESIGN_WIDTH, DESIGN_HEIGHT).fill({ color: this.placeholderColor })
    g.rect(DESIGN_WIDTH, 0, DESIGN_WIDTH, DESIGN_HEIGHT).fill({ color: this.placeholderColor })
    this.addChild(g)
  }

  /**
   * 运行时替换为真实贴图
   * —— 后续从网易活动页扒完素材后调用
   */
  setTexture(texture: Texture): void {
    this.removeChildren()

    // 贴图尺寸自适应设计高度（保持宽高比）
    const scale = DESIGN_HEIGHT / texture.height
    const drawW = texture.width * scale

    // 横向铺满至少两个副本以形成循环（多铺一份保险）
    const copies = Math.max(3, Math.ceil((DESIGN_WIDTH * 2) / drawW) + 1)

    for (let i = 0; i < copies; i++) {
      const sprite = new Sprite(texture)
      sprite.scale.set(scale)
      sprite.x = i * drawW
      this.addChild(sprite)
    }
    this.loopWidth = drawW * copies
  }

  /**
   * 根据全局相机位置更新本层偏移
   * @param cameraX 当前相机 x
   */
  update(cameraX: number): void {
    // 目标偏移 = 相机位移 × speed（远景跟得少、前景跟得多）
    const targetX = -(cameraX * this.speed)

    // 取模回退到 [0, -loopWidth) 区间内，实现无缝循环
    const lw = this.loopWidth
    this.x = ((targetX % lw) + lw) % lw - lw
  }
}
