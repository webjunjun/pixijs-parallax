/** 一条滚动区间动画：scroll 在 range 内时，prop 从 from 插值到 to */
export interface AnimKey {
  range: [number, number] // scrollPro 区间，prop 从 from 插值到 to
  prop: 'x' | 'y' | 'rotation' | 'scaleX' | 'scaleY' | 'alpha' // 动画属性
  from: number // 初始值
  to: number // 目标值
}

/** 循环动画：独立于滚动，用时间驱动 from→to 无限循环 */
export interface LoopAnim {
  prop: 'x' | 'y' | 'alpha' | 'rotation' // 动画属性
  from: number // 初始值
  to: number // 目标值
  duration: number // 秒（yoyo 时为单程时长）
  yoyo?: boolean // 往返播放（如星星闪烁 1→0.4→1）
  range?: [number, number] // 滚动区间：仅区间内播放，离开区间时间冻结，回到区间继续（如 part13 人2扫描）
}

/** 滚动驱动的序列帧：scrollPro 在 range 内时按位置切换 prefix0..prefix{frames-1}.png
 *  区间之前钉住首帧，之后钉住末帧（如月相 m0~m5、开火 zidan0~4） */
export interface FrameSeq {
  prefix: string // 贴图路径前缀（相对 ASSET_ROOT），如 'part4/m'
  frames: number // 帧数
  range: [number, number] // scrollPro 区间
  reverse?: boolean // 倒放：区间内从末帧切到首帧（如 part12 日期倒数）
  steps?: number // 总步数（默认 = frames）：区间均分成 steps 步逐步切帧，帧号 = 步数 % frames，支持多循环（如 part13 秋千 15 步循环 10 帧）
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
  circle?: { radius?: number; color?: number; alpha?: number } // 圆形模式：半径/颜色/透明度
  from?: number // 圆形模式：初始 scale（默认 0）
  steps?: MaskStep[] // 圆形模式：多段缩放轨道
  maskContainer?: { // 独立遮罩容器模式（参考 part3MaskCont）
    x: number // 容器初始位置（相对 parent/content）
    y: number
    pivot?: [number, number] // 容器 pivot（控制缩放中心）
    anims: AnimKey[] // 容器自身的滚动驱动动画（scale/position 等）
  }
}

/** 涟漪动画：时间驱动的两阶段循环（缩放展开 → 淡出 → 重置）
 *  支持多实例交错启动（delay）和按滚动区间暂停/恢复 */
export interface RippleAnim {
  scaleDuration: number // 阶段 1：scale 0→1 的时长（秒）
  fadeDuration: number  // 阶段 2：alpha 1→0 的时长（秒）
  delay: number         // 交错延迟（秒），每个实例不同以形成波浪效果
  range: [number, number] // 滚动区间，仅在此区间内播放动画
}

/** 纯色矩形（无需贴图，用 Graphics 绘制，如场景白/黑底幕） */
export interface RectConfig {
  width: number
  height: number
  color: number
  alpha?: number // 透明度，默认 1.0
}

/** 纯色圆形（用 Graphics 绘制，如遮罩） */
export interface CircleConfig {
  radius: number
  color: number
  alpha?: number // 透明度，默认 1.0
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
  rotation?: number // 初始旋转（弧度），默认 0
  anims?: AnimKey[] // 滚动驱动的区间动画（作用于 target 元素；容器节点写 anims 即可驱动容器自身变换，pivot 语义同 Pixi）
  loop?: LoopAnim // 时间驱动的循环动画（如手势提示）
  frameSeq?: FrameSeq // 滚动驱动的序列帧（无 texture 时自动取第 0 帧）
  ripple?: RippleAnim // 时间驱动的涟漪动画（缩放+淡出循环，支持交错延迟和滚动区间控制）
  mask?: MaskConfig // 滚动驱动的展开遮罩
  maskRef?: string // 引用其他层的 Graphics 作为遮罩（如 'maskCont.mask'）
  rect?: RectConfig // 纯色矩形（本节点变 Graphics）
  circle?: CircleConfig // 纯色圆形（本节点变 Graphics）
  children?: ElementConfig[] // 子元素，存在时本节点为 Container
}

/** 一个 part = 长条上的一段 + 它的所有元素 */
export interface PartConfig {
  id: number // 该部分的id 唯一值
  name: string // 调试用（可选）
  layers: ElementConfig[] // 该部分的所有元素
}