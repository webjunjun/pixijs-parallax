import type { PartConfig } from "./type"

export const DESIGN_WIDTH = 1040 // 横版画布宽
export const DESIGN_HEIGHT = 640 // 横版画布高

export const TOTAL_SCROLL = 5000 // 里程碑用，覆盖 part1 的 0~3900 即可

export const PARTS: PartConfig[] = [
  {
    id: 1,
    name: '怀表',
    layers: [
      { name: 'biao',  texture: 'part1/biao.png',  x: 500, y: 205 },
      {
        name: 'zhen1', texture: 'part1/zhen1.png', x: 3778, y: 379,
        pivot: [-9, 59],
        anims: [
          { range: [2080, 3900], prop: 'rotation', from: 0, to: Math.PI * 24 },
        ],
      },
      {
        name: 'zhen2', texture: 'part1/zhen2.png', x: 3778, y: 379,
        pivot: [-5, 0],
        anims: [
          { range: [2080, 3900], prop: 'rotation', from: 0, to: Math.PI * 2 },
        ],
      },
    ],
  },
]
