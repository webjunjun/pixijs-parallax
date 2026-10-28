# PixiJS 长卷滚动项目 — AI 操作手册

> 本手册面向 AI 协作者，说明项目架构、配置方式、扩展规范。
> 目标：让 AI 能**独立、正确地**添加新场景、新特效，而不破坏现有结构。

---

## 一、项目概述

基于 **PixiJS v8** 的横屏长卷滚动互动页。用户滑动（横屏左右滑 / 竖屏上下滑）驱动长卷滚动，滚动过程中触发各场景的动画（旋转、缩放、遮罩展开等）。

核心设计：**配置驱动 + Feature 插件化**。场景和动画全部在 `constant.ts` 里声明，引擎负责解析和驱动。

---

## 二、目录结构

```
src/
├── main.ts              # 入口：创建 Game 实例，挂载到 #app，回调 loading 进度
├── style.css            # 全局样式 + loading 动画
├── game/
│   ├── Game.ts          # 主类：init、resize、preload、buildContent、bindTouch、startLoop
│   └── features.ts      # Feature 插件系统（rect / circle / anchor / loop / mask / anim）
└── utils/
    ├── constant.ts      # 场景配置 PARTS + 常量（设计稿尺寸、总滚动距离）
    ├── type.ts          # 配置类型定义（ElementConfig / AnimKey / LoopAnim / MaskConfig / RectConfig / CircleConfig）
    └── utils.ts         # scrollNum / scrollNumClamped / inRange
```

---

## 三、核心架构

### 3.1 运行流程

```
main.ts
  └─ new Game(container, onProgress)
       ├─ app.init()        → 初始化 PIXI，设 resolution/autoDensity
       ├─ resize()          → 横竖屏适配（CSS rotate + canvas resize）
       ├─ preloadImages()   → 加载所有 texture，回调进度
       ├─ buildContent()    → 递归解析 PARTS，构建显示对象树
       ├─ bindTouch()       → 绑定触摸 → ScrollController
       └─ startLoop()       → 每帧：content.x = -scrollPro * scaleX，各 Feature update
```

### 3.2 Feature 插件系统

每种动画/特效是一个实现 `Feature` 接口的对象：

```ts
interface Feature {
  build?(layer: LayerInstance): void        // 构建阶段：创建资源、设置初始状态
  update?(layer, scrollPro, dt): void       // 每帧：根据滚动进度/时间更新
}
```

**已注册的 Feature**（在 `features.ts` 末尾 `FEATURES` 数组）：

| Feature | 作用 | 配置字段 |
|---------|------|----------|
| `rectFeature` | 纯色矩形（用 Graphics **替换 target**） | `rect` |
| `circleFeature` | 纯色圆形（用 Graphics **替换 target**） | `circle` |
| `anchorFeature` | 设置 `anchor` / `pivot` | `anchor` `pivot` |
| `loopFeature` | 时间驱动的循环动画 | `loop` |
| `maskFeature` | 滚动驱动遮罩（矩形展开 / 圆形 steps / maskContainer） | `mask` |
| `animFeature` | 滚动驱动的区间插值动画（同 prop 多段轨道接力） | `anims` |
| `frameSeqFeature` | 滚动驱动的序列帧（按位置切换贴图） | `frameSeq` |
| `rippleFeature` | 时间驱动的涟漪动画（缩放→淡出循环，支持交错延迟和滚动区间暂停/恢复） | `ripple` |

**执行顺序**：`build` 按数组顺序执行（rect → circle → anchor → loop → mask → anim），`update` 同理。rect/circle 会替换 target，所以必须排在最前，后续特性作用于新 target。

### 3.3 LayerInstance（运行时实例）

```ts
interface LayerInstance {
  cfg: ElementConfig        // 原始配置
  target: Sprite | Container // 被驱动的显示对象（rect/circle 特性会换成 Graphics）
  parent: Container          // 父容器（用于加遮罩等附属对象）
  anims: AnimKey[]
  animTracks?: Map<prop, AnimKey[]> // anim 特性：按 prop 分组的关键帧轨道
  loopTime?: number          // loop 特性的计时
  maskShape?: Graphics       // mask 特性的遮罩图形
  maskContainer?: Container  // mask 特性：独立遮罩容器（maskContainer 模式）
  maskContainerTracks?: Map<prop, AnimKey[]> // mask 容器动画轨道
  rippleTime?: number        // ripple 特性：累计播放时间（秒）
}
```

---

## 四、配置说明（constant.ts）

### 4.1 常量

```ts
DESIGN_WIDTH  = 1040   // 设计稿宽度（横屏）
DESIGN_HEIGHT = 640    // 设计稿高度
TOTAL_SCROLL  = 48400  // 最大可滚动距离（设计稿像素，第十五场景 talk 渐现 48240 完成后保持展示）
ASSET_ROOT    = '/assets/tonghua'
```

### 4.2 ElementConfig 字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 调试用名称 |
| `texture` | string? | 贴图路径（相对 ASSET_ROOT）。**不填 + 有 children → 创建 Container** |
| `x` `y` | number | 初始位置（设计稿坐标） |
| `anchor` | [number,number]? | 锚点，默认 [0,0]（仅 Sprite） |
| `pivot` | [number,number]? | 旋转中心（像素），优先于 anchor |
| `scale` | [number,number]? | 初始缩放 |
| `anims` | AnimKey[]? | 滚动区间动画 |
| `loop` | LoopAnim? | 时间循环动画 |
| `frameSeq` | FrameSeq? | 滚动驱动的序列帧 `{prefix, frames, range}` |
| `ripple` | RippleAnim? | 时间驱动的涟漪动画 `{scaleDuration, fadeDuration, delay, range}` |
| `mask` | MaskConfig? | 滚动驱动遮罩（矩形展开 / 圆形 steps / maskContainer） |
| `rect` | RectConfig? | 纯色矩形 `{width,height,color,alpha?}`（本节点变 Graphics） |
| `circle` | CircleConfig? | 纯色圆形 `{radius,color,alpha?}`（本节点变 Graphics） |
| `maskRef` | string? | 按 `name` 引用其他层的 target 作为本层遮罩 |
| `children` | ElementConfig[]? | 子元素（本节点变 Container） |

### 4.3 AnimKey（滚动区间动画）

```ts
{ range: [2080, 3900], prop: 'rotation', from: 0, to: Math.PI * 24 }
```

- `range`：scrollPro 区间
- `prop`：`x` | `y` | `rotation` | `scaleX` | `scaleY` | `alpha`
- `from` / `to`：区间两端的值（线性插值，区间外自动钉住）
- **同 prop 多段接力**：同一节点同一 prop 可写多条 anims，引擎按 `range` 排序成轨道依次插值（如 scale 0.4→1→6 分两段）。第一段区间之前钉住其起点，最后一段之后钉住其终点。

### 4.4 LoopAnim（时间循环动画）

```ts
{ prop: 'x', from: 605, to: 475, duration: 1.5 }
```

- 独立于滚动，按 `duration` 秒循环 `from → to`
- `prop` 支持 `x` | `y` | `alpha` | `rotation`
- `range`（可选）：滚动区间，仅区间内播放，离开区间时间冻结，回到区间继续（参考 part13 人2扫描旋转）

### 4.4.1 FrameSeq（滚动驱动序列帧）

```ts
{ prefix: 'part4/m', frames: 6, range: [5000, 7000] }
```

- `prefix`：贴图路径前缀（相对 ASSET_ROOT），如 `'part4/m'` → 加载 `m0.png` ~ `m5.png`
- `frames`：总帧数
- `range`：scrollPro 区间，区间内按位置切换帧，区间前钉首帧、区间后钉末帧
- `reverse`（可选）：倒放，区间内从末帧切到首帧（参考 part12 日期倒数）
- `steps`（可选，默认 = frames）：区间均分成 steps 步逐步切帧，帧号 = 步数 % frames，支持多循环（参考 part13 秋千 15 步循环 10 帧）
- 无需设置 `texture`，引擎自动取 `prefix0.png` 作为初始贴图

### 4.4.2 RippleAnim（涟漪动画）

```ts
{ scaleDuration: 2, fadeDuration: 1, delay: 0.43, range: [29100, 30950] }
```

- 时间驱动的两阶段循环：**delay → scale 0→1（scaleDuration 秒）→ alpha 1→0（fadeDuration 秒）→ 重复**
- `delay`：交错延迟（秒），多个涟漪实例设置不同的 delay 形成波浪效果
- `range`：滚动区间，仅在此区间内播放；离开区间暂停冻结，回到区间继续
- 典型用法：水波涟漪（参考 part9 的 W1~W7）

### 4.5 MaskConfig（滚动驱动遮罩）

**矩形模式**（如 part1 怀表从左到右展开）：

```ts
{ range: [100, 2600], width: 3744 }
```

- 创建一个 `width × DESIGN_HEIGHT` 的矩形 Graphics 作为遮罩
- scrollPro 在 `range` 内时，遮罩 `scale.x` 从 0 → 1（从左到右展开）
- 遮罩位置对齐 target 的 `x`

**圆形模式**：`circle: { radius, color?, alpha? }` + `from`（初始 scale）+ `steps: [{ range, scale }]` 多段缩放轨道。

**maskContainer 模式**：`maskContainer: { x, y, pivot?, anims }`，遮罩放进独立容器，容器自身的 `anims` 用轨道逻辑驱动（参考 part3 圆孔）。

> 现场景（part3）实际采用的是「遮罩独立成层 + maskRef 引用」方案，见 4.6，比 mask 内嵌模式更直观。

### 4.6 maskRef（跨层引用遮罩）

```ts
// 被裁剪的内容层：maskRef 指向遮罩层的 name
{ name: 'cont', x: 4132, maskRef: 'mask', children: [...] },
// 遮罩本体：纯色圆形 Graphics，自身用 anims 驱动缩放
{ name: 'maskCont', x: 4646, y: 319, scale: [0.02, 0.02],
  anims: [ /* 三段 scaleX/scaleY 接力：0.02→0.3→1→4 */ ],
  children: [{ name: 'mask', circle: { radius: 800, color: 0xffffff }, x: 0, y: 0 }] },
```

- `buildContent` 结束后统一处理：按 `name` 在所有层中查找，把其 `target` 挂为 `layer.target.mask`
- 遮罩层的 `name` 必须**全局唯一**（查找按 name，重名会引错）
- 遮罩 Graphics 本身不会被渲染（v8 StencilMask 的 `includeInBuild = false`）

---

## 五、坐标系与适配

### 5.1 设计稿坐标系

所有配置（`x`/`y`/`range`/`width`/`TOTAL_SCROLL`）都用**设计稿坐标系**（1040×640）。

- 屏幕中心点 = `(DESIGN_WIDTH/2, DESIGN_HEIGHT/2)` = **(520, 320)**
- 不用管屏幕实际尺寸，`content.scale` 自动缩放

### 5.2 横竖屏适配（resize）

| 方向 | container | canvas | scaleX / scaleY |
|------|-----------|--------|-----------------|
| 横屏 | 铺满窗口，无旋转 | `resize(ww, wh)` | `ww/1040` / `wh/640` |
| 竖屏 | 宽高对调 + `rotate(90deg)` 居中 | `resize(wh, ww)` | `wh/1040` / `ww/640` |

内容始终沿 x 轴铺开，竖屏靠 CSS rotate 把横向变成视觉纵向。

### 5.3 触摸轴向

- 横屏：取 `clientX`（左右滑）
- 竖屏：取 `clientY`（上下滑，因 rotate 后 x 轴 = 屏幕垂直方向）
- 触摸坐标除以 `scaleX` 转成设计稿像素再喂给 ScrollController

---

## 六、如何添加新场景（Part）

在 `constant.ts` 的 `PARTS` 数组追加：

```ts
{
  id: 2,
  name: '新场景',
  layers: [
    { name: 'bg', texture: 'part2/bg.png', x: 5000, y: 0 },
    { name: 'item', texture: 'part2/item.png', x: 5200, y: 200,
      anims: [{ range: [5000, 5500], prop: 'alpha', from: 0, to: 1 }] },
  ],
}
```

**注意**：
- `x` 是该元素在长卷上的绝对位置，不是相对 part 的偏移
- 新场景的 `x` 要大于前一场景的末尾
- 如果需要调整总滚动距离，改 `TOTAL_SCROLL`
- **PARTS 数组顺序 = 叠放顺序**：越靠后的 part 渲染在上层（如 part3 在 part2 之前 = 隧道盖在森林上）

---

## 七、如何添加容器嵌套（如 part2 隧道）

无 `texture` + 有 `children` 的节点会创建 `Container`：

```ts
{
  name: 'tunnel',
  x: 3571, y: 0,
  pivot: [1072, 1014],
  scale: [0.4, 0.4],
  anims: [
    { range: [2600, 4150], prop: 'scaleX', from: 0.4, to: 1 },
    { range: [2600, 4150], prop: 'scaleY', from: 0.4, to: 1 },
    { range: [2600, 6000], prop: 'rotation', from: 0, to: 8 },
  ],
  children: [
    { name: 'hole', texture: 'part2/holebg.png', x: 1072, y: 1014, pivot: [1072, 1014] },
    { name: 'bg', texture: 'part2/hole2.png', x: 0, y: 0 },
    { name: 'funnel', texture: 'part2/t1.png', x: 1072, y: 1014,
      pivot: [188, 253], scale: [0.4, 0.4],
      anims: [
        { range: [2600, 6000], prop: 'rotation', from: 0, to: -2 },
        { range: [2600, 6000], prop: 'scaleX', from: 0.4, to: 1.2 },
      ] },
  ],
}
```

容器的 `anims` 驱动容器自身的变换，子元素的 `anims` 驱动子元素，互不干扰。

---

## 八、如何添加新 Feature（特效）

以「序列帧动画」为例：

### 步骤 1：在 type.ts 加配置类型

```ts
export interface FrameAnim {
  frames: number
  fps: number
  texturePrefix: string  // 'part10/h' → 加载 h0.png ~ h{n-1}.png
}
```

在 `ElementConfig` 加 `frameAnim?: FrameAnim`。

### 步骤 2：在 features.ts 写 Feature

```ts
import { AnimatedSprite, Texture } from 'pixi.js'

const frameAnimFeature: Feature = {
  build(layer) {
    const fa = layer.cfg.frameAnim
    if (!fa || !(layer.target instanceof Sprite)) return
    const textures = Array.from({ length: fa.frames },
      (_, i) => Texture.from(`${ASSET_ROOT}/${fa.texturePrefix}${i}.png`))
    const anim = new AnimatedSprite(textures)
    anim.animationSpeed = fa.fps / 60
    anim.play()
    // 替换 target 或加到 target 上，按需求处理
  },
}
```

### 步骤 3：注册到 FEATURES 数组

```ts
export const FEATURES: Feature[] = [rectFeature, circleFeature, anchorFeature, loopFeature, maskFeature, animFeature, frameAnimFeature]
```

**规则**：
- `build` 里创建资源，存到 `layer` 上（加字段）
- `update` 里读 `layer` 上的状态更新
- 不要在 Game.ts 里加 `if` 分支

---

## 九、ScrollController

```ts
class ScrollController {
  scrollY = 0
  maxScroll = TOTAL_SCROLL
  onTouchStart(y)  // 记录起点
  onTouchMove(y)   // delta = start - y，累加到 scrollY，clamp 到 [0, maxScroll]
  onTouchEnd()
}
```

- 手指上滑/左滑 → `scrollY` 增大 → `content.x = -scrollY * scaleX`（内容向左/上移）
- 无惯性、无弹性，纯线性

---

## 十、注意事项与陷阱

1. **texture 路径**：`constant.ts` 里写相对路径（如 `part1/biao.png`），引擎自动拼 `ASSET_ROOT`。
2. **遮罩必须加入舞台**：`maskFeature` 里 `parent.addChild(mask)` 不能漏，否则遮罩不生效。
3. **loop 与 anim 冲突**：同一节点的 `loop` 和 `anims` 操作同一个 `prop`（如都改 x）时，`animFeature` 在 `loopFeature` 之后执行会覆盖 loop，避免冲突。同一 prop 的多条 `anims` 之间不冲突（轨道接力）。
4. **roundPixels**：开启后 sprite 位置取整，滚动时若有轻微抖动可关闭。
5. **竖屏旋转**：`container` 的 CSS `rotate(90deg)` 只影响视觉，canvas 内部坐标不变。触摸坐标转换已处理。
6. **新增素材**：放到 `public/assets/tonghua/` 对应目录，`constant.ts` 里声明路径即可，`preloadImages` 会自动收集（含 children 里的）。
7. **不要改 Game.ts 主流程**：所有扩展通过 Feature 和配置实现，保持开闭原则。
8. **Graphics.fill 的 falsy 坑**：Pixi 8.0.0 中 `fill(0x000000, 1)` 位置参数形式会因源码 `if (style)` 判断跳过黑色（数字 0 是 falsy），填成默认白色。**必须用对象形式 `fill({ color, alpha })`**。
9. **跨场景底幕要跟随相机**：纯色背景（如 part3 的 bgBlack）若钉死坐标，滚过视口后会露白。把它放进带跟随动画的容器（如 `森林` 容器的 `x 0→1850`），由容器统一跟随滚动。
10. **容器局部坐标**：嵌套容器的子元素 `x/y` 是相对容器的，换算世界坐标 = 容器位置 + 局部值。同一场景内保持一套坐标基准，避免混用。

---

## 十一、快速验证

```bash
npm run dev      # 开发服务器
npm run build    # tsc 类型检查 + vite 构建
npx tsc --noEmit # 仅类型检查
```

添加新场景后，确保 `tsc --noEmit` 通过即可。
