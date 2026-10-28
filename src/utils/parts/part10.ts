import type { PartConfig } from '../type'

export const part10: PartConfig = {
  id: 10,
  name: '第十场景',
  layers: [
    // === 栅栏列（17 根，视差纵深） ===
    { name: 'z16', texture: 'part10/z16.png', x: 37226, y: 0,
      anims: [{ range: [35970, 37363], prop: 'x', from: 37226, to: 37286 }] },
    { name: 'z17', texture: 'part10/z17.png', x: 37112, y: 0 },
    { name: 'z15', texture: 'part10/z15.png', x: 36984, y: 0,
      anims: [{ range: [35770, 37450], prop: 'x', from: 36984, to: 37084 }] },
    { name: 'z14', texture: 'part10/z14.png', x: 36494, y: 0,
      anims: [{ range: [35190, 37250], prop: 'x', from: 36494, to: 36694 }] },
    { name: 'z13', texture: 'part10/z13.png', x: 36238, y: 0,
      anims: [{ range: [35000, 36800], prop: 'x', from: 36238, to: 36538 }] },
    { name: 'z12', texture: 'part10/z12.png', x: 35860, y: 0,
      anims: [{ range: [34320, 36740], prop: 'x', from: 35860, to: 36110 }] },
    { name: 'z11', texture: 'part10/z11.png', x: 35350, y: 0,
      anims: [{ range: [34070, 36190], prop: 'x', from: 35350, to: 35650 }] },
    { name: 'z10', texture: 'part10/z10.png', x: 35054, y: 0,
      anims: [{ range: [33720, 36180], prop: 'x', from: 35054, to: 35434 }] },
    { name: 'z8', texture: 'part10/z8.png', x: 34223, y: 0,
      anims: [{ range: [32953, 35400], prop: 'x', from: 34223, to: 35023 }] },
    { name: 'z9', texture: 'part10/z9.png', x: 34487, y: 0,
      anims: [{ range: [33190, 36033], prop: 'x', from: 34487, to: 35487 }] },
    { name: 'z1', texture: 'part10/z1.png', x: 33004, y: 0,
      anims: [{ range: [31700, 33333], prop: 'x', from: 33004, to: 33104 }] },
    { name: 'z2', texture: 'part10/z2.png', x: 33093, y: 0,
      anims: [{ range: [31850, 33555], prop: 'x', from: 33093, to: 33293 }] },
    { name: 'z3', texture: 'part10/z3.png', x: 33309, y: 0,
      anims: [{ range: [32025, 33880], prop: 'x', from: 33309, to: 33609 }] },
    { name: 'z4', texture: 'part10/z4.png', x: 33350, y: 0,
      anims: [{ range: [32140, 33970], prop: 'x', from: 33350, to: 33750 }] },
    { name: 'z5', texture: 'part10/z5.png', x: 33426, y: 0,
      anims: [{ range: [32150, 34172], prop: 'x', from: 33426, to: 33926 }] },
    { name: 'z7', texture: 'part10/z7.png', x: 33956, y: 0,
      anims: [{ range: [32680, 35050], prop: 'x', from: 33956, to: 34656 }] },
    { name: 'z6', texture: 'part10/z6.png', x: 33541, y: 0,
      anims: [{ range: [32300, 34670], prop: 'x', from: 33541, to: 34141 }] },

    // === 浪花 ===
    { name: 'wave1', texture: 'part10/wave1.png', x: 34833, y: 243,
      anims: [{ range: [33590, 35545], prop: 'x', from: 34833, to: 35033 }] },
    { name: 'wave3', texture: 'part10/wave3.png', x: 35628, y: 198,
      anims: [{ range: [33920, 37320], prop: 'x', from: 35628, to: 36028 }] },
    { name: 'wave2', texture: 'part10/wave2.png', x: 35452, y: 368,
      anims: [{ range: [34660, 37250], prop: 'x', from: 35452, to: 35552 }] },

    // === 石头（静态） ===
    { name: 'stone1', texture: 'part10/stone1.png', x: 36737, y: 147 },

    // === 兔子（三段接力淡入淡出） ===
    { name: 'tu1', texture: 'part10/tu1.png', x: 33564, y: 329,
      anims: [
        { range: [32600, 34400], prop: 'x', from: 33564, to: 34164 },
        { range: [32600, 34400], prop: 'y', from: 329, to: 229 },
        { range: [32600, 34400], prop: 'rotation', from: 0, to: 0.3 },
        { range: [33033, 33333], prop: 'alpha', from: 1, to: 1 },
        { range: [33333, 33533], prop: 'alpha', from: 1, to: 0 },
      ] },
    { name: 'tu2', texture: 'part10/tu2.png', x: 33693, y: 192,
      anims: [
        { range: [32700, 35100], prop: 'x', from: 33693, to: 34693 },
        { range: [33133, 33433], prop: 'alpha', from: 0, to: 0 },
        { range: [33433, 33633], prop: 'alpha', from: 0, to: 1 },
        { range: [33633, 34050], prop: 'alpha', from: 1, to: 1 },
        { range: [34050, 34250], prop: 'alpha', from: 1, to: 0 },
      ] },
    { name: 'tu3', texture: 'part10/tu3.png', x: 34698, y: 207, rotation: -0.2,
      anims: [
        { range: [33000, 35600], prop: 'x', from: 34698, to: 35498 },
        { range: [33000, 35600], prop: 'y', from: 207, to: 307 },
        { range: [33000, 35600], prop: 'rotation', from: -0.2, to: 0.2 },
        { range: [33000, 34150], prop: 'alpha', from: 0, to: 0 },
        { range: [34150, 34350], prop: 'alpha', from: 0, to: 1 },
      ] },

    // === 日期 ===
    { name: 'date', texture: 'part10/date.png', x: 37281, y: 199,
      anims: [{ range: [34020, 37220], prop: 'x', from: 37281, to: 37481 }] },

    // === 海雁容器（海雁 + 骨骼序列帧） ===
    {
      name: 'haiyanCont', x: 37225, y: 0,
      children: [
        { name: 'haiStone', texture: 'part10/stone2.png', x: 0, y: 392 },
        { name: 'haiyan', texture: 'part10/haiyan.png', x: 600, y: 0 },
        { name: 'haiGu', x: 522, y: 10,
          anims: [{ range: [36650, 37800], prop: 'x', from: 522, to: -28 }],
          frameSeq: { prefix: 'part10/h', frames: 37, range: [37155, 37700] } },
      ],
    },

    // === 气泡 ===
    { name: 'pao', texture: 'part10/pao.png', x: 38356, y: 410, pivot: [169, 469], scale: [0, 0],
      anims: [
        { range: [37550, 38100], prop: 'scaleX', from: 0, to: 1 },
        { range: [37550, 38100], prop: 'scaleY', from: 0, to: 1 },
        { range: [37550, 38100], prop: 'alpha', from: 0.5, to: 1 },
      ] },

    // === 水中海雁 ===
    {
      name: 'hwCont', x: 38839, y: 107, pivot: [535, -213], rotation: 0.5,
      anims: [{ range: [36970, 38888], prop: 'rotation', from: 0.5, to: -0.3 }],
      children: [
        { name: 'hwSpri', texture: 'part10/haiyan2.png', x: 0, y: 0, scale: [0.6, 0.6],
          anims: [
            { range: [36970, 38888], prop: 'scaleX', from: 0.6, to: 1.2 },
            { range: [36970, 38888], prop: 'scaleY', from: 0.6, to: 1.2 },
          ] },
      ],
    },

    // === 对话文字「就算曾经的足迹被风沙掩埋」 ===
    { name: 'talk', texture: 'part10/talk.png', x: 38508, y: 48,
      anims: [{ range: [37150, 39150], prop: 'x', from: 38508, to: 38658 }] },
  ],
}
