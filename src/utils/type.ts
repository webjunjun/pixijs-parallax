/** 一条滚动区间动画：scroll 在 range 内时，prop 从 from 插值到 to */
export interface AnimKey {
  range: [number, number]
  prop: 'x' | 'y' | 'rotation' | 'scaleX' | 'scaleY' | 'alpha'
  from: number
  to: number
}

/** 一个元素 = 贴图 + 初始位置 + 若干条动画 */
export interface ElementConfig {
  name: string // 'zhen1'，调试用
  texture: string // 'part1/zhen1.png'
  x: number
  y: number
  anchor?: [number, number] // 默认 [0, 0]
  pivot?: [number, number]  // 像素单位旋转中心，优先于 anchor
  anims?: AnimKey[]
}

/** 一个 part = 长条上的一段 + 它的所有元素 */
export interface PartConfig {
  id: number
  name: string
  layers: ElementConfig[] // 沿用你已定义的字段名也行
}