import type { PartConfig } from '../type'

export const part3: PartConfig = {
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
}
