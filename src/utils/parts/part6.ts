import type { PartConfig } from '../type'

export const part6: PartConfig = {
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
            { name: 'circle', texture: 'part6/circle.png', x: 447, y: 107,
              anims: [{ range: [21000, 21010], prop: 'alpha', from: 1, to: 0 }] },
            {
              name: 'fishItemCont', x: 492, y: -113,
              anims: [{ range: [20900, 21000], prop: 'x', from: 492, to: 472 }],
              children: [
                { name: 'fishBottom', texture: 'part6/fish-bottom3.png', x: 30, y: 168, pivot: [-97, -114], rotation: -0.2,
                  anims: [
                    { range: [17774, 18700], prop: 'rotation', from: -0.2, to: 0.1 },
                    { range: [17774, 18700], prop: 'x', from: 30, to: -20 },
                    { range: [21000, 21010], prop: 'alpha', from: 1, to: 0 },
                  ] },
                // 第七场景遮罩（先随鱼摆动，part7 迁移时引用）
                { name: 'part7MaskCont', x: 30, y: 168, pivot: [-97, -114], rotation: -0.2,
                  anims: [
                    { range: [17774, 18700], prop: 'rotation', from: -0.2, to: 0.1 },
                    { range: [17774, 18700], prop: 'x', from: 30, to: -20 },
                  ],
                  children: [
                    // 21000 遮罩放大 10 倍 = 第七场景完全揭幕
                    { name: 'part7Mask', texture: 'part6/part7Mask.png', x: 84, y: 73, pivot: [84, 73],
                      anims: [
                        { range: [21000, 21010], prop: 'scaleX', from: 1, to: 10 },
                        { range: [21000, 21010], prop: 'scaleY', from: 1, to: 10 },
                      ] },
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
                        { range: [21000, 21010], prop: 'alpha', from: 1, to: 0 },
                      ] },
                    { name: 'pao2', texture: 'part6/pao2.png', x: 271, y: 193, pivot: [507, -152], scale: [0, 0],
                      anims: [
                        { range: [18420, 18670], prop: 'scaleX', from: 0, to: 1 },
                        { range: [18420, 18670], prop: 'scaleY', from: 0, to: 1 },
                        { range: [18420, 18670], prop: 'alpha', from: 0.4, to: 1 },
                        { range: [21000, 21010], prop: 'alpha', from: 1, to: 0 },
                      ] },
                  ],
                },
                // 鱼腹透视窗遮罩：原版矩形在 part6 局部 (1143,0)，换算到父级 fishItemCont 局部 = (1143-2861, 0+113)
                { name: 'middleMask', rect: { width: 2011, height: 640, color: 0xffffff }, x: -1718, y: 113 },
                { name: 'fish', texture: 'part6/fish.png', x: 30, y: 168, pivot: [0, 168], rotation: -0.2,
                  anims: [
                    { range: [17774, 18700], prop: 'rotation', from: -0.2, to: 0.1 },
                    { range: [17774, 18700], prop: 'x', from: 30, to: -20 },
                    { range: [21000, 21010], prop: 'alpha', from: 1, to: 0 },
                  ] },
              ],
            },
          ],
        },
      ],
    },
  ],
}
