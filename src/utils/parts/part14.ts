import type { PartConfig } from '../type'

export const part14: PartConfig = {
  id: 14,
  name: '第十四场景',
  layers: [
    // 场景容器：对应 linshi part14（position 46200,0）
    // 暂停效果 [47740,49740] x: 46200→48200（与 scrollPro 同步移动）
    {
      name: 'p14Cont', x: 46200, y: 0,
      anims: [{ range: [47740, 49740], prop: 'x', from: 46200, to: 48200 }],
      children: [
        // 14场景背景延长（linshi drawRect(1634,0,2000,640)，坐标相对 p14Cont）
        { name: 'p14BgMore', x: 1634, y: 0, rect: { width: 2000, height: 640, color: 0x000000 } },

        // 音波容器（linshi part14YinCont position(0,0)）
        { name: 'yinCont', x: 0, y: 0,
          children: [
            // 8段渐显逻辑：每段显示下一个 yin，段宽=(45850-45500)/8=43.75
            // yin1~6 各在对应段起点渐显，yin7 在第7段起点渐显后保持
            { name: 'yin1', texture: 'part14/y1.png', x: 256, y: 281,
              anims: [{ range: [45500, 45544], prop: 'alpha', from: 0, to: 1 }] },
            { name: 'yin2', texture: 'part14/y2.png', x: 271, y: 275,
              anims: [{ range: [45544, 45588], prop: 'alpha', from: 0, to: 1 }] },
            { name: 'yin3', texture: 'part14/y3.png', x: 289, y: 264,
              anims: [{ range: [45588, 45631], prop: 'alpha', from: 0, to: 1 }] },
            { name: 'yin4', texture: 'part14/y4.png', x: 312, y: 257,
              anims: [{ range: [45631, 45675], prop: 'alpha', from: 0, to: 1 }] },
            { name: 'yin5', texture: 'part14/y5.png', x: 348, y: 251,
              anims: [{ range: [45675, 45719], prop: 'alpha', from: 0, to: 1 }] },
            { name: 'yin6', texture: 'part14/y6.png', x: 396, y: 205,
              anims: [{ range: [45719, 45763], prop: 'alpha', from: 0, to: 1 }] },
            { name: 'yin7', texture: 'part14/y7.png', x: 442, y: 0,
              anims: [
                { range: [45763, 45800], prop: 'alpha', from: 0, to: 1 },
                { range: [45800, 46100], prop: 'alpha', from: 1, to: 1 },
              ] },
          ] },

        // 电码 M1~M21（linshi 滚动区间 -250）
        { name: 'm1', texture: 'part14/m1.png', x: 752, y: 22,
          anims: [{ range: [45750, 47700], prop: 'x', from: 752, to: 552 }] },
        { name: 'm2', texture: 'part14/m2.png', x: 751, y: 218,
          anims: [{ range: [45750, 47460], prop: 'x', from: 751, to: 631 }] },
        { name: 'm3', texture: 'part14/m3.png', x: 718, y: 322,
          anims: [{ range: [45750, 47210], prop: 'x', from: 718, to: 538 }] },
        { name: 'm4', texture: 'part14/m4.png', x: 694, y: 477,
          anims: [{ range: [45750, 47130], prop: 'x', from: 694, to: 594 }] },
        { name: 'm5', texture: 'part14/m5.png', x: 774, y: 577,
          anims: [{ range: [45750, 47240], prop: 'x', from: 774, to: 614 }] },
        { name: 'm6', texture: 'part14/m6.png', x: 1159, y: 324,
          anims: [{ range: [45940, 47600], prop: 'x', from: 1159, to: 959 }] },
        { name: 'm7', texture: 'part14/m7.png', x: 1135, y: 427,
          anims: [{ range: [46020, 47550], prop: 'x', from: 1135, to: 1055 }] },
        { name: 'm8', texture: 'part14/m8.png', x: 1361, y: 531,
          anims: [{ range: [46200, 47630], prop: 'x', from: 1361, to: 1161 }] },
        { name: 'm9a', texture: 'part14/m9.png', x: 1353, y: 219,
          anims: [{ range: [46250, 47720], prop: 'x', from: 1353, to: 1293 }] },
        { name: 'm11', texture: 'part14/m11.png', x: 1537, y: 325,
          anims: [{ range: [46416, 47800], prop: 'x', from: 1537, to: 1417 }] },
        { name: 'm12', texture: 'part14/m12.png', x: 1562, y: 111,
          anims: [{ range: [46530, 48030], prop: 'x', from: 1562, to: 1522 }] },
        { name: 'm13', texture: 'part14/m13.png', x: 1606, y: 384,
          anims: [{ range: [46450, 48030], prop: 'x', from: 1606, to: 1466 }] },
        { name: 'm15', texture: 'part14/m15.png', x: 1622, y: 503,
          anims: [{ range: [46450, 48030], prop: 'x', from: 1622, to: 1442 }] },
        { name: 'm16', texture: 'part14/m16.png', x: 1871, y: 130,
          anims: [{ range: [46600, 48470], prop: 'x', from: 1871, to: 1671 }] },
        { name: 'm17', texture: 'part14/m17.png', x: 1931, y: 431,
          anims: [{ range: [47150, 48550], prop: 'x', from: 1931, to: 1871 }] },
        { name: 'm18', texture: 'part14/m18.png', x: 2021, y: 516,
          anims: [{ range: [47065, 48580], prop: 'x', from: 2021, to: 1841 }] },
        { name: 'm19', texture: 'part14/m19.png', x: 2136, y: 27,
          anims: [{ range: [47020, 48540], prop: 'x', from: 2136, to: 2066 }] },
        { name: 'm20', texture: 'part14/m20.png', x: 2128, y: 222,
          anims: [{ range: [47060, 48590], prop: 'x', from: 2128, to: 2088 }] },
        { name: 'm21', texture: 'part14/m21.png', x: 2174, y: 297,
          anims: [{ range: [47060, 48590], prop: 'x', from: 2174, to: 2074 }] },

        // 电码 M22~M25（linshi 滚动区间无 -250）
        { name: 'm22', texture: 'part14/m6.png', x: 2452, y: 152,
          anims: [{ range: [47260, 48080], prop: 'x', from: 2452, to: 2272 }] },
        { name: 'm23', texture: 'part14/m3.png', x: 2530, y: 56,
          anims: [{ range: [47260, 48080], prop: 'x', from: 2530, to: 2410 }] },
        { name: 'm24', texture: 'part14/m2.png', x: 2384, y: 282,
          anims: [{ range: [47260, 48080], prop: 'x', from: 2374, to: 2314 }] },
        { name: 'm25', texture: 'part14/m4.png', x: 2425, y: 473,
          anims: [{ range: [47260, 48080], prop: 'x', from: 2425, to: 2285 }] },

        // ET 场景容器（linshi part14ETCont position(1634,64)，坐标相对 p14Cont）
        { name: 'etCont', x: 1634, y: 64,
          children: [
            { name: 'etBg', texture: 'part14/etbg.png', x: 0, y: 0 },
            // ET手：5帧序列帧 [47740,47840]
            { name: 'etHand', x: 403, y: 284,
              frameSeq: { prefix: 'part14/hand', frames: 5, range: [47740, 47840] } },
            // ET光：scale 0→1.1 [47860,48260]，pivot(1548,1548)
            { name: 'etLight', texture: 'part14/etlight.png', x: 443, y: 318,
              pivot: [1548, 1548],
              anims: [
                { range: [47860, 48260], prop: 'scaleX', from: 0, to: 1.1 },
                { range: [47860, 48260], prop: 'scaleY', from: 0, to: 1.1 },
              ] },
          ] },

        // M10/M14 叠在 ET 之上（linshi addChild 顺序：…ETCont, M10, M14, Date）
        { name: 'm10', texture: 'part14/m10.png', x: 1527, y: 17,
          anims: [{ range: [46416, 48380], prop: 'x', from: 1527, to: 1427 }] },
        { name: 'm14', texture: 'part14/m14.png', x: 1636, y: 368,
          anims: [{ range: [46438, 48480], prop: 'x', from: 1636, to: 1536 }] },

        // 日期（linshi 相对 x=1292）
        { name: 'p14Date', texture: 'part14/date.png', x: 1292, y: 312 },
      ],
    },
  ],
}
