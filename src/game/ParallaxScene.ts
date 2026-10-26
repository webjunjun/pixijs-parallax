import { Container } from 'pixi.js'
import { LAYERS, type LayerConfig } from '../config'
import { ParallaxLayer } from './ParallaxLayer'

/**
 * 视差场景（多层容器）
 *
 * 内部维护 cameraX（虚拟相机位置），主循环每帧 update 时：
 *   1. 按鼠标/触摸目标更新 cameraX（lerp 平滑）
 *   2. 每层 ParallaxLayer.update(cameraX) 按自己的 speed 偏移
 */
export class ParallaxScene extends Container {
  /** 虚拟相机位置（单位：设计像素） */
  cameraX = 0
  /** 目标相机位置（lerp 跟随鼠标） */
  targetCameraX = 0
  /** 视差层列表（从远到近，addChild 顺序即渲染顺序） */
  private readonly layers: ParallaxLayer[] = []
  /** lerp 系数 */
  private readonly lerp: number

  constructor(lerp = 0.05) {
    super()
    this.lerp = lerp
    // PixiJS 8 不允许直接 set Container.name

    // 从 config 构造层，speed 从小到大（远景先画 → 在底层）
    const sorted = [...LAYERS].sort((a, b) => a.speed - b.speed)
    for (const cfg of sorted) {
      const layer = new ParallaxLayer(cfg)
      this.layers.push(layer)
      this.addChild(layer)
    }
  }

  /** 更新鼠标目标偏移（Game 主循环每帧前调用） */
  setMouseTarget(offsetNormX: number): void {
    // offsetNormX ∈ [-1, 1]：鼠标相对画布中心的归一化位置
    // 映射到 ±DESIGN_WIDTH/2 的相机位移
    const maxPan = 400 // 最大视差跟随像素量
    this.targetCameraX = offsetNormX * maxPan
  }

  /** 每帧 tick 更新 */
  update(_dt: number): void {
    // lerp 平滑相机
    this.cameraX += (this.targetCameraX - this.cameraX) * this.lerp

    // 每层按 speed 偏移
    for (const layer of this.layers) {
      layer.update(this.cameraX)
    }
  }

  /** 返回指定 name 的层（运行时替换贴图用） */
  getLayer(name: string): ParallaxLayer | undefined {
    return this.layers.find((l) => l.layerName === name)
  }

  /** 当前已注册的层配置（调试/替换用） */
  get layerConfigs(): LayerConfig[] {
    return this.layers.map((l) => ({
      name: l.name,
      speed: l.speed,
      placeholderColor: 0, // 不再对外暴露占位色，占位是内部实现
    }))
  }
}
