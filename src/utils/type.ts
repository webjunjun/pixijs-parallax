/** 一条滚动区间动画：scroll 在 range 内时，prop 从 from 插值到 to */
export interface AnimKey {
  range: [number, number]
  prop: 'x' | 'y' | 'rotation' | 'scaleX' | 'scaleY' | 'alpha'
  from: number
  to: number
}

/** 循环动画：独立于滚动，用时间驱动 from→to 无限循环 */
export interface LoopAnim {
  prop: 'x' | 'y'
  from: number
  to: number
  duration: number // 秒
}

/** 遮罩配置：用一个矩形 Graphics 做遮罩，滚动时 scale.x 从 0 展开到 1 */
export interface MaskConfig {
  range: [number, number] // scrollPro 区间，遮罩宽度从 0 展开到 width
  width: number           // 遮罩完全展开时的宽度（设计稿像素）
  height?: number         // 遮罩高度，默认取 DESIGN_HEIGHT
}

/** 一个元素 = 贴图 + 初始位置 + 若干条动画
 *  - 有 texture：创建 Sprite
 *  - 无 texture + 有 children：创建 Container（容器嵌套，用于 part2 隧道等场景）
 */
export interface ElementConfig {
  name: string // 调试用
  texture?: string // 'part1/zhen1.png'，容器节点可不填
  x: number
  y: number
  anchor?: [number, number] // 默认 [0, 0]
  pivot?: [number, number]  // 像素单位旋转中心，优先于 anchor
  scale?: [number, number]  // 初始缩放
  anims?: AnimKey[]
  loop?: LoopAnim // 时间驱动的循环动画（如手势提示）
  mask?: MaskConfig // 滚动驱动的展开遮罩
  children?: ElementConfig[] // 子元素，存在时本节点为 Container
}

/** 一个 part = 长条上的一段 + 它的所有元素 */
export interface PartConfig {
  id: number
  name: string
  layers: ElementConfig[] // 沿用你已定义的字段名也行
}