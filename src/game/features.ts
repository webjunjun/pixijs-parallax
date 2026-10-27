import { Container, Graphics, Sprite } from 'pixi.js'
import { DESIGN_HEIGHT } from '../utils/constant'
import { scrollNumClamped } from '../utils/utils'
import type { AnimKey, ElementConfig } from '../utils/type'

/** 运行时实例：config + 显示对象 + 特性状态 */
export interface LayerInstance {
  cfg: ElementConfig
  target: Sprite | Container // 被动画驱动的显示对象（Sprite 或 Container）
  parent: Container          // 父容器，用于添加遮罩等附属对象
  anims: AnimKey[]
  loopTime?: number    // loop 特性：已用时间（秒）
  maskShape?: Graphics // mask 特性：遮罩图形
}

/** 特性接口：每个特性负责自己的「创建」和「每帧更新」 */
export interface Feature {
  build?(layer: LayerInstance): void
  update?(layer: LayerInstance, scrollPro: number, dt: number): void
}

/** 类型安全地把数值写进显示对象的动画属性（Container 包含 Sprite 的所有变换属性） */
export function applyProp(target: Container, prop: AnimKey['prop'], value: number): void {
  switch (prop) {
    case 'x': target.x = value; break
    case 'y': target.y = value; break
    case 'rotation': target.rotation = value; break
    case 'scaleX': target.scale.x = value; break
    case 'scaleY': target.scale.y = value; break
    case 'alpha': target.alpha = value; break
  }
}

// ─── 特性实现 ───────────────────────────────────────────────

/** anchor / pivot：设置精灵的锚点和旋转中心 */
const anchorFeature: Feature = {
  build(layer) {
    const { cfg, target } = layer
    if (cfg.anchor && target instanceof Sprite) {
      target.anchor.set(cfg.anchor[0], cfg.anchor[1])
    }
    if (cfg.pivot) target.pivot.set(cfg.pivot[0], cfg.pivot[1])
  },
}

/** 时间驱动的循环动画（如手势提示），独立于滚动 */
const loopFeature: Feature = {
  build(layer) {
    if (layer.cfg.loop) layer.loopTime = 0
  },
  update(layer, _scrollPro, dt) {
    const loop = layer.cfg.loop
    if (!loop) return
    layer.loopTime = ((layer.loopTime ?? 0) + dt) % loop.duration
    const t = layer.loopTime / loop.duration
    const val = loop.from + (loop.to - loop.from) * t
    applyProp(layer.target, loop.prop, val)
  },
}

/** 滚动驱动的展开遮罩：矩形 Graphics 的 scale.x 从 0 到 1 */
const maskFeature: Feature = {
  build(layer) {
    const { cfg, target, parent } = layer
    if (!cfg.mask) return
    const mask = new Graphics()
    mask.rect(0, 0, cfg.mask.width, cfg.mask.height ?? DESIGN_HEIGHT)
    mask.fill({ color: 0xffffff })
    mask.position.set(cfg.x, 0) // 遮罩起点对齐 target 的 x
    mask.scale.x = 0
    target.mask = mask
    parent.addChild(mask) // 遮罩必须加入舞台才生效
    layer.maskShape = mask
  },
  update(layer, scrollPro) {
    const { maskShape, cfg } = layer
    if (!maskShape || !cfg.mask) return
    const t = scrollNumClamped(cfg.mask.range[0], cfg.mask.range[1], scrollPro, 0, 1)
    maskShape.scale.x = t
  },
}

/** 滚动驱动的区间动画：scrollPro 在 range 内时 prop 从 from 插值到 to */
const animFeature: Feature = {
  update(layer, scrollPro) {
    for (const anim of layer.anims) {
      const val = scrollNumClamped(anim.range[0], anim.range[1], scrollPro, anim.from, anim.to)
      applyProp(layer.target, anim.prop, val)
    }
  },
}

/** 已注册的特性，按 build 顺序执行（anchor 先，再 loop/mask，anim 最后） */
export const FEATURES: Feature[] = [anchorFeature, loopFeature, maskFeature, animFeature]
