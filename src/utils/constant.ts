import type { PartConfig } from "./type"
import { part0 } from "./parts/part0"
import { part1 } from "./parts/part1"
import { part2 } from "./parts/part2"
import { part3 } from "./parts/part3"
import { part4 } from "./parts/part4"
import { part6 } from "./parts/part6"
import { part7 } from "./parts/part7"
import { part8 } from "./parts/part8"
import { part9 } from "./parts/part9"
import { part10 } from "./parts/part10"
import { part11 } from "./parts/part11"
import { part12 } from "./parts/part12"
import { part13 } from "./parts/part13"
import { part14 } from "./parts/part14"
import { part15 } from "./parts/part15"

export const DESIGN_WIDTH = 1040 // 横版画布宽
export const DESIGN_HEIGHT = 640 // 横版画布高
export const TOTAL_SCROLL = 48400 // 总滚动距离（第十五场景 talk 渐现 48240 完成后保持展示，终点多留 160px）
export const ASSET_ROOT = '/assets/tonghua'

// 数组顺序 = 叠放顺序 所以如果希望后面的元素在前面的元素下层，就让它和前面的元素交换位置即可
// 每个场景的配置在 ./parts/partN.ts 中，新场景建 partN.ts 后按叠放顺序插到这里
export const PARTS: PartConfig[] = [
  part0,
  part3,
  part2,
  part1,
  part4,
  part6,
  part7,
  part8,
  part14,
  part13,
  part12,
  part11,
  part10,
  part9,
  part15,
]
