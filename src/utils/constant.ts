import type { PartConfig } from "./type"

export const DESIGN_WIDTH = 1040 // 横版画布宽
export const DESIGN_HEIGHT = 640 // 横版画布高
export const TOTAL_SCROLL = 9550 // 总滚动距离（第三场景动画到 9550 结束）
export const ASSET_ROOT = '/assets/tonghua'

// 数组顺序 = 叠放顺序 所以如果希望后面的元素在前面的元素下层，就让它和前面的元素交换位置即可
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
    // 第三场景：白色森林世界，整体被圆形遮罩从小孔放大到全开
    id: 3,
    name: '第三场景',
    layers: [
      // 黑色底幕（遮罩外透黑，6000 全开时淡出）
      { name: 'bgBlack', rect: { width: 1500, height: 640, color: 0x000000 }, x: 4032, y: 0,
        anims: [{ range: [6000, 6050], prop: 'alpha', from: 1, to: 0 }] },
      {
        // 主世界容器：圆形遮罩 scale 0.02 → 0.3 → 1 → 4
        name: 'world',
        x: 0,
        y: 0,
        mask: {
          circle: { cx: 4646, cy: 319, radius: 800 },
          from: 0.02,
          steps: [
            { range: [4150, 5100], scale: 0.3 },
            { range: [5100, 6000], scale: 1 },
            { range: [6000, 6100], scale: 4 },
          ],
        },
        children: [
          { name: 'bg1', rect: { width: 1500, height: 640, color: 0xffffff }, x: 4032, y: 0,
            anims: [{ range: [6000, 6050], prop: 'alpha', from: 1, to: 0 }] },
          { name: 'blackBg', texture: 'part3/blackBg.png', x: 5750, y: 0,
            anims: [{ range: [6300, 9550], prop: 'x', from: 5750, to: 5800 }] },
          { name: 'cloud', texture: 'part3/cloud.png', x: 6069, y: 0,
            anims: [{ range: [6400, 9160], prop: 'x', from: 6069, to: 5869 }] },
          { name: 'shanRight', texture: 'part3/shanright.png', x: 5828, y: 37,
            anims: [{ range: [6360, 8400], prop: 'x', from: 5828, to: 5528 }] },
          { name: 'senlin', texture: 'part3/senlin.png', x: 6549, y: 133,
            anims: [{ range: [6900, 9000], prop: 'x', from: 6549, to: 6249 }] },
          { name: 'wave', texture: 'part3/wave.png', x: 6019, y: 178,
            anims: [{ range: [6550, 9250], prop: 'x', from: 6019, to: 5889 }] },
          { name: 'shanLeft', texture: 'part3/shanleft.png', x: 5882, y: 318, pivot: [707, 492],
            anims: [
              { range: [5300, 7800], prop: 'x', from: 5882, to: 5582 },
              { range: [5300, 7800], prop: 'scaleX', from: 1, to: 0.5 },
              { range: [5300, 7800], prop: 'scaleY', from: 1, to: 0.5 },
            ] },
          {
            // 子弹：容器飞行 + 缩放，7170 淡入；子图 6200~7600 飞散、7600~7900 收拢
            name: 'zidanCont',
            x: 4962,
            y: 100,
            scale: [0.4, 0.4],
            anims: [
              { range: [6600, 6900], prop: 'x', from: 4962, to: 5062 },
              { range: [6900, 7800], prop: 'x', from: 5062, to: 6612 },
              { range: [7800, 8600], prop: 'x', from: 6612, to: 7412 },
              { range: [6600, 6900], prop: 'y', from: 100, to: 550 },
              { range: [6900, 7800], prop: 'y', from: 550, to: 435 },
              { range: [6800, 7400], prop: 'scaleX', from: 0.4, to: 1 },
              { range: [6800, 7400], prop: 'scaleY', from: 0.4, to: 1 },
              { range: [7170, 7190], prop: 'alpha', from: 0, to: 1 },
            ],
            children: [
              { name: 'z1', texture: 'part3/z1.png', x: 0, y: 0,
                anims: [
                  { range: [7600, 7900], prop: 'x', from: 0, to: 5 },
                  { range: [7600, 7900], prop: 'y', from: 0, to: 1 },
                ] },
              { name: 'z2', texture: 'part3/z2.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 110 }, { range: [7600, 7900], prop: 'x', from: 110, to: 20 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 40 }, { range: [7600, 7900], prop: 'y', from: 40, to: 8 },
                ] },
              { name: 'z3', texture: 'part3/z3.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 50 }, { range: [7600, 7900], prop: 'x', from: 50, to: 46 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 30 }, { range: [7600, 7900], prop: 'y', from: 30, to: 15 },
                ] },
              { name: 'z4', texture: 'part3/z4.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 60 }, { range: [7600, 7900], prop: 'x', from: 60, to: 28 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 40 }, { range: [7600, 7900], prop: 'y', from: 40, to: 27 },
                ] },
              { name: 'z5', texture: 'part3/z5.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 250 }, { range: [7600, 7900], prop: 'x', from: 250, to: 16 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 144 }, { range: [7600, 7900], prop: 'y', from: 144, to: 42 },
                ] },
              { name: 'z6', texture: 'part3/z6.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 130 }, { range: [7600, 7900], prop: 'x', from: 130, to: 43 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 200 }, { range: [7600, 7900], prop: 'y', from: 200, to: 44 },
                ] },
              { name: 'z7', texture: 'part3/z7.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 190 }, { range: [7600, 7900], prop: 'x', from: 190, to: 10 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 118 }, { range: [7600, 7900], prop: 'y', from: 118, to: 31 },
                ] },
              { name: 'z8', texture: 'part3/z8.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 60 }, { range: [7600, 7900], prop: 'x', from: 60, to: 22 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 120 }, { range: [7600, 7900], prop: 'y', from: 120, to: 33 },
                ] },
              { name: 'z9', texture: 'part3/z9.png', x: 0, y: 0,
                anims: [
                  { range: [6200, 7600], prop: 'x', from: 0, to: 230 }, { range: [7600, 7900], prop: 'x', from: 230, to: 0 },
                  { range: [6200, 7600], prop: 'y', from: 0, to: 71 }, { range: [7600, 7900], prop: 'y', from: 71, to: 66 },
                ] },
            ],
          },
          { name: 'tree1', texture: 'part3/tree1.png', x: 4733, y: 75,
            anims: [{ range: [4500, 7050], prop: 'x', from: 4733, to: 4483 }] },
          { name: 'tree2', texture: 'part3/tree2.png', x: 4132, y: 113,
            anims: [{ range: [4333, 6950], prop: 'y', from: 113, to: -104 }] },
          { name: 'cat', texture: 'part3/cat.png', x: 4425, y: 241,
            anims: [{ range: [4333, 6950], prop: 'y', from: 241, to: 24 }] },
          // 白色盖板：3850~4050 淡出，露出后面的女孩/虫子/对话
          { name: 'bg2', rect: { width: 1500, height: 640, color: 0xffffff }, x: 4032, y: 0,
            anims: [{ range: [3850, 4050], prop: 'alpha', from: 1, to: 0 }] },
          { name: 'girl', texture: 'part3/girl.png', x: 4459, y: 408,
            anims: [
              { range: [4500, 7000], prop: 'x', from: 4459, to: 4559 },
              { range: [4500, 7000], prop: 'y', from: 408, to: 276 },
            ] },
          { name: 'date', texture: 'part3/date.png', x: 5061, y: 442,
            anims: [{ range: [5680, 7200], prop: 'x', from: 5061, to: 5221 }] },
          {
            // 虫子组：容器整体右移，内部烟雾依次长出
            name: 'chongCont',
            x: 5139,
            y: -31,
            anims: [{ range: [6100, 7800], prop: 'x', from: 5139, to: 5239 }],
            children: [
              { name: 'yan1', texture: 'part3/y1.png', x: 160, y: 182, pivot: [160, 162],
                anims: [
                  { range: [6800, 7100], prop: 'scaleX', from: 0, to: 1 },
                  { range: [6800, 7100], prop: 'scaleY', from: 0, to: 1 },
                  { range: [6800, 7100], prop: 'alpha', from: 0.2, to: 1 },
                ] },
              { name: 'yan2', texture: 'part3/y2.png', x: 469, y: 382, pivot: [10, 185],
                anims: [
                  { range: [6800, 7100], prop: 'scaleX', from: 0, to: 1 },
                  { range: [6800, 7100], prop: 'scaleY', from: 0, to: 1 },
                  { range: [6800, 7100], prop: 'alpha', from: 0.2, to: 1 },
                ] },
              { name: 'yan3', texture: 'part3/y3.png', x: 440, y: 535, pivot: [182, 149],
                anims: [
                  { range: [6050, 6600], prop: 'scaleX', from: 0, to: 1 },
                  { range: [6050, 6600], prop: 'scaleY', from: 0, to: 1 },
                  { range: [6050, 6600], prop: 'alpha', from: 0.2, to: 1 },
                ] },
              { name: 'yan', texture: 'part3/y.png', x: 394, y: 535, pivot: [280, 425],
                anims: [
                  { range: [6500, 6800], prop: 'scaleX', from: 0, to: 1 },
                  { range: [6500, 6800], prop: 'scaleY', from: 0, to: 1 },
                  { range: [6500, 6800], prop: 'y', from: 535, to: 475 },
                ] },
              { name: 'chong', texture: 'part3/chongzi.png', x: 300, y: 131,
                anims: [{ range: [6800, 7000], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'muogu', texture: 'part3/muogu.png', x: 130, y: 347 },
            ],
          },
          { name: 'talk', texture: 'part3/talk.png', x: 4981, y: 248,
            anims: [{ range: [5400, 7400], prop: 'x', from: 4981, to: 5011 }] },
          { name: 'talk2', texture: 'part3/talk2.png', x: 5979, y: 428 },
          { name: 'air1', texture: 'part3/air1.png', x: 6492, y: 318 },
          { name: 'air2', texture: 'part3/air2.png', x: 6755, y: 297 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: '时间隧道',
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
      {
        name: 'talk', texture: 'part1/talk.png', x: 3610, y: 91,
        anims: [
          { range: [2400, 3940], prop: 'x', from: 3610, to: 3410 },
        ]
      }
    ],
  },
]
