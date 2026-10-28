import type { PartConfig } from "./type"

export const DESIGN_WIDTH = 1040 // 横版画布宽
export const DESIGN_HEIGHT = 640 // 横版画布高
export const TOTAL_SCROLL = 21000 // 总滚动距离（第六场景放大转场到 21000 结束）
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
    id: 3,
    name: '第三场景',
    layers: [
      {
        name: '森林', x: 0, y: 0,
        anims: [{ range: [4150, 6000], prop: 'x', from: 0, to: 1850 }],
        children: [
          // 第1层 黑色背景
          {
            name: 'bgBlack',
            rect: { width: 5000, height: 640, color: 0x000000 },
            x: 4032, y: 0,
            anims: [{ range: [6000, 6050], prop: 'alpha', from: 1, to: 0 }],
          },
          // ── 第2层：场景内容容器（参考 part3Cont，被圆形遮罩裁剪）──
          // 子元素用 part3 局部坐标（世界 = 4132 + 局部）
          {
            name: 'cont',
            x: 4132, y: 0,
            maskRef: 'mask', // 引用第3层 maskCont 里的圆形 Graphics
            children: [
              // 白色底幕：透过圆孔看到白色（原版 6000+ 瞬间 alpha=0，这里用 50px 快速淡出等效）
              {
                name: 'bg1',
                rect: { width: 1500, height: 640, color: 0xffffff },
                x: -100, y: 0,
                anims: [{ range: [6000, 6050], prop: 'alpha', from: 1, to: 0 }],
              },
              // 森林远背景（原版 L3349：6300~9550 缓慢右移 50px）
              {
                name: 'blackBg', texture: 'part3/blackBg.png',
                x: 1618, y: 0,
                anims: [{ range: [6300, 9550], prop: 'x', from: 1618, to: 1668 }],
              },
              // 云（6400~9160 左移 200）
              {
                name: 'cloud', texture: 'part3/cloud.png',
                x: 1937, y: 0,
                anims: [{ range: [6400, 9160], prop: 'x', from: 1937, to: 1737 }],
              },
              // 右山（6360~8400 左移 300）
              {
                name: 'shanRight', texture: 'part3/shanright.png',
                x: 1696, y: 37,
                anims: [{ range: [6360, 8400], prop: 'x', from: 1696, to: 1396 }],
              },
              // 森林（6900~9000 左移 300）
              {
                name: 'senlin', texture: 'part3/senlin.png',
                x: 2417, y: 133,
                anims: [{ range: [6900, 9000], prop: 'x', from: 2417, to: 2117 }],
              },
              // 水波（6550~9250 左移 130）
              {
                name: 'wave', texture: 'part3/wave.png',
                x: 1887, y: 178,
                anims: [{ range: [6550, 9250], prop: 'x', from: 1887, to: 1757 }],
              },
              // 左山（5300~7800 左移 300 + 缩小到 0.5）
              {
                name: 'shanLeft', texture: 'part3/shanleft.png',
                x: 1750, y: 318, pivot: [707, 492],
                anims: [
                  { range: [5300, 7800], prop: 'x', from: 1750, to: 1450 },
                  { range: [5300, 7800], prop: 'scaleX', from: 1, to: 0.5 },
                  { range: [5300, 7800], prop: 'scaleY', from: 1, to: 0.5 },
                ],
              },
              // 子弹组：容器飞行（三段 x + 两段 y + 放大 + 淡入），子图飞散后收拢
              {
                name: 'zidanCont',
                x: 830, y: 100, scale: [0.4, 0.4],
                anims: [
                  { range: [6600, 6900], prop: 'x', from: 830, to: 930 },
                  { range: [6900, 7800], prop: 'x', from: 930, to: 2480 },
                  { range: [7800, 8600], prop: 'x', from: 2480, to: 3280 },
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
                      { range: [6200, 7600], prop: 'x', from: 0, to: 110 },
                      { range: [7600, 7900], prop: 'x', from: 110, to: 20 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 40 },
                      { range: [7600, 7900], prop: 'y', from: 40, to: 8 },
                    ] },
                  { name: 'z3', texture: 'part3/z3.png', x: 0, y: 0,
                    anims: [
                      { range: [6200, 7600], prop: 'x', from: 0, to: 50 },
                      { range: [7600, 7900], prop: 'x', from: 50, to: 46 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 30 },
                      { range: [7600, 7900], prop: 'y', from: 30, to: 15 },
                    ] },
                  { name: 'z4', texture: 'part3/z4.png', x: 0, y: 0,
                    anims: [
                      { range: [6200, 7600], prop: 'x', from: 0, to: 60 },
                      { range: [7600, 7900], prop: 'x', from: 60, to: 28 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 40 },
                      { range: [7600, 7900], prop: 'y', from: 40, to: 27 },
                    ] },
                  { name: 'z5', texture: 'part3/z5.png', x: 0, y: 0,
                    anims: [
                      { range: [6200, 7600], prop: 'x', from: 0, to: 250 },
                      { range: [7600, 7900], prop: 'x', from: 250, to: 16 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 144 },
                      { range: [7600, 7900], prop: 'y', from: 144, to: 42 },
                    ] },
                  { name: 'z6', texture: 'part3/z6.png', x: 0, y: 0,
                    anims: [
                      { range: [6200, 7600], prop: 'x', from: 0, to: 130 },
                      { range: [7600, 7900], prop: 'x', from: 130, to: 43 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 200 },
                      { range: [7600, 7900], prop: 'y', from: 200, to: 44 },
                    ] },
                  { name: 'z7', texture: 'part3/z7.png', x: 0, y: 0,
                    anims: [
                      { range: [6200, 7600], prop: 'x', from: 0, to: 190 },
                      { range: [7600, 7900], prop: 'x', from: 190, to: 10 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 118 },
                      { range: [7600, 7900], prop: 'y', from: 118, to: 31 },
                    ] },
                  { name: 'z8', texture: 'part3/z8.png', x: 0, y: 0,
                    anims: [
                      { range: [6200, 7600], prop: 'x', from: 0, to: 60 },
                      { range: [7600, 7900], prop: 'x', from: 60, to: 22 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 120 },
                      { range: [7600, 7900], prop: 'y', from: 120, to: 33 },
                    ] },
                  { name: 'z9', texture: 'part3/z9.png', x: 0, y: 0,
                    anims: [
                      { range: [6200, 7600], prop: 'x', from: 0, to: 230 },
                      { range: [7600, 7900], prop: 'x', from: 230, to: 0 },
                      { range: [6200, 7600], prop: 'y', from: 0, to: 71 },
                      { range: [7600, 7900], prop: 'y', from: 71, to: 66 },
                    ] },
                ],
              },
              // 树1（4500~7050 左移 250）
              {
                name: 'tree1', texture: 'part3/tree1.png',
                x: 601, y: 75,
                anims: [{ range: [4500, 7050], prop: 'x', from: 601, to: 351 }],
              },
              // 树2（4333~6950 上移）
              {
                name: 'tree2', texture: 'part3/tree2.png',
                x: 0, y: 113,
                anims: [{ range: [4333, 6950], prop: 'y', from: 113, to: -104 }],
              },
              // 猫（4333~6950 上移）
              {
                name: 'cat', texture: 'part3/cat.png',
                x: 293, y: 241,
                anims: [{ range: [4333, 6950], prop: 'y', from: 241, to: 24 }],
              },
              // 白色遮幕：盖住 cat/girl 等，3850~4050 淡出（原版顺序里它在 cat 之后 = 上层）
              {
                name: 'bg2',
                rect: { width: 1500, height: 640, color: 0xffffff },
                x: -100, y: 0,
                anims: [{ range: [3850, 4050], prop: 'alpha', from: 1, to: 0 }],
              },
              // 女孩（4500~7000 右上移）
              {
                name: 'girl', texture: 'part3/girl.png',
                x: 327, y: 408,
                anims: [
                  { range: [4500, 7000], prop: 'x', from: 327, to: 427 },
                  { range: [4500, 7000], prop: 'y', from: 408, to: 276 },
                ],
              },
              // 日期牌（5680~7200 右移 160）
              {
                name: 'date', texture: 'part3/date.png',
                x: 929, y: 442,
                anims: [{ range: [5680, 7200], prop: 'x', from: 929, to: 1089 }],
              },
              // 虫子组：容器整体右移 100，内部烟雾按区间依次长出
              {
                name: 'chongCont',
                x: 1007, y: -31,
                anims: [{ range: [6100, 7800], prop: 'x', from: 1007, to: 1107 }],
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
              // 对话气泡（5400~7400 右移 30）
              {
                name: 'talk', texture: 'part3/talk.png',
                x: 849, y: 248,
                anims: [{ range: [5400, 7400], prop: 'x', from: 849, to: 879 }],
              },
              { name: 'talk2', texture: 'part3/talk2.png', x: 1847, y: 428 },
              { name: 'air1', texture: 'part3/air1.png', x: 2360, y: 318 },
              { name: 'air2', texture: 'part3/air2.png', x: 2623, y: 297 },
            ],
          },
          // 第三层：白色背景逐渐放大，压住黑色背景
          {
            name: 'maskCont',
            x: 4646, y: 319,
            scale: [0.02, 0.02],
            anims: [
              { range: [4150, 5100], prop: 'scaleX', from: 0.02, to: 0.3 },
              { range: [4150, 5100], prop: 'scaleY', from: 0.02, to: 0.3 },
              { range: [5100, 6000], prop: 'scaleX', from: 0.3, to: 1.0 },
              { range: [5100, 6000], prop: 'scaleY', from: 0.3, to: 1.0 },
              { range: [6000, 6010], prop: 'scaleX', from: 1.0, to: 4.0 },
              { range: [6000, 6010], prop: 'scaleY', from: 1.0, to: 4.0 },
            ],
            children: [
              { name: 'mask', circle: { radius: 800, color: 0xffffff }, x: 0, y: 0 },
            ],
          },
        ],
      }
    ],
  },
  {
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
  },
  {
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
  },
  {
    id: 4,
    name: '第四场景',
    layers: [
      {
        // 夜空 + 月亮开枪 → 大月亮显现（人物/弹壳）→ 放大过渡（原版第五场景嵌在这里，未迁移）
        name: 'part4', x: 9190, y: 0,
        children: [
          // 黑色底幕：宽 12852 覆盖整个场景，无需跟随相机
          { name: 'bg', rect: { width: 12852, height: 640, color: 0x000000 }, x: 244, y: 0 },
          // 爆炸背景（静态）
          { name: 'boom', texture: 'part4/boom.png', x: 0, y: 0 },
          // 星空：三种星条横向重复铺，alpha yoyo 闪烁；流星区间前钉在屏外(y=-999)、区间后钉在屏下(y=640)
          {
            name: 'starCont', x: 170, y: 0,
            children: [
              { name: 's11', texture: 'part4/s1.png', x: 0, y: 0, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.0, yoyo: true } },
              { name: 's12', texture: 'part4/s1.png', x: 2364, y: 0, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.2, yoyo: true } },
              { name: 's13', texture: 'part4/s1.png', x: 4728, y: 0, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.4, yoyo: true } },
              { name: 's21', texture: 'part4/s2.png', x: 376, y: 173, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.3, yoyo: true } },
              { name: 's22', texture: 'part4/s2.png', x: 2196, y: 173, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.5, yoyo: true } },
              { name: 's23', texture: 'part4/s2.png', x: 4392, y: 173, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.1, yoyo: true } },
              { name: 's31', texture: 'part4/s3.png', x: 356, y: 416, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.25, yoyo: true } },
              { name: 's32', texture: 'part4/s3.png', x: 2176, y: 416, loop: { prop: 'alpha', from: 1, to: 0.4, duration: 1.35, yoyo: true } },
              { name: 'liuxing1', texture: 'part4/liuxing.png', x: 500, y: -999,
                anims: [
                  { range: [10300, 11300], prop: 'x', from: 500, to: 2600 },
                  { range: [10300, 11300], prop: 'y', from: -999, to: 640 },
                ] },
              { name: 'liuxing2', texture: 'part4/liuxing.png', x: 2000, y: -999,
                anims: [
                  { range: [11800, 12800], prop: 'x', from: 2000, to: 4100 },
                  { range: [11800, 12800], prop: 'y', from: -999, to: 640 },
                ] },
              { name: 'liuxing3', texture: 'part4/liuxing.png', x: 3500, y: -999,
                anims: [
                  { range: [13300, 14300], prop: 'x', from: 3500, to: 5600 },
                  { range: [13300, 14300], prop: 'y', from: -999, to: 640 },
                ] },
            ],
          },
          // 日期牌（跟随相机左右摆动）
          { name: 'date', texture: 'part4/date.png', x: -354, y: 439,
            anims: [{ range: [7650, 9030], prop: 'x', from: -354, to: -254 }] },
          // 后子弹尾迹：向右上飞出并缩小
          { name: 'zidanEnd', texture: 'part4/zidan-end.png', x: 505, y: 182, pivot: [184, 16],
            anims: [
              { range: [8760, 9460], prop: 'x', from: 505, to: 1125 },
              { range: [8760, 9460], prop: 'y', from: 182, to: -128 },
              { range: [8760, 9460], prop: 'scaleX', from: 1, to: 0.4 },
              { range: [8760, 9460], prop: 'scaleY', from: 1, to: 0.4 },
            ] },
          // 对话气泡（静态）
          { name: 'talk', texture: 'part4/talk.png', x: 851, y: 360 },
          // ★月亮容器：开火序列帧 → 9020 起放大/旋转/漂移，12500 二次放大过渡到第五场景
          {
            name: 'moonCont', x: 372, y: 295, pivot: [372, 295],
            anims: [
              { range: [9020, 14000], prop: 'rotation', from: 0, to: 4.408 },
              { range: [9020, 11000], prop: 'scaleX', from: 1, to: 4.65 },
              { range: [12500, 15000], prop: 'scaleX', from: 4.65, to: 9.3 },
              { range: [9020, 11000], prop: 'scaleY', from: 1, to: 4.65 },
              { range: [12500, 15000], prop: 'scaleY', from: 4.65, to: 9.3 },
              { range: [9020, 11000], prop: 'x', from: 372, to: 2372 },
              { range: [11000, 15000], prop: 'x', from: 2372, to: 6372 },
              { range: [9020, 11000], prop: 'y', from: 295, to: 1255 },
              { range: [12500, 15000], prop: 'y', from: 1255, to: 2005 },
            ],
            children: [
              // 大月亮容器：9400 渐显；初始 rotation -2.4 补偿 moonCont 的旋转
              {
                name: 'bigMoonCont', x: 369, y: 299, pivot: [945, 948],
                scale: [0.215, 0.215], rotation: -2.4,
                anims: [{ range: [9400, 9500], prop: 'alpha', from: 0, to: 1 }],
                children: [
                  { name: 'bigMoon', texture: 'part4/bigMoonBg.png', x: 945, y: 948, pivot: [945, 948] },
                  // 弹壳：9600 随人物显现，11700~12100 按滚动播 7 帧
                  {
                    name: 'zidankeCont', x: 915, y: 873, pivot: [443, 1056], scale: [0.932, 0.932],
                    anims: [{ range: [9600, 9610], prop: 'alpha', from: 0, to: 1 }],
                    children: [
                      { name: 'zidanke', x: 0, y: 0, frameSeq: { prefix: 'part4/k', frames: 7, range: [11700, 12100] } },
                    ],
                  },
                  // 左人
                  { name: 'p1', texture: 'part4/p1.png', x: 995, y: 998, pivot: [522, 937],
                    anims: [
                      { range: [9600, 9610], prop: 'alpha', from: 0, to: 1 },
                      { range: [11300, 13250], prop: 'rotation', from: 0, to: -0.2 },
                      { range: [11300, 13250], prop: 'x', from: 995, to: 1195 },
                      { range: [11300, 13250], prop: 'y', from: 998, to: 798 },
                    ] },
                  // 最右人
                  { name: 'p4', texture: 'part4/p4.png', x: 932, y: 945, pivot: [78, 934],
                    anims: [
                      { range: [10560, 12680], prop: 'rotation', from: -0.2, to: 0.2 },
                      { range: [10560, 12680], prop: 'x', from: 932, to: 952 },
                    ] },
                  // 右人
                  { name: 'p3', texture: 'part4/p3.png', x: 945, y: 948, pivot: [132, 906],
                    anims: [
                      { range: [9600, 9610], prop: 'alpha', from: 0, to: 1 },
                      { range: [10300, 13000], prop: 'rotation', from: -0.2, to: 0.2 },
                    ] },
                  // 两人
                  { name: 'p2', texture: 'part4/p2.png', x: 745, y: 948, pivot: [391, 820],
                    anims: [
                      { range: [9600, 9610], prop: 'alpha', from: 0, to: 1 },
                      { range: [11000, 13300], prop: 'rotation', from: 0, to: -0.2 },
                      { range: [11000, 13300], prop: 'x', from: 745, to: 1345 },
                      { range: [11000, 13300], prop: 'y', from: 948, to: 848 },
                    ] },
                  // ── 第五场景：寄生在大月亮容器里，靠补偿链完成转场 ──
                  // rotation -2 抵消链路旋转（4.408-2.4-2≈0 转正）；scale 0.5 × bigMoon 0.215 × moonCont 9.3 = 1.0
                  {
                    name: 'part5', x: 581, y: 1098, pivot: [869, 1248],
                    scale: [0.5, 0.5], rotation: -2,
                    anims: [{ range: [9600, 9610], prop: 'alpha', from: 0, to: 1 }],
                    children: [
                      { name: 'bg', texture: 'part5/bg.png', x: 0, y: 13 },
                      { name: 'stone1', texture: 'part5/stone1.png', x: 1440, y: 369 },
                      { name: 'stone2', texture: 'part5/stone2.png', x: 1336, y: 615 },
                      // 日期牌（13100~15750 右移 100）
                      { name: 'date', texture: 'part5/date.png', x: 553, y: 372,
                        anims: [{ range: [13100, 15750], prop: 'x', from: 553, to: 653 }] },
                      // 宇航员（12650~16300 行走入场右移 700）
                      { name: 'yhy', texture: 'part5/yhy.png', x: 285, y: 0,
                        anims: [{ range: [12650, 16300], prop: 'x', from: 285, to: 985 }] },
                      // 子弹1（13400~16300 从左飞入）
                      { name: 'zidan1', texture: 'part5/zidan1.png', x: -434, y: 457,
                        anims: [{ range: [13400, 16300], prop: 'x', from: -434, to: 1329 }] },
                      // 子弹2（12600~16500 右移上收）
                      { name: 'zidan2', texture: 'part5/zidan2.png', x: 286, y: 633,
                        anims: [
                          { range: [12600, 16500], prop: 'x', from: 286, to: 1586 },
                          { range: [12600, 16500], prop: 'y', from: 633, to: 533 },
                        ] },
                      // 台词（跟随相机慢速视差，14910 淡入）
                      { name: 'talk', texture: 'part5/talk.png', x: 1182, y: 266,
                        anims: [
                          { range: [12550, 17100], prop: 'x', from: 1182, to: 1582 },
                          { range: [14910, 14950], prop: 'alpha', from: 0, to: 1 },
                        ] },
                    ],
                  },
                ],
              },
              // 月亮：8690~8990 按滚动切 6 帧（月相），9450 起淡出
              { name: 'moon', x: 169, y: 90,
                frameSeq: { prefix: 'part4/m', frames: 6, range: [8690, 8990] },
                anims: [{ range: [9450, 9700], prop: 'alpha', from: 1, to: 0 }] },
              // 子弹：飞入+缩小，8690~8990 切 5 帧（开火），9450 起淡出
              { name: 'zidan', x: -150, y: 529, pivot: [244, 31], scale: [1.4, 1.4],
                frameSeq: { prefix: 'part4/zidan', frames: 5, range: [8690, 8990] },
                anims: [
                  { range: [7550, 8720], prop: 'x', from: -150, to: 300 },
                  { range: [7550, 8720], prop: 'y', from: 529, to: 279 },
                  { range: [7550, 8720], prop: 'scaleX', from: 1.4, to: 1 },
                  { range: [7550, 8720], prop: 'scaleY', from: 1.4, to: 1 },
                  { range: [9450, 9700], prop: 'alpha', from: 1, to: 0 },
                ] },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: '第六场景',
    layers: [
      {
        // 山路 + 木偶 + 吞鱼：18700 起整场景放大 15 倍冲入鱼嘴（转场到第七场景，part7 未迁移）
        // pivot(2931,279) 即放大中心；世界原点 = 19150-2931 = 16219，子元素用 part6 局部坐标
        name: 'part6', x: 19150, y: 279, pivot: [2931, 279],
        anims: [
          { range: [18700, 20900], prop: 'scaleX', from: 1, to: 8 },
          { range: [20900, 21000], prop: 'scaleX', from: 8, to: 15 },
          { range: [18700, 20900], prop: 'scaleY', from: 1, to: 8 },
          { range: [20900, 21000], prop: 'scaleY', from: 8, to: 15 },
          // 原版公式终点 21700 但只执行到 21000，等效 19150→20913
          { range: [18700, 21000], prop: 'x', from: 19150, to: 20913 },
        ],
        children: [
          // 五座远山视差（叠放顺序照原版 addChild：s2 最底）
          { name: 's2', texture: 'part6/s2.png', x: 731, y: 7,
            anims: [{ range: [15555, 17370], prop: 'x', from: 731, to: 571 }] },
          { name: 's1', texture: 'part6/s1.png', x: 50, y: 16,
            anims: [{ range: [14980, 17050], prop: 'x', from: 50, to: -200 }] },
          { name: 's5', texture: 'part6/s5.png', x: 2271, y: 68,
            anims: [{ range: [16950, 18800], prop: 'x', from: 2271, to: 2171 }] },
          { name: 's4', texture: 'part6/s4.png', x: 1844, y: 33,
            anims: [{ range: [16560, 18600], prop: 'x', from: 1844, to: 1644 }] },
          { name: 's3', texture: 'part6/s3.png', x: 421, y: 13,
            anims: [{ range: [15500, 18600], prop: 'x', from: 421, to: 371 }] },
          // 石阶：j0 常显，j1~j14 在 16070~17220 按原版分桶时刻依次点亮（每块 10px 快速淡入）
          {
            name: 'jieCont', x: 579, y: 105,
            children: [
              { name: 'j0', texture: 'part6/j0.png', x: 0, y: 0 },
              { name: 'j1', texture: 'part6/j1.png', x: 84, y: 60, anims: [{ range: [16214, 16224], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j2', texture: 'part6/j2.png', x: 106, y: 61, anims: [{ range: [16286, 16296], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j3', texture: 'part6/j3.png', x: 145, y: 67, anims: [{ range: [16358, 16368], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j4', texture: 'part6/j4.png', x: 180, y: 72, anims: [{ range: [16430, 16440], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j5', texture: 'part6/j5.png', x: 220, y: 78, anims: [{ range: [16502, 16512], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j6', texture: 'part6/j6.png', x: 261, y: 81, anims: [{ range: [16574, 16584], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j7', texture: 'part6/j7.png', x: 301, y: 102, anims: [{ range: [16645, 16655], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j8', texture: 'part6/j8.png', x: 342, y: 133, anims: [{ range: [16717, 16727], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j9', texture: 'part6/j9.png', x: 403, y: 152, anims: [{ range: [16789, 16799], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j10', texture: 'part6/j10.png', x: 468, y: 187, anims: [{ range: [16861, 16871], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j11', texture: 'part6/j11.png', x: 534, y: 232, anims: [{ range: [16933, 16943], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j12', texture: 'part6/j12.png', x: 590, y: 304, anims: [{ range: [17005, 17015], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j13', texture: 'part6/j13.png', x: 651, y: 370, anims: [{ range: [17077, 17087], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'j14', texture: 'part6/j14.png', x: 1192, y: 465, anims: [{ range: [17148, 17158], prop: 'alpha', from: 0, to: 1 }] },
            ],
          },
          // 小路：l0 常显，l1~l27 在 17070~18170 按分桶时刻依次点亮
          {
            name: 'luCont', x: 1682, y: 0,
            children: [
              { name: 'l0', texture: 'part6/l0.png', x: 84, y: 0 },
              { name: 'l1', texture: 'part6/l1.png', x: 0, y: 167, anims: [{ range: [17146, 17156], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l2', texture: 'part6/l2.png', x: 52, y: 188, anims: [{ range: [17184, 17194], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l3', texture: 'part6/l3.png', x: 84, y: 209, anims: [{ range: [17222, 17232], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l4', texture: 'part6/l4.png', x: 126, y: 222, anims: [{ range: [17260, 17270], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l5', texture: 'part6/l5.png', x: 152, y: 218, anims: [{ range: [17298, 17308], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l6', texture: 'part6/l6.png', x: 236, y: 213, anims: [{ range: [17335, 17345], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l7', texture: 'part6/l7.png', x: 322, y: 208, anims: [{ range: [17373, 17383], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l8', texture: 'part6/l8.png', x: 416, y: 197, anims: [{ range: [17411, 17421], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l9', texture: 'part6/l9.png', x: 496, y: 192, anims: [{ range: [17449, 17459], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l10', texture: 'part6/l10.png', x: 554, y: 185, anims: [{ range: [17487, 17497], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l11', texture: 'part6/l11.png', x: 587, y: 178, anims: [{ range: [17525, 17535], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l12', texture: 'part6/l12.png', x: 621, y: 173, anims: [{ range: [17563, 17573], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l13', texture: 'part6/l13.png', x: 643, y: 162, anims: [{ range: [17601, 17611], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l14', texture: 'part6/l14.png', x: 677, y: 157, anims: [{ range: [17639, 17649], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l15', texture: 'part6/l15.png', x: 696, y: 145, anims: [{ range: [17677, 17687], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l16', texture: 'part6/l16.png', x: 728, y: 145, anims: [{ range: [17715, 17725], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l17', texture: 'part6/l17.png', x: 754, y: 134, anims: [{ range: [17752, 17762], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l18', texture: 'part6/l18.png', x: 783, y: 123, anims: [{ range: [17790, 17800], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l19', texture: 'part6/l19.png', x: 808, y: 118, anims: [{ range: [17828, 17838], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l20', texture: 'part6/l20.png', x: 823, y: 101, anims: [{ range: [17866, 17876], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l21', texture: 'part6/l21.png', x: 842, y: 83, anims: [{ range: [17904, 17914], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l22', texture: 'part6/l22.png', x: 849, y: 64, anims: [{ range: [17942, 17952], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l23', texture: 'part6/l23.png', x: 847, y: 45, anims: [{ range: [17980, 17990], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l24', texture: 'part6/l24.png', x: 840, y: 30, anims: [{ range: [18018, 18028], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l25', texture: 'part6/l25.png', x: 831, y: 19, anims: [{ range: [18056, 18066], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l26', texture: 'part6/l26.png', x: 823, y: 9, anims: [{ range: [18094, 18104], prop: 'alpha', from: 0, to: 1 }] },
              { name: 'l27', texture: 'part6/l27.png', x: 809, y: 0, anims: [{ range: [18132, 18142], prop: 'alpha', from: 0, to: 1 }] },
            ],
          },
          { name: 'date', texture: 'part6/date.png', x: 897, y: 394,
            anims: [{ range: [15820, 17300], prop: 'x', from: 897, to: 797 }] },
          { name: 'talk', texture: 'part6/talk.png', x: 2076, y: 413,
            anims: [{ range: [17010, 18560], prop: 'x', from: 2076, to: 1976 }] },
          // 吞鱼场景：鱼腹圆底 + 鱼体（摆尾），鱼腹透视窗里是木偶与气泡
          {
            name: 'fishCont', x: 2369, y: 0,
            children: [
              { name: 'circle', texture: 'part6/circle.png', x: 447, y: 107 },
              {
                name: 'fishItemCont', x: 492, y: -113,
                anims: [{ range: [20900, 21000], prop: 'x', from: 492, to: 472 }],
                children: [
                  { name: 'fishBottom', texture: 'part6/fish-bottom3.png', x: 30, y: 168, pivot: [-97, -114], rotation: -0.2,
                    anims: [
                      { range: [17774, 18700], prop: 'rotation', from: -0.2, to: 0.1 },
                      { range: [17774, 18700], prop: 'x', from: 30, to: -20 },
                    ] },
                  // 第七场景遮罩（先随鱼摆动，part7 迁移时引用）
                  { name: 'part7MaskCont', x: 30, y: 168, pivot: [-97, -114], rotation: -0.2,
                    anims: [
                      { range: [17774, 18700], prop: 'rotation', from: -0.2, to: 0.1 },
                      { range: [17774, 18700], prop: 'x', from: 30, to: -20 },
                    ],
                    children: [
                      { name: 'part7Mask', texture: 'part6/part7Mask.png', x: 84, y: 73, pivot: [84, 73] },
                    ] },
                  // 鱼腹透视窗内容：被静态矩形 middleMask 裁剪
                  {
                    name: 'middleCont', x: 0, y: 113, maskRef: 'middleMask',
                    children: [
                      // 木偶走近（16358~17920 右移 200 + 放大 0.8→1.4）
                      { name: 'muouCont', x: -1384, y: 91, scale: [0.8, 0.8],
                        anims: [
                          { range: [16358, 17920], prop: 'x', from: -1384, to: -1584 },
                          { range: [16358, 17920], prop: 'scaleX', from: 0.8, to: 1.4 },
                          { range: [16358, 17920], prop: 'scaleY', from: 0.8, to: 1.4 },
                        ],
                        children: [
                          // 帽子组：17220 起帽子飞走（右移 1120 + 缩小 + 翻转），y 两段后落地跳回
                          { name: 'maoCont', x: 262, y: 32, pivot: [98, 32],
                            children: [
                              { name: 'maoBottom', texture: 'part6/mao-bottom.png', x: 98, y: 31, pivot: [98, 31],
                                anims: [
                                  { range: [17220, 18520], prop: 'x', from: 98, to: 1218 },
                                  { range: [17220, 18520], prop: 'rotation', from: 0, to: -1.5 },
                                  { range: [17220, 18520], prop: 'scaleX', from: 1, to: 0.1 },
                                  { range: [17220, 18520], prop: 'scaleY', from: 1, to: 0.1 },
                                  { range: [17220, 17920], prop: 'y', from: 31, to: 91 },
                                  { range: [17920, 18520], prop: 'y', from: 91, to: 111 },
                                  { range: [18520, 18530], prop: 'y', from: 111, to: 61 },
                                ] },
                              { name: 'muou', texture: 'part6/muou.png', x: -164, y: 4 },
                              { name: 'maoTop', texture: 'part6/mao-top.png', x: 98, y: 32, pivot: [83, 31],
                                anims: [
                                  { range: [17220, 18520], prop: 'x', from: 98, to: 1218 },
                                  { range: [17220, 18520], prop: 'rotation', from: 0, to: -1.5 },
                                  { range: [17220, 18520], prop: 'scaleX', from: 1, to: 0.1 },
                                  { range: [17220, 18520], prop: 'scaleY', from: 1, to: 0.1 },
                                  { range: [17220, 17920], prop: 'y', from: 32, to: 92 },
                                  { range: [17920, 18520], prop: 'y', from: 92, to: 112 },
                                  { range: [18520, 18530], prop: 'y', from: 112, to: 62 },
                                ] },
                            ] },
                        ] },
                      // 气泡：18420 起冒出（scale 0→1 + alpha 0.4→1，轨道起点钉住初始值）
                      { name: 'pao1', texture: 'part6/pao1.png', x: 271, y: 193, pivot: [606, 0], scale: [0, 0],
                        anims: [
                          { range: [18420, 18720], prop: 'scaleX', from: 0, to: 1 },
                          { range: [18420, 18720], prop: 'scaleY', from: 0, to: 1 },
                          { range: [18420, 18720], prop: 'alpha', from: 0.4, to: 1 },
                        ] },
                      { name: 'pao2', texture: 'part6/pao2.png', x: 271, y: 193, pivot: [507, -152], scale: [0, 0],
                        anims: [
                          { range: [18420, 18670], prop: 'scaleX', from: 0, to: 1 },
                          { range: [18420, 18670], prop: 'scaleY', from: 0, to: 1 },
                          { range: [18420, 18670], prop: 'alpha', from: 0.4, to: 1 },
                        ] },
                    ],
                  },
                  // 鱼腹透视窗遮罩：原版矩形在 part6 局部 (1143,0)，换算到父级 fishItemCont 局部 = (1143-2861, 0+113)
                  { name: 'middleMask', rect: { width: 2011, height: 640, color: 0xffffff }, x: -1718, y: 113 },
                  { name: 'fish', texture: 'part6/fish.png', x: 30, y: 168, pivot: [0, 168], rotation: -0.2,
                    anims: [
                      { range: [17774, 18700], prop: 'rotation', from: -0.2, to: 0.1 },
                      { range: [17774, 18700], prop: 'x', from: 30, to: -20 },
                    ] },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
