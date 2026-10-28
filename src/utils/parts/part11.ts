import type { PartConfig } from '../type'

export const part11: PartConfig = {
  id: 11,
  name: '第十一场景',
  layers: [
    // === 飞鱼群（10 条，各自绕 pivot 旋转或 x 位移） ===
    { name: 'f1', texture: 'part11/f1.png', x: 38565, y: 851, pivot: [51, 518], rotation: -0.4,
      anims: [{ range: [37090, 38790], prop: 'rotation', from: -0.4, to: 0.1 }] },
    { name: 'f2', texture: 'part11/f2.png', x: 38373, y: 850, pivot: [-71, 511], rotation: -0.15,
      anims: [{ range: [37150, 38950], prop: 'x', from: 38373, to: 38873 }] },
    { name: 'f3', texture: 'part11/f3.png', x: 39011, y: 1046, pivot: [280, 637], rotation: -0.3,
      anims: [{ range: [37200, 39230], prop: 'rotation', from: -0.3, to: 0.1 }] },
    { name: 'f4', texture: 'part11/f4.png', x: 39106, y: 1070, pivot: [224, 677], rotation: -0.4,
      anims: [{ range: [37450, 39200], prop: 'rotation', from: -0.4, to: 0.15 }] },
    { name: 'f9', texture: 'part11/f9.png', x: 39152, y: 946, pivot: [-125, 581], rotation: -0.3,
      anims: [{ range: [37840, 39600], prop: 'rotation', from: -0.3, to: 0.1 }] },
    { name: 'f6', texture: 'part11/f6.png', x: 38883, y: 865, pivot: [-161, 593], rotation: -0.3,
      anims: [{ range: [37600, 39350], prop: 'rotation', from: -0.3, to: 0.1 }] },
    { name: 'f10', texture: 'part11/f10.png', x: 39322, y: 1180, pivot: [45, 704], rotation: -0.2,
      anims: [{ range: [37900, 39720], prop: 'rotation', from: -0.2, to: 0.1 }] },
    { name: 'f7', texture: 'part11/f7.png', x: 39047, y: 1046, pivot: [157, 663],
      anims: [{ range: [37730, 39500], prop: 'x', from: 38847, to: 39247 }] },
    { name: 'f5', texture: 'part11/f5.png', x: 39333, y: 1123, pivot: [541, 681], rotation: -0.2,
      anims: [{ range: [37470, 39310], prop: 'rotation', from: -0.2, to: 0.3 }] },
    { name: 'f8', x: 39182, y: 1314, pivot: [229, 825], rotation: -0.5,
      anims: [{ range: [37450, 39600], prop: 'rotation', from: -0.5, to: 0.4 }],
      frameSeq: { prefix: 'part11/f8', frames: 6, range: [37450, 39600] } },

    // === 爆炸容器（鱼群撞击爆炸效果） ===
    {
      name: 'boomCont', x: 39521, y: 0,
      children: [
        // 爆炸底部（静态）
        { name: 'boomBottom', texture: 'part11/boom-bottom.png', x: 247, y: 327 },
        // 爆炸左边（scale 0.7→1）
        { name: 'boomLeft', texture: 'part11/boom-left.png', x: 370, y: 605, pivot: [370, 290], scale: [0.7, 0.7],
          anims: [
            { range: [38180, 39840], prop: 'scaleX', from: 0.7, to: 1 },
            { range: [38180, 39840], prop: 'scaleY', from: 0.7, to: 1 },
          ] },
        // 爆炸右边（scale 0.8→1，稍后触发）
        { name: 'boomRight', texture: 'part11/boom-right.png', x: 1032, y: 683, pivot: [0, 330], scale: [0.8, 0.8],
          anims: [
            { range: [39290, 41010], prop: 'scaleX', from: 0.8, to: 1 },
            { range: [39290, 41010], prop: 'scaleY', from: 0.8, to: 1 },
          ] },
        // 爆炸飞鱼（rotation -1.65→0.2，被炸飞）
        { name: 'boomFish', texture: 'part11/boom-fish.png', x: -199, y: 1760, pivot: [-789, 1304], rotation: -1.65,
          anims: [{ range: [36811, 39500], prop: 'rotation', from: -1.65, to: 0.2 }] },
        // 爆炸中心（scale 0→1，最后弹出）
        { name: 'boomCenter', texture: 'part11/boom-center.png', x: 756, y: 810, pivot: [521, 850], scale: [0, 0],
          anims: [
            { range: [39400, 40000], prop: 'scaleX', from: 0, to: 1 },
            { range: [39400, 40000], prop: 'scaleY', from: 0, to: 1 },
          ] },
        // 碎石 1（scale 0.6→1）
        { name: 'stone1', texture: 'part11/stone1.png', x: 701, y: 709, pivot: [563, 640], scale: [0.6, 0.6],
          anims: [
            { range: [38390, 39850], prop: 'scaleX', from: 0.6, to: 1 },
            { range: [38390, 39850], prop: 'scaleY', from: 0.6, to: 1 },
          ] },
        // 碎石 2（scale 0.7→1）
        { name: 'stone2', texture: 'part11/stone2.png', x: 701, y: 771, pivot: [509, 640], scale: [0.7, 0.7],
          anims: [
            { range: [38390, 39850], prop: 'scaleX', from: 0.7, to: 1 },
            { range: [38390, 39850], prop: 'scaleY', from: 0.7, to: 1 },
          ] },
        // 爆炸顶部（静态）
        { name: 'boomTop', texture: 'part11/boom-top.png', x: 294, y: 143 },
      ],
    },
  ],
}
