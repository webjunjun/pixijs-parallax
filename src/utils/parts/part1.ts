import type { PartConfig } from '../type'

export const part1: PartConfig = {
  id: 1,
  name: '第一场景',
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
    {
      name: 'talk', texture: 'part1/talk.png', x: 3610, y: 91,
      anims: [
        { range: [2400, 3940], prop: 'x', from: 3610, to: 3410 },
      ]
    }
  ],
}
