import type { PartConfig } from '../type'

export const part8: PartConfig = {
  id: 8,
  name: '第八场景',
  layers: [
    // 背景云
    { name: 'bgYun', texture: 'part8/bg-yun.png', x: 24965, y: 0,
      anims: [{ range: [23888, 27500], prop: 'x', from: 24965, to: 25365 }] },

    // 第九场景背景（提前借用到本场景）
    { name: 'part9Bg', texture: 'part9/bg.png', x: 27955, y: 177 },

    // 山水容器（原 part8SCont，相对偏移 x=1710 → 绝对 26650）
    {
      name: '山水容器', x: 26650, y: 0,
      children: [
        // 左后山
        { name: 's1', texture: 'part8/s1.png', x: 477, y: 226 },
        // 右后山
        { name: 's2', texture: 'part8/s2.png', x: 778, y: 100,
          anims: [{ range: [26250, 28670], prop: 'x', from: 778, to: 618 }] },
        // 左山
        { name: 's3', texture: 'part8/s3.png', x: 256, y: 233,
          anims: [{ range: [25400, 27500], prop: 'x', from: 256, to: 6 }] },
        // 右山
        { name: 's4', texture: 'part8/s4.png', x: 1291, y: 233,
          anims: [{ range: [26400, 28680], prop: 'x', from: 1291, to: 941 }] },
        // 中水
        { name: 's6', texture: 'part8/s6.png', x: 994, y: 408,
          anims: [{ range: [26200, 28176], prop: 'x', from: 994, to: 594 }] },
        // 左水+左前
        { name: 's5', texture: 'part8/s5.png', x: 250, y: 373,
          anims: [{ range: [25600, 27750], prop: 'x', from: 250, to: -250 }] },
        // 小船（pivot 84,79 控制旋转中心）
        { name: 'boat', texture: 'part8/boat.png', x: 1401, y: 535,
          pivot: [84, 79], rotation: -0.3,
          anims: [
            { range: [26200, 28176], prop: 'x', from: 1401, to: 1001 },
            { range: [26600, 27800], prop: 'rotation', from: -0.3, to: 0.3 },
          ] },
      ],
    },

    // 人影容器（原 part8PersonCont，偏移 x=0 → 绝对 24940）
    {
      name: '人影容器', x: 24940, y: 0,
      children: [
        // 被遮罩的内容层：黑底 + 云底
        {
          name: '人影背景', x: 0, y: 0, maskRef: '人影遮罩',
          children: [
            { name: '人影黑底', x: 0, y: 0, rect: { width: 657, height: 640, color: 0x000000 } },
            { name: '人影云底', texture: 'part8/person-bg.png', x: 139, y: 9,
              anims: [{ range: [24151, 25395], prop: 'x', from: 139, to: -399 }] },
          ],
        },
        // 人影遮罩容器：pivot(77,375) + 缩放 0.19→1.2 + 位移
        {
          name: '人影', x: 77, y: 625, pivot: [77, 375], scale: [0.19, 0.19],
          anims: [
            { range: [23700, 25400], prop: 'x', from: 77, to: 389 },
            { range: [23700, 25400], prop: 'y', from: 625, to: 396 },
            { range: [23700, 25400], prop: 'scaleX', from: 0.19, to: 1.2 },
            { range: [23700, 25400], prop: 'scaleY', from: 0.19, to: 1.2 },
          ],
          children: [
            { name: '人影遮罩底', texture: 'part8/p1-bg.png', x: 0, y: 0 },
            { name: '人影遮罩', texture: 'part8/p1.png', x: 0, y: 0 },
          ],
        },
      ],
    },

    // 石头
    { name: 'stone', texture: 'part8/stone.png', x: 25307, y: 350,
      anims: [{ range: [24050, 26300], prop: 'x', from: 25307, to: 25347 }] },

    // 小鸟 b1（pivot 负值偏移旋转中心）
    { name: 'b1', texture: 'part8/b1.png', x: 25858, y: 406,
      pivot: [-123, 559], scale: [0.6, 0.6],
      anims: [
        { range: [24700, 27000], prop: 'scaleX', from: 0.6, to: 1.2 },
        { range: [24700, 27000], prop: 'scaleY', from: 0.6, to: 1.2 },
        { range: [24700, 27000], prop: 'x', from: 25858, to: 26258 },
      ] },

    // 小鸟 b2
    { name: 'b2', texture: 'part8/b2.png', x: 26250, y: 94,
      anims: [
        { range: [25090, 27300], prop: 'x', from: 26250, to: 27250 },
        { range: [25090, 27300], prop: 'rotation', from: 0, to: 0.2 },
      ] },

    // 小鸟 b3
    { name: 'b3', texture: 'part8/b3.png', x: 26728, y: 64,
      anims: [{ range: [25370, 27600], prop: 'x', from: 26728, to: 27528 }] },

    // 「你会看到远洋的千帆百桨」
    { name: 'talk2', texture: 'part8/talk2.png', x: 27282, y: 97 },

    // 小鸟 b4
    { name: 'b4', texture: 'part8/b4.png', x: 26740, y: 119,
      anims: [{ range: [25490, 27820], prop: 'x', from: 26740, to: 27740 }] },

    // 小鸟 b5（初始旋转 0.6）
    { name: 'b5', texture: 'part8/b5.png', x: 26856, y: 46, rotation: 0.6,
      anims: [{ range: [25568, 28090], prop: 'x', from: 26856, to: 28006 }] },

    // 小鸟 b6
    { name: 'b6', texture: 'part8/b6.png', x: 26947, y: 273,
      anims: [{ range: [22380, 27640], prop: 'x', from: 26947, to: 27547 }] },

    // 小鸟 b7
    { name: 'b7', texture: 'part8/b7.png', x: 27367, y: 33,
      anims: [{ range: [26100, 28230], prop: 'x', from: 27367, to: 28167 }] },

    // 大鸟 1（pivot 负值偏移）
    { name: 'bird1', texture: 'part8/bird1.png', x: 25664, y: 390,
      pivot: [-94, 335], scale: [0.5, 0.5],
      anims: [
        { range: [25230, 25750], prop: 'scaleX', from: 0.5, to: 1.2 },
        { range: [25230, 25750], prop: 'scaleY', from: 0.5, to: 1.2 },
        { range: [25230, 25750], prop: 'x', from: 25664, to: 26014 },
        { range: [25230, 25750], prop: 'y', from: 390, to: -10 },
      ] },

    // 大鸟 2
    { name: 'bird2', texture: 'part8/bird2.png', x: 26478, y: -15,
      anims: [
        { range: [25150, 26500], prop: 'x', from: 26478, to: 26262 },
        { range: [25150, 26500], prop: 'y', from: -15, to: 195 },
      ] },

    // 笼子（序列帧 5 帧，滚动驱动）
    { name: 'long', x: 25512, y: 117,
      frameSeq: { prefix: 'part8/long', frames: 5, range: [25060, 25400] } },

    // 「会有人愿意停下来」
    { name: 'talk1', texture: 'part8/talk1.png', x: 25899, y: 361,
      anims: [{ range: [24650, 26500], prop: 'x', from: 25899, to: 25999 }] },
  ],
}
