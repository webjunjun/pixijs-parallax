import type { PartConfig } from '../type'

export const part4: PartConfig = {
  id: 4,
  name: '第四场景',
  layers: [
    {
      // 夜空 + 月亮开枪 → 大月亮显现（人物/弹壳）→ 放大过渡（原版第五场景嵌在这里，未迁移）
      name: 'part4', x: 9190, y: 0,
      children: [
        // 黑色底幕：宽 12852 覆盖整个场景，无需跟随相机
        // 21000 第七场景揭幕后退场（原版 part4Bg.alpha=0）
        { name: 'bg', rect: { width: 12852, height: 640, color: 0x000000 }, x: 244, y: 0,
          anims: [{ range: [21000, 21010], prop: 'alpha', from: 1, to: 0 }] },
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
}
