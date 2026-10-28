import type { PartConfig } from '../type'

export const part9: PartConfig = {
  id: 9,
  name: '第九场景',
  layers: [
    // 大船（pivot 310,449 控制旋转中心，maskRef 引用遮罩）
    { name: 'boat', texture: 'part9/boat.png', x: 28454, y: 518,
      pivot: [310, 449], maskRef: 'boatMask' },

    // 小浪（快速近景）
    { name: 'wave1', texture: 'part9/wave1.png', x: 28162, y: 79,
      anims: [{ range: [27600, 28300], prop: 'x', from: 28162, to: 29282 }] },

    // 日期 1
    { name: 'date', texture: 'part9/date.png', x: 28804, y: 418,
      anims: [{ range: [28180, 29100], prop: 'x', from: 28804, to: 28704 }] },

    // 大浪（慢速远景）
    { name: 'wave2', texture: 'part9/wave2.png', x: 28077, y: 122,
      anims: [{ range: [27750, 28350], prop: 'x', from: 28077, to: 28915 }] },

    // 船只遮罩容器（与小浪同步移动，揭示船身）
    {
      name: 'boatMaskCont', x: 26845, y: 69,
      anims: [{ range: [27600, 28300], prop: 'x', from: 26845, to: 27965 }],
      children: [
        { name: 'boatMask', texture: 'part9/boat-mask.png', x: 0, y: 0 },
      ],
    },

    // 「听见儿时的旋律 还会跟着哼起来吗」
    { name: 'talk', texture: 'part9/talk.png', x: 29336, y: 368,
      anims: [{ range: [27450, 30050], prop: 'x', from: 29336, to: 29536 }] },

    // 黑泽明（person.png）
    { name: 'heZe', texture: 'part9/person.png', x: 30008, y: 14 },

    // 日期 2
    { name: 'date2', texture: 'part9/date2.png', x: 30551, y: 147,
      anims: [{ range: [29250, 30685], prop: 'x', from: 30551, to: 30451 }] },

    // 水波涟漪容器（7 个涟漪，时间驱动交错动画）
    {
      name: 'waveCont', x: 30537, y: 323,
      children: [
        { name: 'w1', texture: 'part9/w1.png', x: 103, y: 31, pivot: [103, 31],
          ripple: { scaleDuration: 2, fadeDuration: 1, delay: 0, range: [29100, 30950] } },
        { name: 'w2', texture: 'part9/w2.png', x: 103, y: 31, pivot: [103, 31],
          ripple: { scaleDuration: 2, fadeDuration: 1, delay: 3/7, range: [29100, 30950] } },
        { name: 'w3', texture: 'part9/w3.png', x: 103, y: 31, pivot: [103, 31],
          ripple: { scaleDuration: 2, fadeDuration: 1, delay: 6/7, range: [29100, 30950] } },
        { name: 'w4', texture: 'part9/w4.png', x: 103, y: 31, pivot: [103, 31],
          ripple: { scaleDuration: 2, fadeDuration: 1, delay: 9/7, range: [29100, 30950] } },
        { name: 'w5', texture: 'part9/w5.png', x: 103, y: 31, pivot: [103, 31],
          ripple: { scaleDuration: 2, fadeDuration: 1, delay: 12/7, range: [29100, 30950] } },
        { name: 'w6', texture: 'part9/w6.png', x: 103, y: 31, pivot: [103, 31],
          ripple: { scaleDuration: 2, fadeDuration: 1, delay: 15/7, range: [29100, 30950] } },
        { name: 'w7', texture: 'part9/w7.png', x: 103, y: 31, pivot: [103, 31],
          ripple: { scaleDuration: 2, fadeDuration: 1, delay: 18/7, range: [29100, 30950] } },
      ],
    },

    // 牌子
    { name: 'pai', texture: 'part9/pai.png', x: 31394, y: 367,
      anims: [{ range: [30135, 31700], prop: 'x', from: 31394, to: 31454 }] },

    // 蘑菇房
    { name: 'muogu', texture: 'part9/house.png', x: 30496, y: 0 },

    // 巫师 1
    { name: 'wushi1', texture: 'part9/wushi1.png', x: 31247, y: 144,
      anims: [{ range: [30000, 31540], prop: 'x', from: 31247, to: 31347 }] },

    // 手（序列帧 8 帧）
    { name: 'hand', x: 31637, y: 0,
      anims: [{ range: [30380, 32700], prop: 'x', from: 31637, to: 31737 }],
      frameSeq: { prefix: 'part9/hand', frames: 8, range: [31200, 31600] } },

    // 猫（scale 动画）
    { name: 'cat', texture: 'part9/cat.png', x: 31756, y: 290, scale: [0.9, 0.9],
      anims: [
        { range: [30475, 32050], prop: 'x', from: 31756, to: 31876 },
        { range: [30475, 32050], prop: 'scaleX', from: 0.9, to: 1.1 },
        { range: [30475, 32050], prop: 'scaleY', from: 0.9, to: 1.1 },
      ] },

    // 炉子
    { name: 'luzi', texture: 'part9/luzi.png', x: 31404, y: 190,
      anims: [{ range: [30200, 31950], prop: 'x', from: 31404, to: 31604 }] },

    // 巫师 2
    { name: 'wushi2', texture: 'part9/wushi2.png', x: 31596, y: 326,
      anims: [{ range: [30290, 32252], prop: 'x', from: 31596, to: 31946 }] },

    // 蓝精灵容器（格格巫 + 4 个小精灵 + 日期 3 + 对话）
    {
      name: 'lanCont', x: 32561, y: 0,
      children: [
        // 格格巫
        { name: 'ge1', texture: 'part9/ge1.png', x: -16, y: 23,
          anims: [{ range: [31270, 33240], prop: 'x', from: -16, to: 184 }] },
        // 左上精灵（pivot 232,0 控制旋转中心）
        { name: 'ge2', texture: 'part9/ge2.png', x: 232, y: -5, rotation: 0.8, pivot: [232, 0],
          anims: [{ range: [31330, 32880], prop: 'rotation', from: 0.8, to: -0.8 }] },
        // 左精灵
        { name: 'ge3', texture: 'part9/ge3.png', x: -82, y: 245,
          anims: [{ range: [31300, 32790], prop: 'x', from: -82, to: 168 }] },
        // 右上精灵（pivot 165,8）
        { name: 'ge4', texture: 'part9/ge4.png', x: 684, y: -17, rotation: -1, pivot: [165, 8],
          anims: [{ range: [31820, 33280], prop: 'rotation', from: -1, to: 0.2 }] },
        // 右下精灵
        { name: 'ge5', texture: 'part9/ge5.png', x: 516, y: 542,
          anims: [{ range: [31840, 33200], prop: 'y', from: 542, to: 482 }] },
        // 日期 3
        { name: 'date3', texture: 'part9/date3.png', x: 638, y: 383,
          anims: [{ range: [31860, 33550], prop: 'x', from: 638, to: 738 }] },
        // 「就算 你已长大成熟」
        { name: 'talk2', texture: 'part9/talk2.png', x: 589, y: 142 },
      ],
    },
  ],
}
