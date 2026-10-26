/**
 * 视差层配置
 *
 * speed 值说明：
 *  - 0.1 ~ 0.3：远景（移动最慢）
 *  - 0.4 ~ 0.6：中景
 *  - 0.7 ~ 0.9：近景（移动最快）
 *  - 1.0：与相机同步，不产生视差
 *  - > 1.0：前景加速掠过
 *
 * zIndex 越大越靠前（PixiJS 渲染顺序：先画的在底层）
 * —— 此处按 speed 从小到大排列，Scene 构造时会按这个顺序 addChild，
 *    远景先画（zIndex 小）、前景后画（zIndex 大）。
 */
export interface LayerConfig {
  /** 层名称，用于 debug / 替换真实贴图时识别 */
  name: string
  /** 视差速度系数 */
  speed: number
  /** 占位背景色（后续换成真实贴图时会去掉） */
  placeholderColor: number
  /** 层的垂直 y 偏移（居中对齐调整） */
  offsetY?: number
}

/** 画布设计尺寸（宽高比固定，resize 时等比缩放） */
export const DESIGN_WIDTH = 1920
export const DESIGN_HEIGHT = 1080

/** 视差层列表（从远到近） */
export const LAYERS: LayerConfig[] = [
  { name: 'sky', speed: 0.05, placeholderColor: 0x1a1a3e },
  { name: 'far-mountains', speed: 0.15, placeholderColor: 0x2d2d5a },
  { name: 'mid-mountains', speed: 0.35, placeholderColor: 0x4a3d6e },
  { name: 'near-mountains', speed: 0.55, placeholderColor: 0x6b4a8a },
  { name: 'ground', speed: 0.8, placeholderColor: 0x3a2a1a },
  { name: 'foreground', speed: 1.2, placeholderColor: 0x1a0f08 },
]

/** 鼠标跟随惯性系数（0 ~ 1，越大跟得越快） */
export const MOUSE_LERP = 0.05
