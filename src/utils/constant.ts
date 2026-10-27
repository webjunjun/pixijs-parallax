import type { PartConfig } from "./type"

export const DESIGN_WIDTH = 1040 // 横版画布宽
export const DESIGN_HEIGHT = 640 // 横版画布高
export const TOTAL_SCROLL = 5000 // 总滚动距离
export const ASSET_ROOT = '/assets/tonghua'

export const PARTS: PartConfig[] = [
  {
    id: 0,
    name: '引导',
    layers: [
      { name: 'hand',  texture: 'part0/hand.png',  x: 540, y: 300,
        loop: { prop: 'x', from: 605, to: 475, duration: 1.5 },
        anims: [{ range: [0, 200], prop: 'alpha', from: 1, to: 0 }] },
      { name: 'title',  texture: 'part0/title.png',  x: 240, y: 240,
        anims: [{ range: [0, 200], prop: 'alpha', from: 1, to: 0 }] },
    ],
  },
  {
    id: 1,
    name: '怀表',
    layers: [
      { name: 'biao',  texture: 'part1/biao.png',  x: 500, y: 205,
        mask: { range: [100, 2600], width: 3744 } },
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
