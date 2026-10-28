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
  animTracks?: Map<AnimKey['prop'], AnimKey[]> // anim 特性：按 prop 分组的关键帧轨道
  loopTime?: number    // loop 特性：已用时间（秒）
  maskShape?: Graphics // mask 特性：遮罩图形
  maskContainer?: Container // mask 特性：独立遮罩容器（maskContainer 模式）
  maskContainerTracks?: Map<AnimKey['prop'], AnimKey[]> // mask 容器动画轨道
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

/** 纯色矩形：把 target 替换成 Graphics（必须在最前，后续特性作用于新 target） */
const rectFeature: Feature = {
  build(layer) {
    const rect = layer.cfg.rect
    if (!rect) return
    const g = new Graphics()
    // 注意：必须用对象形式传 fill，0x000000 是 falsy，位置参数 fill(color, alpha) 会被 pixi 跳过而用默认白色
    g.rect(0, 0, rect.width, rect.height).fill({ color: rect.color, alpha: rect.alpha ?? 1.0 })
    g.position.set(layer.cfg.x, layer.cfg.y)
    if (layer.cfg.scale) g.scale.set(layer.cfg.scale[0], layer.cfg.scale[1])
    layer.target = g
  },
}

/** 纯色圆形：把 target 替换成 Graphics */
const circleFeature: Feature = {
  build(layer) {
    const c = layer.cfg.circle
    if (!c) return
    const g = new Graphics()
    g.circle(0, 0, c.radius).fill({ color: c.color, alpha: c.alpha ?? 1.0 })
    g.position.set(layer.cfg.x, layer.cfg.y)
    layer.target = g
  },
}

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

/** 滚动驱动的遮罩：矩形 scale.x 展开，或圆形按 steps 多段缩放
 *  支持 maskContainer 模式：遮罩放在独立容器中，容器有自己的 anims 驱动缩放/位移 */
const maskFeature: Feature = {
  build(layer) {
    const { cfg, target, parent } = layer
    const m = cfg.mask
    if (!m) return
    const mask = new Graphics()
    if (m.circle) {
      mask.circle(0, 0, m.circle.radius ?? 0).fill({ color: m.circle.color ?? 0xffffff, alpha: m.circle.alpha ?? 1.0 })
      const s = m.from ?? 0
      mask.scale.set(s, s)
    } else {
      if (!m.range || !m.width) return
      mask.rect(0, 0, m.width, m.height ?? DESIGN_HEIGHT)
      mask.fill({ color: 0xffffff })
      mask.position.set(cfg.x, 0) // 遮罩起点对齐 target 的 x
      mask.scale.x = 0
    }
    if (m.maskContainer) {
      // 独立容器模式：mask 是 maskContainer 的子元素，容器加入 parent
      const mc = m.maskContainer
      const container = new Container()
      container.position.set(mc.x, mc.y)
      if (mc.pivot) container.pivot.set(mc.pivot[0], mc.pivot[1])
      container.addChild(mask)
      parent.addChild(container)
      target.mask = mask // 遮罩作用到 target 上
      layer.maskShape = mask
      layer.maskContainer = container
      // 容器的 anims 用 animFeature 同样的轨道逻辑驱动
      const tracks = new Map<AnimKey['prop'], AnimKey[]>()
      for (const anim of mc.anims) {
        const list = tracks.get(anim.prop)
        if (list) list.push(anim)
        else tracks.set(anim.prop, [anim])
      }
      for (const list of tracks.values()) list.sort((a, b) => a.range[0] - b.range[0])
      layer.maskContainerTracks = tracks
    } else {
      // 简单模式：mask 直接加入 parent
      target.mask = mask
      parent.addChild(mask)
      layer.maskShape = mask
    }
  },
  update(layer, scrollPro) {
    const { maskShape, maskContainer, maskContainerTracks, cfg } = layer
    const m = cfg.mask
    if (!maskShape || !m) return
    if (m.maskContainer) {
      // 独立容器模式：驱动容器的 anims
      if (maskContainerTracks && maskContainer) {
        for (const [prop, list] of maskContainerTracks) {
          let val = list[0].from
          for (const anim of list) {
            if (scrollPro >= anim.range[0] && scrollPro <= anim.range[1]) {
              val = scrollNumClamped(anim.range[0], anim.range[1], scrollPro, anim.from, anim.to)
              break
            }
            if (scrollPro > anim.range[1]) val = anim.to
          }
          applyProp(maskContainer, prop, val)
        }
      }
    } else if (m.circle) {
      // 简单圆形模式：steps 缩放
      let s = m.from ?? 0
      for (const st of m.steps ?? []) {
        if (scrollPro <= st.range[0]) break
        const t = Math.min(1, (scrollPro - st.range[0]) / (st.range[1] - st.range[0]))
        s = s + (st.scale - s) * t
      }
      maskShape.scale.set(s, s)
    } else if (m.range) {
      maskShape.scale.x = scrollNumClamped(m.range[0], m.range[1], scrollPro, 0, 1)
    }
  },
}

/** 滚动驱动的区间动画：scrollPro 在 range 内时 prop 从 from 插值到 to
 *  同一 prop 的多条动画按 range 排序成轨道，可接力（如 0.4→1→6） */
const animFeature: Feature = {
  build(layer) {
    if (layer.anims.length === 0) return
    const tracks = new Map<AnimKey['prop'], AnimKey[]>()
    for (const anim of layer.anims) {
      const list = tracks.get(anim.prop)
      if (list) list.push(anim)
      else tracks.set(anim.prop, [anim])
    }
    for (const list of tracks.values()) list.sort((a, b) => a.range[0] - b.range[0])
    layer.animTracks = tracks
  },
  update(layer, scrollPro) {
    const tracks = layer.animTracks
    if (!tracks) return
    for (const [prop, list] of tracks) {
      let val = list[0].from // 第一条区间之前，钉在它的起点
      for (const anim of list) {
        if (scrollPro >= anim.range[0] && scrollPro <= anim.range[1]) {
          val = scrollNumClamped(anim.range[0], anim.range[1], scrollPro, anim.from, anim.to)
          break
        }
        if (scrollPro > anim.range[1]) val = anim.to // 已过本段，暂钉在本段终点
      }
      applyProp(layer.target, prop, val)
    }
  },
}

/** 已注册的特性，按 build 顺序执行（rect 换 target 最先，anim 最后） */
export const FEATURES: Feature[] = [rectFeature, circleFeature, anchorFeature, loopFeature, maskFeature, animFeature]
