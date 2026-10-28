import type { PartConfig } from '../type'

export const part2: PartConfig = {
  id: 2,
  name: '第二场景',
  layers: [
    {
      name: 'tunnel',
      x: 3571,
      y: 0,
      // 隧道跟随相机滚动，4150~6000 内始终保持在屏幕同一位置
      anims: [{ range: [4150, 6000], prop: 'x', from: 3571, to: 5421 }],
      children: [
        {
          name: 'hole',
          x: 1072,
          y: 317,
          pivot: [1072, 1014],
          scale: [0.4, 0.4],
          anims: [
            { range: [2600, 6000], prop: 'rotation', from: 0, to: 8 },
            // 缩放分两段接力：先放大到 1，再冲进洞里放大到 6
            { range: [2600, 4150], prop: 'scaleX', from: 0.4, to: 1 },
            { range: [4150, 5050], prop: 'scaleX', from: 1, to: 6 },
            { range: [2600, 4150], prop: 'scaleY', from: 0.4, to: 1 },
            { range: [4150, 5050], prop: 'scaleY', from: 1, to: 6 },
            { range: [5000, 5100], prop: 'alpha', from: 1, to: 0 },
          ],
          children: [
            // 洞内画面（4150~5100 追随圆孔放大，4500 淡出）
            { name: 'holebg', texture: 'part2/holebg.png', x: 1072, y: 1014, pivot: [1072, 1014],
              anims: [
                { range: [4150, 5100], prop: 'scaleX', from: 1, to: 10 },
                { range: [4150, 5100], prop: 'scaleY', from: 1, to: 10 },
                { range: [4150, 5100], prop: 'x', from: 1072, to: 1122 },
                { range: [4490, 4500], prop: 'alpha', from: 1, to: 0 },
              ] },
            // 洞口（缩放 0.648）
            { name: 'hole2', texture: 'part2/hole2.png', x: 0, y: 0, scale: [0.648, 0.648] },
            // 漏斗
            {
              name: 't1', texture: 'part2/t1.png', x: 1072, y: 1014,
              pivot: [188, 253], scale: [0.4, 0.4],
              anims: [
                { range: [2600, 6000], prop: 'rotation', from: 0, to: -2 },
                { range: [2600, 6000], prop: 'scaleX', from: 0.4, to: 1.2 },
                { range: [2600, 6000], prop: 'scaleY', from: 0.4, to: 1.2 },
              ],
            },
            // 地球仪
            {
              name: 't2', texture: 'part2/t2.png', x: 1072, y: 1014,
              pivot: [188, 253], scale: [0.2, 0.2],
              anims: [
                { range: [2600, 6000], prop: 'rotation', from: 0, to: -5 },
                { range: [2600, 6000], prop: 'scaleX', from: 0.2, to: 1 },
                { range: [2600, 6000], prop: 'scaleY', from: 0.2, to: 1 },
              ],
            },
            // 扑克（初始 rotation = 2，由动画起点钉住）
            {
              name: 't3', texture: 'part2/t3.png', x: 1072, y: 1014,
              pivot: [188, 253], scale: [0.5, 0.5],
              anims: [
                { range: [2600, 6000], prop: 'rotation', from: 2, to: -6 },
                { range: [2600, 6000], prop: 'scaleX', from: 0.5, to: 1 },
                { range: [2600, 6000], prop: 'scaleY', from: 0.5, to: 1 },
              ],
            },
          ],
        },
      ],
    },
  ],
}
