/** 一条滚动区间动画：scroll 在 range 内时，prop 从 from 插值到 to */
export interface AnimKey {
  range: [number, number] // scrollPro 区间，prop 从 from 插值到 to
  prop: 'x' | 'y' | 'rotation' | 'scaleX' | 'scaleY' | 'alpha' // 动画属性
  from: number // 初始值
  to: number // 目标值
}

/** 循环动画：独立于滚动，用时间驱动 from→to 无限循环 */
export interface LoopAnim {
  prop: 'x' | 'y' // 动画属性
  from: number // 初始值
  to: number // 目标值
  duration: number // 秒
}

/** 遮罩配置：滚动驱动的缩放遮罩
 *  - 矩形模式（默认）：width×height 的矩形，scale.x 从 0 展开到 1
 *  - 圆形模式：circle 指定圆心/半径（世界坐标），scale 按 steps 多段缩放
 */
export interface MaskStep {
  range: [number, number] // scrollPro 区间
  scale: number // 区间末端 scale（起点自动接上一段末端）
}

export interface MaskConfig {
  range?: [number, number] // 矩形模式：展开区间
  width?: number // 矩形模式：完全展开时的宽度（设计稿像素）
  height?: number // 矩形模式：高度，默认取 DESIGN_HEIGHT
  circle?: { cx: number; cy: number; radius: number } // 圆形模式：圆心 + 半径
  from?: number // 圆形模式：初始 scale（默认 0）
  steps?: MaskStep[] // 圆形模式：多段缩放轨道
}

/** 纯色矩形（无需贴图，用 Graphics 绘制，如场景白/黑底幕） */
export interface RectConfig {
  width: number
  height: number
  color: number
}

/** 一个元素 = 贴图 + 初始位置 + 若干条动画
 *  - 有 texture：创建 Sprite
 *  - 无 texture + 有 children：创建 Container（容器嵌套，用于 part2 隧道等场景）
 */
export interface ElementConfig {
  name: string // 纹理名称（调试用）
  texture?: string // pixijs里存的纹理名称 可选
  x: number // 初始位置（设计稿像素）
  y: number // 初始位置（设计稿像素）
  anchor?: [number, number] // 锚点，默认 [0, 0] ，左上角对齐
  pivot?: [number, number]  // 像素单位旋转中心，优先于 anchor
  scale?: [number, number]  // 初始缩放，默认 [1, 1]
  anims?: AnimKey[] // 滚动驱动的区间动画
  loop?: LoopAnim // 时间驱动的循环动画（如手势提示）
  mask?: MaskConfig // 滚动驱动的展开遮罩
  rect?: RectConfig // 纯色矩形（本节点变 Graphics）
  children?: ElementConfig[] // 子元素，存在时本节点为 Container
}

/** 一个 part = 长条上的一段 + 它的所有元素 */
export interface PartConfig {
  id: number // 该部分的id 唯一值
  name: string // 调试用（可选）
  layers: ElementConfig[] // 该部分的所有元素
}