import type { PartConfig } from '../type'

export const part13: PartConfig = {
  id: 13,
  name: '第十三场景',
  layers: [
    // 场景容器：对应 linshi part13（position 42518-250=42268）
    // 与十二场景同步位移 [42900,43900] x 42268→43268
    {
      name: 'p13Cont', x: 42268, y: 0,
      anims: [{ range: [42900, 43900], prop: 'x', from: 42268, to: 43268 }],
      children: [
        // 黑底（linshi drawRect(250,0,2330-250,640)）
        { name: 'p13Bg1', x: 250, y: 0, rect: { width: 2080, height: 640, color: 0x000000 } },

        // 流星1：斜穿 [43360,43900]
        { name: 'liuxing1', texture: 'part13/liuxing.png', x: 340, y: -640,
          anims: [
            { range: [43360, 43900], prop: 'x', from: 340, to: 1430 },
            { range: [43360, 43900], prop: 'y', from: -640, to: 640 },
          ] },

        { name: 'o2Cont', x: 1100, y: 0,
          children: [
            // === 人2（先加入，在人1下层；alpha 由 anims 钉住初始 0） ===
            { name: 'p2Cont', x: 596, y: 0,
              anims: [
                { range: [43430, 45380], prop: 'x', from: 596, to: 296 },
                { range: [43950, 44250], prop: 'alpha', from: 0, to: 1 },
              ],
              children: [
                { name: 'p2Bg', texture: 'part13/p2-bg.png', x: -212, y: 0 },
                { name: 'p2Girl', texture: 'part13/p2-girl.png', x: 110, y: 0, maskRef: 'p2Mask1' },
                // 扫描遮罩组：时间驱动旋转 2.5s/圈，仅 [43430,45380] 区间播放
                { name: 'p2MaskCont', x: 185, y: 110, pivot: [137, 137],
                  loop: { prop: 'rotation', from: 0, to: Math.PI * 2, duration: 2.5, range: [43430, 45380] },
                  children: [
                    { name: 'p2Mask1', texture: 'part13/circle2.png', x: 0, y: 0 },
                    { name: 'p2Mask2', texture: 'part13/line2.png', x: 0, y: 0, maskRef: 'p2TopMask' },
                  ] },
                { name: 'p2TopMask', texture: 'part13/maskmask2.png', x: 63, y: 0 },
                { name: 'p2Top', texture: 'part13/p2-top.png', x: 63, y: 0 },
              ] },

            // === 人1（旋转扫描为滚动驱动 0→6π） ===
            { name: 'p1Cont', x: 400, y: 124,
              anims: [{ range: [42990, 45280], prop: 'x', from: 400, to: -400 }],
              children: [
                { name: 'p1Bg', texture: 'part13/p1-bg.png', x: 0, y: 0 },
                { name: 'p1Girl', texture: 'part13/p1-girl.png', x: 251, y: 13, maskRef: 'p1Mask1' },
                { name: 'p1MaskCont', x: 308, y: 197, pivot: [219, 219],
                  anims: [{ range: [43350, 44730], prop: 'rotation', from: 0, to: Math.PI * 6 }],
                  children: [
                    { name: 'p1Mask1', texture: 'part13/circle.png', x: 0, y: 0 },
                    { name: 'p1Mask2', texture: 'part13/line.png', x: 0, y: 0, maskRef: 'p1TopMask' },
                  ] },
                { name: 'p1TopMask', texture: 'part13/maskmask.png', x: 135, y: 0 },
                { name: 'p1Top', texture: 'part13/p1-top.png', x: 135, y: 0 },
              ] },

            // === 太空场景 ===
            { name: 'taikongCont', x: 902, y: 0,
              children: [
                { name: 'tkbg2', texture: 'part13/tkbg2.png', x: 24, y: 0 },

                // 星球 1~5：x 摆动（linshi 值已减 250 偏移）
                { name: 'xq1', texture: 'part13/xq1.png', x: 282, y: 63,
                  anims: [{ range: [44130, 45530], prop: 'x', from: 282, to: 82 }] },
                { name: 'xq2', texture: 'part13/xq2.png', x: 273, y: 68,
                  anims: [{ range: [44194, 45510], prop: 'x', from: 273, to: 173 }] },
                { name: 'xq3', texture: 'part13/xq3.png', x: 439, y: 87,
                  anims: [{ range: [44250, 45570], prop: 'x', from: 439, to: 139 }] },
                { name: 'xq4', texture: 'part13/xq4.png', x: 538, y: 104,
                  anims: [{ range: [44150, 45800], prop: 'x', from: 538, to: 138 }] },
                { name: 'xq5', texture: 'part13/xq5.png', x: 537, y: 59,
                  anims: [{ range: [44440, 45730], prop: 'x', from: 537, to: 437 }] },

                // 流星2
                { name: 'liuxing2', texture: 'part13/liuxing.png', x: -375, y: -640,
                  anims: [
                    { range: [44850, 45250], prop: 'x', from: -375, to: 535 },
                    { range: [44850, 45250], prop: 'y', from: -640, to: 640 },
                  ] },

                { name: 'tkbg', texture: 'part13/tkbg.png', x: 0, y: 34 },

                // 太空人
                { name: 'tkPerson', texture: 'part13/tkp1.png', x: 249, y: 399,
                  anims: [
                    { range: [44260, 45750], prop: 'x', from: 249, to: 316 },
                    { range: [44260, 45750], prop: 'y', from: 399, to: 366 },
                  ] },

                // 太空秋千：10 帧序列，[44500,46550] 切 15 步循环（帧号 i%10）
                // x 摆动参考代码区间写的是 [44750,46800]（与触发区间差 250，疑似笔误），统一取 [44500,46550]
                { name: 'qiuqian', x: 153, y: -79,
                  frameSeq: { prefix: 'part13/q', frames: 10, steps: 15, range: [44500, 46550] },
                  anims: [{ range: [44500, 46550], prop: 'x', from: 153, to: 253 }] },

                // 直到有一天 我们在太空下重逢
                { name: 'p13Talk', texture: 'part13/talk.png', x: 643, y: 507,
                  anims: [{ range: [44650, 46620], prop: 'x', from: 643, to: 793 }] },
              ] },
          ] },
      ],
    },
  ],
}
